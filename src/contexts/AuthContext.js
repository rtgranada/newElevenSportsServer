import React, { useContext, useState, useEffect } from 'react'
import { auth } from '../firebase'
import firebase from 'firebase/app'
import 'firebase/firestore'
import { setUser, logoutSair } from '../services/user'
import { useHistory } from 'react-router-dom'
import { toast } from 'react-toastify'

const AuthContext = React.createContext()

export function useAuth() {
  return useContext(AuthContext)
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState()
  const [testando, setTestando] = useState()
  const history = useHistory()
  const [loading, setLoading] = useState(false)

  const signup = async (newUser) => {
    console.log('signup', newUser)
    let todo = `${newUser.firstName} ${newUser.lastName}`
    const { password, confirmPassword, ...newDataUser } = newUser
    console.log('newDataUser', newDataUser)

    const credential = await auth
      .createUserWithEmailAndPassword(newUser.email, newUser.password)
      .then(function (result) {
        console.log('resultado', result)
        return result.user
          .updateProfile({
            displayName: todo,
          })
          .then(() => {
            const user = firebase.auth().currentUser
            console.log('teste', user)
            const newUser = firebase
              .firestore()
              .collection('users')
              .doc(user.uid)
              .set(newDataUser)

            console.log('neeww', newUser)
          })
      })

    // try {
    //   const credential = await auth.createUserWithEmailAndPassword(
    //     newUser.email,
    //     newUser.password
    //   )
    // } catch (err) {
    //   console.log('error', err)
    // }

    // try {
    //   const credential = await auth
    //     .createUserWithEmailAndPassword(newUser.email, newUser.password)
    //     .then(function (result) {
    //       console.log('resultado', result)
    //       return result.user
    //         .updateProfile({
    //           displayName: todo,
    //         })
    //         .then(() => {
    //           const user = firebase.auth().currentUser
    //           console.log('teste', user)
    //           return firebase
    //             .firestore()
    //             .collection('users')
    //             .doc(user.uid)
    //             .set(newDataUser)
    //         })
    //     })
    // } catch {
    //   console.log('Algo errado')
    // }
  }

  function login(email, password) {
    return auth
      .signInWithEmailAndPassword(email, password)
      .then(async (user) => {
        console.log('user', user.user.uid)
        if (user) {
          try {
            const documentSnapshot = await firebase
              .firestore()
              .collection('users')
              .doc(user.user.uid)
              .get()
            let bdUser = documentSnapshot.data()
            if (bdUser.type !== 'user') {
              setCurrentUser({ bdUser, ...user })
              toast.success(`Bem vindo ${bdUser.firstName}`)
              history.push('/profile')
            } else {
              toast.error('Você não tem permissão')
              await logout()
              throw new Error('Você não tem permissão!')
            }
          } catch {
            toast.error('Falha ao tentar entrar')
            console.log('Algo errado')
          }
        }
      })
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

  // useEffect(() => {
  //   const unsubscribe = auth.onAuthStateChanged(async (user) => {
  //     if (user) {
  //       try {
  //         const documentSnapshot = await firebase
  //           .firestore()
  //           .collection('users')
  //           .doc(user.uid)
  //           .get()
  //         let bdUser = documentSnapshot.data()
  //         if (bdUser.type !== 'user') {
  //           setCurrentUser({ bdUser, ...user })
  //           toast.success('Login realizado com sucesso')
  //           history.push('/profile')
  //         } else {
  //           toast.error('Você não tem permissão')
  //           await logout()
  //           throw new Error('Você não tem permissão!')
  //         }
  //       } catch {
  //         toast.error('Falha ao tentar entrar')
  //         console.log('Algo errado')
  //       }
  //     }

  //     setLoading(false)
  //   })

  //   return unsubscribe
  // }, [])

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
