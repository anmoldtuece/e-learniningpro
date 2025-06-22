import React, { useEffect, useState } from 'react';
import Camera from '../Images/Camera.png';
import Clock from '../Images/Clock.png';
import AddClass from './AddClass';
import { NavLink, useParams } from 'react-router-dom';

function TeacherClasses() {
    const [showPopup, setShowPopup] = useState(false);
    const { ID } = useParams();
    const [data, setData] = useState([]);
    const [error, setError] = useState('');
    const [courses, setCourses] = useState([]);
    const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    useEffect(() => {
        const getCourses = async () => {
            try {
                const response = await fetch(`/api/course/Teacher/${ID}/enrolled`, {
                    method: 'GET',
                    headers: { 'Content-Type': 'application/json' },
                });
                if (!response.ok) throw new Error('Failed to fetch data');
                const res = await response.json();
                setCourses(res.data);
            } catch (error) {
                setError('Unable to load schedule.');
            }
        };
        getCourses();
    }, [ID]);

    const formatTime = (mins) =>
        `${Math.floor(mins / 60)}:${mins % 60 === 0 ? "00" : mins % 60}`;

    const weeklySchedule = Array(7).fill(0).map((_, dayIndex) => {
        const classes = [];

        courses.forEach(course => {
            if (course.isapproved && course.schedule?.length > 0) {
                course.schedule.forEach(slot => {
                    if (slot.day === dayIndex) {
                        classes.push({
                            coursename: course.coursename,
                            starttime: formatTime(slot.starttime),
                            endtime: formatTime(slot.endtime),
                            meetLink: course.meetLink,
                        });
                    }
                });
            }
        });

        return { day: daysOfWeek[dayIndex], classes };
    });

    if (error) return <div className="text-red-500">{error}</div>;

    return (
        <div className="ml-60 mt-20 mr-80 text-white">
            <h1 className="text-[#1671D8] text-3xl font-bold mb-6">Weekly Timetable</h1>

            {/* Weekly Timetable Format */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
                {weeklySchedule.map((day, index) => (
                    <div key={index} className="bg-white text-black rounded-xl shadow p-5">
                        <h2 className="text-xl font-semibold text-blue-600 mb-4">{day.day}</h2>
                        {day.classes.length > 0 ? (
                            <ul className="space-y-3">
                                {day.classes.map((cls, i) => (
                                    <li key={i} className="flex justify-between items-center text-sm border-b pb-2">
                                        <div>
                                            <p className="font-medium">{cls.coursename}</p>
                                            <p className="text-gray-600">
                                                {cls.starttime} - {cls.endtime}
                                            </p>
                                            {cls.meetLink && (
                                                <a
                                                    href={cls.meetLink}
                                                    target="_blank"
                                                    rel="noreferrer"
                                                    className="text-blue-500 hover:underline text-xs"
                                                >
                                                    Google Meet
                                                </a>
                                            )}
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p className="text-gray-500">No classes</p>
                        )}
                    </div>
                ))}
            </div>

            {/* Upcoming Classes */}
            <div className='flex justify-between items-start'>
                <div className='w-[60%] h-[17rem] overflow-y-auto pr-4'>
                    {data.filter(clas => {
                        const classDate = new Date(clas.date.slice(0, 10));
                        const today = new Date();
                        const oneWeekFromNow = new Date();
                        oneWeekFromNow.setDate(today.getDate() + 7);
                        return classDate >= today && classDate <= oneWeekFromNow;
                    }).map(clas => (
                        <div key={clas.timing} className='flex items-center mb-5'>
                            <img src="https://www.pngall.com/wp-content/uploads/5/Profile-Male-PNG.png" alt="profile_img" width={30} />
                            <div className='ml-5 mr-10 font-bold'>
                                <p className='text-lg'>
                                    {clas.coursename}
                                    <span className='text-black text-sm ml-3'>
                                        {clas.date.slice(0, 10)}  {formatTime(clas.timing)}
                                    </span>
                                </p>
                                <span className='text-blue-500 text-sm ml-3'>{clas.title.slice(0, 35)} ...</span>
                            </div>
                            <p className='text-sm bg-[#4E84C1] p-2 rounded-lg'>{clas.status}</p>
                        </div>
                    ))}
                </div>

                {/* Next Class Card */}
                {data.length > 0 && (
                    <NavLink to={data[0]?.link} target='_blank'>
                        <div className='bg-white p-5 h-52 rounded-lg text-black shadow-md'>
                            <div className='flex gap-3 items-center mb-5'>
                                <img src={Clock} alt="clock" width={40} />
                                <span className='text-[#4E84C1] text-xl font-semibold'>
                                    {typeof data[0]?.date === 'string' ? data[0]?.date.slice(0, 10) : ''}
                                </span>
                                <span className='text-[#018280] text-xl ml-2'>
                                    {typeof data[0]?.timing === 'number' ? formatTime(data[0].timing) : ''}
                                </span>
                            </div>
                            <div className='flex justify-between items-center'>
                                <div>
                                    <p className='text-sm'>Your next Class</p>
                                    <p className='text-[#018280] text-2xl font-semibold'>{data[0]?.coursename?.toUpperCase()}</p>
                                    <p className='text-blue-700 text-sm'>{data[0]?.title.slice(0, 25)} ...</p>
                                </div>
                                <img src={Camera} alt="Camera" width={60} />
                            </div>
                        </div>
                    </NavLink>
                )}
            </div>

            {/* Add Class Button */}
            <div onClick={() => setShowPopup(true)} className='fixed bottom-10 right-10 bg-blue-900 px-4 py-2 rounded-lg cursor-pointer hover:bg-blue-800 transition'>
                + ADD CLASS
            </div>
            {showPopup && (
                <AddClass onClose={() => setShowPopup(false)} />
            )}
        </div>
    );
}

export default TeacherClasses;
