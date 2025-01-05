import React from 'react'

// Reusable container
// Property children makes it so the card can be used to wrap other things
// Use property className to any other classes to the card, initializes empty
// Use property maxWidth to change the max width of the card, initializes to 1280px
// Use property paddingX to change the padding in X direction, initializes with 16px
// Use property paddingY to change the padding in Y direction, initializes empty

function Container({children, className = '', maxWidth = "max-w-7xl", paddingX = "px-4", paddingY = ""}) {
    return (
      <div className={`w-full ${className} ${maxWidth} ${paddingX}`}>{children}</div>
    )
  }
  
  export default Container