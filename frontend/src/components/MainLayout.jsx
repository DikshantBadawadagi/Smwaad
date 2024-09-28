<<<<<<< HEAD
import React from 'react'
import { Outlet } from 'react-router-dom'
import LeftSidebar from './LeftSidebar'

const MainLayout = () => {
  return (
    <div>
         <LeftSidebar/>
        <div>
            <Outlet/>
        </div>
    </div>
  )
}

=======
import React from 'react'
import { Outlet } from 'react-router-dom'
import LeftSidebar from './LeftSidebar'

const MainLayout = () => {
  return (
    <div>
         <LeftSidebar/>
        <div>
            <Outlet/>
        </div>
    </div>
  )
}

>>>>>>> 6fa5ee436a07f107cb4d29c67bd2626acd18c259
export default MainLayout