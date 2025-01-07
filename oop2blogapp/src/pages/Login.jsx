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

  const buttonStyle = 
  "h-[30px] w-[250px] mb-[15px] font-medium text-black duration-500 shadow-md shadow-black bg-blue-500 rounded-lg hover:bg-blue-900 hover:text-white hover:shadow-none"

  const forgotPasswordNav = "/notYetImplemented"
  const createAccountNav = "/notYetImplemented"

  return (
    <div className='py-8'>
      <div className="flex items-center justify-center h-full">
        <Card className='flex flex-col items-center'>
          
          <div className='flex w-full items-center justify-center h-[85px] bg-gray-300 rounded-t-xl shadow-md shadow-gray-400'> {/* Heading div */}
            <h2 className="text-3xl font-bold leading-tight">Log In</h2>
          </div>

          <form action="" onSubmit={handleSubmit(login)} className='mt-[150px]'>
            <div className='flex flex-col h-[165px] w-[520px] justify-between'> {/* Input div */}
              <Input className="shadow-sm shadow-black focus:shadow-none focus:border-gray-400 duration-300" label="Email: " placeholder="Email Address" type="email" {...register("email", {required: true,})}/>
              <Input className="shadow-sm shadow-black focus:shadow-none focus:border-gray-400 duration-300" label="Password: " type="password" placeholder="Password" {...register("password", { required: true })}/>
            </div>

            <div className='h-full w-full mt-3 flex flex-col items-center justify-end'>  {/* Button div */}
              <Button className={`${buttonStyle}`} padding='' onClick={() => navigate(forgotPasswordNav)}> Forgot Password </Button>
              <Button className={`${buttonStyle}`} padding='' onClick={() => navigate(createAccountNav)}> Create Account </Button>

              <Button className={`${buttonStyle} w-[400px] h-20 text-4xl font-bold mb-5 rounded`} padding='' type="submit"> Log In </Button>
            </div>
          </form>
          

        </Card>
      </div>
    </div>
  )
}

export default Login