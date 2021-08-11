import React, { useRef, useState, useEffect } from 'react'
import { Form, Button, Card, Alert } from 'react-bootstrap'
import { useAuth } from '../../contexts/AuthContext'
import { Link, useHistory } from 'react-router-dom'
import { getUser } from '../../services/user'

export default function Signup() {
  const emailRef = useRef()
  const passwordRef = useRef()
  const passwordConfirmRef = useRef()
  const firstNameRef = useRef()
  const lastNameRef = useRef()
  const typeRef = useRef()
  const { signup } = useAuth()
  const [error, setError] = useState('')
  const [allow, setAllow] = useState(true)
  const [loading, setLoading] = useState(false)
  const history = useHistory()
  const usuario = getUser()

  console.log(usuario)

  useEffect(() => {
    console.log(allow)
    if (usuario && usuario.type === 'administrator') {
      setAllow(false)
    }
  }, [usuario, allow])

  async function handleSubmit(e) {
    e.preventDefault()

    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError('Passwords do not match')
    }

    const newUser = {
      email: emailRef.current.value,
      password: passwordRef.current.value,
      firstName: firstNameRef.current.value,
      lastName: lastNameRef.current.value,
      type: typeRef.current.value,
    }

    try {
      setError('')
      setLoading(true)
      await signup(newUser)
      history.push('/')
    } catch {
      setError('Failed to create an account')
    }

    setLoading(false)
  }

  return (
    <>
      <Card>
        <Card.Body>
          <h2 className="text-center mb-4">Cadastrar</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="email">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" ref={emailRef} required />
            </Form.Group>
            <Form.Group controlId="password">
              <Form.Label>Senha</Form.Label>
              <Form.Control type="password" ref={passwordRef} required />
            </Form.Group>
            <Form.Group controlId="password-confirm">
              <Form.Label>Confirmar senha</Form.Label>
              <Form.Control type="password" ref={passwordConfirmRef} required />
            </Form.Group>
            <Form.Group controlId="firstname">
              <Form.Label>Nome</Form.Label>
              <Form.Control type="text" ref={firstNameRef} required />
            </Form.Group>
            <Form.Group controlId="lastname">
              <Form.Label>Sobrenome</Form.Label>
              <Form.Control type="text" ref={lastNameRef} required />
            </Form.Group>
            <Form.Group controlId="type" hidden={allow}>
              <Form.Label>Tipo</Form.Label>
              <Form.Select ref={typeRef} defaultValue="user" disabled={allow}>
                <option value="user">Usuario</option>
                <option value="teacher">Professor</option>
                <option value="administrator">Administrador</option>
              </Form.Select>
            </Form.Group>

            <Button disabled={loading} className="w-100" type="submit">
              Cadastrar
            </Button>
          </Form>
        </Card.Body>
      </Card>
      <div className="w-100 text-center mt-2">
        Já tem uma conta? <Link to="/login">Entrar</Link>
      </div>
    </>
  )
}
