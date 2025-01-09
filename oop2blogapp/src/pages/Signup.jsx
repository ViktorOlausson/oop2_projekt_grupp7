import React, {useState} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import authService from '../appwrite/auth'
import { login as authLogin } from '../Store/authSlice'
import Button from '../components/Button'
import Input from '../components/Input'
import Card from '../components/Card'


const buttonStyle = "w-[250px] mb-[15px] font-medium text-black duration-500 shadow-md shadow-black bg-blue-500 rounded-lg hover:bg-blue-900 hover:text-white hover:shadow-none"

const forgotPasswordNav = "/notYetImplemented"
const haveAccountNave = "/login"

function Signup() {

  const navigate = useNavigate()
  const [error, setError] = useState("")
  const dispatch = useDispatch()
  const {register, handleSubmit} = useForm()

  return (
    <div className='py-8'>
      <div className="flex items-center justify-center h-full">
        <Card className='flex flex-col items-center relative'>
          
          <div className='flex w-full items-center justify-center h-[85px] bg-gray-300 rounded-t-xl shadow-md shadow-gray-400'> {/* Heading div */}
            <h2 className="text-3xl font-bold leading-tight">Sign Up</h2>
          </div>

          <form action="" className='mt-20 h-full relative'>
            <div className='flex flex-col h-[165px] w-[520px] justify-between'> {/* Input div */}
              <Input className="mb-4 shadow-sm shadow-black focus:shadow-none focus:border-gray-400 duration-300" label="Email: " placeholder="Email@Address.com" type="email" {...register("email", {required: true,})}/>
              <Input className="shadow-sm shadow-black focus:shadow-none focus:border-gray-400 duration-300 mb-16" label="Username: " type="username" placeholder="UserName" {...register("password", { required: true })}/>
            
              <Input className="mb-4 shadow-sm shadow-black focus:shadow-none focus:border-gray-400 duration-300" label="Password: " placeholder="Password" type="password" {...register("email", {required: true,})}/>
              <Input className="shadow-sm shadow-black focus:shadow-none focus:border-gray-400 duration-300" label="Repeat Password: " type="password" placeholder="Repeat Password" {...register("password", { required: true })}/>
              <div className='flex flex-row mt-8'>
                <input type="checkbox" />
                <p>Do you accept the <Link className='underline text-blue-500' to="/notYetImplemented">terms and conditions</Link>?</p>
              </div>
              
            </div>

            <div className='w-full mt-3 flex flex-col items-center justify-end absolute bottom-5 left-0'>  {/* Button div */}
              {/* <Button className={`${buttonStyle} h-[30px]`} padding='' onClick={() => navigate(forgotPasswordNav)}> Forgot Password </Button>  */} {/* Sign up med annat???? */}
              <Button className={`${buttonStyle} h-[30px] mb-[15px]`} padding='' onClick={() => navigate(haveAccountNave)}> Already have an account? </Button>

              <Button className={`w-[400px] h-20 text-4xl font-bold ${buttonStyle} `} padding='' type="submit"> Sign Up </Button>
            </div>
          </form>
          

        </Card>
      </div>
    </div>
  )
}

export default Signup