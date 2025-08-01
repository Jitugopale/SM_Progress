import React from 'react'
import { Link } from 'react-router-dom'

const Sidebar = () => {
  return (
    <div className='sidebar w-64 min-h-screen bg-white shadow-lg border-r'>
      <div className="p-4">
        <h2 className="font-bold text-gray-800">Sidebar</h2>
        <ul>
            <li>
                <Link to="#">Users</Link>
            </li>
            <li>
                <Link to="#">Users</Link>
            </li>
            <li>
                <Link to="#">Users</Link>
            </li>
            <li>
                <Link to="#">Users</Link>
            </li>
            <li>
                <Link to="#">Users</Link>
            </li>
            <li>
                <Link to="#">Users</Link>
            </li>
        </ul>
      </div>
    </div>
  )
}

export default Sidebar