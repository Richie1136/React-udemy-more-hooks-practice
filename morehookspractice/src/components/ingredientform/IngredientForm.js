import React, { useState } from 'react'
import Card from '../card/Card'
import './IngredientForm.css'
import LoadingIndicator from '../loadingindicator/LoadingIndicator'

const IngredientForm = React.memo(({ onAddIngredient, loading }) => {

  const [enteredTitle, setEnteredTitle] = useState('')
  const [enteredAmount, setEnteredAmount] = useState('')

  const submitHandler = (event) => {
    event.preventDefault()
    onAddIngredient({ title: enteredTitle, amount: enteredAmount })
  }

  const handleTitle = (event) => {
    setEnteredTitle(event.target.value)
  }

  const handleAmount = (event) => {
    setEnteredAmount(event.target.value)
  }

  return (
    <section className='ingredient-form'>
      <Card>
        <form onSubmit={submitHandler}>
          <div className='form-control'>
            <label htmlFor='title'>Name</label>
            <input type='text' id='title' value={enteredTitle} onChange={handleTitle} />
          </div>
          <div className='form-control'>
            <label htmlFor='amount'>Amount</label>
            <input type='text' id='title' value={enteredAmount} onChange={handleAmount} />
          </div>
          <div className='ingredient-form__actions'>
            <button type='submit'>Add Ingredient</button>
            {loading ? <LoadingIndicator /> : null}
          </div>
        </form>
      </Card>
    </section>
  )
})

export default IngredientForm