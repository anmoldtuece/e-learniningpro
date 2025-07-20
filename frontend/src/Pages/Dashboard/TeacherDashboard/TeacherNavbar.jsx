import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import logo from '../../Images/logo.svg';
import { TbLogout } from "react-icons/tb";

function TeacherNavbar() {
  const navigate = useNavigate();

  const Handlelogout = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/teacher/logout`,
        {
          method: 'POST',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      const res = await response.json();
      if (!response.ok) throw res;
      navigate('/');
    } catch (err) {
      console.log(err);
      // ...handle error...
    }
  };

  return (
    <nav className='bg-gradient-to-r from-[#0d1a3a] via-[#0d3a5a] to-[#008280] px-4 sm:px-8 lg:px-16 py-3 flex justify-between items-center sticky top-0 z-50 shadow-xl'>
      <NavLink to="/" className="flex items-center gap-2 sm:gap-3 hover:opacity-80 transition-opacity">
        <img src={logo} className="w-10 sm:w-12 lg:w-14" alt="logo" />
        <h1 className='text-lg sm:text-xl lg:text-2xl text-[#4E84C1] font-bold tracking-wide'>Gurukul</h1>
      </NavLink>
      <button 
        onClick={Handlelogout}
        className='bg-gradient-to-r from-[#0D199D] to-[#008280] hover:from-[#0D199D]/80 hover:to-[#008280]/80 text-white py-2 px-4 sm:px-5 rounded-full transition-all duration-200 flex items-center gap-2 text-sm sm:text-base shadow-md font-semibold'
      >
        <TbLogout className="text-lg" />
        <span className="hidden sm:inline">Logout</span>
      </button>
    </nav>
  );
}

export default TeacherNavbar;