import React from 'react'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import { AuthProvider } from '../contexts/AuthContext'
import { ThemeProvider } from 'styled-components'
import usePersistedState from './utils/usePersistedState'
import light from './style/themes/light'
import dark from './style/themes/dark'
import GlobalStyle from './style/global'
import Nav from './header/Nav'
import Routes from './route/Routes'
import { BrowserRouter as Router } from 'react-router-dom'
function App() {
  const [theme, setTheme] = usePersistedState('theme', light)

  const toggleTheme = () => {
    setTheme(theme.title === 'light' ? dark : light)
  }

  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <Router>
          <AuthProvider>
            <ToastContainer />
            <GlobalStyle />
            <Nav toggleTheme={toggleTheme} />
            <Routes />
            {/* <Container
              className="d-flex align-items-center justify-content-center"
              style={{ minHeight: '100vh' }}
            >
              <div className="w-100" style={{ maxWidth: '700px' }}>
                
              </div>
            </Container> */}
          </AuthProvider>
        </Router>
      </div>
    </ThemeProvider>
  )
}

export default App
