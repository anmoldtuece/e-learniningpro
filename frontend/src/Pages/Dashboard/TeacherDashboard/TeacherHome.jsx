import React from 'react';
import { Routes, Route } from 'react-router-dom';
import TeacherDashboard from './TeacherDashboard';
import TeacherClasses from './TeacherClasses';
import TeacherCourses from './TeacherCourses';

function TeacherHome() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {/* Example dashboard icons */}
      <div className="bg-blue-50 rounded-lg p-6 shadow text-blue-700 font-semibold">
        <span role="img" aria-label="Classes" className="text-4xl">📚</span>
        <div>Manage Classes</div>
      </div>
      <div className="bg-blue-50 rounded-lg p-6 shadow text-blue-700 font-semibold">
        <span role="img" aria-label="Courses" className="text-4xl">🎓</span>
        <div>Manage Courses</div>
      </div>
      <div className="bg-blue-50 rounded-lg p-6 shadow text-blue-700 font-semibold">
        <span role="img" aria-label="Profile" className="text-4xl">👤</span>
        <div>Profile</div>
      </div>
      {/* Add more icons as needed */}
    </div>
  );
}

function App() {
  return (
    <Routes>
      <Route path="/Teacher/Dashboard/:ID" element={<TeacherDashboard />}>
        <Route path="Home" element={<TeacherHome />} />
        <Route path="Classes" element={<TeacherClasses />} />
        <Route path="Courses" element={<TeacherCourses />} />
      </Route>
    </Routes>
  );
}

export default App;