import React,{useState} from "react"
import {Link, useNavigate} from "react-router-dom"
import {login as authLogin} from "../store/authSlice"
import {Button, Input, Logo } from "./index"
import { useDispatch } from "react-redux"
import authService  from "../appwrite/auth.js"
import {useForm} from "react-hook-form"             //Here we use React-Hook-Form library (see its syntax at online)

function Login(){
    const navigate = useNavigate()
    const dispatch=useDispatch()
    const {register, handleSubmit} = useForm()
    const [error, setError] = useState("")
    
    const doLogin = async(data)=>{
        setError("")                         //before login , clean the all error
        try {
            const session = await authService.login(data)               //try to execute the login
            if(session){                                                     
                const userData = await authService.getCurrentUser()     // if session executed successfully , then get the data (userData)
                if(userData) dispatch(authLogin(data));
                                                                   // if userData is present then dispath the dalue at store
                navigate("/")                                     //as successfully login accured then send the user to root of web page  (Here we use navigate to shift the web page at the given path without aby clicking .. if We here use "Link" instead of "navigate" , then for shifting a Click is required)
                
            } 
        } catch (error) {
            setError(error.message)
        }
    }

    return (
        <div
        className='flex items-center justify-center w-full'
        >
            <div className={`mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10`}>
                <div className="mb-2 flex justify-center">
                    <span className="inline-block w-full max-w-[100px]">
                        <Logo width="100%" />
                    </span>
                </div>
                <h2 className="text-center text-2xl font-bold leading-tight">Sign in to your account</h2>
                <p className="mt-2 text-center text-base text-black/60">
                        Don&apos;t have any account?&nbsp;
                        <Link
                            to="/signup"
                            className="font-medium text-primary transition-all duration-200 hover:underline"
                        >
                            Sign Up
                        </Link>
                </p>
                {error && <p className="text-red-600 mt-8 ">{error}</p>}    {/* shown error is error is present */}   
                
                <form onSubmit={handleSubmit(doLogin)} className="mt-8">    {/* Here "handleSubmit" take the data from "input" and pass it in loginProcess() function as "data"   ..here no other state management is required*/} 
                    <div className="space-y-5">
                        <Input
                            label="Email: "
                            placeholder="Enter your email"
                            type="email"
                            {...register("email" , {                  //Here "email" is for uniqueness
                                required: true,
                                validate: {
                                    matchPatern: (value)=> /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/          //it is Regular-Expression(reg-exp)for email validation... this exp is written under the slash("/").. it is use for check pattern is match or not ..(this expression is taken from regexr)
                                        .test(value) || "Email address must be a valied address"
                                        
                                }})
                            }
                        />
                        <Input
                            label="password: "
                            type="password"
                            placeholder="Enter your password"
                            {...register("password", {           //Here "password" is for uniqueness 
                                required: true,

                            })}
                        />
                        <Button type="submit" className="w-full">Sign in</Button>
                </div>
                </form>
            </div>
        </div>
    )
}

export default Login;