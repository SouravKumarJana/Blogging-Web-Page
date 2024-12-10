import React, {useState, useEffect} from "react"
import {useSelector} from 'react-redux'
import { useNavigate } from "react-router-dom"

export default function Protected({children, authentication= true}){
    const navigate= useNavigate()
    const [loader, setLoader]= useState(true)
    const authSatus= useSelector(state=> state.auth.status)

    useEffect(()=>{
        if(authentication && authSatus!==authentication){       //Here if authentication is true && (authSatus!==authentication -> its condition be true when authStatus be false) authStatus is false  , so dont allow the user to enter the Home page of web.. needed login , so send the user at login page
            navigate("/login")
        }
        else if(!authentication && authSatus!==authentication){  //Here if athentication is not true (means false) && (authSatus!==authentication -> its condition be true when authStatus be true) authStatus is true , allow the user to enter "Home" page of web
            navigate("/")
        }
        setLoader(false)
    },[authSatus,navigate,authentication])

    return(
        loader ? <h1>Loading...</h1> : <>{children}</>
    )
}

