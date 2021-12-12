import React, { useState } from 'react'
import IngredientForm from '../ingredientform/IngredientForm'
import Search from '../search/Search'
import IngredientList from '../ingredientlist/IngredientList'


const Ingredients = () => {

  const [userIngredients, setUserIngredients] = useState([])

  const handleAddIngredient = (ingredient) => {
    fetch('https://react-hooks-practice-6b094-default-rtdb.firebaseio.com/ingredients.json', {
      method: 'POST',
      body: JSON.stringify({ ingredient }),
      headers: { 'Content-Type': 'application/json' }
    }).then(response => {
      setUserIngredients(prevIngredients => [
        ...prevIngredients,
        { id: Math.random().toString(), ...ingredient }
      ])
    })
  }

  const handleRemoveIngredient = (id) => {
    setUserIngredients((prevIngredients) => prevIngredients.filter((ingredient) => ingredient.id !== id))
  }

  return (
    <div className='App'>
      <IngredientForm onAddIngredient={handleAddIngredient} />
      <section>
        <Search />
        <IngredientList ingredients={userIngredients} onRemoveItem={handleRemoveIngredient} />
      </section>
    </div>
  )
}

export default Ingredients