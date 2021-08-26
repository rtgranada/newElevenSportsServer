import React, { Fragment, useState } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { useAuth } from '../../contexts/AuthContext'
import { InputAdornment, IconButton } from '@material-ui/core'
import Visibility from '@material-ui/icons/Visibility'
import VisibilityOff from '@material-ui/icons/VisibilityOff'
import { toast } from 'react-toastify'
import { yupResolver } from '@hookform/resolvers/yup'
import * as Yup from 'yup'
import validationSchema from '../schemas/newUser2'

import {
  Paper,
  Box,
  Grid,
  TextField,
  Typography,
  FormControlLabel,
  Checkbox,
  Button,
  InputLabel,
  Select,
  RadioGroup,
} from '@material-ui/core'

export default function Signup2() {
  const { signup } = useAuth()
  const [error, setError] = useState('')
  const [type, setType] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [showCPassword, setShowCPassword] = useState(false)
  const handleClickShowPassword = () => setShowPassword(!showPassword)
  const handleClickShowCPassword = () => setShowCPassword(!showCPassword)
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  })

  const onSubmit = async (data) => {
    if (data.type === null || data.type === undefined) {
      data.type = 'user'
    }

    try {
      await signup(data)
      toast.success(`${data.firstName} cadastrado com sucesso`)
    } catch (error) {
      toast.error('Usuário ou senha inválidos')
      console.log(error)
    }

    console.log(data)
    console.log(JSON.stringify(data, null, 2))
  }

  return (
    <Fragment>
      <Paper>
        <Box px={3} py={2}>
          <Grid container spacing={1}>
            <Grid item xs={12} sm={12}>
              <TextField
                required
                id="firstName"
                name="firstName"
                label="Nome"
                fullWidth
                margin="dense"
                {...register('firstName')}
                error={errors.firstName ? true : false}
              />
              <Typography variant="inherit" color="textSecondary">
                {errors.firstName?.message}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                id="lastName"
                name="lastName"
                label="Sobrenome"
                fullWidth
                margin="dense"
                {...register('lastName')}
                error={errors.lastName ? true : false}
              />
              <Typography variant="inherit" color="textSecondary">
                {errors.lastName?.message}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                id="email"
                name="email"
                label="Email"
                fullWidth
                margin="dense"
                {...register('email')}
                error={errors.email ? true : false}
              />
              <Typography variant="inherit" color="textSecondary">
                {errors.email?.message}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                id="password"
                name="password"
                label="Senha"
                type={showPassword ? 'text' : 'password'}
                fullWidth
                margin="dense"
                {...register('password')}
                InputProps={{
                  // <-- This is where the toggle button is added.
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                      >
                        {showPassword ? <Visibility /> : <VisibilityOff />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                error={errors.password ? true : false}
              />
              <Typography variant="inherit" color="textSecondary">
                {errors.password?.message}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                id="confirmPassword"
                name="confirmPassword"
                label="Confirmar Senha"
                type={showCPassword ? 'text' : 'password'}
                fullWidth
                margin="dense"
                {...register('confirmPassword')}
                InputProps={{
                  // <-- This is where the toggle button is added.
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowCPassword}
                      >
                        {showCPassword ? <Visibility /> : <VisibilityOff />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                error={errors.confirmPassword ? true : false}
              />
              <Typography variant="inherit" color="textSecondary">
                {errors.confirmPassword?.message}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <InputLabel htmlFor="age-native-simple">Tipo</InputLabel>
              <Select
                native
                fullWidth
                label="Tipo"
                defaultValue={'user'}
                {...register('type')}
              >
                <option value="user">Usuario</option>
                <option value="teacher">Professor</option>
                <option value="administrator">Administrador</option>
              </Select>
              <Typography variant="inherit" color="textSecondary">
                {errors.type?.message}
              </Typography>
            </Grid>
          </Grid>

          <Box mt={3}>
            <Button
              variant="contained"
              color="primary"
              onClick={handleSubmit(onSubmit)}
            >
              Registrar
            </Button>
          </Box>
        </Box>
      </Paper>
    </Fragment>
  )
}
