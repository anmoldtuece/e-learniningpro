import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import DateTime from './DateTime';

function AddClass({ onClose }) {
  const { ID } = useParams();
  const [courses, setCourses] = useState([]);
  const [error, setError] = useState('');
  const [date, setDate] = useState("");
  const [link, setLink] = useState("");
  const [note, setNote] = useState("");
  const [CourseId, setCourseId] = useState('');
  const [allowedDays, setCurrData] = useState([]);

  const DAY = [
    "Sunday",    
    "Monday",    
    "Tuesday",   
    "Wednesday", 
    "Thursday",  
    "Friday",    
    "Saturday"   
  ];
  
  function setToMidnight(dateTimeString) {
    // Create a new Date object from the input string
    let date = new Date(dateTimeString);

    // Convert to IST (Asia/Kolkata)
    const IST_OFFSET = 5.5 * 60; // IST is UTC+5:30 in minutes
    let utc = date.getTime() + (date.getTimezoneOffset() * 60000);
    let istDate = new Date(utc + (IST_OFFSET * 60000));

    // Extract the time part in IST
    let hours = istDate.getHours();
    let minutes = istDate.getMinutes();

    let totalMinutes = (hours * 60) + minutes;

    // Set to midnight in IST for the date part
    istDate.setHours(0, 0, 0, 0);
    let modifiedDateTimeString = istDate.toISOString();

    const DATETIME = [totalMinutes, modifiedDateTimeString];
    return DATETIME;
  }

  useEffect(() => {
    const getCourses = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_BACKEND_URL}api/course/Teacher/${ID}/enrolled`,
          {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
          }
        );

        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }

        const res = await response.json();
        setCourses(res.data);
        if (res.data && res.data.length > 0) {
          setCourseId(res.data[0]._id);
        }
      } catch (error) {
        setError(error.message);
      }
    };
    getCourses();
  }, [ID]); 

  useEffect(() => {
    const filteredData = courses.filter(course => course._id === CourseId);
    setCurrData(filteredData[0]?.schedule);
  }, [CourseId, courses]);
  
  const addCourses = async () => {
    const currentDate = new Date();
    const givenDate = new Date(date);

    const modifyDate = setToMidnight(date);

    const data = {
      title: note,
      timing: modifyDate[0],
      date: modifyDate[1],
      link: link,
      status: 'upcoming',
    };

    if (currentDate > givenDate) {
      alert('Choose a valid date!');
    } else if (note === '' || date === '' || link === '') {
      alert('All fields are required!');
    } else {
      try {
        console.log("note:", note, "date:", date, "link:", link, "data:", data);
        console.log("Submitting data:", data);
        const response = await fetch(
          `${import.meta.env.VITE_BACKEND_URL}api/course/${CourseId}/teacher/${ID}/add-class`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
          }
        );

        const res = await response.json();
        alert(res.message);

        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }

        if (res.statusCode === 200) {
          onClose();
        }
      } catch (error) {
        setError(error.message);
      }
    }
  };

  return (
    <div className='fixed inset-0 bg-black bg-opacity-70 backdrop-blur-sm flex items-center justify-center p-4 z-50'>
      <div className='w-full max-w-4xl max-h-[90vh] bg-white rounded-2xl shadow-2xl overflow-hidden'>
        
        {/* Header Section */}
        <div className='bg-gradient-to-r from-blue-600 to-indigo-700 px-6 py-5 relative'>
          <button 
            onClick={onClose}
            className='absolute top-4 right-4 w-10 h-10 bg-white bg-opacity-20 hover:bg-opacity-30 rounded-xl flex items-center justify-center transition-all duration-200 hover:scale-105 text-white text-xl font-bold'
          >
            ✖
          </button>
          
          <div className='flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4'>
            <div>
              <h2 className='text-3xl font-bold text-white'>Create New Class</h2>
              <p className='text-blue-100 mt-1'>Schedule your next teaching session</p>
            </div>
            
            {/* Course Selection */}
            <div className='bg-white bg-opacity-10 backdrop-blur-sm rounded-xl p-4 min-w-fit'>
              <label className='block text-blue-100 text-sm font-medium mb-2'>Select Course</label>
              <select 
                value={CourseId} 
                onChange={(e) => setCourseId(e.target.value)} 
                className='w-full px-4 py-3 bg-white text-gray-800 rounded-lg border-0 outline-none focus:ring-2 focus:ring-blue-300 font-medium cursor-pointer min-w-[250px]'
              >
                {courses && courses.length > 0 ? (
                  courses.filter((course) => course.isapproved)
                  .map((course) => (
                    <option key={course._id} value={course._id}>
                      {course.coursename.toUpperCase()} [{course.schedule?.map(day => DAY[day.day]).join(', ') || 'No schedule'}]
                    </option>
                  ))
                ) : (
                  <option value="">No courses available</option>
                )}
              </select>
            </div>
          </div>
        </div>

        {/* Form Content */}
        <div className='p-8 space-y-8'>
          
          {/* Date & Time Section */}
          <div className='bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-6 border border-blue-100'>
            <h3 className='text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2'>
              <span className='text-2xl'>🕒</span>
              Schedule Details
            </h3>
            
            <div className='flex flex-col lg:flex-row lg:items-center gap-4'>
              <label htmlFor="datetime" className='text-lg font-medium text-black min-w-fit'>
                Date & Time:
              </label>
              <div className='flex-1'>
                <DateTime setDate={setDate} allowedDays={allowedDays}/>
              </div>
            </div>
          </div>

          {/* Class Information Section */}
          <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
            
            {/* Meeting Link */}
            <div className='space-y-3'>
              <label htmlFor="link" className='flex items-center gap-2 text-lg font-medium text-gray-700'>
                <span className='text-xl'>🔗</span>
                Meeting Link
              </label>
              <input 
                id="link" 
                value={link} 
                onChange={(e) => setLink(e.target.value)} 
                type="url" 
                placeholder="https://meet.google.com/..."
                className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-gray-800 placeholder-gray-400'
              />
            </div>

            {/* Class Title */}
            <div className='space-y-3'>
              <label htmlFor="title" className='flex items-center gap-2 text-lg font-medium text-gray-700'>
                <span className='text-xl'>📝</span>
                Class Title
              </label>
              <input 
                id="title" 
                value={note} 
                onChange={(e) => setNote(e.target.value)} 
                type="text" 
                placeholder="Enter class topic or title..."
                className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 text-gray-800 placeholder-gray-400'
              />
            </div>
          </div>

          {/* Error Display */}
          {error && (
            <div className='bg-red-50 border border-red-200 rounded-lg p-4'>
              <p className='text-red-700 font-medium'>Error: {error}</p>
            </div>
          )}

          {/* Action Buttons */}
          <div className='flex flex-col sm:flex-row gap-4 justify-center pt-6'>
            <button 
              onClick={onClose}
              className='px-8 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold rounded-lg transition-all duration-200 border border-gray-300'
            >
              Cancel
            </button>
            <button 
              onClick={addCourses}
              className='px-12 py-3 bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white font-semibold rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5'
            >
              Create Class
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddClass;
