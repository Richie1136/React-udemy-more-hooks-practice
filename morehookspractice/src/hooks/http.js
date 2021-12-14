import React, { useReducer } from 'react'

const httpReducer = (currentHttpState, action) => {
  switch (action.type) {
    case 'SEND':
      return { loading: true, error: null, data: null }
    case 'RESPONSE':
      return { ...currentHttpState, loading: false, data: action.data }
    case 'ERROR':
      return { loading: false, error: action.errorMessage }
    case 'CLEAR':
      return { ...currentHttpState, error: null }
    default:
      throw new Error("Should not get here")
  }
}
const useHttp = () => {
  const [httpState, dispatchHttp] = useReducer(httpReducer, { loading: false, error: null, data: null })

  const sendRequest = (url, method, body) => {
    dispatchHttp({ type: 'SEND' })
    fetch(url, {
      method,
      body,
      headers: { 'Content-Type': 'application/json' }
    }).then(response => {
      // setIsLoading(false)
      return response.json()
      // setUserIngredients((prevIngredients) => prevIngredients.filter((ingredient) => ingredient.id !== id))

    })
      .then(data => {
        dispatchHttp({ type: 'RESPONSE', data })
      })
      .catch(error => {
        // setIsError(error.message)
        // setIsLoading(false)
        dispatchHttp({ type: 'ERROR', errorMessage: error.message })
      })
  }

  return {
    isLoading: httpState.loading,
    data: httpState.data
    error: httpState.error

  }
}

export default useHttp

