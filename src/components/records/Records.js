import React, { useState, useEffect } from 'react'
import { Container, Card } from 'react-bootstrap'
import { LoadingBall } from '../style/loadingBall'
import Signup from '../auth/Signup'
import Signup2 from '../auth/Signup2'

export default function Records() {
  const [error, setError] = useState('')

  const [timer, setTimer] = useState(false)

  let body

  // useEffect(() => {
  //   setTimer(true)

  //   setTimeout(() => setTimer(false), 3000)
  // }, [])

  if (timer) {
    body = (
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
    body = (
      <>
        <h1 className="text-center">Cadastros</h1>
        <Card>
          <Card.Body>
            <h2 className="text-center mb-4 teste-profile">Usuario</h2>
            <Signup2 />
          </Card.Body>
        </Card>
        <Card>
          <Card.Body>
            <h2 className="text-center mb-4 teste-profile">Quadras</h2>
          </Card.Body>
        </Card>
        <Card>
          <Card.Body>
            <h2 className="text-center mb-4 teste-profile">Churrasqueiras</h2>
          </Card.Body>
        </Card>
      </>
    )
  }

  return <React.Fragment>{body}</React.Fragment>
}
