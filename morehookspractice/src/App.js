import './App.css';
import Ingredients from './components/ingredients/Ingredients';
import Auth from './components/auth/Auth';
import AuthContext from './context/auth-context';
import { useContext } from 'react'

function App() {
  const context = useContext(AuthContext)
  let content = <Auth />

  if (AuthContext.isAuth) {
    content = <Ingredients />
  } else {
    content = <Auth />
  }
  return content

}

export default App;
