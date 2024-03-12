import axios from 'axios';
import React, { createContext, useState } from 'react'

export let userContext = createContext();

export default function UserContextProvider(props) {

    let [userName , setUserName] = useState('')
    let [token , setToken] = useState(null)



    function signUp(values) {
        return axios.post('https://note-sigma-black.vercel.app/api/v1/users/signUp', values)
    }
    function signin(values) {
        return axios.post('https://note-sigma-black.vercel.app/api/v1/users/signIn', values)
    }





  return <userContext.Provider value={{userName , setUserName ,token , setToken ,signUp , signin }}>
    {props.children}
  </userContext.Provider>
}
