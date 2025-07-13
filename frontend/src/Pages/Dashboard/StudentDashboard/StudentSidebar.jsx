import React from 'react'
import { NavLink, useParams } from 'react-router-dom'

function StudentSidebar({ student }) {
  const { ID } = useParams();

  return (
    <div className='bg-gradient-to-b from-[#071645] via-[#0d3a5a] to-[#008280] w-56 min-h-screen fixed top-20 shadow-2xl flex flex-col'>
      <div className='flex flex-col gap-5 text-xl items-center text-white mt-8 mb-10'>
        <img src="https://www.pngall.com/wp-content/uploads/5/Profile-Male-PNG.png" alt="profile_img" width={50} className="rounded-full border-4 border-[#ffe066] shadow-xl bg-white"/>
        <p className="text-base font-semibold text-center leading-tight tracking-wide text-[#ffe066]">{student?.Firstname} {student?.Lastname}</p>
      </div>
      <div className='flex flex-col gap-1'>
        <NavLink to={`/Student/Dashboard/${ID}`} end className={({isActive}) => isActive ? "bg-[#ffe066] p-3 px-12 text-center font-semibold text-[#071645] shadow-lg" : "p-3 text-center font-semibold text-white hover:bg-white/10 hover:text-[#ffe066]"}>
          Dashboard
        </NavLink>
        <NavLink to={`/Student/Dashboard/${ID}/profile`} className={({isActive}) => isActive ? "bg-[#ffe066] p-3 px-12 text-center font-semibold text-[#071645] shadow-lg" : "p-3 text-center font-semibold text-white hover:bg-white/10 hover:text-[#ffe066]"}>
          Profile
        </NavLink>
        <NavLink to={`/Student/Dashboard/${ID}/Search`} className={({isActive}) => isActive ? "bg-[#ffe066] p-3 px-12 text-center font-semibold text-[#071645] shadow-lg" : "p-3 text-center font-semibold text-white hover:bg-white/10 hover:text-[#ffe066]"}>
          Teacher
        </NavLink>
        <NavLink to={`/Student/Dashboard/${ID}/Classes`} className={({isActive}) => isActive ? "bg-[#ffe066] p-3 px-12 text-center font-semibold text-[#071645] shadow-lg" : "p-3 text-center font-semibold text-white hover:bg-white/10 hover:text-[#ffe066]"}>
          Classes
        </NavLink>
        <NavLink to={`/Student/Dashboard/${ID}/Courses`} className={({isActive}) => isActive ? "bg-[#ffe066] p-3 px-12 text-center font-semibold text-[#071645] shadow-lg" : "p-3 text-center font-semibold text-white hover:bg-white/10 hover:text-[#ffe066]"}>
          Courses
        </NavLink>
        <NavLink to={`/Student/Dashboard/${ID}/CompletedCourses`} className={({isActive}) => isActive ? "bg-[#ffe066] p-3 px-12 text-center font-semibold text-[#071645] shadow-lg" : "p-3 text-center font-semibold text-white hover:bg-white/10 hover:text-[#ffe066]"}>
          Completed Courses
        </NavLink>
      </div>
    </div>
  )
}

export default StudentSidebar