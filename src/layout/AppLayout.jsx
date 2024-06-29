import React from 'react'
import { Outlet } from 'react-router-dom'

const AppLayout = () => {
  return (
    <div>
        <main className='min-h-screen container'>
            <Outlet/>
        </main>
        <div className='bg-gray-800 p-10 mt-10 text-center'>
            Made with 💖 by Harsh Tiwari
        </div>
    </div>
  )
}

export default AppLayout