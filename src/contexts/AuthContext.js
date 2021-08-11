import React, { useContext, useState, useEffect } from 'react'
import { auth } from '../firebase'
import firebase from 'firebase/app'
import 'firebase/firestore'
import { setUser, logoutSair } from '../services/user'
import { useHistory } from 'react-router-dom'

const AuthContext = React.createContext()

export function useAuth() {
  return useContext(AuthContext)
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState()
  const [testando, setTestando] = useState()
  const history = useHistory()
  const [loading, setLoading] = useState(true)

  const signup = async (newUser) => {
    let todo = `${newUser.firstName} ${newUser.lastName}`
    const { password, ...newDataUser } = newUser
    console.log('newDataUser', newDataUser)
    try {
      const credential = await auth
        .createUserWithEmailAndPassword(newUser.email, newUser.password)
        .then(function (result) {
          return result.user
            .updateProfile({
              displayName: todo,
            })
            .then(() => {
              const user = firebase.auth().currentUser
              console.log('teste', user)
              return firebase
                .firestore()
                .collection('users')
                .doc(user.uid)
                .set(newDataUser)
            })
        })
    } catch {
      console.log('Algo errado')
    }
  }

  function login(email, password) {
    return auth.signInWithEmailAndPassword(email, password)
  }

  function logout() {
    return auth.signOut().then(logoutSair())
  }

  function resetPassword(email) {
    return auth.sendPasswordResetEmail(email)
  }

  function updateEmail(email) {
    return currentUser.updateEmail(email)
  }

  function updatePassword(password) {
    return currentUser.updatePassword(password)
  }

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        try {
          const documentSnapshot = await firebase
            .firestore()
            .collection('users')
            .doc(user.uid)
            .get()
          let bdUser = documentSnapshot.data()
          if (bdUser.type !== 'user') {
            setCurrentUser({ bdUser, ...user })
            history.push('/profile')
          } else {
            await logout()
            history.push('/login')
          }
        } catch {
          console.log('Algo errado')
        }
      }

      setLoading(false)
    })

    return unsubscribe
  }, [])

  const value = {
    currentUser,
    login,
    signup,
    logout,
    resetPassword,
    updateEmail,
    updatePassword,
  }

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  )
}
