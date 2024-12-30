import React from 'react'
import "../index.css"
import Button from './Button'
import Container from './Container'
import { useNavigate, useLocation } from "react-router-dom";

const navItems = [
    {name: "Home", slug: "/"},
  ]

  const buttonStyle = "h-full flex items-center duration-300 text-white hover:bg-button-color hover:text-black"
  const buttonPadding = "px-3"
  const buttonColor = ""


function Header() {

    const navigate = useNavigate()
    const location = useLocation()
    const currentPath = location.pathname
  return (
    <header className='h-12 place-content-center flex sticky top-0 z-50'>
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
                
              </ul>
          
        </nav>
      </Container>
    </header>
  )
}

export default Header