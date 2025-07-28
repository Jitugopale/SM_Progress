import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from './UsersDashboard/Navbar'
import Sidebar from './UsersDashboard/Sidebar';

const MainPage = () => {
  return (
    <>
      <Navbar />
      <div className='flex'>
        <Sidebar/>
        <Outlet />
      </div>
    </>
  );
}

export default MainPage
