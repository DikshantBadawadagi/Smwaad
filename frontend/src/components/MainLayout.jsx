import React from 'react'
import { Outlet } from 'react-router-dom'
import LeftSidebar from './LeftSidebar'

const MainLayout = () => {
  return (
    <div className='bg-gradient-to-b from-purple-50 to-indigo-50'>
         <LeftSidebar/>
        <div>
            <Outlet/>
        </div>
    </div>
  )
}

export default MainLayout