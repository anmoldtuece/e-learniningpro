import React, { useState } from 'react'
import { Outlet, useParams } from 'react-router-dom'
import TeacherNavbar from './TeacherNavbar'
import TeacherSidebar from './TeacherSidebar'
import Withdrawal from './Withdrawal'
import CreateCourse from './CreateCourse'; // Make sure to import

function TeacherLayout() {
  const { ID } = useParams();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [popup, setPopup] = useState(false);
  const [formPopup, setFormPopup] = useState(false);
  const [createCoursePopup, setCreateCoursePopup] = useState(false); // <-- Add this

  // You may want to fetch teacher data here and pass to sidebar/navbar

  return (
    <>
    
      <TeacherNavbar />
      <div className="flex min-h-screen bg-gradient-to-br from-slate-50 to-blue-100">
        <TeacherSidebar 
          ID={ID} 
          sidebarOpen={sidebarOpen} 
          setSidebarOpen={setSidebarOpen}
          setPopup={setPopup}
          setFormPopup={setFormPopup}
          setCreateCoursePopup={setCreateCoursePopup} // <-- Pass setter as prop
          data={{}} // pass teacher data here
        />
        <div className="flex-1 lg:ml-0 p-4 sm:p-6 overflow-auto">
          <Outlet />
        </div>
        {popup && <Withdrawal onClose={() => setPopup(false)} TA={0} />}
        {createCoursePopup && (
          <div className="fixed top-0 right-0 h-screen w-full max-w-xl bg-white shadow-2xl z-[100] overflow-y-auto transition-transform duration-300"
               style={{ transform: createCoursePopup ? 'translateX(0)' : 'translateX(100%)' }}>
            <CreateCourse onClose={() => setCreateCoursePopup(false)} teacherID={ID} />
          </div>
        )}
        {/* Add Feedback Modal if needed */}
      </div>
    </>
  )
}

export default TeacherLayout