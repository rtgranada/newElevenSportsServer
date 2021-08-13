import React, { useRef, useState } from 'react'
import { useForm, Controller } from 'react-hook-form'
import {
  TextField,
  Button,
  InputAdornment,
  IconButton,
} from '@material-ui/core'

import VisibilityIcon from '@material-ui/icons/Visibility'
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff'
import { Card } from '@material-ui/core'
import { useAuth } from '../../contexts/AuthContext'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import { yupResolver } from '@hookform/resolvers/yup'
import { loginSchema } from '../schemas/auth'
import { LoginStyledForm } from '../style/forms/loginForm'

export default function Login() {
  const emailRef = useRef()
  const passwordRef = useRef()
  const { login } = useAuth()
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const handleClickShowPassword = () => setShowPassword(!showPassword)
  const handleMouseDownPassword = () => setShowPassword(!showPassword)

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(loginSchema),
  })

  const onSubmit = async ({ email, password }) => {
    try {
      await login(email, password)
    } catch (error) {
      toast.error('Usuário ou senha inválidos')
      console.log(error)
    }
  }

  return (
    <Card variant="outlined">
      <h1>Login</h1>
      <LoginStyledForm onSubmit={handleSubmit(onSubmit)} className="loginForm">
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

        <Button type="submit" variant="outlined" color="primary">
          Logar
        </Button>
      </LoginStyledForm>
      <Link to="/forgot-password">Esqueceu a senha?</Link>
    </Card>
    // <>
    //   <Card>
    //     <Card.Body>
    //       <h2 className="text-center mb-4">Entrar</h2>
    //       {error && <Alert variant="danger">{error}</Alert>}
    //       <Form onSubmit={handleSubmit}>
    //         <Form.Group id="email">
    //           <Form.Label>Email</Form.Label>
    //           <Form.Control type="email" ref={emailRef} required />
    //         </Form.Group>
    //         <Form.Group id="password">
    //           <Form.Label>Senha</Form.Label>
    //           <Form.Control type="password" ref={passwordRef} required />
    //         </Form.Group>
    //         <Button disabled={loading} className="w-100" type="submit">
    //           Entrar
    //         </Button>
    //       </Form>
    //       <div className="w-100 text-center mt-3">
    //         <Link to="/forgot-password">Esqueceu a senha?</Link>
    //       </div>
    //     </Card.Body>
    //   </Card>
    //   <div className="w-100 text-center mt-2">
    //     Para cadastrar <Link to="/signup">clique aqui!</Link>
    //   </div>
    // </>
  )
}
