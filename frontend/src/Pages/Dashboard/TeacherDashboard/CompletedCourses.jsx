import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { TbBook, TbFileText, TbCurrencyRupee, TbCalendar } from "react-icons/tb";

function CompletedCourses() {
  const { ID } = useParams();
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  const price = {
    math: 700,
    physics: 800,
    computer: 1000,
    chemistry: 600,
    biology: 500,
  };

  const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

  useEffect(() => {
    const getCourses = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `${import.meta.env.VITE_BACKEND_URL}/api/course/teacher/${ID}/completed`,
          {
            credentials: 'include', // <-- Add this line to send cookies if needed
          }
        );
        const res = await response.json();
        setCourses(res.data);
      } catch (error) {
        // handle error
      } finally {
        setLoading(false);
      }
    };
    getCourses();
  }, [ID]);

  if (loading) {
    return <div>Loading...</div>;
  }

  const completedCourses = courses.filter(
    (course) => course.isapproved && course.status === "completed"
  );

  return (
    <div className="bg-gradient-to-br from-white via-blue-50 to-purple-50 rounded-2xl shadow-xl p-6 sm:p-8 border border-blue-100">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center shadow-md">
          <TbBook className="text-white text-2xl" />
        </div>
        <h3 className="text-2xl sm:text-3xl font-bold text-gray-800">Completed Courses</h3>
      </div>
      {completedCourses && completedCourses.length > 0 ? (
        <div className="space-y-6">
          {completedCourses.map((course) => (
            <div key={course._id} className="border border-blue-200 rounded-2xl p-4 sm:p-6 hover:shadow-lg transition-all duration-200 hover:border-blue-400 bg-white/90">
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-4">
                <div className="flex-1">
                  <h4 className="text-lg sm:text-xl font-semibold text-gray-800 capitalize mb-2 flex items-center gap-2 break-words">
                    <TbBook className="text-blue-600 flex-shrink-0" />
                    <span>{course.coursename}</span>
                  </h4>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <TbFileText className="text-blue-600 text-lg" />
                    <h4 className="font-semibold text-gray-700">Description</h4>
                  </div>
                  <div className="bg-white rounded-lg p-4 border border-gray-200">
                    <p className="text-gray-700 text-sm leading-relaxed">
                      {course.description || "No description provided"}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2 bg-gradient-to-r from-green-400 to-green-500 text-white px-3 sm:px-4 py-2 rounded-lg shadow-sm flex-shrink-0">
                  <TbCurrencyRupee className="text-lg" />
                  <span className="font-bold text-base sm:text-lg">
                    {price[course.coursename]?.toLocaleString() || 'N/A'}
                  </span>
                  <span className="text-xs sm:text-sm">per student/month</span>
                </div>
              </div>
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-4 border-l-4 border-blue-500">
                <div className="flex items-center gap-2 mb-3">
                  <TbCalendar className="text-blue-600 text-lg flex-shrink-0" />
                  <span className="font-semibold text-gray-700">Schedule</span>
                </div>
                <div className="text-gray-700 text-sm sm:text-base break-words">
                  <span className="font-medium">
                    {course.schedule.map(days => 
                      `${daysOfWeek[days.day]} ${Math.floor(days.starttime/60)}:${(days.starttime%60 === 0 ? "00" : days.starttime%60)} - ${Math.floor(days.endtime/60)}:${(days.endtime%60 === 0 ? "00" : days.endtime%60)}`
                    ).join(', ')}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <TbBook className="text-6xl text-blue-200 mx-auto mb-4" />
          <p className="text-gray-500 text-lg">No completed courses found</p>
        </div>
      )}
    </div>
  );
}

export default CompletedCourses;