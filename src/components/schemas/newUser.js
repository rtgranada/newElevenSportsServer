import * as yup from 'yup'

yup.setLocale({
  mixed: {
    required: 'Campo obrigatório',
  },
  string: {
    email: 'Digite um e-mail válido',
  },
})

export const newUserSchema = yup.object().shape({
  email: yup.string().required().email(),
  password: yup.string().required(),
  passwordConfirmation: yup.string().required(),
  firstName: yup.string().required(),
  lastName: yup.string().required(),
  type: yup.string().required(),
})
