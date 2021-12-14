import React, { useReducer, useState, useCallback } from 'react'
import IngredientForm from '../ingredientform/IngredientForm'
import Search from '../search/Search'
import IngredientList from '../ingredientlist/IngredientList'
import ErrorModal from '../errormodal/ErrorModal'
import useHttp from '../../hooks/http'

const ingredientReducer = (currentIngredients, action) => {
  switch (action.type) {
    case 'SET':
      return action.ingredients
    case 'ADD':
      return [...currentIngredients, action.ingredient]
    case 'DELETE':
      return currentIngredients.filter((ingredient) => ingredient.id !== action.id)

    default:
      throw new Error("Should not get here")
  }
}

const Ingredients = () => {

  const [userIngredients, dispatch] = useReducer(ingredientReducer, [])
  const { loading, error, data, sendRequest } = useHttp()


  // const [userIngredients, setUserIngredients] = useState([])
  // const [isLoading, setIsLoading] = useState(false)
  // const [isError, setIsError] = useState()

  const filteredIngredient = useCallback((filteredIngredients) => {
    // setUserIngredients(filteredIngredients)
    dispatch({ type: 'SET', ingredients: filteredIngredients })
  }, [])

  const handleAddIngredient = useCallback((ingredient) => {
    // setIsLoading(true)
    // dispatchHttp({ type: 'SEND' })
    // fetch('https://react-hooks-practice-6b094-default-rtdb.firebaseio.com/ingredients.json', {
    //   method: 'POST',
    //   body: JSON.stringify(ingredient),
    //   headers: { 'Content-Type': 'application/json' }
    // }).then(response => {
    //   // setIsLoading(false)
    //   dispatchHttp({ type: 'RESPONSE' })
    //   return response.json()
    // }).then(responseData => {
    //   // setUserIngredients(prevIngredients => [
    //   //   ...prevIngredients,
    //   //   { id: responseData.name, ...ingredient }
    //   // ])
    //   dispatch({ type: 'ADD', ingredient: { id: responseData.name, ...ingredient } })
    // })
  }, [])


  const handleRemoveIngredient = useCallback((id) => {
    // setIsLoading(true)
    // dispatchHttp({ type: 'SEND' })

    sendRequest(`https://react-hooks-practice-6b094-default-rtdb.firebaseio.com/ingredients/${id}.json`, 'DELETE')
  }, [sendRequest])

  const clearError = useCallback(() => {
    // setIsError(null)
    // dispatchHttp({ type: 'CLEAR' })
  }, [])


  return (
    <div className='App'>
      {error && <ErrorModal onClose={clearError}>{error}</ErrorModal>}
      <IngredientForm onAddIngredient={handleAddIngredient} loading={loading} />
      <section>
        <Search onLoadIngredients={filteredIngredient} />
        <IngredientList ingredients={userIngredients} onRemoveItem={handleRemoveIngredient} />
      </section>
    </div>
  )
}

export default Ingredients
