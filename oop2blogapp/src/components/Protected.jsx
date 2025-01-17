import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'


// use for pages that should not be available for non logged in users  
function Protected({children, authentication = true}) {

    const authStatus = useSelector((state) => state.auth.status)
  
    const navigate = useNavigate()
    const [loader, setLoader] = useState(true)
    
    useEffect(() => {
      if(authentication && authStatus !== authentication){
        navigate("/login")
      }else if(!authentication && authStatus !== authentication){
        navigate("/")
      }
      setLoader(false)
    }, [authStatus, authentication, navigate])
  
    return loader ? null : <>{children}</>
  }

export default Protected