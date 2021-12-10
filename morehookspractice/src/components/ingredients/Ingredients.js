import React from 'react'
import IngredientForm from '../ingredientform/IngredientForm'
import Search from '../search/Search'
const Ingredients = () => {
  return (
    <div className='App'>
      <IngredientForm />
      <section>
        <Search />
        {/* Need to add list here! */}
      </section>
    </div>
  )
}

export default Ingredients
