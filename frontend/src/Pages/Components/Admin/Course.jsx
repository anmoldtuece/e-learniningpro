import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { IoIosNotificationsOutline } from "react-icons/io";
import { useNavigate, useParams } from "react-router-dom";
import logo from '../../Images/logo.svg';

const Course = () => {
  const [courseReq, setCourseReq] = useState([]);
  const { data } = useParams();
  const navigator = useNavigate();

  const formatDay = (day) => {
    const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    return daysOfWeek[day];
  };

  const formatTime = (time) => {
    const hours = Math.floor(time / 60);
    const minutes = time % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
  };

  useEffect(() => {
    const fetchCourseRequests = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/admin/${data}/approve/course`
        );
        setCourseReq(response.data.data);
      } catch (error) {
        console.error('Error fetching course requests:', error);
      }
    };
    fetchCourseRequests();
  }, [data]);

  const handleAccept = async (id, info) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/admin/${data}/approve/course/${id}`,
        {
          Isapproved: true,
          email: info.Email,
          Firstname: info.enrolledteacher,
        }
      );

      if (response.status === 200) {
        setCourseReq(courseReq.filter(req => req._id !== id));
        alert(response.data.message);
      }
    } catch (error) {
      console.error('Error approving course request:', error);
    }
  };

  const handleReject = async (id, info) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/admin/${data}/approve/course/${id}`,
        {
          Isapproved: false,
          email: info.Email,
          Firstname: info.enrolledteacher,
        }
      );

      if (response.status === 200) {
        setCourseReq(courseReq.filter(req => req._id !== id));
        alert(response.data.message);
      }
    } catch (error) {
      console.error('Error rejecting course request:', error);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Navbar */}
      <nav className="h-20 bg-blue-900 flex justify-between items-center px-6">
        <div className="flex items-center gap-4">
          <img src={logo} alt="logo" className="w-10 h-10" />
          <h1 onClick={() => navigator(`/admin/${data}`)} className="text-white font-semibold cursor-pointer text-xl">
            ◀ Back to Admin Panel
          </h1>
        </div>
        <div className="flex items-center gap-4">
          <IoIosNotificationsOutline className="text-white h-6 w-6" />
          <button onClick={() => navigator('/')} className="bg-white text-blue-800 font-semibold px-4 py-2 rounded hover:bg-blue-100">
            Logout
          </button>
        </div>
      </nav>

      <div className="p-6">
        <h2 className="text-2xl font-bold text-blue-900 border-b-2 border-blue-900 pb-2 mb-6">
          Course Approval Requests
        </h2>

        {courseReq.length === 0 ? (
          <p className="text-gray-500">No course requests pending approval.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {courseReq.map((req, index) => (
              <div key={index} className="bg-blue-50 border border-blue-200 rounded-lg p-5 shadow-sm">
                <h3 className="text-lg font-bold text-blue-800 mb-1">{req.coursename.toUpperCase()}</h3>
                <p className="text-blue-900 mb-2">{req.description}</p>

                <p className="text-sm text-blue-800 mb-1">
                  <strong>Enrolled Teacher:</strong> {req.enrolledteacher.Firstname} {req.enrolledteacher.Lastname}
                </p>

                <div className="text-sm mb-2">
                  <strong className="text-blue-700">Schedule:</strong>
                  {req.schedule.map((item, idx) => (
                    <div key={idx} className="ml-2">
                      <p>📅 {formatDay(item.day)}</p>
                      <p>🕐 {formatTime(item.starttime)} - {formatTime(item.endtime)}</p>
                    </div>
                  ))}
                </div>

                <p className="text-sm mb-2">
                  <strong>Status:</strong>{" "}
                  <span className={req.isapproved ? "text-green-600 font-medium" : "text-yellow-600 font-medium"}>
                    {req.isapproved ? "Approved" : "Pending"}
                  </span>
                </p>

                <div className="flex gap-3 mt-3">
                  <button
                    className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded"
                    onClick={() => handleAccept(req._id, {
                      Email: req.enrolledteacher.Email,
                      enrolledteacher: req.enrolledteacher.Firstname
                    })}
                  >
                    Approve
                  </button>
                  <button
                    className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                    onClick={() => handleReject(req._id, {
                      Email: req.enrolledteacher.Email,
                      enrolledteacher: req.enrolledteacher.Firstname
                    })}
                  >
                    Reject
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Course;
