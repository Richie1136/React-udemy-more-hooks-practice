import React, { useState, useCallback } from 'react'
import IngredientForm from '../ingredientform/IngredientForm'
import Search from '../search/Search'
import IngredientList from '../ingredientlist/IngredientList'


const Ingredients = () => {

  const [userIngredients, setUserIngredients] = useState([])

  const filteredIngredient = useCallback((filteredIngredients) => {
    setUserIngredients(filteredIngredients)
  }, [])

  const handleAddIngredient = (ingredient) => {
    fetch('https://react-hooks-practice-6b094-default-rtdb.firebaseio.com/ingredients.json', {
      method: 'POST',
      body: JSON.stringify(ingredient),
      headers: { 'Content-Type': 'application/json' }
    }).then(response => {
      return response.json()
    }).then(responseData => {
      setUserIngredients(prevIngredients => [
        ...prevIngredients,
        { id: responseData.name, ...ingredient }
      ])
    })
  }


  const handleRemoveIngredient = (id) => {
    fetch(`https://react-hooks-practice-6b094-default-rtdb.firebaseio.com/ingredients/${id}.json`, {
      method: 'DELETE',
    })
    setUserIngredients((prevIngredients) => prevIngredients.filter((ingredient) => ingredient.id !== id))
  }

  return (
    <div className='App'>
      <IngredientForm onAddIngredient={handleAddIngredient} />
      <section>
        <Search onLoadIngredients={filteredIngredient} />
        <IngredientList ingredients={userIngredients} onRemoveItem={handleRemoveIngredient} />
      </section>
    </div>
  )
}

export default Ingredients