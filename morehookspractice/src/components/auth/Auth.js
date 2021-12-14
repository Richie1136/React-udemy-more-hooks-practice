import React, { useContext } from 'react'
import Card from '../card/Card'
import './Auth.css'
import AuthContext from '../../context/auth-context'

const Auth = () => {
  const context = useContext(AuthContext)

  const loginHandler = () => {
    context.login();
  }
  return (
    <div className='auth'>
      <Card>
        <h2>You are not authenticated!</h2>
        <p>Please log in to continue.</p>
        <button onClick={loginHandler}>Log In</button>
      </Card>
    </div>
  )
}

export default Auth
