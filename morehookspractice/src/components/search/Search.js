import React, { useState, useEffect } from 'react'
import Card from '../card/Card'
import './Search.css'

const Search = React.memo(props => {

  const [enteredFilter, setEnteredFilter] = useState('')

  const handleInput = (event) => {
    setEnteredFilter(event.target.value)
  }

  useEffect(() => {
    fetch('https://react-hooks-practice-6b094-default-rtdb.firebaseio.com/ingredients.json')
      .then(response => response.json())
      .then(responseData => {
        const loadedIngredients = []
        for (const key in responseData) {
          loadedIngredients.push({
            id: key,
            title: responseData[key].title,
            amount: responseData[key].amount
          });
        }
        props.onLoadIngredients(loadedIngredients)
      });
  }, [enteredFilter, props])

  return (
    <section className='search'>
      <Card>
        <div className='search-input'>
          <label>Filter by Title</label>
          <input type='text' value={enteredFilter} onChange={handleInput} />
        </div>
      </Card>
    </section>
  )
})

export default Search
