import React, { useContext, useState, useEffect } from 'react'
import { auth } from '../firebase'

const AuthContext = React.createContext()

export function useAuth() {
  return useContext(AuthContext)
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState()
  const [loading, setLoading] = useState(true)
  const [categories, setCategories] = useState([]);
  const [searchResponse, setSearchResponse] = React.useState([])
  const [categoryIdData, setCategoryIdData] = React.useState("")
  const [currentPage, setCurrentPage] = React.useState(1)
  const [documentCount, setDocumentCount] = React.useState(0);

  function signup(email, password) {
  return auth.createUserWithEmailAndPassword(email, password)
  }

  function login(email, password) {

    return auth.signInWithEmailAndPassword(email, password)
  }

  function logout() {
    setCurrentUser("")
    setCategories([])
    console.log("user signed out");
    return auth.signOut()
  }

  function resetPassword(email) {
    return auth.sendPasswordResetEmail(email)
  }

  useEffect(() => { 
    const unsubscribe = auth.onAuthStateChanged(user => {
      // console.log("logged user", user._delegate.accessToken);
      // console.log("logged user", user);
      // const newUser = user._delegate.accessToken
      setCurrentUser(user)
      setLoading(false)
      // return newUser
    })

    return unsubscribe
  }, [])


  const value = {
    documentCount,
    setDocumentCount,
    currentPage,
    setCurrentPage,
    categoryIdData,
    setCategoryIdData,
    searchResponse,
    setSearchResponse,
    currentUser,
    signup,
    login,
    logout,
    resetPassword,
    categories,
    setCategories
  }

  return (
    <AuthContext.Provider value={value}>
      { !loading && children }
    </AuthContext.Provider>
  )
}

// 6251c8f37f1ba673355a1f54