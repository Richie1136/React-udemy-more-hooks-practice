import React, { useState } from 'react'
import IngredientForm from '../ingredientform/IngredientForm'
import Search from '../search/Search'
import IngredientList from '../ingredientlist/IngredientList'


const Ingredients = () => {

  const [userIngredients, setUserIngredients] = useState([])

  const handleAddIngredient = (ingredient) => {
    setUserIngredients(prevIngredients => [
      [...prevIngredients, { id: Math.random().toString(), ...ingredient }]
    ])
  }

  return (
    <div className='App'>
      <IngredientForm onAddIngredient={handleAddIngredient} />
      <section>
        <Search />
        <IngredientList ingredients={userIngredients} />
      </section>
    </div>
  )
}

export default Ingredients
