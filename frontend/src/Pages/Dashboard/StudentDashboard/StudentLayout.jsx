import React, { useEffect, useState } from 'react'
import { Outlet, useParams, useNavigate } from 'react-router-dom'
import StudentNavbar from './StudentNavbar'
import StudentSidebar from './StudentSidebar'

function StudentLayout() {
  const { ID } = useParams();
  const navigator = useNavigate();
  const [student, setStudent] = useState({});
  const [error, setError] = useState(null);

  const handleLogout = async () => {
    const response = await fetch(
      `${import.meta.env.VITE_BACKEND_URL}/api/student/logout`,
      {
        method: 'POST',
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        }
      }
    );
    const data = await response.json();
    if (data.statusCode === 200) {
      navigator('/');
    }
  };

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_BACKEND_URL}/api/Student/StudentDocument/${ID}`,
          {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            }
          }
        );

        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }

        const user = await response.json();
        setStudent(user.data);
      } catch (error) {
        setError(error.message)
      }
    };
    getData();
  }, [ID]);

  return (
    <>
      <StudentNavbar onLogout={handleLogout} />
      <StudentSidebar student={student} />
      <div className="ml-30 ">
        <Outlet context={{ student }} />
      </div>
    </>
  )
}

export default StudentLayout