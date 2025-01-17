import { useState } from 'react'
import './index.css'
import Header from './components/Header'
import { Outlet } from 'react-router-dom'


function App() {

  return (
    <div className='min-h-dvh flex bg-[#d3d3d3]'>
      <div className='w-full'>
        <Header/>
        <main className='flex flex-col pt-0.5 min-h-[95%] '> {/* body bg-orange-700*/}
          <Outlet/>
        </main>
      </div>
    </div>
  )
}

export default App
