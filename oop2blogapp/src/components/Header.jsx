import React from 'react'
import "../index.css"
import Button from './Button'
import Container from './Container'
import LogoutBtn from './LogoutBtn'
import { useNavigate, useLocation } from "react-router-dom";
import { useSelector } from 'react-redux'

const navItems = [
    {name: "Home", slug: "/"},
    {name: "Log In", slug: "/login"},
  ]

  const buttonStyle = "h-full flex items-center duration-300 text-black"
  const buttonPadding = "px-3"
  const buttonColor = ""


function Header() {

    const navigate = useNavigate()
    const location = useLocation()
    let currentPath
    const authStatus = useSelector((state) => state.auth.status)
    if(currentPath == "/signup"){
      currentPath = "/login"
    }else{
      currentPath = location.pathname
    }
      
  return (
    <header className='h-12 place-content-center flex sticky top-0 z-50 bg-slate-400'>
      {/* border frame: border-2 border-border-gray */}
      <Container className='place-content-center h-full' maxWidth='max-w-9xl' paddingX=''>
        <nav className='flex h-full align-middle'>
          <div className='w-1/6 place-content-center'> {/* Logo div */}
          </div>
              <ul className='flex ml-auto'>

                {navItems.map((item) => (
                  <li className='mx-1.5' key={item.name}>
                    <Button className={`${buttonStyle} ${currentPath === item.slug ? "active" : ""}`} bgColor={buttonColor} padding={buttonPadding} 
                    onClick={() => navigate(item.slug)}>
                      <p className='mx-1.5 font-semibold'>{item.name}</p>
                    </Button>
                  </li>
                ))}
                {authStatus &&(
                  <li>
                    <LogoutBtn/>
                  </li>
                )}
                
              </ul>
          
        </nav>
      </Container>
    </header>
  )
}

export default Header