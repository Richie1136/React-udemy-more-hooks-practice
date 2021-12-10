import React from 'react'
import Card from '../card/Card'
import './IngredientForm.css'

const IngredientForm = React.memo() => {
  const submitHandler = (event) => {
    event.preventDefault()
  }
  return (
    <section className='ingredient-form'>
      <Card>
        <form onSubmit={submitHandler}>
          <div className='form-control'>
            <label htmlFor='title'>Name</label>
            <input type='text' id='title' />
          </div>
          <div className='form-control'>
            <label htmlFor='amount'>Amount</label>
            <input typ='number' id='amount' />
          </div>
          <div className='ingredient-form__actions'>
            <button type='submit'>Add Ingredient</button>
          </div>
        </form>
      </Card>
    </section>
  )
}

export default IngredientForm
