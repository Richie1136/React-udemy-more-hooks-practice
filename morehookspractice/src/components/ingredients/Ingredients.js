import React, { useState } from 'react'
import IngredientForm from '../ingredientform/IngredientForm'
import Search from '../search/Search'
import IngredientList from '../ingredientlist/IngredientList'


const Ingredients = () => {

  const [userIngredients, setUserIngredients] = useState([])

  return (
    <div className='App'>
      <IngredientForm />
      <section>
        <Search />
        <IngredientList ingredients={userIngredients} />
      </section>
    </div>
  )
}

export default Ingredients
