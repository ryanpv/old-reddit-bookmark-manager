import React, { useState } from "react";
// react-bootstrap components
import {
  Button,
  Card,
  Alert,
} from "react-bootstrap";
import { useAuth } from "contexts/AuthContext";
import { Link, Redirect, useHistory } from "react-router-dom";


function UserProfile() {
  const [error, setError] = useState("")
  const { currentUser, logout } = useAuth()
  const history = useHistory();


  async function handleLogout(e) {
    e.preventDefault()
    setError('')

    try {
      await logout()
      history.push('/admin/login')
    } catch {
      setError('failed to log out')
    }
  }

  return (
    <>
    { currentUser ? 
      <Card>
        <Card.Body>
          <h2 className="text-center mb-4">PROFILE</h2>
          { error && <Alert variant="danger">{error}</Alert>}
          Welcome <strong>User: { currentUser.email.split('@')[0] }</strong>
          {/* <Link to="/update-profile" className="btn btn-primary w-100 mt-3">
            Update Profile
          </Link> */}
        </Card.Body>
      </Card>
        : <Redirect to="/admin/login" /> 
        }
      <div className="w-100 text-center mt-2">
        <Button variant="danger" onClick={handleLogout}>Log Out</Button>
        {/* ********REVOKE REDDIT ACCESS_TOKEN ON LOGOUT ALSO FOR EXTRA SECURITY*********** */}
      </div>

      </>)}

export default UserProfile;