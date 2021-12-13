import React, { useState, useEffect } from 'react'
import Card from '../card/Card'
import './Search.css'

const Search = React.memo(props => {

  const { onLoadIngredients } = props

  const [enteredFilter, setEnteredFilter] = useState('')

  const handleInput = (event) => {
    setEnteredFilter(event.target.value)
  }

  useEffect(() => {
    const query = enteredFilter.length === 0 ? '' : `?orderBy="title"&equalTo="${enteredFilter}"`
    fetch('https://react-hooks-practice-6b094-default-rtdb.firebaseio.com/ingredients.json' + query)
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
        onLoadIngredients(loadedIngredients)
      });
  }, [enteredFilter, onLoadIngredients])

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
