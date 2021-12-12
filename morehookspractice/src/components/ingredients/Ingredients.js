import React, { useState } from 'react'
import IngredientForm from '../ingredientform/IngredientForm'
import Search from '../search/Search'
import IngredientList from '../ingredientlist/IngredientList'


const Ingredients = () => {

  const [userIngredients, setUserIngredients] = useState([])

  const handleAddIngredient = (ingredient) => {
    setUserIngredients(prevIngredients => [
      ...prevIngredients,
      { id: Math.random().toString(), ...ingredient }
    ])
  }

  const handleRemoveIngredient = (id) => {
    setUserIngredients((prevIngredients) => {
      return prevIngredients.filter((ingredient) => ingredient.id !== id)
    })
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