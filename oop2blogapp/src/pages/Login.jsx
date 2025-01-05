import React, {useState} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import authService from '../appwrite/auth'
import { login as authLogin } from '../store/authSlice'
import Button from '../components/Button'
import Input from '../components/Input'
import Card from '../components/Card'

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
    <div className='py-8'>
      <div className="flex items-center justify-center h-full">
        <Card className='flex flex-col items-center'>
          <div className='flex w-full items-center justify-center h-[85px] bg-blue-500'> {/* Heading div */}
            <h2 className="text-3xl font-bold leading-tight">Log In</h2>
          </div>

          <div className='flex flex-col h-[165px] w-[520px] mt-[150px] justify-between bg-orange-500'> {/* Input div */}
            <Input label="Email: " placeholder="Email Address" type="email" {...register("email", {required: true,})}/>
            <Input className="mb-3" label="Password: " type="password" placeholder="Password" {...register("password", { required: true })}/>
          </div>

        </Card>
      </div>
    </div>
  )
}

export default Login