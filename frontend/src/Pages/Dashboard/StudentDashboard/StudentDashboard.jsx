import React, { useEffect, useState } from 'react';
import teachingImg from '../../Images/Teaching.svg';
import { NavLink, useParams, useNavigate, Outlet } from 'react-router-dom';
import logo from '../../Images/logo.svg';

function StudentDashboard() {
  const { ID } = useParams();
  const navigator = useNavigate();
  const [data, setdata] = useState([]);
  const [error, setError] = useState(null);

  const Handlelogout = async () => {
    const response = await fetch(`/api/student/logout`, {
      method: 'POST',
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      }
    });
    const result = await response.json();
    if (result.statusCode === 200) {
      navigator('/');
    }
  };

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await fetch(`/api/Student/StudentDocument/${ID}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          }
        });

        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }

        const user = await response.json();
        setdata(user.data);
      } catch (error) {
        setError(error.message);
      }
    };
    getData();
  }, []);

  return (
    <>
      {/* Navbar */}
      <nav className='bg-white px-10 py-4 flex justify-between items-center border-b border-blue-200 shadow-sm'>
        <NavLink to="/">
          <div className='flex items-center gap-3'>
            <img src={logo} className="w-14" alt="logo" />
            <h1 className='text-2xl text-blue-700 font-bold'>DTU E-Learning</h1>
          </div>
        </NavLink>
        <button
          onClick={Handlelogout}
          className='bg-blue-700 text-white py-2 px-5 rounded-full hover:bg-blue-800'
        >
          Logout
        </button>
      </nav>

      {/* Welcome Banner */}
      <div className='bg-blue-50 flex justify-between items-center px-10 py-10'>
        <div className='text-blue-700 font-semibold text-4xl'>
          <h1 className='mb-3'>Welcome to <span className='text-blue-600'>DTU E-Learning</span></h1>
          <h3 className='text-2xl'>{data.Firstname} {data.Lastname}</h3>
        </div>
        <div>
          <img src={teachingImg} alt="teaching" width={300} />
        </div>
      </div>

      {/* Sidebar */}
      <div className='flex'>
        <aside className='bg-white shadow-md w-60 min-h-[calc(100vh-5rem)] pt-10 px-4'>
          <div className='flex flex-col items-center gap-2 mb-8'>
            <img src="https://www.pngall.com/wp-content/uploads/5/Profile-Male-PNG.png" alt="profile_img" width={60} className="rounded-full" />
            <p className='text-blue-700 font-medium text-lg'>{data.Firstname} {data.Lastname}</p>
          </div>

          <div className='flex flex-col gap-1'>
            <NavLink
              to={`/Student/Dashboard/${ID}/Search`}
              className={({ isActive }) =>
                isActive
                  ? "bg-blue-700 text-white rounded-md p-3 font-medium"
                  : "text-blue-700 hover:bg-blue-100 rounded-md p-3 font-medium"
              }
            >
              Teacher
            </NavLink>
            <NavLink
              to={`/Student/Dashboard/${ID}/Classes`}
              className={({ isActive }) =>
                isActive
                  ? "bg-blue-700 text-white rounded-md p-3 font-medium"
                  : "text-blue-700 hover:bg-blue-100 rounded-md p-3 font-medium"
              }
            >
              Classes
            </NavLink>
            <NavLink
              to={`/Student/Dashboard/${ID}/Courses`}
              className={({ isActive }) =>
                isActive
                  ? "bg-blue-700 text-white rounded-md p-3 font-medium"
                  : "text-blue-700 hover:bg-blue-100 rounded-md p-3 font-medium"
              }
            >
              Courses
            </NavLink>
          </div>
        </aside>

        {/* Main Content Placeholder */}
        <main className="flex-1 p-10 text-center text-gray-500 text-lg bg-white">
          <Outlet />
          <div>
            Select an option from the sidebar to begin.
          </div>
        </main>
      </div>
    </>
  );
}

export default StudentDashboard;
