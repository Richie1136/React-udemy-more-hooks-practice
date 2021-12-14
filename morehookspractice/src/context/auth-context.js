import { React, useState } from 'react'

const AuthContext = React.createContext({
  isAuth: false,
  login: () => { }
})


export const AuthContextProvider = ({ children }) => {

  const [isAuthenticated, setIsAuthenticated] = useState(false)

  const handleLogin = () => {
    setIsAuthenticated(true)
  }


  return <AuthContextProvider value>{{ login: handleLogin, isAuth: isAuthenticated }}</AuthContextProvider>
}






export default AuthContext