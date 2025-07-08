import React,{ useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Popup from './Popup';
import axios from 'axios';
import { TbCalendarEvent, TbClock } from 'react-icons/tb';

function StudentCourses() {
  const { ID } = useParams();
  const [data, setdata] = useState([]);
  const [popup, setPopup] = useState(false);
  const [subDetails, setsubDetails] = useState({});
  const [subD, setsubD] = useState();
  const [weeklyClasses, setWeeklyClasses] = useState([]);

  useEffect(() => {
      const getData = async () => {
        try {
          const response = await fetch(`/api/course/student/${ID}/enrolled`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
          });
  
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
  },[]);

  useEffect(() => {
    const getWeeklyClasses = async () => {
      try {
        const response = await fetch(`/api/course/classes/student/${ID}`, {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' },
        });
        if (!response.ok) throw new Error('Failed to fetch classes');
        const user = await response.json();
        // Filter for upcoming week
        const classes = (user.data.classes || []).filter(clas => {
          if (!clas.date) return false;
          const classDate = new Date(clas.date.slice(0, 10));
          const today = new Date();
          const oneWeekFromNow = new Date(today);
          oneWeekFromNow.setDate(today.getDate() + 7);
          return classDate >= today && classDate <= oneWeekFromNow;
        });
        setWeeklyClasses(classes);
      } catch (error) {
        // handle error
      }
    };
    getWeeklyClasses();
  }, [ID]);

  const openpopup = async(sub)=>{ 
    setsubDetails(sub);
    await axios.get(`/api/course/${sub.coursename}`)
      .then(res => {setPopup(true);
      setsubD(res.data.data)})
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

  return (
    <>
    <div className="flex flex-col gap-8 justify-center mt-12 px-4 max-w-4xl mx-auto">
      {data.map(sub => (
        <div
          key={sub._id}
          className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-shadow duration-200 cursor-pointer w-full flex flex-row items-center border border-gray-100 group"
          onClick={() => openpopup(sub)}
        >
          <div className="flex-shrink-0 w-40 h-40 rounded-l-2xl overflow-hidden flex items-center justify-center bg-gradient-to-br from-teal-50 to-cyan-50">
            <img
              src={Image[sub.coursename]}
              alt={sub.coursename}
              className="object-contain h-28 transition-transform duration-200 group-hover:scale-105"
            />
          </div>
          <div className="flex-1 flex flex-col justify-center px-6 py-6">
            <h3 className="text-xl font-bold text-teal-700 mb-1 tracking-wide">{sub.coursename.toUpperCase()}</h3>
            <p className="text-gray-500 text-base mb-3 min-h-[48px]">{sub.description}</p>
            {sub.schedule && (
              <div className="w-full mt-2">
                <p className="text-lg font-bold text-blue-700 mb-1">Timing:</p>
                <p className="text-base font-semibold text-gray-700">
                  {sub.schedule.map(daytime => {
                    return `${daysName[daytime.day]} ${Math.floor(daytime.starttime / 60)}:${daytime.starttime % 60 === 0 ? "00" : daytime.starttime % 60} - ${Math.floor(daytime.endtime/60)}:${daytime.endtime % 60 === 0 ? "00" : daytime.endtime % 60}`;
                  }).join(', ')}
                </p>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
    {popup && (
      <Popup onClose={() => setPopup(false)} subject={subDetails} allSubject={subD} />
    )}
    </>
  )
}

export default StudentCourses