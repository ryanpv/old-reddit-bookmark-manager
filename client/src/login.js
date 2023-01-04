import React, { useRef, useState, useContext } from 'react'
import { Button, Card, Form, Alert } from 'react-bootstrap';
import { useAuth } from 'contexts/AuthContext';
import { Link, useHistory } from 'react-router-dom';
import { auth } from './firebase';


export default function Login() {
  const emailRef = useRef()
  const passwordRef = useRef()
  const clientid = 'aB3skwrem_otJPlHcxu5IQ';

  const { login, currentUser } = useAuth()
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false) // good ux pattern???
  const history = useHistory();

  // const realmApp = new Realm.App({ id: process.env.REACT_APP_REALM_APP_ID })
  // const { user, setUser } = useContext(UserContext)
  // console.log("loginjs", currentUser);

  async function handleSubmit(e) {
    e.preventDefault()

    try {
      setError('')
      setLoading(true)
      await login(emailRef.current.value, passwordRef.current.value)

      // await auth.currentUser.getIdToken().then(function(idToken) {
      //   // console.log(`User Token: ${idToken}`);
      //   // loginCustomJwt(idToken)
      //   setUser(idToken)
        
      // })
      // openLogin()

      history.push('/admin/profile')
    } catch {
      setError('Failed to sign in')
      passwordRef.current.value = null
    }
    setLoading(false)
    emailRef.current.value = null
    passwordRef.current.value = null

  }
  


  return (
    <>{currentUser ? <h2>Logged in as {currentUser.email}</h2> :
    
      <Card>
        <Card.Body>
          <h2 className='text-center mb-4'>Log In</h2>
          {error && <Alert variant='danger'>{error}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group id="email">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" ref={emailRef} required />
            </Form.Group>
            <Form.Group id="password">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" ref={passwordRef} required />
            </Form.Group>

            <Button variant="outline-primary" disabled={loading} className='w-100 mt-2' type='submit'>Log In</Button>
          </Form>

          <div className='w-100 text-center mt-3'>
            <Link to="/admin/forgot-password">Forgot Password?</Link> 
          </div>

        </Card.Body>
      </Card>
      }

      { currentUser ? null : 
      <div className='w-100 text-center mt-2'>
        Need an account? <Link to='/admin/signup'>Sign up</Link>
      </div>
      }
    </>
  )
}

