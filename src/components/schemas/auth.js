import * as yup from 'yup'

yup.setLocale({
  mixed: {
    required: 'Campo obrigatório',
  },
  string: {
    email: 'Digite um e-mail válido',
  },
})

export const loginSchema = yup.object().shape({
  email: yup.string().required().email(),
  password: yup.string().required(),
})
