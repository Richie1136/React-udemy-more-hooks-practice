import React, { useState } from 'react'
import Card from '../card/Card'
import './IngredientForm.css'

const IngredientForm = React.memo(props => {
  // const input = useState({ title: '', amount: '' })

  const [title, setTitle] = useState('')
  const [amount, setAmount] = useState('')

  const submitHandler = (event) => {
    event.preventDefault()
  }

  const handleTitle = (event) => {
    setTitle(event.target.value)
  }

  const handleAmount = (event) => {
    setAmount(event.target.value)
  }

  return (
    <section className='ingredient-form'>
      <Card>
        <form onSubmit={submitHandler}>
          <div className='form-control'>
            <label htmlFor='title'>Name</label>
            {/* <input type='text' id='title' value={input[0].title} onChange={event => input[1]({ title: event.target.value, amount: input[0].amount })} /> */}
            <input type='text' id='title' value={title} onChange={handleTitle} />
          </div>
          <div className='form-control'>
            <label htmlFor='amount'>Amount</label>
            {/* <input typ='number' id='amount' value={input[0].amount} onChange={event => input[1]({ amount: event.target.value, title: input[0].title })} /> */}
            <input type='text' id='title' value={amount} onChange={handleAmount} />
          </div>
          <div className='ingredient-form__actions'>
            <button type='submit'>Add Ingredient</button>
          </div>
        </form>
      </Card>
    </section>
  )
})

export default IngredientForm
