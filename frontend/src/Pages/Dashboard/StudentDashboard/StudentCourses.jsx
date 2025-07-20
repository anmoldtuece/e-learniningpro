import React,{ useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Popup from './Popup';
import axios from 'axios';

function StudentCourses() {
  const { ID } = useParams();
  const [data, setdata] = useState([]);
  const [popup, setPopup] = useState(false);
  const [subDetails, setsubDetails] = useState({});
  const [subD, setsubD] = useState();
  const [error, setError] = useState(null);

  useEffect(() => {
      const getData = async () => {
        try {
          const response = await fetch(
            `${import.meta.env.VITE_BACKEND_URL}api/course/student/${ID}/enrolled`,
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
          setdata(user.data);
          console.log(user.data);

        } catch (error) {
          setError(error.message)
        }
      };
      getData();
  },[ID]);

  const openpopup = async(sub)=>{ 
    setsubDetails(sub);
    await axios.get(`${import.meta.env.VITE_BACKEND_URL}api/course/${sub.coursename}`)
      .then(res => {
        setPopup(true);
        setsubD(res.data.data);
      })
  }

  const price = {
    math: 700,
    physics: 800,
    computer: 1000,
    chemistry: 600,
    biology: 500,
  };

  const daysName = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

  const Image = {
    "physics" : "https://www.figma.com/file/6b4R8evBkii6mI53IA4vSS/image/8e9bf690d23d886f63466a814cfbec78187f91d2",
    "chemistry" : "https://www.figma.com/file/6b4R8evBkii6mI53IA4vSS/image/3e546b344774eb0235acc6bf6dad7814a59d6e95",
    "biology" : "https://www.figma.com/file/6b4R8evBkii6mI53IA4vSS/image/28ac70002ae0a676d9cfb0f298f3e453d12b5555",
    "math" : "https://www.figma.com/file/6b4R8evBkii6mI53IA4vSS/image/61930117e428a1f0f7268f888a84145f93aa0664",
    "computer" : "https://www.figma.com/file/6b4R8evBkii6mI53IA4vSS/image/a64c93efe984ab29f1dfb9e8d8accd9ba449f272",
  }

  const activeCourses = data.filter(course => course.status === "active");

  return (
    <>
    <div className='flex gap-10 pl-[12rem] mt-12 flex-wrap justify-center mb-2'>
      {activeCourses.map(sub => (
        <div
          key={sub._id}
          className="relative rounded-3xl shadow-xl cursor-pointer text-center p-8 min-h-[22rem] flex flex-col justify-between transition-transform transform hover:scale-x-105 hover:shadow-2xl"
          style={{
            width: "calc(100vw - 18rem)", // Full right side minus sidebar
            maxWidth: "80vw",
            background: "linear-gradient(120deg, #0d1a3a 0%, #0d3a5a 60%, #008280 100%)",
            border: "2px solid #ffe066"
          }}
          onClick={() => openpopup(sub)}
        >
          <div className="flex flex-row items-center justify-center gap-8 mb-6">
            <img
              src={Image[sub.coursename]}
              alt={sub.coursename}
              width={110}
              className="rounded-full border-4 border-[#ffe066] shadow-md"
            />
            <div>
              <p className="text-3xl font-extrabold text-[#ffe066] tracking-wide drop-shadow-lg">
                {sub.coursename.toUpperCase()}
              </p>
              <span className="block text-lg text-gray-200 mt-2 font-medium">
                {sub.category || "Course"}
              </span>
            </div>
          </div>
          <p className="mt-4 text-gray-100 text-lg px-8 font-medium leading-relaxed">
            {sub.description}
          </p>
          {sub.schedule && (
            <div className="mt-8 bg-[#ffe066]/10 rounded-lg p-5">
              <p className="text-[#ffe066] font-semibold mb-2 text-lg">Timing:</p>
              <span className="text-base text-gray-100">
                {'[ '}
                {sub.schedule.map(daytime => {
                  return `${daysName[daytime.day]} ${Math.floor(daytime.starttime / 60)}:${daytime.starttime % 60 === 0 ? "00" : daytime.starttime % 60} - ${Math.floor(daytime.endtime/60)}:${daytime.endtime % 60 === 0 ? "00" : daytime.endtime % 60}`;
                }).join(', ')}
                {' ]'}
              </span>
            </div>
          )}
          {/* <p className="mt-5 text-gray-300 text-sm text-center px-2">Fees : Rs. {price[sub.coursename]}</p> */}
        </div>
      ))}
    </div>
    {popup && (
      <Popup onClose={()=> setPopup(false)} subject={subDetails} allSubject={subD}/>
    )}
    </>
  )
}

export default StudentCourses