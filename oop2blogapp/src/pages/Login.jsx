import React, {useState} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import authService from '../appwrite/auth'
import { login as authLogin } from '../store/authSlice'
import Button from '../components/Button'
import Input from '../components/Input'

function Login() {

  const navigate = useNavigate()
  const [error, setError] = useState("")
  const dispatch = useDispatch()
  const {register, handleSubmit} = useForm()

  const login = async(data) => {
    setError("")
    try{
      const session = await authService.login(data)
      if (session){
        const userData = await authService.getCurrentUser
        if(userData){
          dispatch(authLogin({userData}))
          navigate("/")
        }
      }
    } catch(error){ // fix better error handeling with handeling for if an user does not exist etc
      setError(error)
    }
  }

  return (
    <div>Login</div>
  )
}

export default Login