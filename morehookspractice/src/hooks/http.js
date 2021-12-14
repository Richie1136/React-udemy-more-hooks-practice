import React, { useReducer } from 'react'

const httpReducer = (currentHttpState, action) => {
  switch (action.type) {
    case 'SEND':
      return { loading: true, error: null }
    case 'RESPONSE':
      return { ...currentHttpState, loading: false }
    case 'ERROR':
      return { loading: false, error: action.errorMessage }
    case 'CLEAR':
      return { ...currentHttpState, error: null }
    default:
      throw new Error("Should not get here")
  }
}
const useHttp = () => {
  const [httpState, dispatchHttp] = useReducer(httpReducer, { loading: false, error: null })

  const sendRequest = (url, method, body) => {
    fetch(url, {
      method,
      body
      headers: { 'Content-Type': 'application/json' }
    }).then(response => {
      // setIsLoading(false)
      dispatchHttp({ type: 'RESPONSE' })
      return response.json()
    }).then(responseData => {
      // setUserIngredients(prevIngredients => [
      //   ...prevIngredients,
      //   { id: responseData.name, ...ingredient }
      // ])
      dispatch({ type: 'ADD', ingredient: { id: responseData.name, ...ingredient } })
    })
  }


  return (
    <div>

    </div>
  )
}

export default useHttp

