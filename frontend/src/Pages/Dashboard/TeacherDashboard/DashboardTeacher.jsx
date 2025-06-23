import React, { useEffect, useState } from "react";
import { useParams, NavLink, useNavigate, Outlet } from "react-router-dom";
import Withdrawal from "./Withdrawal";
import teachingImg from '../../Images/Teaching.svg';
import logo from '../../Images/logo.svg';
import { 
  TbMessage2Star, 
  TbUser, 
  TbMail, 
  TbPhone, 
  TbMapPin, 
  TbClock, 
  TbCurrencyRupee,
  TbBook,
  TbCalendar,
  TbLogout,
  TbHome,
  TbSchool,
  TbFileText
  // TbBookOpen
} from "react-icons/tb";
import { FiX, FiStar, FiMenu } from "react-icons/fi";

function DashboardTeacher() {
  const { ID } = useParams();
  const navigator = useNavigate();
  const [data, setdata] = useState([]);
  const [courses, setCourses] = useState([]);
  const [error, setError] = useState([]);
  const [popup, setPopup] = useState(false);
  const [notification, setNotification] = useState(false);
  const [amount, setAmount] = useState(0);
  const [subjectForm, setsubjectForm] = useState('Math');
  const [Tdec, setTeacherDetails] = useState(null);
  const [starCount, setStar] = useState(5);
  const [formPopup, setFormPopup] = useState(false);
  const [loading, setLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const price = {
    math: 700,
    physics: 800,
    computer: 1000,
    chemistry: 600,
    biology: 500,
  };

  const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

  const Handlelogout = async() => {
    try {
      const response = await fetch(`/api/teacher/logout`, {
        method: 'POST',
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        }
      });
      const data = await response.json();
      console.log(data);
      if(data.statusCode == 200){
        navigator('/');
      }
    } catch (error) {
      console.error('Logout error:', error);
    }
  }

  useEffect(() => {
    const getData = async () => {
      try {
        setLoading(true);
        const response = await fetch(`/api/Teacher/TeacherDocument/${ID}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }

        const user = await response.json();
        setdata(user.data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    getData();
  }, [ID]);

  useEffect(() => {
    const getData = async () => {
      if (data.Teacherdetails) {
        const Data = await fetch('/api/teacher/teacherdocuments', {
          method: 'POST',
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ teacherID: data.Teacherdetails }),
        })
        const res = await Data.json();
        setTeacherDetails(res.data);
      }
    }

    getData();
  }, [data])

  useEffect(() => {
    const getAmount = async () => {
      try {
        const response = await fetch(`/api/payment/teacher/${ID}/balance`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }

        const user = await response.json();
        setAmount(user.data.newTeacher.Balance);
      } catch (error) {
        console.log(error);
      }
    };
    getAmount();
  }, [ID, popup]);

  useEffect(() => {
    const getCourses = async () => {
      try {
        const response = await fetch(`/api/course/Teacher/${ID}/enrolled`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }

        const res = await response.json();
        setCourses(res.data);
        console.log(res.data);
      } catch (error) {
        setError(error.message);
      }
    };
    getCourses();
  }, [ID]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="bg-white p-8 rounded-xl shadow-lg">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="text-gray-600 mt-4 text-center">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* Navbar */}
      <nav className='bg-gradient-to-r from-[#0d1a3a] via-[#0d3a5a] to-[#008280] px-4 sm:px-8 lg:px-16 py-3 flex justify-between items-center sticky top-0 z-50 shadow-xl'>
        <NavLink to="/" className="flex items-center gap-2 sm:gap-3 hover:opacity-80 transition-opacity">
          <img src={logo} className="w-10 sm:w-12 lg:w-14" alt="logo" />
          <h1 className='text-lg sm:text-xl lg:text-2xl text-[#4E84C1] font-bold tracking-wide'>E-Learning</h1>
        </NavLink>
        
        <div className="flex items-center gap-4">
          {/* Mobile menu button */}
          <button 
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="lg:hidden bg-gradient-to-r from-[#0D199D] to-[#008280] text-white p-2 rounded-lg hover:from-[#0D199D]/80 hover:to-[#008280]/80 transition-colors shadow-md"
          >
            <FiMenu className="text-xl" />
          </button>
          
          <button 
            onClick={Handlelogout}
            className='bg-gradient-to-r from-[#0D199D] to-[#008280] hover:from-[#0D199D]/80 hover:to-[#008280]/80 text-white py-2 px-4 sm:px-5 rounded-full transition-all duration-200 flex items-center gap-2 text-sm sm:text-base shadow-md font-semibold'
          >
            <TbLogout className="text-lg" />
            <span className="hidden sm:inline">Logout</span>
          </button>
        </div>
      </nav>

      {/* Welcome Section */}
      <div className='bg-gradient-to-r from-[#008280] via-[#00a09e] to-[#0d1a3a] flex flex-col lg:flex-row justify-between items-center px-4 sm:px-8 lg:px-24 py-8 lg:py-14 rounded-b-3xl shadow-lg'>
        <div className='text-center lg:text-left mb-6 lg:mb-0'>
          <h1 className='text-2xl sm:text-3xl lg:text-5xl font-extrabold text-white mb-4 lg:mb-5 leading-tight drop-shadow-lg'>
            Welcome to <span className='text-[#ffe066]'>E-Learning</span>
          </h1>
          <h3 className='text-xl sm:text-2xl lg:text-3xl text-white font-semibold drop-shadow'>
            {data.Firstname} {data.Lastname}
          </h3>
        </div>
        <div className='flex-shrink-0'>
          <img 
            src={teachingImg} 
            alt="teaching" 
            className="w-48 sm:w-64 lg:w-80 xl:w-96 h-auto drop-shadow-2xl"
          />
        </div>
      </div>

      <div className="flex min-h-screen bg-gradient-to-br from-slate-50 to-blue-100">
        {/* Mobile Sidebar Overlay */}
        {sidebarOpen && (
          <div 
            className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          ></div>
        )}

        {/* Sidebar */}
        <div className={`bg-gradient-to-b from-[#071645] via-[#0d3a5a] to-[#008280] w-64 lg:w-72 fixed lg:sticky top-0 h-screen z-50 flex flex-col transition-transform duration-300 ease-in-out ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        } shadow-2xl`}>
          {/* Close button for mobile */}
          <div className="lg:hidden flex justify-end p-4">
            <button 
              onClick={() => setSidebarOpen(false)}
              className="text-white hover:bg-white/10 p-2 rounded-lg transition-colors"
            >
              <FiX className="text-xl" />
            </button>
          </div>

          {/* Profile Section */}
          <div className='flex flex-col gap-4 items-center text-white mt-4 lg:mt-6 mb-8 px-4'>
            <div className="w-20 h-20 lg:w-24 lg:h-24 rounded-full overflow-hidden border-4 border-[#ffe066] shadow-xl bg-white">
              <img 
                src="https://www.pngall.com/wp-content/uploads/5/Profile-Male-PNG.png" 
                alt="profile_img" 
                className="w-full h-full object-cover"
              />
            </div>
            <p className="text-base lg:text-lg font-semibold text-center leading-tight tracking-wide">
              {data.Firstname} {data.Lastname}
            </p>
          </div>

          {/* Navigation Links */}
          <nav className='flex flex-col px-4 space-y-2'>
            <NavLink 
              to={`/Teacher/Dashboard/${ID}`} 
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
              to={`/Teacher/Dashboard/${ID}/Courses`} 
              className={({isActive}) => 
                `flex items-center gap-3 p-3 lg:p-4 rounded-lg font-semibold transition-all duration-200 ${
                  isActive 
                    ? "bg-[#ffe066] text-[#071645] shadow-lg" 
                    : "text-white hover:bg-white/10 hover:text-[#ffe066]"
                }`
              }
              onClick={() => setSidebarOpen(false)}
            > 
              {/* <TbBookOpen className="text-xl" /> */}
              <span>Courses</span>
            </NavLink>
          </nav>

          {/* Quick Actions */}
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
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 lg:ml-0 p-4 sm:p-6 overflow-auto">
          <div className="max-w-7xl mx-auto">
            
            {/* Header Section */}
            <div className="bg-white rounded-2xl shadow-xl p-4 sm:p-8 mb-6 sm:mb-10 border border-blue-100">
              <div className="flex flex-col lg:flex-row gap-4 lg:gap-8 items-start lg:items-center justify-between">
                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 w-full lg:w-auto">
                  <button className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-6 sm:px-8 py-3 rounded-lg font-semibold transition-all duration-200 shadow-md hover:shadow-lg transform hover:-translate-y-0.5 text-sm sm:text-base">
                    <TbUser className="inline-block mr-2" />
                    Details
                  </button>
                  <button
                    onClick={() => setPopup(true)}
                    className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white px-6 sm:px-8 py-3 rounded-lg font-semibold transition-all duration-200 shadow-md hover:shadow-lg transform hover:-translate-y-0.5 text-sm sm:text-base"
                  >
                    <TbCurrencyRupee className="inline-block mr-2" />
                    Remuneration
                  </button>
                  <button
                    onClick={() => setFormPopup(true)}
                    className="bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white px-6 sm:px-8 py-3 rounded-lg font-semibold transition-all duration-200 shadow-md hover:shadow-lg transform hover:-translate-y-0.5 text-sm sm:text-base"
                  >
                    <TbMessage2Star className="inline-block mr-2" />
                    Feedback
                  </button>
                </div>
                
                <div className="bg-gradient-to-r from-emerald-500 to-teal-600 text-black px-4 sm:px-8 py-3 rounded-xl shadow-lg w-full lg:w-auto flex items-center justify-center lg:justify-start gap-2">
                  <TbCurrencyRupee className="text-lg" />
                  <span className="font-medium">Balance:</span>
                  <span className="font-bold text-lg">₹{amount?.toLocaleString()}</span>
                </div>
              </div>
             
            </div>

            {/* Divider */}
            <div className="border-t border-blue-200 mb-6 sm:mb-10"></div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 lg:gap-10">
              
              {/* Teacher Information Card */}
              <div className="xl:col-span-4">
                <div className="bg-gradient-to-br from-white via-blue-50 to-purple-50 rounded-2xl shadow-xl p-6 sm:p-8 h-fit border border-blue-100">
                  <div className="text-center mb-6">
                    <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                      <TbUser className="text-4xl text-white" />
                    </div>
                    <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-2 break-words">
                      {data.Firstname} {data.Lastname}
                    </h2>
                    <div className="flex justify-center items-center gap-1">
                      {[...Array(starCount)].map((_, index) => (
                        <FiStar key={index} className="text-yellow-400 fill-current" size={20} />
                      ))}
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-start gap-3 sm:gap-4 p-3 sm:p-4 bg-white/80 rounded-lg hover:bg-blue-50 transition-colors border border-blue-100">
                      <TbMail className="text-blue-600 text-xl mt-0.5 flex-shrink-0" />
                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-medium text-gray-600 mb-1">Email</p>
                        <p className="text-gray-800 font-medium break-words text-sm sm:text-base">{data.Email}</p>
                      </div>
                    </div>

                    {Tdec && (
                      <>
                        <div className="flex items-start gap-3 sm:gap-4 p-3 sm:p-4 bg-white/80 rounded-lg hover:bg-blue-50 transition-colors border border-blue-100">
                          <TbPhone className="text-green-600 text-xl mt-0.5 flex-shrink-0" />
                          <div className="min-w-0 flex-1">
                            <p className="text-sm font-medium text-gray-600 mb-1">Phone</p>
                            <p className="text-gray-800 font-medium text-sm sm:text-base">{Tdec.Phone}</p>
                          </div>
                        </div>

                        <div className="flex items-start gap-3 sm:gap-4 p-3 sm:p-4 bg-white/80 rounded-lg hover:bg-blue-50 transition-colors border border-blue-100">
                          <TbMapPin className="text-red-600 text-xl mt-0.5 flex-shrink-0" />
                          <div className="min-w-0 flex-1">
                            <p className="text-sm font-medium text-gray-600 mb-1">Address</p>
                            <p className="text-gray-800 font-medium break-words text-sm sm:text-base">{Tdec.Address}</p>
                          </div>
                        </div>

                        <div className="flex items-start gap-3 sm:gap-4 p-3 sm:p-4 bg-white/80 rounded-lg hover:bg-blue-50 transition-colors border border-blue-100">
                          <TbClock className="text-purple-600 text-xl mt-0.5 flex-shrink-0" />
                          <div className="min-w-0 flex-1">
                            <p className="text-sm font-medium text-gray-600 mb-1">Experience</p>
                            <p className="text-gray-800 font-medium text-sm sm:text-base">{Tdec.Experience} years</p>
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </div>

              {/* Courses Section */}
              <div className="xl:col-span-8">
                <div className="bg-gradient-to-br from-white via-blue-50 to-purple-50 rounded-2xl shadow-xl p-6 sm:p-8 border border-blue-100">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center shadow-md">
                      <TbBook className="text-white text-2xl" />
                    </div>
                    <h3 className="text-2xl sm:text-3xl font-bold text-gray-800">Active Courses</h3>
                  </div>

                  {courses && courses.length > 0 ? (
                    <div className="space-y-6">
                      {courses
                        .filter((course) => course.isapproved)
                        .map((course) => (
                          <div key={course._id} className="border border-blue-200 rounded-2xl p-4 sm:p-6 hover:shadow-lg transition-all duration-200 hover:border-blue-400 bg-white/90">
                            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-4">
                              <div className="flex-1">
                                <h4 className="text-lg sm:text-xl font-semibold text-gray-800 capitalize mb-2 flex items-center gap-2 break-words">
                                  <TbBook className="text-blue-600 flex-shrink-0" />
                                  <span>{course.coursename}</span>
                                </h4>
                              </div>
                               {/* Description */}
              <div className="space-y-3">
                          <div className="flex items-center gap-2">
                            <TbFileText className="text-blue-600 text-lg" />
                            <h4 className="font-semibold text-gray-700">Description</h4>
                          </div>
                          <div className="bg-white rounded-lg p-4 border border-gray-200">
                            <p className="text-gray-700 text-sm leading-relaxed">
                              {course.description || "No description provided"}
                            </p>
                          </div>
                        </div>
                              <div className="flex items-center gap-2 bg-gradient-to-r from-green-400 to-green-500 text-white px-3 sm:px-4 py-2 rounded-lg shadow-sm flex-shrink-0">
                                <TbCurrencyRupee className="text-lg" />
                                <span className="font-bold text-base sm:text-lg">
                                  {price[course.coursename]?.toLocaleString() || 'N/A'}
                                </span>
                                <span className="text-xs sm:text-sm">per student/month</span>
                              </div>
                            </div>

                            

                            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-4 border-l-4 border-blue-500">
                              <div className="flex items-center gap-2 mb-3">
                                <TbCalendar className="text-blue-600 text-lg flex-shrink-0" />
                                <span className="font-semibold text-gray-700">Schedule</span>
                              </div>
                              <div className="text-gray-700 text-sm sm:text-base break-words">
                                <span className="font-medium">
                                  {course.schedule.map(days => 
                                    `${daysOfWeek[days.day]} ${Math.floor(days.starttime/60)}:${(days.starttime%60 === 0 ? "00" : days.starttime%60)} - ${Math.floor(days.endtime/60)}:${(days.endtime%60 === 0 ? "00" : days.endtime%60)}`
                                  ).join(', ')}
                                </span>
                              </div>
                            </div>
                          </div>
                        ))}
                    </div>
                  ) : (
                    <div className="text-center py-12">
                      <TbBook className="text-6xl text-blue-200 mx-auto mb-4" />
                      <p className="text-gray-500 text-lg">No active courses found</p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Render nested routes */}
            {/* <Outlet /> */}
          </div>
        </div>

        {popup && <Withdrawal onClose={() => setPopup(false)} TA={amount} />}

        {formPopup && (
          <div className='fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center p-4 z-50'>
            <div className='bg-white w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-2xl shadow-2xl transform transition-all duration-300 border border-blue-100'>
              {/* Modal Header */}
              <div className="sticky top-0 bg-white border-b border-blue-200 px-4 sm:px-8 py-4 sm:py-6 rounded-t-2xl">
                <div className="flex justify-between items-start">
                  <div className="flex-1 pr-4">
                    <h2 className='text-2xl sm:text-3xl font-bold text-blue-900 mb-2'>Teacher Feedback Form</h2>
                    <p className='text-gray-600 border-b-2 border-blue-500 pb-2 inline-block text-sm sm:text-base'>
                      We highly appreciate your involvement. Please help us improve by filling out this teacher feedback form. Thank you!
                    </p>
                  </div>
                  <button 
                    onClick={() => setFormPopup(false)}
                    className="w-10 h-10 bg-blue-50 hover:bg-blue-100 rounded-full flex items-center justify-center transition-colors duration-200 flex-shrink-0 border border-blue-200"
                  >
                    <FiX className="text-lg text-blue-600" />
                  </button>
                </div>
              </div>

              {/* Modal Body */}
              <div className="px-4 sm:px-8 py-4 sm:py-6">
                <div className='space-y-4 sm:space-y-6 pb-6 border-b border-blue-200'>
                  <div>
                    <label className="block text-sm font-semibold text-blue-900 mb-2">Full Name</label>
                    <input 
                      type="text" 
                      className='w-full p-3 sm:p-4 border border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-gray-800 text-sm sm:text-base bg-blue-50'  
                      placeholder='Teacher / Instructor Name'
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-semibold text-blue-900 mb-2">Course Name</label>
                    <input 
                      type="text" 
                      className='w-full p-3 sm:p-4 border border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-gray-800 text-sm sm:text-base bg-blue-50'  
                      placeholder='Course Name'
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-semibold text-blue-900 mb-2">Number of Years Teaching?</label>
                    <input 
                      type="text" 
                      className='w-full p-3 sm:p-4 border border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-gray-800 text-sm sm:text-base bg-blue-50'  
                      placeholder='in years'
                    />
                  </div>
                </div>

                <div className='py-4 sm:py-6 flex flex-col items-center'>
                  <p className='text-base sm:text-lg font-medium text-blue-900 text-center mb-4'>
                    Do you have suggestions on what we can do to provide you with a better service?
                  </p>
                  <textarea 
                    className="w-full h-32 p-3 sm:p-4 border border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 resize-none text-gray-800 text-sm sm:text-base bg-blue-50" 
                    placeholder="Type here ..."
                  ></textarea>
                </div>

                <div className='flex justify-center mt-4 sm:mt-6'>
                  <button className='bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-8 sm:px-12 py-3 sm:py-4 rounded-lg font-semibold text-base sm:text-lg transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5'>
                    Submit Form
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default DashboardTeacher;
