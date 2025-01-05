import React from 'react'

// Reusable card initializes as card used in login/signup
// Property children makes it so the card can be used to wrap other things
// Use property margin to change the margin, initializes with auto X margin
// Use property bg to change the background, initializes #f3f4f6(very light gray)
// Use property pad to change the padding, initializes with 40px
// Use property shadow to change the to change the box shadow, initializes to a custom box shadow set in tailwind.config.js 
// Use property width to change the width of the card, initializes to 640px
// Use property height to change the height of the card, initializes to 800px
// Use property br to change the border radius, initializes to rounded-xl(12px)
// Use property className to any other classes to the card, initializes empty
// Use property props to pass any other property

function Card({children, margin="mx-auto", bg="bg-gray-100", pad="", shadow="shadow-card", width="w-[640px]", height="h-[800px]", br="rounded-xl", className="", ...props}) {
  return (
    <div className={`${margin} ${bg} ${pad} ${shadow} ${width} ${height} ${br} ${className}`} {...props}>
        {children}
    </div>
  )
}

export default Card