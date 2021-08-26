import * as Yup from 'yup'

const validationSchema = Yup.object().shape({
  firstName: Yup.string().required('Nome é obrigatório'),
  lastName: Yup.string().required('Sobrenome é obrigatório'),
  email: Yup.string().required('Email é obrigatório').email('Email não válido'),
  password: Yup.string()
    .required('Senha é obrigatório')
    .min(6, 'Senha deve ter pelo menos 6 caracteres')
    .max(40, 'Senha não pode passar de 40 caracteres'),
  confirmPassword: Yup.string()
    .required('Confirme a senha')
    .oneOf([Yup.ref('password'), null], 'Senhas não são iguais'),

  //role: Yup.string().required('Tipo é obrigatório'),
})

export default validationSchema
