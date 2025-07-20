import React, { useState, useEffect } from "react";
import { IoIosNotificationsOutline } from "react-icons/io";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import logo from '../../Images/logo.svg';
import axios from "axios";

const Admin = () => {
  const { data } = useParams();
  const navigator = useNavigate();

  const [StudentData, setStudentData] = useState([]);
  const [TeacherData, setTeacherData] = useState([]);
  const [adminID, setAdminID] = useState(null);
  const [error, setErrors] = useState("");
  const [allmsg, setAllMsg] = useState([]);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const getAllMsg = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_BACKEND_URL}/api/admin/messages/all`,
          {
            credentials: "include", // <-- Add this line
          }
        );
        const data = await response.json();
        setAllMsg(data.data || []);
      } catch (err) {
        console.log(err.message);
      }
    };
    getAllMsg();
  }, []);

  const Approval = async (ID, type, approve) => {
    try {
      const data = { Isapproved: approve };
      await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/admin/${adminID}/approve/${type}/${ID}`,
        {
          method: 'POST',
          headers: { "Content-Type": "application/json" },
          credentials: "include", // <-- Add this line
          body: JSON.stringify(data),
        }
      );

      if (type === "student") {
        setStudentData(pre => pre.filter(pre => pre._id !== ID));
      } else if (type === "teacher") {
        setTeacherData(pre => pre.filter(pre => pre._id !== ID));
      }
    } catch (error) {
      setErrors(error.message);
    }
  };

  const docDetails = (type, ID) => {
    navigator(`/VarifyDoc/${type}/${adminID}/${ID}`);
  };

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_BACKEND_URL}/api/admin/${data}/approve`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            credentials: "include", // <-- Add this line
          }
        );

        if (!response.ok) throw new Error("Failed to fetch data");

        const result = await response.json();
        setStudentData(result.data.studentsforApproval);
        setTeacherData(result.data.teachersforApproval);
        setAdminID(result.data.admin._id);
      } catch (err) {
        console.log(err.message);
      }
    };
    getData();
  }, []);

  return (
    <div className="min-h-screen bg-white">
      {/* Navbar */}
      <nav className="h-20 bg-blue-900 flex justify-between items-center px-10">
        <NavLink to='/'>
          <div className="flex items-center gap-4">
            <img src={logo} alt="logo" className="w-14 h-14" />
            <h1 className="text-2xl text-blue-300 font-bold"> Gurukul</h1>
          </div>
        </NavLink>
        <div className="flex items-center gap-4">
          <div className="relative">
            <IoIosNotificationsOutline className="h-8 w-8 text-white" />
            <span className="absolute top-1 right-1 h-3 w-3 bg-red-500 rounded-full"></span>
          </div>
          <button onClick={() => navigator('/')} className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md">
            Logout
          </button>
        </div>
      </nav>

      <div className="p-10">
        <h1 className="text-3xl font-semibold text-gray-800 border-b-2 border-blue-900 mb-6">All New Requests</h1>

        <div className="flex justify-end gap-6 mb-6">
          <button onClick={() => setOpen(prev => !prev)} className="bg-green-600 text-white px-6 py-2 rounded">
            Messages
          </button>
          <button onClick={() => navigator(`/admin/course/${data}`)} className="bg-blue-700 text-white px-6 py-2 rounded">
            Course Requests
          </button>
        </div>

        {open && (
          <div className="mt-3 w-[30rem] bg-gray-100 shadow-md p-5 rounded-lg">
            {allmsg.map((msg, index) => (
              <div key={index} className="bg-white border-l-4 border-blue-500 p-4 mb-4 shadow-sm">
                <p><strong>Name:</strong> {msg.name}</p>
                <p><strong>Email:</strong> {msg.email}</p>
                <p><strong>Message:</strong> {msg.message}</p>
              </div>
            ))}
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mt-10">
          {/* Students */}
          <div>
            <h4 className="text-xl font-bold text-blue-800 mb-4">Student Requests</h4>
            {StudentData.map((student) =>
              student.Isapproved === "pending" && (
                <div key={student._id} onClick={() => docDetails("student", student._id)} className="p-4 bg-blue-100 hover:bg-blue-200 rounded-lg cursor-pointer mb-4 shadow">
                  <h1 className="text-lg font-semibold text-gray-800">{student.Firstname} {student.Lastname}</h1>
                  <p>Status: {student.Isapproved}</p>
                </div>
              )
            )}
          </div>

          {/* Teachers */}
          <div>
            <h4 className="text-xl font-bold text-blue-800 mb-4">Teacher Requests</h4>
            {TeacherData.map((teacher) =>
              teacher.Isapproved === "pending" && (
                <div key={teacher._id} onClick={() => docDetails("teacher", teacher._id)} className="p-4 bg-blue-100 hover:bg-blue-200 rounded-lg cursor-pointer mb-4 shadow">
                  <h1 className="text-lg font-semibold text-gray-800">{teacher.Firstname} {teacher.Lastname}</h1>
                  <p>Status: {teacher.Isapproved}</p>
                </div>
              )
            )}
          </div>

          {/* Rejected */}
          <div>
            <h4 className="text-xl font-bold text-red-600 mb-4">Rejected Requests</h4>
            {[...StudentData, ...TeacherData].map((user) =>
              user.Isapproved === "rejected" && (
                <div key={user._id} onClick={() => docDetails(user.type || "unknown", user._id)} className="p-4 bg-red-100 hover:bg-red-200 rounded-lg cursor-pointer mb-4 shadow">
                  <h1 className="text-lg font-semibold text-gray-800">{user.Firstname} {user.Lastname}</h1>
                  <p className="text-sm"><strong>Remarks:</strong> {user.Remarks}</p>
                </div>
              )
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admin;
