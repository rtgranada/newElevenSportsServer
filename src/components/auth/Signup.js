import React, { useRef, useState, useEffect } from 'react'
import { useForm, Controller } from 'react-hook-form'
import {
  Card,
  TextField,
  Button,
  InputAdornment,
  IconButton,
  Select,
  MenuItem,
} from '@material-ui/core'
import VisibilityIcon from '@material-ui/icons/Visibility'
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff'

import { useAuth } from '../../contexts/AuthContext'
import { Link, useHistory } from 'react-router-dom'

import { toast } from 'react-toastify'
import { yupResolver } from '@hookform/resolvers/yup'
import { newUserSchema } from '../schemas/newUser'
import { NewUserStyledForm } from '../style/forms/newUserForm'

export default function Signup() {
  const emailRef = useRef()
  const passwordRef = useRef()
  const passwordConfirmRef = useRef()
  const firstNameRef = useRef()
  const lastNameRef = useRef()
  const typeRef = useRef()
  const { currentUser, signup } = useAuth()
  const [error, setError] = useState('')
  const [allow, setAllow] = useState(true)
  const [loading, setLoading] = useState(false)
  const history = useHistory()
  //const usuario = getUser()
  const [showPassword, setShowPassword] = useState(false)
  const handleClickShowPassword = () => setShowPassword(!showPassword)
  const handleMouseDownPassword = () => setShowPassword(!showPassword)
  const [showCPassword, setShowCPassword] = useState(false)
  const handleClickShowCPassword = () => setShowCPassword(!showCPassword)
  const handleMouseDownCPassword = () => setShowCPassword(!showCPassword)

  //console.log(usuario)

  useEffect(() => {
    //console.log(allow)
    if (currentUser && currentUser.bdUser.type === 'administrator') {
      setAllow(false)
    }
  }, [currentUser, allow])

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(newUserSchema),
  })

  const onSubmit = async (dados) => {
    try {
      //console.log('dados', dados)
      await signup(dados)
      history.location.pathname === '/cadastros' && history.push('/')
    } catch (error) {
      toast.error('Usuário ou senha inválidos')
      console.log(error)
    }
  }

  // async function handleSubmit(e) {
  //   e.preventDefault()

  //   if (passwordRef.current.value !== passwordConfirmRef.current.value) {
  //     return setError('Passwords do not match')
  //   }

  //   const newUser = {
  //     email: emailRef.current.value,
  //     password: passwordRef.current.value,
  //     firstName: firstNameRef.current.value,
  //     lastName: lastNameRef.current.value,
  //     type: typeRef.current.value,
  //   }

  //   try {
  //     setError('')
  //     setLoading(true)
  //     await signup(newUser)
  //     history.location.pathname === '/cadastros' && history.push('/')

  //   } catch {
  //     setError('Failed to create an account')
  //   }

  //   setLoading(false)
  // }

  return (
    <>
      <Card variant="outlined">
        {/* <h1>Login</h1> */}
        <NewUserStyledForm
          onSubmit={handleSubmit(onSubmit)}
          className="newUserForm"
        >
          <Controller
            name="email"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <TextField
                label="Email"
                margin="dense"
                variant="outlined"
                type="text"
                error={Boolean(errors.email)}
                helperText={errors.email?.message}
                {...field}
              />
            )}
          />
          <Controller
            name="password"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <TextField
                label="Password"
                margin="dense"
                variant="outlined"
                type={showPassword ? 'text' : 'password'}
                InputProps={{
                  // <-- This is where the toggle button is added.
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                      >
                        {showPassword ? (
                          <VisibilityIcon />
                        ) : (
                          <VisibilityOffIcon />
                        )}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                error={Boolean(errors.password)}
                helperText={errors.password?.message}
                {...field}
              />
            )}
          />
          <Controller
            name="passwordConfirmation"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <TextField
                label="Confirmar Senha"
                margin="dense"
                variant="outlined"
                type={showCPassword ? 'text' : 'password'}
                InputProps={{
                  // <-- This is where the toggle button is added.
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowCPassword}
                        onMouseDown={handleMouseDownCPassword}
                      >
                        {showCPassword ? (
                          <VisibilityIcon />
                        ) : (
                          <VisibilityOffIcon />
                        )}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                error={Boolean(errors.email)}
                helperText={errors.email?.message}
                {...field}
              />
            )}
          />
          <Controller
            name="firstName"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <TextField
                label="Nome"
                margin="dense"
                variant="outlined"
                type="text"
                error={Boolean(errors.firstName)}
                helperText={errors.firstName?.message}
                {...field}
              />
            )}
          />
          <Controller
            name="lastName"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <TextField
                label="Sobrenome"
                margin="dense"
                variant="outlined"
                type="text"
                error={Boolean(errors.lastName)}
                helperText={errors.lastName?.message}
                {...field}
              />
            )}
          />
          <Controller
            name="type"
            control={control}
            defaultValue="user"
            render={({ field }) => (
              <Select name="Type" variant="outlined" {...field}>
                <MenuItem value={'user'}>Usuário</MenuItem>
                <MenuItem value={'teacher'}>Professor</MenuItem>
                <MenuItem value={'administrator'}>Administrador</MenuItem>
              </Select>
            )}
          />

          <Button type="submit" variant="outlined" color="primary">
            Cadastrar
          </Button>
        </NewUserStyledForm>
      </Card>
      {/* <Card>
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
      </Card> */}
      {history.location.pathname === '/cadastros' ? (
        ''
      ) : (
        <div className="w-100 text-center mt-2">
          Já tem uma conta? <Link to="/login">Entrar</Link>
        </div>
      )}
      {/* <div className="w-100 text-center mt-2">
        Já tem uma conta? <Link to="/login">Entrar</Link>
      </div> */}
    </>
  )
}
