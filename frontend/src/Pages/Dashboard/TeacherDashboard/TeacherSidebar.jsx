import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { TbHome, TbSchool, TbBook, TbCurrencyRupee, TbMessage2Star, TbUser } from "react-icons/tb";
import { FiX } from "react-icons/fi";

function TeacherSidebar({ ID, sidebarOpen, setSidebarOpen, setPopup, setFormPopup, data }) {
  const navigate = useNavigate();

  return (
    <div className={`bg-gradient-to-b from-[#071645] via-[#0d3a5a] to-[#008280] w-64 lg:w-72 fixed lg:sticky top-0 h-screen z-50 flex flex-col transition-transform duration-300 ease-in-out ${
      sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
    } shadow-2xl`}>
      <div className="lg:hidden flex justify-end p-4">
        <button 
          onClick={() => setSidebarOpen(false)}
          className="text-white hover:bg-white/10 p-2 rounded-lg transition-colors"
        >
          <FiX className="text-xl" />
        </button>
      </div>
      <div className='flex flex-col gap-4 items-center text-white mt-4 lg:mt-6 mb-8 px-4'>
        <div className="w-20 h-20 lg:w-24 lg:h-24 rounded-full overflow-hidden border-4 border-[#ffe066] shadow-xl bg-white">
          <img 
            src="https://www.pngall.com/wp-content/uploads/5/Profile-Male-PNG.png" 
            alt="profile_img" 
            className="w-full h-full object-cover"
          />
        </div>
        <p className="text-base lg:text-lg font-semibold text-center leading-tight tracking-wide">
          {data?.Firstname} {data?.Lastname}
        </p>
      </div>
      <nav className='flex flex-col px-4 space-y-2'>
        <NavLink 
          to={`/Teacher/Dashboard/${ID}`} 
          end
          className={({isActive}) => 
            `flex items-center gap-3 p-3 lg:p-4 rounded-lg font-semibold transition-all duration-200 ${
              isActive 
                ? "bg-[#ffe066] text-[#071645] shadow-lg" 
                : "text-white hover:bg-white/10 hover:text-[#ffe066]"
            }`
          }
          onClick={() => setSidebarOpen(false)}
        > 
          <TbHome className="text-xl" />
          <span>Dashboard</span>
        </NavLink>
        <NavLink 
          to={`/Teacher/Dashboard/${ID}/Classes`} 
          className={({isActive}) => 
            `flex items-center gap-3 p-3 lg:p-4 rounded-lg font-semibold transition-all duration-200 ${
              isActive 
                ? "bg-[#ffe066] text-[#071645] shadow-lg" 
                : "text-white hover:bg-white/10 hover:text-[#ffe066]"
            }`
          }
          onClick={() => setSidebarOpen(false)}
        > 
          <TbSchool className="text-xl" />
          <span>Classes</span>
        </NavLink>
        <NavLink 
          to={`/Teacher/Dashboard/${ID}/profile`} 
          className={({isActive}) => 
            `flex items-center gap-3 p-3 lg:p-4 rounded-lg font-semibold transition-all duration-200 ${
              isActive 
                ? "bg-[#ffe066] text-[#071645] shadow-lg" 
                : "text-white hover:bg-white/10 hover:text-[#ffe066]"
            }`
          }
          onClick={() => setSidebarOpen(false)}
        > 
          <TbUser className="text-xl" />
          <span>My Profile</span>
        </NavLink>
        <NavLink 
          to={`/Teacher/Dashboard/${ID}/courses`} 
          className={({isActive}) => 
            `flex items-center gap-3 p-3 lg:p-4 rounded-lg font-semibold transition-all duration-200 ${
              isActive 
                ? "bg-[#ffe066] text-[#071645] shadow-lg" 
                : "text-white hover:bg-white/10 hover:text-[#ffe066]"
            }`
          }
          onClick={() => setSidebarOpen(false)}
        > 
          <TbBook className="text-xl" />
          <span>Active Courses</span>
        </NavLink>
        <NavLink 
          to={`/Teacher/Dashboard/${ID}/remuneration`} 
          className={({isActive}) => 
            `flex items-center gap-3 p-3 lg:p-4 rounded-lg font-semibold transition-all duration-200 ${
              isActive 
                ? "bg-[#ffe066] text-[#071645] shadow-lg" 
                : "text-white hover:bg-white/10 hover:text-[#ffe066]"
            }`
          }
          onClick={() => setSidebarOpen(false)}
        > 
          <TbCurrencyRupee className="text-xl" />
          <span>Remuneration</span>
        </NavLink>
      </nav>
      <div className="mt-8 px-4 space-y-3">
        <h4 className="text-white/80 text-xs font-bold uppercase tracking-widest">Quick Actions</h4>
        <button
          onClick={() => {
            setPopup(true);
            setSidebarOpen(false);
          }}
          className="w-full flex items-center gap-3 p-3 text-white hover:bg-[#ffe066]/10 hover:text-[#ffe066] rounded-lg transition-all duration-200 text-left font-semibold shadow-sm"
        >
          <TbCurrencyRupee className="text-xl text-green-300" />
          <span>Withdraw Funds</span>
        </button>
        <button
          onClick={() => {
            setFormPopup(true);
            setSidebarOpen(false);
          }}
          className="w-full flex items-center gap-3 p-3 text-white hover:bg-[#ffe066]/10 hover:text-[#ffe066] rounded-lg transition-all duration-200 text-left font-semibold shadow-sm"
        >
          <TbMessage2Star className="text-xl text-purple-300" />
          <span>Give Feedback</span>
        </button>
        <button
          onClick={() => {
            navigate(`/Teacher/Dashboard/${ID}/create-course`);
            setSidebarOpen(false);
          }}
          className="w-full flex items-center gap-3 p-3 text-white hover:bg-[#ffe066]/10 hover:text-[#ffe066] rounded-lg transition-all duration-200 text-left font-semibold shadow-sm"
        >
          <TbBook className="text-xl text-blue-300" />
          <span>Create Course</span>
        </button>
      </div>
    </div>
  );
}

export default TeacherSidebar;