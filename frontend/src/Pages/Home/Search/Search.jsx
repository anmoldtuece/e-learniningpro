import React, { useEffect, useState } from 'react'
import { NavLink, useParams } from 'react-router-dom';
import Header from '../Header/Header'

function search() {
    const { subject } = useParams();
    const [data, setData] = useState(subject);
    const [course, setCourse] = useState([]);
    const [openTM, setOpenTM] = useState(false);
    const [Tdec, setTeacherDetails] = useState(null);
    const [tname, setTname] = useState({});
    const [starCount, setStarCount] = useState(5);

    const price = {
        math: 700,
        physics: 800,
        computer: 1000,
        chemistry: 600,
        biology: 500,
    };

    const daysName = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    
    let SearchTeacher = async()=>{
        let Subject = data.toLowerCase();
        let Data = await fetch(`/api/course/${Subject}`)
        let response = await Data.json();
        if(response.statusCode == 200){
        setCourse(response.data)
        }
        setData('')
    }

    useEffect(()=>{
        SearchTeacher();
    },[])

    const openTeacherDec = async(id,fname,lname,sub)=>{
        setTname({fname,lname,sub});

        const data = await fetch('/api/teacher/teacherdocuments',{
            method: 'POST',
            credentials: "include",
            headers: {
            "Content-Type": "application/json",
            },
            body: JSON.stringify({teacherID : id}),
        })

        const res = await data.json();
        setTeacherDetails(res.data);
        setOpenTM(true);
    }

  return (
    <>
      <Header/>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-200 py-10 px-2 flex flex-col items-center">
        <div className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-5xl">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
            <img src="https://www.figma.com/file/6b4R8evBkii6mI53IA4vSS/image/6c476f454537d7f27cae2b4d0f31e2b59b3020f5" width={30} alt="" />
            <input
              type="text"
              placeholder="Ex: Math ..."
              value={data}
              onChange={(e) => setData(e.target.value)}
              className="w-full sm:w-64 border border-blue-200 rounded-lg px-4 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <button
              className="w-full sm:w-32 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition duration-200"
              onClick={SearchTeacher}
            >
              Find Teacher
            </button>
          </div>
          <div className="overflow-auto space-y-6">
            {course && course.length > 0 ? (
              course.map((Data) => (
                <div
                  key={Data._id}
                  className="relative bg-blue-100 border border-blue-200 p-6 rounded-xl flex flex-col md:flex-row md:items-center gap-4 shadow"
                >
                  <div className="text-blue-900 font-bold text-lg">
                    {Data.coursename.toUpperCase()}
                  </div>
                  <div
                    onClick={() =>
                      openTeacherDec(
                        Data.enrolledteacher.Teacherdetails,
                        Data.enrolledteacher.Firstname,
                        Data.enrolledteacher.Lastname,
                        Data.coursename
                      )
                    }
                    className="text-blue-700 cursor-pointer font-bold"
                  >
                    {Data.enrolledteacher.Firstname} {Data.enrolledteacher.Lastname}
                  </div>
                  <div className="text-gray-700">
                    <span className="font-semibold">Desc :</span> {Data.description}
                  </div>
                  <div className="text-gray-600">
                    <span className="font-semibold">Enrolled:</span> {Data.enrolledStudent.length}/20
                  </div>
                  <div className="md:absolute md:right-4">
                    <div
                      onClick={() => alert('Pls login to enroll it')}
                      className="text-white bg-blue-900 py-2 px-3 rounded-lg cursor-not-allowed"
                    >
                      Enroll Now
                    </div>
                  </div>
                  <div className="md:absolute md:bottom-2">
                    <span className="mt-2 font-bold">Timing : </span>
                    {'[ '}
                    {Data.schedule
                      .map((daytime) => {
                        return `${daysName[daytime.day]} ${Math.floor(daytime.starttime / 60)}:${
                          daytime.starttime % 60 === 0 ? '00' : daytime.starttime % 60
                        } - ${Math.floor(daytime.endtime / 60)}:${
                          daytime.endtime % 60 === 0 ? '00' : daytime.endtime % 60
                        }`;
                      })
                      .join(', ')}
                    {' ]'}
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center text-gray-500 py-8">No courses found.</div>
            )}
          </div>
        </div>
        {openTM && (
          <div className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex items-center justify-center z-50">
            <div className="bg-blue-800 w-96 h-[21rem] rounded-md relative">
              <div
                className="absolute w-9 h-9 bg-white rounded-xl cursor-pointer flex items-center justify-center m-2"
                onClick={() => setOpenTM(false)}
              >
                ✖️
              </div>
              <div className="flex flex-col justify-center p-5 text-1xl gap-4 text-white">
                <p className="text-center text-2xl bg-blue-900 rounded-sm py-1 text-white mb-5">
                  {tname.sub?.toUpperCase()}
                </p>
                <p>
                  Teacher Name : <span>{tname.fname} {tname.lname}</span>
                </p>
                <p>
                  Education : <span>Postgraduate from <b className="text-gray-200">{Tdec?.PGcollege}</b> with {Tdec?.PGmarks} CGPA</span>
                </p>
                <p>
                  Experience : <span>{Tdec?.Experience} years</span>
                </p>
                <p>
                  Course Name : <span>{tname.sub?.toUpperCase()}</span>
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default search