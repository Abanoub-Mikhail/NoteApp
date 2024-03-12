import React, { useContext } from 'react'
import { NavLink } from 'react-router-dom'
import { userContext } from '../../Context/UserContext'

export default function Navbar() {

  let {token , setToken} = useContext(userContext)

  function logout() {
    setToken(null)
    localStorage.removeItem('userToken')
  }

  return (
    <>
   <nav className="navbar navbar-expand-lg bg-body-tertiary fixed-top">
  <div className="container">
    <NavLink className="navbar-brand text-capitalize" to={'/home'} >Note app</NavLink>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon" />
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav ms-auto mb-2 mb-lg-0">

        {token ?<li className="nav-item">
          <button className="btn btn-outline-danger text-capitalize" onClick={logout}>logout</button>
        </li> :
        <>
        <li className="nav-item">
          <NavLink className="nav-link text-capitalize" aria-current="page" to={'/signin'}>signin</NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link text-capitalize" aria-current="page" to={'/register'}>Register</NavLink>
        </li>
        </>
        }

        
        
        <ul>  
        </ul></ul></div>
  </div>
</nav>

    
    </>
  )
}
