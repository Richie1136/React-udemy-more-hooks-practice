import React, { useState, useEffect, useRef } from 'react'
import Card from '../card/Card'
import './Search.css'
import useHttp from '../../hooks/http'
import ErrorModal from '../errormodal/ErrorModal'

const Search = React.memo(({ onLoadIngredients }) => {

  const [enteredFilter, setEnteredFilter] = useState('')

  const inputRef = useRef()

  const { loading, data, error, sendRequest, clear } = useHttp()

  const handleInput = (event) => {
    setEnteredFilter(event.target.value)
  }

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (enteredFilter === inputRef.current.value) {
        const query = enteredFilter.length === 0 ? '' : `?orderBy="title"&equalTo="${enteredFilter}"`
        sendRequest('https://react-hooks-practice-6b094-default-rtdb.firebaseio.com/ingredients.json' + query, 'GET')
        // fetch('https://react-hooks-practice-6b094-default-rtdb.firebaseio.com/ingredients.json' + query)
        // .then(response => response.json())
        // .then(responseData => {
        // // });
      }
    }, 500);
    return () => clearTimeout(timeout)
  }, [enteredFilter, inputRef, sendRequest])

  useEffect(() => {
    if (!loading && data && !error) {
      const loadedIngredients = []
      for (const key in data) {
        loadedIngredients.push({
          id: key,
          title: data[key].title,
          amount: data[key].amount
        });
      }
      onLoadIngredients(loadedIngredients)

    }
  }, [data, loading, error, onLoadIngredients])



  return (
    <section className='search'>
      <Card>
        {error && <ErrorModal onClose={clear}>{error}</ErrorModal>}
        <div className='search-input'>
          <label>Filter by Title</label>
          {loading && <span>Loading...</span>}
          <input ref={inputRef} type='text' value={enteredFilter} onChange={handleInput} />
        </div>
      </Card>
    </section>
  )
})

export default Search
