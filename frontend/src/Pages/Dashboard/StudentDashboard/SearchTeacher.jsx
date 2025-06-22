import React, { useState } from 'react';
import Search from '../../Components/Searchbtn/Search';

function SearchTeacher() {
  const [popup, SetPopup] = useState(false);

  return (
    <div className="ml-56 p-6">
      <div className="flex justify-between items-center mb-6">
        <Search />
        <button
          onClick={() => SetPopup(true)}
          className="flex items-center gap-2 bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-600 hover:to-cyan-600 text-white px-7 py-2.5 rounded-full shadow-lg transition-all duration-200 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-teal-400"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none"
            viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
              d="M8 10h.01M12 10h.01M16 10h.01M21 12c0 4.418-4.03 8-9 8s-9-3.582-9-8 4.03-8 9-8 9 3.582 9 8z" />
          </svg>
          Give Feedback
        </button>
      </div>

      {popup && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40 backdrop-blur-sm">
          <div className="bg-white w-[90vw] md:w-[70vw] max-h-[90vh] overflow-y-auto rounded-2xl shadow-2xl p-10 transition-transform scale-100 duration-300">
            {/* Close Button */}
            <div className="flex justify-end mb-2">
              <button onClick={() => SetPopup(false)} className="text-gray-500 hover:text-gray-800">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none"
                  viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Header */}
            <h2 className="text-3xl font-bold text-center text-gray-800 mb-2">Student Feedback Form</h2>
            <p className="text-center text-gray-500 mb-6 border-b pb-4">
              Help us improve by providing your valuable feedback. Thank you!
            </p>

            {/* Form Fields */}
            <div className="space-y-6">
              {[
                { label: 'Teacher / Instructor', placeholder: 'Enter teacher name' },
                { label: 'Course Name', placeholder: 'Enter course name' },
                { label: 'What did you like about this course?', placeholder: 'Your thoughts...' }
              ].map((field, idx) => (
                <div key={idx}>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">{field.label}</label>
                  <input
                    type="text"
                    className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-teal-400 outline-none transition"
                    placeholder={field.placeholder}
                  />
                </div>
              ))}
            </div>

            {/* Rating Section */}
            <div className="mt-8">
              <p className="font-bold mb-4 text-gray-800">Please rate the following:</p>
              {[
                'Level of effort invested in course',
                'Level of knowledge on the subject',
                'Level of communication',
              ].map((question, qIdx) => (
                <div key={qIdx} className="mb-4">
                  <p className="mb-2 text-gray-700">{question}</p>
                  <div className="flex flex-wrap gap-4">
                    {['Very Good', 'Good', 'Fair', 'Poor', 'Very Poor'].map((label, i) => (
                      <label key={i} className="flex items-center text-sm text-gray-600 space-x-1">
                        <input type="radio" name={`rating-${qIdx}`} className="accent-teal-500" />
                        <span>{label}</span>
                      </label>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Recommend Question */}
            <div className="mt-6">
              <p className="font-medium text-gray-800 mb-2">Would you recommend this course?</p>
              <div className="flex gap-6">
                {['Yes', 'No'].map((option, i) => (
                  <label key={i} className="flex items-center space-x-2 text-gray-600">
                    <input type="radio" name="recommend" className="accent-teal-500" />
                    <span>{option}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex justify-center mt-10">
              <button className="bg-teal-600 hover:bg-teal-700 text-white font-medium px-10 py-3 rounded-full transition">
                Submit Feedback
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default SearchTeacher;
