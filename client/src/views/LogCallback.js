import React from 'react'
import { useLocation, Redirect } from 'react-router-dom/cjs/react-router-dom.min'

 


export default function LogCallback() {
  const location = useLocation()
  

  React.useEffect(() => {
    const code = `${location.search.split('=')[2]}`

    async function redditToken() {
      const response = await fetch(`http://localhost:4554/log_callback?code=${code}`, {credentials:"include"})

    }
    redditToken()
  })

  return (
    <>
    <div>LogCallback</div>
    <Redirect to="/admin/all-bookmarks" /> 
    </>
  )
}
