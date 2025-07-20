import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { TbX, TbBook, TbClock, TbFileText, TbCurrencyRupee, TbCalendarEvent } from 'react-icons/tb';

function Popup({ onClose, subject }) {
  const [desc, setDesc] = useState('');
  const [price, setPrice] = useState('');
  const { ID } = useParams();
  const dateGap = 3; // 3 hours

  const [day, setDay] = useState({
    sun: false,
    mon: false,
    tue: false,
    wed: false,
    thu: false,
    fri: false,
    sat: false,
  });

  const [dayValue, setDayValue] = useState({
    sun: '',
    mon: '',
    tue: '',
    wed: '',
    thu: '',
    fri: '',
    sat: '',
  });

  const dayIndex = {
    sun: 0,
    mon: 1,
    tue: 2,
    wed: 3,
    thu: 4,
    fri: 5,
    sat: 6,
  };

  const dayNames = {
    sun: 'Sunday',
    mon: 'Monday',
    tue: 'Tuesday',
    wed: 'Wednesday',
    thu: 'Thursday',
    fri: 'Friday',
    sat: 'Saturday',
  };

  const handleCheckboxChange = (dayName) => {
    setDay((prevDay) => ({ ...prevDay, [dayName]: !prevDay[dayName] }));
  };

  const addCourse = async () => {
    const selectedDays = Object.keys(day)
      .filter((d) => day[d])
      .map((d) => ({
        day: dayIndex[d],
        starttime: dayValue[d] ? convertTimeToMinutes(dayValue[d]) : null,
        endtime: dayValue[d] ? convertTimeToMinutes(dayValue[d]) + dateGap * 60 : null,
      }));

    const hasMissingTime = selectedDays.some((d) => d.starttime === null);

    if (hasMissingTime) {
      alert('Please fill in the time for all selected days.');
      return;
    }

    const invalidTimeRange = selectedDays.some((d) => {
      const startTime = d.starttime;
      const endTime = d.endtime;
      if (startTime >= endTime) {
        alert('Start time must be earlier than end time.');
        return true;
      }
      if ((endTime - startTime) > 3 * 60) {
        alert('End time should not be more than 3 hours after start time.');
        return true;
      }
      return false;
    });

    if (invalidTimeRange) {
      return;
    }

    if (desc === '') {
      alert('Fill the description.');
      return;
    }

    if(selectedDays.length === 0){
      alert('Please select any day and time.');
      return;
    }

    if (price === '' || isNaN(price) || parseFloat(price) <= 0) {
      alert('Please enter a valid price.');
      return;
    }

    onClose();

    const data = {
      coursename: subject.toLowerCase(),
      description: desc,
      schedule: selectedDays,
      price: price,
    };

    // Call API with backend URL from .env
    const response = await fetch(
      `${import.meta.env.VITE_BACKEND_URL}api/course/${subject}/create/${ID}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      }
    );

    const responseData = await response.json();
    console.log(responseData);
    alert(responseData.message);
  };

  const convertTimeToMinutes = (time) => {
    const [hours, minutes] = time.split(':').map(Number);
    return hours * 60 + minutes;
  };

  const convertMinutesToTime = (minutes) => {
    const hours = String(Math.floor(minutes / 60)).padStart(2, '0');
    const mins = String(minutes % 60).padStart(2, '0');
    return `${hours}:${mins}`;
  };

  return (
    <div className='fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50'>
      <div className='bg-white w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl shadow-2xl'>
        
        {/* Header Section */}
        <div className='bg-gradient-to-r from-teal-600 to-cyan-700 px-8 py-6 relative rounded-t-2xl'>
          <button
            onClick={onClose}
            className='absolute top-4 right-4 w-10 h-10 bg-white/20 hover:bg-white/30 rounded-xl flex items-center justify-center transition-all duration-200 hover:scale-105'
          >
            <TbX className='text-white text-xl' />
          </button>
          
          <div className='flex items-center gap-3'>
            <div className='bg-white/20 p-3 rounded-xl'>
              <TbBook className='text-white text-2xl' />
            </div>
            <div>
              <h2 className='text-3xl font-bold text-white'>Create New Course</h2>
              <p className='text-teal-100 mt-1'>Set up your {subject} course</p>
            </div>
          </div>
        </div>

        {/* Form Content */}
        <div className='p-8 space-y-8'>
          
          {/* Course Information */}
          <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
            <div className='space-y-3'>
              <label className='flex items-center gap-2 text-lg font-semibold text-gray-700'>
                <TbBook className='text-teal-600' />
                Course Name
              </label>
              <input
                type='text'
                className='w-full p-4 bg-gray-100 rounded-lg border-0 outline-none text-gray-800 font-medium'
                value={subject}
                readOnly
              />
            </div>

            <div className='space-y-3'>
              <label className='flex items-center gap-2 text-lg font-semibold text-gray-700'>
                <TbCurrencyRupee className='text-green-600' />
                Course Price (per month)
              </label>
              <input
                type="number"
                min="0"
                className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all text-gray-800"
                value={price}
                onChange={e => setPrice(e.target.value)}
                placeholder="Enter price in INR"
                required
              />
            </div>
          </div>

          {/* Description */}
          <div className='space-y-3'>
            <label className='flex items-center gap-2 text-lg font-semibold text-gray-700'>
              <TbFileText className='text-blue-600' />
              Course Description
            </label>
            <textarea
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
              className='w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all text-gray-800 resize-none h-24'
              placeholder="Describe your course content and objectives..."
            />
          </div>

          {/* Schedule Section */}
          <div className='space-y-6'>
            <div className='flex items-center gap-2'>
              <TbCalendarEvent className='text-purple-600 text-xl' />
              <h3 className='text-xl font-semibold text-gray-800'>Weekly Schedule</h3>
            </div>
            
            <div className='bg-gray-50 rounded-xl p-6 space-y-4'>
              <p className='text-gray-600 text-sm mb-4'>Select days and times for your classes (3-hour duration)</p>
              
              {Object.keys(day).map((d) => (
                <div key={d} className='flex items-center gap-4 p-4 bg-white rounded-lg border border-gray-200'>
                  <div className='flex items-center gap-3 min-w-[120px]'>
                    <input
                      type='checkbox'
                      checked={day[d]}
                      onChange={() => handleCheckboxChange(d)}
                      className='w-5 h-5 text-teal-600 rounded focus:ring-teal-500'
                    />
                    <label className='font-medium text-gray-700'>
                      {dayNames[d]}
                    </label>
                  </div>
                  
                  <div className='flex items-center gap-3 flex-1'>
                    <div className='space-y-1'>
                      <label className='text-sm text-gray-600'>Start Time</label>
                      <input
                        className='w-32 p-2 border border-gray-300 rounded-lg text-gray-800 focus:ring-2 focus:ring-teal-500 focus:border-transparent'
                        type='time'
                        value={dayValue[d]}
                        onChange={(e) =>
                          setDayValue({ ...dayValue, [d]: e.target.value })
                        }
                        disabled={!day[d]}
                      />
                    </div>
                    
                    <div className='text-gray-400 text-xl'>→</div>
                    
                    <div className='space-y-1'>
                      <label className='text-sm text-gray-600'>End Time</label>
                      <input
                        className='w-32 p-2 bg-gray-100 border border-gray-300 rounded-lg text-gray-600'
                        type='time'
                        readOnly
                        value={dayValue[d] ? convertMinutesToTime(convertTimeToMinutes(dayValue[d]) + dateGap * 60) : ''}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className='flex flex-col sm:flex-row gap-4 justify-center pt-6'>
            <button
              onClick={onClose}
              className='px-8 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold rounded-lg transition-all duration-200 border border-gray-300'
            >
              Cancel
            </button>
            <button
              onClick={addCourse}
              className='px-12 py-3 bg-gradient-to-r from-teal-600 to-cyan-700 hover:from-teal-700 hover:to-cyan-800 text-white font-semibold rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5'
            >
              Create Course
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Popup;
