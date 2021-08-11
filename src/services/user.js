const TOKEN_KEY = 'token-aplicacao-storage'
const USER = 'nome-aplicacao-storage'

export const isAuthenticated = () => localStorage.getItem(TOKEN_KEY) !== null

export const getToken = () => localStorage.getItem(TOKEN_KEY)

export const login = (token) => {
  localStorage.setItem(TOKEN_KEY, token)
}

export const logoutSair = () => {
  console.log('cheguei no log out')
  localStorage.removeItem(TOKEN_KEY)
  localStorage.removeItem(USER)
  window.location.reload('/login')
}

export const setUser = (data) => localStorage.setItem(USER, data)

export const getUser = () => JSON.parse(localStorage.getItem(USER))

export const removeUser = () => localStorage.removeItem(USER)
