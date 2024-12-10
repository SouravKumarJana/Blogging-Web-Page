import React, { useState, useEffect } from 'react'
import './App.css'
import {useDispatch} from "react-redux"
import authService from './appwrite/auth'
import {login,logout} from "./store/authSlice"
import { Header, Footer } from './components'
import { Outlet } from 'react-router-dom'

function App() {
  
  const [loading, setLoading]=useState(true)
  const dispatch=useDispatch()

  useEffect(()=>{
    authService.getCurrentUser()            //getCurrentUser return a promise {successfull(means already loged in ) or not successful(not till log in)}
      .then((userData)=>{
        if(userData){
          dispatch(login({userData}))           // dispatch(login())  -> for update the information at store
        }
        else{
          dispatch(logout())
        }
      })
      .finally(()=> setLoading(false))
  } , [])

  return !loading ? (                                                // if loading status is false
    <div className='min-h-screen flex flex-wrap content-between bg-gray-400'>
      <div className='w-full block'>
        <Header/>
        <main>
          Let's Blogging... <Outlet/>
        </main>
        <Footer/>
      </div>
    </div>
  ) : null
}

export default App
