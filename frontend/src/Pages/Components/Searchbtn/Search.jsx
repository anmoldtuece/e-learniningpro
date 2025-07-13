import React, { useEffect, useState } from "react";
import "./Search.css";
import { useParams } from "react-router-dom";
import logo from "../../Images/logo.svg";
import Success from "./Success";

function Search() {
  const [data, setData] = useState("");
  const [course, setCourse] = useState([]);
  const [courseID, setCourseID] = useState([]);
  const [popup, setPopup] = useState(false);
  const [idArray, setIdArray] = useState([]);
  const { ID } = useParams();
  const [openTM, setOpenTM] = useState(false);
  const [Tdec, setTeacherDetails] = useState(null);
  const [tname, setTname] = useState({});

  const price = {
    math: 700,
    physics: 800,
    computer: 1000,
    chemistry: 600,
    biology: 500,
  };

  const daysName = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

  const closePopup = () => {
    setPopup(false);
    window.location.reload();
  };

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

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await fetch(`/api/course/student/${ID}/enrolled`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        if (!response.ok) throw new Error('Failed to fetch data');
        const user = await response.json();
        setCourseID(user.data);
        setIdArray(prevIdArray => [...prevIdArray, ...user.data.map(res => res._id)]);
      } catch (error) {
        console.log(error.message)
      }
    };
    getData();
  }, []);
  
  const SearchTeacher = async (sub) => {
    const subject = sub.toLowerCase();
    const Data = await fetch(`/api/course/${subject}`);
    const response = await Data.json();
    if (response.statusCode === 200) {
      setCourse(response.data);
    }
    setData("");
  };

  const handleEnroll = async (courseName, id) => {
    let check = await fetch(
      `/api/course/${courseName}/${id}/verify/student/${ID}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const res = await check.json();
    if(res.statusCode === 200){
      const data = await fetch(`/api/payment/course/${id}/${courseName}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ fees: price[courseName]*100 }),
      });
      const DATA = await data.json();
      const Key = await fetch("/api/payment/razorkey", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const response = await Key.json();
      const options = {
        key: response.data.key,
        amount: price[courseName]*100,
        currency: "INR",
        name: "Gurukul",
        description: "Enroll in a course",
        image: logo,
        order_id: DATA.data.id,
        handler: async (response) => {
          const { razorpay_payment_id, razorpay_order_id, razorpay_signature } = response;
          const verificationData = { razorpay_payment_id, razorpay_order_id, razorpay_signature };
          const verificationResponse = await fetch(
            `/api/payment/confirmation/course/${id}`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(verificationData),
            }
          );
          const res = await verificationResponse.json();
          if (res.statusCode === 200) {
            try {
              let response = await fetch(
                `/api/course/${courseName}/${id}/add/student/${ID}`,
                {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                  },
                }
              );
              let res = await response.json();
              setPopup(true);
            } catch (error) {
              console.log(error);
            }
          }
        },
        prefill: {
          name: "Gaurav Kumar",
          email: "gaurav.kumar@example.com",
        },
        notes: {
          address: "Razorpay Corporate Office",
        },
        theme: {
          color: "#3399cc",
        },
      };
      const rzp1 = new window.Razorpay(options);
      rzp1.open();
    }else{
      alert(res.message)
    }
  };

  return (
    <>
      {/* Modernized Search Bar */}
      <div className="search mb-4">
        <img
          src="https://www.figma.com/file/6b4R8evBkii6mI53IA4vSS/image/6c476f454537d7f27cae2b4d0f31e2b59b3020f5"
          width={30}
          alt=""
        />
        <input
          type="text"
          placeholder="Search for a teacher or course..."
          value={data}
          onChange={(e) => setData(e.target.value)}
          className="text-lg"
        />
        <button className="w-32" onClick={() => SearchTeacher(data)}>
          Find Teacher
        </button>
      </div>
      {/* Modernized Teacher Cards */}
      <div className="flex justify-center w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-8 max-w-6xl w-full">
          {course &&
            course.map((Data) => (
              <div
                key={Data._id}
                className="relative bg-white rounded-xl shadow-lg p-6 flex flex-col items-center hover:scale-[1.02] transition"
              >
                <div className="flex items-center gap-4 mb-3 w-full">
                  <img
                    src={`https://ui-avatars.com/api/?name=${Data.enrolledteacher.Firstname}+${Data.enrolledteacher.Lastname}&background=14b8a6&color=fff`}
                    alt={Data.enrolledteacher.Firstname}
                    className="w-16 h-16 rounded-full shadow"
                  />
                  <div>
                    <h3 className="text-xl font-bold text-gray-800 mb-1">
                      {Data.enrolledteacher.Firstname} {Data.enrolledteacher.Lastname}
                    </h3>
                    <span className="bg-cyan-100 text-cyan-800 px-3 py-1 rounded-full text-sm font-semibold">
                      {Data.coursename.toUpperCase()}
                    </span>
                  </div>
                </div>
                <p className="text-gray-600 text-center mb-3 w-full">{Data.description}</p>
                <div className="flex items-center gap-2 mb-2">
                  <span className="bg-gray-100 px-2 py-1 rounded text-xs text-gray-700">
                    Students: {Data.enrolledStudent.length}/20
                  </span>
                  {Data.enrolledStudent.length >= 20 ? (
                    <span className="bg-red-100 text-red-700 px-2 py-1 rounded text-xs font-bold">Full</span>
                  ) : (
                    <span className="bg-green-100 text-green-700 px-2 py-1 rounded text-xs font-bold">Open</span>
                  )}
                </div>
                <div className="text-sm text-gray-500 mb-4 w-full">
                  <span className='font-bold'>Timing: </span>
                  {'[ '}
                  {Data.schedule.map(daytime => {
                    return `${daysName[daytime.day]} ${Math.floor(daytime.starttime / 60)}:${daytime.starttime % 60 === 0 ? "00" : daytime.starttime % 60} - ${Math.floor(daytime.endtime/60)}:${daytime.endtime % 60 === 0 ? "00" : daytime.endtime % 60}`;
                  }).join(', ')}
                  {' ]'}
                </div>
                <div className="flex w-full justify-between items-center">
                  <button
                    onClick={() => openTeacherDec(Data.enrolledteacher.Teacherdetails, Data.enrolledteacher.Firstname, Data.enrolledteacher.Lastname, Data.coursename)}
                    className="bg-cyan-100 text-cyan-800 px-4 py-2 rounded-full font-semibold hover:bg-cyan-200 transition"
                  >
                    View Details
                  </button>
                  {idArray.includes(Data._id) ? (
                    <button
                      onClick={()=> alert("You Already enrolled, pls find other course")}
                      className="bg-green-900 text-white px-4 py-2 rounded-full font-semibold cursor-not-allowed"
                    >
                      Already Enrolled
                    </button>
                  ) : Data.enrolledStudent.length < 20 ? (
                    <button
                      onClick={() => handleEnroll(Data.coursename, Data._id)}
                      className="bg-cyan-600 text-white px-4 py-2 rounded-full font-semibold hover:bg-cyan-700 transition"
                    >
                      Enroll Now
                    </button>
                  ) : (
                    <button
                      onClick={()=> alert("Already Full, pls find other course")}
                      className="bg-red-900 text-white px-4 py-2 rounded-full font-semibold cursor-not-allowed"
                    >
                      Already Full
                    </button>
                  )}
                </div>
              </div>
            ))}
        </div>
      </div>
      {/* Teacher Details Popup */}
      {openTM && (
        <div key='1' className='fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex items-center justify-center z-50'>
          <div className='bg-[#008280] w-96 h-[21rem] rounded-xl shadow-2xl relative'>
            <div className='absolute w-9 h-9 bg-white rounded-xl cursor-pointer flex items-center justify-center m-2 right-4 top-4' onClick={()=>setOpenTM(false)}>✖️</div>
            <div className='flex flex-col justify-center p-5 text-1xl gap-4'>
              <p className='text-center text-2xl bg-blue-900 rounded-sm py-1 text-white mb-5'>{tname.sub.toUpperCase()}</p>
              <p>Teacher Name : <span className='text-white'>{tname.fname} {tname.lname}</span></p>
              <p>Education : <span className='text-white'>Postgraduate from <b className='text-gray-200'>{Tdec.PGcollege}</b> with {Tdec.PGmarks} CGPA</span></p>
              <p>Experience : <span className='text-white'>{Tdec.Experience} years</span></p>
              <p>Course : <span className='text-white'>{tname.sub.toUpperCase()}</span></p>
            </div>
          </div>
        </div>
      )}
      {/* Success Popup */}
      {popup && <Success onClose={closePopup} />}
    </>
  );
}

export default Search;