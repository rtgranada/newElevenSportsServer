import React, { useState, useEffect } from 'react'
import { Container, Card, Button, Alert } from 'react-bootstrap'
import { useAuth } from '../../contexts/AuthContext'

import { Link, useHistory } from 'react-router-dom'
import { getUser } from '../../services/user'
import { Loading } from '../style/loading'
import { LoadingBall } from '../style/loadingBall'

export default function Profile() {
  const [error, setError] = useState('')
  const { currentUser, logout } = useAuth()
  const [timer, setTimer] = useState(false)
  const [loading, setLoading] = useState('')
  const history = useHistory()
  const usuario = getUser()

  let novoteste
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
    novoteste = (
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
    novoteste = (
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

  return <React.Fragment>{novoteste}</React.Fragment>
}
