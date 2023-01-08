import React, { useRef, useState } from 'react'
import { Button, Card, Form, Alert } from 'react-bootstrap';
import { useAuth } from 'contexts/AuthContext';
import { Link } from 'react-router-dom';


export default function ForgotPassword() {
  const emailRef = useRef()


  const { resetPassword, currentUser } = useAuth()
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState("")
  

  async function handleSubmit(e) {
    e.preventDefault()

    try {
      setError('')
      setLoading(true)
      await resetPassword(emailRef.current.value)
      setMessage('Check email inbox for password reset instructions')
    } catch {
      setError('Failed to reset password')

    }
    setLoading(false)
    emailRef.current.value = null

  }
  
  return(
<>
      <Card>
        <Card.Body>
          <h2 className='text-center mb-4'>Reset Password</h2>
          {error && <Alert variant='danger'>{error}</Alert>}
          {message && <Alert variant='success'>{message}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group id="email">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" ref={emailRef} required />
            </Form.Group>

            <Button variant="outline-primary" disabled={loading} className='w-100' type='submit'>Reset Password</Button>
          </Form>
          <div className='w-100 text-center mt-3'>
            <Link to="/admin/login">Back to Login</Link> 
          </div>

        </Card.Body>
      </Card>
  


      <div className='w-100 text-center mt-2'>
        Need an account? <Link to='/admin/signup'>Sign up</Link>
      </div>
    
  </>
)
}


// export const login = async () => {
//   return{
//     id: 1,
//     username: "bubba",
//     email: "bubba@bubbaG.com"
//   };
// };