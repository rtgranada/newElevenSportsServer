import React, { useState, useEffect, useContext } from 'react'
import { Link, withRouter, useHistory } from 'react-router-dom'
import { ThemeContext } from 'styled-components'
import { Container } from './styles'
import { useAuth } from '../../contexts/AuthContext'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import SubNav from './SubNav'
import {
  faMoon,
  faSignOutAlt,
  faSignInAlt,
  faUserPlus,
} from '@fortawesome/free-solid-svg-icons'
import { faMoon as rMoon } from '@fortawesome/free-regular-svg-icons'

const Nav = (props) => {
  const [error, setError] = useState('')

  const [userName, setUserName] = useState('')
  const { currentUser, logout } = useAuth()
  const { title } = useContext(ThemeContext)
  const history = useHistory()

  useEffect(() => {
    if (currentUser) {
      setUserName(currentUser.bdUser.firstName)
    }
    if (!currentUser) {
      setUserName('')
    }
  }, [currentUser])

  async function handleLogout() {
    setError('')

    try {
      await logout()
      history.push('/login')
    } catch {
      setError('Failed to log out')
    }
  }

  let buttons
  if (currentUser != null) {
    buttons = (
      <React.Fragment>
        <li>
          <Link to="/profile" title="Entrar">
            {userName}
          </Link>
        </li>
        <li>
          <FontAwesomeIcon
            icon={faSignOutAlt}
            className="animateIcon"
            onClick={handleLogout}
            title="Sair"
          />
        </li>
      </React.Fragment>
    )
  } else {
    buttons = (
      <React.Fragment>
        <li>
          <Link to="/signup" title="Cadastrar">
            <FontAwesomeIcon icon={faUserPlus} className="animateIcon" />
          </Link>
        </li>
        <li>
          <Link to="/login" title="Entrar">
            <FontAwesomeIcon icon={faSignInAlt} className="animateIcon" />
          </Link>
        </li>
      </React.Fragment>
    )
  }

  return (
    <>
      <Container>
        <nav>
          <ul>
            <li>
              <Link to="/"> Eleven Sports </Link>
            </li>
          </ul>
          <ul>
            <FontAwesomeIcon
              icon={title === 'light' ? faMoon : rMoon}
              className="animateIcon"
              onClick={() => {
                props.toggleTheme()
              }}
              title={title === 'light' ? 'Modo Escuro' : 'Modo Claro'}
            />

            {buttons}
          </ul>
        </nav>
      </Container>
      {currentUser && <SubNav />}
    </>
  )
}
export default withRouter(Nav)
