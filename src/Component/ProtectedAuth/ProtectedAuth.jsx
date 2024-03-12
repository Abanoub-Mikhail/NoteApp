import React from 'react'
import { Navigate } from 'react-router-dom'

export default function ProtectedAuth(props) {
    if (localStorage.getItem("noteToken")) {
        return <Navigate to={'/home'}/>
        
      }else {
        return props.children
      }
}

