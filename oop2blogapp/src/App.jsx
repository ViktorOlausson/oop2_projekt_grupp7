import { useState } from 'react'
import './index.css'
import Header from './components/Header'
import { Outlet } from 'react-router-dom'


function App() {
  const [count, setCount] = useState(0)

  return (
    <div className='min-h-dvh flex bg-primary'>
      <div className='w-full'>
        <Header/>
        <main className='flex flex-col pt-0.5 min-h-[95%] bg-orange-700'> {/* body bg-orange-700*/}
          <Outlet/>
        </main>
      </div>
    </div>
    // <h1 className="text-3xl font-bold underline">
    //   Hello world!
    // </h1>
  )
}

export default App
