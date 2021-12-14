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


  return <AuthContext.Provider value>{{ login: handleLogin, isAuth: isAuthenticated }}</AuthContext.Provider>
}






export default AuthContext