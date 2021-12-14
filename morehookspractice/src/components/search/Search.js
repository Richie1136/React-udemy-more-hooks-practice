import React, { useState, useEffect, useRef } from 'react'
import Card from '../card/Card'
import './Search.css'

const Search = React.memo(({ onLoadIngredients }) => {

  const [enteredFilter, setEnteredFilter] = useState('')

  const inputRef = useRef()

  const handleInput = (event) => {
    setEnteredFilter(event.target.value)
  }

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (enteredFilter === inputRef.current.value) {
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
      }
    }, 500);
    return () => clearTimeout(timeout)
  }, [enteredFilter, onLoadIngredients, inputRef])

  return (
    <section className='search'>
      <Card>
        <div className='search-input'>
          <label>Filter by Title</label>
          <input ref={inputRef} type='text' value={enteredFilter} onChange={handleInput} />
        </div>
      </Card>
    </section>
  )
})

export default Search
