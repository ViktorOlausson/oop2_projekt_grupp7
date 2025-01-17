import React from 'react'
import { useDispatch } from 'react-redux'
import authService from '../appwrite/auth'
import { logout } from '../Store/authSlice'
import Button from './Button'

const buttonStyle = "h-full flex items-center duration-300 text-black"
const buttonPadding = "px-3"
const buttonColor = ""

function LogoutBtn() {
    const dispatch = useDispatch()

    const logoutHandler = () => {
        authService.logout().then(() => {
            dispatch(logout)
        })
    }

  return (
    <Button className={`${buttonStyle} `} bgColor={buttonColor} padding={buttonPadding} onClick={logoutHandler}>
        <p className='mx-1.5 font-semibold'>Logout</p>
    </Button>
  )
}

export default LogoutBtn