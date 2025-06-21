import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

function StudentClasses() {
    const { ID } = useParams();
    const [classes, setClasses] = useState([]);

    useEffect(() => {
        const getData = async () => {
            try {
                const response = await fetch(`/api/course/classes/student/${ID}`, {
                    method: 'GET',
                    headers: { 'Content-Type': 'application/json' },
                });

                if (!response.ok) throw new Error('Failed to fetch data');
                const user = await response.json();
                setClasses(user.data.classes || []);
            } catch (error) {
                // handle error
            }
        };
        getData();
    }, [ID]);

    // Filter for upcoming week
    const upcomingClasses = classes.filter(clas => {
        if (!clas.date) return false;
        const classDate = new Date(clas.date.slice(0, 10));
        const today = new Date();
        const oneWeekFromNow = new Date(today);
        oneWeekFromNow.setDate(today.getDate() + 7);
        return classDate >= today && classDate <= oneWeekFromNow;
    });

    return (
        <div className='ml-60 mt-20 text-white flex flex-col mr-60'>
            <h1 className='text-[#1671D8] text-2xl mt-4 mb-4 font-semibold'>Weekly Schedule</h1>
            <div className='h-[17rem] w-[40rem] overflow-auto bg-white rounded-lg p-4'>
                {upcomingClasses.length === 0 ? (
                    <div className="text-gray-500">No upcoming classes.</div>
                ) : (
                    upcomingClasses.map((clas, idx) => (
                        <div key={idx} className='flex items-center mb-5 border-b pb-3'>
                            <img src="https://www.pngall.com/wp-content/uploads/5/Profile-Male-PNG.png" alt="profile_img" width={30} />
                            <div className='ml-5 mr-10 font-bold text-black'>
                                <p className='text-lg'>
                                    {clas.coursename}
                                    <span className='text-gray-700 text-sm ml-3'>
                                        {clas.date ? clas.date.slice(0, 10) : ''}  
                                        {typeof clas.timing === 'number' && (
                                            <> {Math.floor(clas.timing / 60)}:{clas.timing % 60 === 0 ? "00" : clas.timing % 60}</>
                                        )}
                                    </span>
                                </p>
                                <p className='text-blue-700 text-sm ml-3'>Instructor: {clas.instructor}</p>
                                <span className='text-blue-500 text-sm ml-3'>{clas.title ? clas.title.slice(0, 35) : ''}</span>
                                {clas.link && (
                                    <a
                                        href={clas.link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="block text-blue-600 underline hover:text-blue-800 mt-1"
                                    >
                                        Google Meet Link
                                    </a>
                                )}
                            </div>
                            <p className='text-sm bg-[#4E84C1] p-2 rounded-lg'>{clas.status}</p>
                        </div>
                    ))
                )}
            </div>
        </div>
    )
}

export default StudentClasses