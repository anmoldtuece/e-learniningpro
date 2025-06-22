import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import Popup from './Popup';

const fallbackPrice = {
  math: 700,
  physics: 800,
  computer: 1000,
  chemistry: 600,
  biology: 500,
};

const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

function TeacherCourses() {
  const { ID } = useParams();
  const [showPopup, setShowPopup] = useState(false);
  const [subject, setSubject] = useState('');
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchCourses = async () => {
    setLoading(true);
    try {
      const response = await fetch(`/api/course/Teacher/${ID}/enrolled`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) throw new Error("Failed to fetch courses");
      const res = await response.json();
      setCourses(res.data);
    } catch (err) {
      setCourses([]);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchCourses();
    // eslint-disable-next-line
  }, [showPopup]);

  useEffect(() => {
    if (showPopup) {
      const scrollBarWidth = window.innerWidth - document.documentElement.clientWidth;
      document.body.style.overflow = 'hidden';
      document.body.style.paddingRight = `${scrollBarWidth}px`;
    } else {
      document.body.style.overflow = '';
      document.body.style.paddingRight = '';
    }
    // Clean up on unmount
    return () => {
      document.body.style.overflow = '';
      document.body.style.paddingRight = '';
    };
  }, [showPopup]);

  const createCourse = (sub) => {
    setShowPopup(true);
    setSubject(sub);
  };

  return (
    <div className="p-8">
      <h2 className="text-xl font-bold mb-4 text-blue-700">Add a New Course</h2>
      <div className='flex gap-10 flex-wrap justify-center mb-10'>
        <div className="subject cursor-pointer" onClick={()=>createCourse("Physics")}>
          <img src="https://www.figma.com/file/6b4R8evBkii6mI53IA4vSS/image/8e9bf690d23d886f63466a814cfbec78187f91d2" alt="Physics" />
          <p>Physics</p>
        </div>
        <div className="subject cursor-pointer" onClick={()=>createCourse("Chemistry")}>
          <img src="https://www.figma.com/file/6b4R8evBkii6mI53IA4vSS/image/3e546b344774eb0235acc6bf6dad7814a59d6e95" alt="Chemistry" />
          <p>Chemistry</p>
        </div>
        <div className="subject cursor-pointer" onClick={()=>createCourse("Biology")}>
          <img src="https://www.figma.com/file/6b4R8evBkii6mI53IA4vSS/image/28ac70002ae0a676d9cfb0f298f3e453d12b5555" alt="Zoology" />
          <p>Biology</p>
        </div>
        <div className="subject cursor-pointer" onClick={()=>createCourse("Math")}>
          <img src="https://www.figma.com/file/6b4R8evBkii6mI53IA4vSS/image/61930117e428a1f0f7268f888a84145f93aa0664" alt="Math" />
          <p>Math</p>
        </div>
        <div className="subject cursor-pointer" onClick={()=>createCourse("Computer")}>
          <img src="https://www.figma.com/file/6b4R8evBkii6mI53IA4vSS/image/a64c93efe984ab29f1dfb9e8d8accd9ba449f272" alt="Computer" />
          <p>Computer</p>
        </div>
      </div>
      {showPopup && (
        <Popup onClose={() => setShowPopup(false)} subject={subject}/>
      )}

      <h2 className="text-2xl font-bold mb-6 text-blue-700">Your Courses</h2>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div className="mb-10">
          {courses && courses.length > 0 ? (
            courses.filter(course => course.isapproved).map(course => (
              <div key={course._id} className="bg-blue-50 rounded-lg p-4 mb-4 shadow text-blue-900">
                <div className="font-semibold text-lg">{course.coursename}</div>
                <div>
                  <span className="font-medium">Schedule:</span>{" "}
                  <span>
                    {course.schedule.map(days =>
                      `${daysOfWeek[days.day]} ${Math.floor(days.starttime/60)}:${(days.starttime%60 === 0 ? "00":days.starttime%60)} - ${Math.floor(days.endtime/60)}:${(days.endtime%60 === 0 ? "00" : days.endtime%60)}`
                    ).join(', ')}
                  </span>
                </div>
                <div>
                  <span className="font-medium">Price:</span>{" "}
                  Rs. {course.price ?? fallbackPrice[course.coursename?.toLowerCase()] ?? "N/A"} per student / per month
                </div>
                <div>
                  <span className="font-medium">Description:</span> {course.description}
                </div>
              </div>
            ))
          ) : (
            <div className="text-gray-500">No courses found.</div>
          )}
        </div>
      )}
    </div>
  );
}

export default TeacherCourses;