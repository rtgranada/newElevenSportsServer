import React, { useState, useEffect } from 'react'
import { Container, Card, Button, Alert } from 'react-bootstrap'
import { useAuth } from '../contexts/AuthContext'
import { Link, useHistory } from 'react-router-dom'
import { getUser } from '../services/user'
import { LoadingBall } from './style/loadingBall'
import { NavDashboard } from './header/NavDashboard'

export default function Dashboard() {
  const [error, setError] = useState('')
  const { currentUser, logout } = useAuth()
  const [timer, setTimer] = useState(false)
  const history = useHistory()
  const usuario = getUser()

  console.log(usuario)
  let contRender
  let profile = usuario.type === 'administrator' ? true : false

  console.log('profile ', profile)

  // console.log('dash aqui', usuario)

  async function handleLogout() {
    setError('')

    try {
      await logout()
      history.push('/login')
    } catch {
      setError('Failed to log out')
    }
  }

  useEffect(() => {
    setTimer(true)

    setTimeout(() => setTimer(false), 3000)
  }, [])

  if (timer) {
    contRender = (
      <Container
        className="d-flex align-items-center justify-content-center"
        style={{ minHeight: '100vh' }}
      >
        <div className="w-100" style={{ maxWidth: '700px' }}>
          <LoadingBall />
        </div>
      </Container>
    )
  } else {
    if (profile) {
      contRender = (
        <>
          <Card>
            <Card.Body>
              <h2 className="text-center mb-4 teste-profile">
                Profile Aprovado
              </h2>
              {error && <Alert variant="danger">{error}</Alert>}
              <strong>Email:</strong> {currentUser.email}
              <Link to="/update-profile" className="btn btn-primary w-100 mt-3">
                Atualizar Perfil
              </Link>
              <Link to="/signup" className="btn btn-primary w-100 mt-3">
                Novo usuario
              </Link>
            </Card.Body>
          </Card>
          <div className="w-100 text-center mt-2">
            <Button variant="link" onClick={handleLogout}>
              Sair
            </Button>
          </div>
        </>
      )
    } else {
      contRender = (
        <>
          <Card>
            <Card.Body>
              <h2 className="text-center mb-4 teste-profile">Profile</h2>
              {error && <Alert variant="danger">{error}</Alert>}
              <strong>Email:</strong> {currentUser.email}
              <Link to="/update-profile" className="btn btn-primary w-100 mt-3">
                Atualizar Perfil
              </Link>
              <Link to="/signup" className="btn btn-primary w-100 mt-3">
                Novo usuario
              </Link>
            </Card.Body>
          </Card>
          <div className="w-100 text-center mt-2">
            <Button variant="link" onClick={handleLogout}>
              Sair
            </Button>
          </div>
        </>
      )
    }
  }

  return <React.Fragment>{contRender}</React.Fragment>
}
