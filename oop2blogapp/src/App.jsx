import { useState } from 'react'
import './App.css'
import Header from './components/Header'
import { Outlet } from 'react-router-dom'


function App() {
  const [count, setCount] = useState(0)

  return (
    <div className='min-h-dvh flex bg-primary'>
      <div className='w-full'>
        <Header/>
        <main className='flex flex-col justify-center pt-0.5 min-h-[95%]'> {/* body bg-orange-700*/}
          <Outlet/>
        </main>
      </div>
    </div>
  )
}

export default App
