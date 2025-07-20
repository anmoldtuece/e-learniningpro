import React, { useEffect, useState } from 'react';
import Camera from '../Images/Camera.png';
import Clock from '../Images/Clock.png';
import AddClass from './AddClass';
import { NavLink, useParams } from 'react-router-dom';
import { TbCalendarEvent, TbClock, TbVideo, TbPlus, TbUser } from 'react-icons/tb';

function TeacherClasses() {
    const [showPopup, setShowPopup] = useState(false);
    const { ID } = useParams();
    const [data, setData] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        const getData = async () => {
            try {
                const response = await fetch(
                    `${import.meta.env.VITE_BACKEND_URL}api/course/classes/teacher/${ID}`,
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

                const user = await response.json();
                // Defensive checks for API response
                let liveClasses = [];
                if (
                    user &&
                    user.data &&
                    Array.isArray(user.data.classes) &&
                    user.data.classes.length > 0 &&
                    Array.isArray(user.data.classes[0].liveClasses)
                ) {
                    liveClasses = user.data.classes[0].liveClasses;
                }
                setData(liveClasses);
            } catch (error) {
                setError(error.message);
            }
        };
        getData();
    }, [showPopup, ID]);

    const formatTime = (timing) => {
        const hours = Math.floor(timing / 60);
        const minutes = timing % 60;
        return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
    };

    const getStatusColor = (status) => {
        switch (status.toLowerCase()) {
            case 'upcoming': return 'bg-blue-500 text-white';
            case 'live': return 'bg-green-500 text-white';
            case 'completed': return 'bg-gray-500 text-white';
            default: return 'bg-blue-500 text-white';
        }
    };

    if (error) {
        return (
            <div className="ml-60 mt-20 p-8">
                <div className="bg-red-50 border border-red-200 rounded-lg p-6">
                    <h2 className="text-red-800 text-xl font-semibold mb-2">Error Loading Classes</h2>
                    <p className="text-red-600">{error}</p>
                </div>
            </div>
        );
    }

    // Defensive filter for weeklyClasses
    const weeklyClasses = Array.isArray(data)
        ? data.filter(clas => {
            if (!clas || !clas.date) return false;
            const classDate = new Date(clas.date.slice(0, 10));
            const today = new Date();
            const oneWeekFromNow = new Date();
            oneWeekFromNow.setDate(today.getDate() + 7);
            return classDate >= today && classDate <= oneWeekFromNow;
        })
        : [];

    return (
        <div className='min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-6'>
            <div className='max-w-7xl mx-auto space-y-8'>
                
                {/* Header Section */}
                <div className='flex justify-between items-center'>
                    <div className='flex items-center gap-3'>
                        <div className='bg-blue-600 p-3 rounded-xl'>
                            <TbCalendarEvent className='text-white text-2xl' />
                        </div>
                        <div>
                            <h1 className='text-3xl font-bold text-gray-800'>My Classes</h1>
                            <p className='text-gray-600 mt-1'>Manage your teaching schedule</p>
                        </div>
                    </div>
                    
                    <button 
                        onClick={() => setShowPopup(true)}
                        className='bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 text-white px-6 py-3 rounded-lg font-semibold flex items-center gap-2 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5'
                    >
                        <TbPlus className='text-xl' />
                        Add New Class
                    </button>
                </div>

                <div className='grid grid-cols-1 lg:grid-cols-3 gap-8'>
                    
                    {/* Weekly Schedule Section */}
                    <div className='lg:col-span-2'>
                        <div className='bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden'>
                            <div className='bg-gradient-to-r from-blue-600 to-indigo-700 px-6 py-4'>
                                <h2 className='text-2xl font-bold text-white flex items-center gap-2'>
                                    <TbCalendarEvent className='text-xl' />
                                    Weekly Schedule
                                </h2>
                                <p className='text-blue-100 mt-1'>Your classes for the next 7 days</p>
                            </div>
                            
                            <div className='p-6'>
                                {weeklyClasses.length > 0 ? (
                                    <div className='space-y-4 max-h-96 overflow-y-auto'>
                                        {weeklyClasses.map((clas, index) => (
                                            <div key={`${clas.timing}-${index}`} className='bg-gray-50 rounded-xl p-4 border border-gray-200 hover:shadow-md transition-all duration-200'>
                                                <div className='flex items-center justify-between'>
                                                    <div className='flex items-center gap-4'>
                                                        <div className='bg-blue-100 p-3 rounded-full'>
                                                            <TbUser className='text-blue-600 text-xl' />
                                                        </div>
                                                        <div>
                                                            <h3 className='text-lg font-semibold text-gray-800'>
                                                                {clas.coursename}
                                                            </h3>
                                                            <div className='flex items-center gap-4 mt-1'>
                                                                <span className='text-gray-600 flex items-center gap-1'>
                                                                    <TbCalendarEvent className='text-sm' />
                                                                    {clas.date.slice(0, 10)}
                                                                </span>
                                                                <span className='text-gray-600 flex items-center gap-1'>
                                                                    <TbClock className='text-sm' />
                                                                    {formatTime(clas.timing)}
                                                                </span>
                                                            </div>
                                                            <p className='text-blue-600 text-sm mt-1'>
                                                                {clas.title.slice(0, 35)}{clas.title.length > 35 ? '...' : ''}
                                                            </p>
                                                            {/* Show Meet Link or Alert */}
                                                            <div className='mt-2'>
                                                                {clas.link ? (
                                                                    <a
                                                                        href={clas.link}
                                                                        target="_blank"
                                                                        rel="noopener noreferrer"
                                                                        className="text-blue-700 underline font-semibold"
                                                                    >
                                                                        Join Google Meet
                                                                    </a>
                                                                ) : (
                                                                    <span className="text-red-500 font-semibold">No link provided by teacher</span>
                                                                )}
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(clas.status)}`}>
                                                        {clas.status}
                                                    </span>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <div className='text-center py-12'>
                                        <div className='text-6xl mb-4'>📅</div>
                                        <h3 className='text-xl font-semibold text-gray-600 mb-2'>No Classes This Week</h3>
                                        <p className='text-gray-500'>Schedule your first class to get started</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                </div>
            </div>

            {showPopup && (
                <AddClass onClose={() => setShowPopup(false)} />
            )}
        </div>
    );
}

export default TeacherClasses;
