import React from 'react'
import teachingImg from '../../Images/Teaching.svg'

function StudentWelcome({ student }) {
  return (
    <div className="min-h-[calc(100vh-5rem)] ml-56 flex items-center justify-center bg-gradient-to-r from-[#0d1a3a] via-[#0d3a5a] to-[#008280] overflow-hidden">
      <div className="flex flex-row justify-between items-center w-full px-24">
        <div className="text-white font-semibold text-5xl">
          <h1 className="mb-5 text-[#ffe066]">
            Welcome to <span className="text-white">Gurukul</span>
          </h1>
          <h3 className="ml-16 text-[#ffe066]">
            {student?.Firstname} {student?.Lastname}
          </h3>
        </div>
        <div className="m-5">
          <img src={teachingImg} alt="teaching" width={300} />
        </div>
      </div>
    </div>
  )
}

export default StudentWelcome