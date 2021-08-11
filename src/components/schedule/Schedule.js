import React, { useState, useEffect } from 'react'
import { Container, Card } from 'react-bootstrap'
import { LoadingBall } from '../style/loadingBall'

export default function Schedule() {
  const [error, setError] = useState('')

  const [timer, setTimer] = useState(false)

  let body

  useEffect(() => {
    setTimer(true)

    setTimeout(() => setTimer(false), 3000)
  }, [])

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
        <h1 className="text-center">Agenda</h1>
        <Card>
          <Card.Body>
            <h2 className="text-center mb-4 teste-profile">Areia</h2>
          </Card.Body>
        </Card>
        <Card>
          <Card.Body>
            <h2 className="text-center mb-4 teste-profile">Padel</h2>
          </Card.Body>
        </Card>
        <Card>
          <Card.Body>
            <h2 className="text-center mb-4 teste-profile">Churrasqueira</h2>
          </Card.Body>
        </Card>
      </>
    )
  }

  return <React.Fragment>{body}</React.Fragment>
}
