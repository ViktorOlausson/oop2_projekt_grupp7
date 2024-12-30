import React from 'react'
import "../index.css"

function Button({bgColor="bg-button-color", rounded="", textColor="", className="", padding="px-4 py-2", children, ...props}) {
  return (
    <button className={`${padding} ${bgColor} ${rounded} ${textColor} ${className}`} {...props}>{children}</button>
  )
}

export default Button