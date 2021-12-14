import React, { useReducer, useCallback } from 'react'

const initalState = {
  loading: false,
  error: null,
  data: null,
  id: null,
  identifier: null

}

const httpReducer = (currentHttpState, action) => {
  switch (action.type) {
    case 'SEND':
      return { loading: true, error: null, data: null, id: null, identifier: action.identifier }
    case 'RESPONSE':
      return { ...currentHttpState, loading: false, data: action.data, id: action.id }
    case 'ERROR':
      return { loading: false, error: action.errorMessage }
    case 'CLEAR':
      return initalState
    default:
      throw new Error("Should not get here")
  }
}
const useHttp = () => {
  const [httpState, dispatchHttp] = useReducer(httpReducer, initalState)

  const clear = useCallback(() => dispatchHttp({ type: 'CLEAR' }), [])

  const sendRequest = useCallback((url, method, body, id, identifier) => {
    dispatchHttp({ type: 'SEND', identifier })
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
        dispatchHttp({ type: 'RESPONSE', data, id })
      })
      .catch(error => {
        // setIsError(error.message)
        // setIsLoading(false)
        dispatchHttp({ type: 'ERROR', errorMessage: error.message })
      })
  }, [])

  return {
    loading: httpState.loading,
    data: httpState.data,
    error: httpState.error,
    sendRequest,
    id: httpState.id,
    identifier: httpState.identifier,
    clear
  }
}

export default useHttp

