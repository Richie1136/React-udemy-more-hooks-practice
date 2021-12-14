import React, { useReducer, useState, useCallback } from 'react'
import IngredientForm from '../ingredientform/IngredientForm'
import Search from '../search/Search'
import IngredientList from '../ingredientlist/IngredientList'
import ErrorModal from '../errormodal/ErrorModal'

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

const httpReducer = (currentHttpState, action) => {
  switch (action.type) {
    case 'SEND':
      return { loading: true, error: null }
    case 'RESPONSE':
      return { ...currentHttpState, loading: false }
    case 'ERROR':
      return { loading: false, error: action.errorMessage }
    case 'CLEAR':
      return { ...currentHttpState, error: null }
    default:
      throw new Error("Should not get here")
  }
}

const Ingredients = () => {

  const [userIngredients, dispatch] = useReducer(ingredientReducer, [])
  const [httpState, dispatchHttp] = useReducer(httpReducer, { loading: false, error: null })


  // const [userIngredients, setUserIngredients] = useState([])
  // const [isLoading, setIsLoading] = useState(false)
  // const [isError, setIsError] = useState()

  const filteredIngredient = useCallback((filteredIngredients) => {
    // setUserIngredients(filteredIngredients)
    dispatch({ type: 'SET', ingredients: filteredIngredients })
  }, [])

  const handleAddIngredient = useCallback((ingredient) => {
    // setIsLoading(true)
    dispatchHttp({ type: 'SEND' })
    fetch('https://react-hooks-practice-6b094-default-rtdb.firebaseio.com/ingredients.json', {
      method: 'POST',
      body: JSON.stringify(ingredient),
      headers: { 'Content-Type': 'application/json' }
    }).then(response => {
      // setIsLoading(false)
      dispatchHttp({ type: 'RESPONSE' })
      return response.json()
    }).then(responseData => {
      // setUserIngredients(prevIngredients => [
      //   ...prevIngredients,
      //   { id: responseData.name, ...ingredient }
      // ])
      dispatch({ type: 'ADD', ingredient: { id: responseData.name, ...ingredient } })
    })
  }, [])


  const handleRemoveIngredient = (id) => {
    // setIsLoading(true)
    dispatchHttp({ type: 'SEND' })
    fetch(`https://react-hooks-practice-6b094-default-rtdb.firebaseio.com/ingredients/${id}.json`, {
      method: 'DELETE',
    }).then(response => {
      // setIsLoading(false)
      dispatchHttp({ type: 'RESPONSE' })
      // setUserIngredients((prevIngredients) => prevIngredients.filter((ingredient) => ingredient.id !== id))
      dispatch({ type: 'DELETE', id })

    }).catch(error => {
      // setIsError(error.message)
      // setIsLoading(false)
      dispatchHttp({ type: 'ERROR', errorMessage: error.message })
    })
  }

  const clearError = () => {
    // setIsError(null)
    dispatchHttp({ type: 'CLEAR' })
  }

  return (
    <div className='App'>
      {httpState.error && <ErrorModal onClose={clearError}>{httpState.error}</ErrorModal>}
      <IngredientForm onAddIngredient={handleAddIngredient} loading={httpState.loading} />
      <section>
        <Search onLoadIngredients={filteredIngredient} />
        <IngredientList ingredients={userIngredients} onRemoveItem={handleRemoveIngredient} />
      </section>
    </div>
  )
}

export default Ingredients
