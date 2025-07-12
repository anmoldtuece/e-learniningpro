import React from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import logo from '../../Images/logo.svg'

function StudentNavbar({ onLogout }) {
  return (
    <nav className='bg-gradient-to-r from-[#0d1a3a] via-[#0d3a5a] to-[#008280] px-10 py-3 flex justify-between items-center sticky top-0 z-50 shadow-xl'>
      <NavLink to="/">
        <div className='flex items-center gap-3'>
          <img src={logo} className="w-14" alt="" />
          <h1 className='text-2xl text-[#4E84C1] font-bold'>Shiksharthee</h1>
        </div>
      </NavLink>
      <button
        onClick={onLogout}
        className='bg-gradient-to-r from-[#0D199D] to-[#008280] hover:from-[#0D199D]/80 hover:to-[#008280]/80 text-white py-2 px-5 rounded-full transition-all duration-200 flex items-center gap-2 text-sm shadow-md font-semibold'
      >
        Logout
      </button>
    </nav>
  )
}

export default StudentNavbar