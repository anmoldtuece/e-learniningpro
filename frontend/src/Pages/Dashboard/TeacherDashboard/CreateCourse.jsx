import React, { useState } from 'react'
import Popup from './Popup';

function CreateCourse() { // <-- remove onClose
  const [showPopup, setShowPopup] = useState(false);
  const [subject, setSubject] = useState('');

  const crreateCourse = (sub) => {
    setShowPopup(true);
    setSubject(sub);
  }

  return (
    <div className='min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12'>
      <div className='max-w-6xl mx-auto px-6'>
        <h1 className='text-4xl font-bold text-center text-gray-800 mb-12'>
          Choose Your Subject
        </h1>
        
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-8 justify-items-center'>
          <div 
            className="subject-card group cursor-pointer transform transition-all duration-300 hover:scale-105 hover:shadow-xl"
            onClick={() => crreateCourse("Physics")}
          >
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:border-blue-300">
              <div className="flex flex-col items-center space-y-4">
                <div className="w-20 h-20 rounded-full bg-gradient-to-r from-blue-400 to-blue-600 flex items-center justify-center group-hover:from-blue-500 group-hover:to-blue-700 transition-all duration-300">
                  <img 
                    src="https://www.figma.com/file/6b4R8evBkii6mI53IA4vSS/image/8e9bf690d23d886f63466a814cfbec78187f91d2" 
                    alt="Physics" 
                    className="w-12 h-12 object-contain filter brightness-0 invert"
                  />
                </div>
                <p className="text-lg font-semibold text-gray-700 group-hover:text-blue-600 transition-colors duration-300">
                  Physics
                </p>
              </div>
            </div>
          </div>

          <div 
            className="subject-card group cursor-pointer transform transition-all duration-300 hover:scale-105 hover:shadow-xl"
            onClick={() => crreateCourse("Chemistry")}
          >
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:border-green-300">
              <div className="flex flex-col items-center space-y-4">
                <div className="w-20 h-20 rounded-full bg-gradient-to-r from-green-400 to-green-600 flex items-center justify-center group-hover:from-green-500 group-hover:to-green-700 transition-all duration-300">
                  <img 
                    src="https://www.figma.com/file/6b4R8evBkii6mI53IA4vSS/image/3e546b344774eb0235acc6bf6dad7814a59d6e95" 
                    alt="Chemistry" 
                    className="w-12 h-12 object-contain filter brightness-0 invert"
                  />
                </div>
                <p className="text-lg font-semibold text-gray-700 group-hover:text-green-600 transition-colors duration-300">
                  Chemistry
                </p>
              </div>
            </div>
          </div>

          <div 
            className="subject-card group cursor-pointer transform transition-all duration-300 hover:scale-105 hover:shadow-xl"
            onClick={() => crreateCourse("Biology")}
          >
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:border-emerald-300">
              <div className="flex flex-col items-center space-y-4">
                <div className="w-20 h-20 rounded-full bg-gradient-to-r from-emerald-400 to-emerald-600 flex items-center justify-center group-hover:from-emerald-500 group-hover:to-emerald-700 transition-all duration-300">
                  <img 
                    src="https://www.figma.com/file/6b4R8evBkii6mI53IA4vSS/image/28ac70002ae0a676d9cfb0f298f3e453d12b5555" 
                    alt="Biology" 
                    className="w-12 h-12 object-contain filter brightness-0 invert"
                  />
                </div>
                <p className="text-lg font-semibold text-gray-700 group-hover:text-emerald-600 transition-colors duration-300">
                  Biology
                </p>
              </div>
            </div>
          </div>

          <div 
            className="subject-card group cursor-pointer transform transition-all duration-300 hover:scale-105 hover:shadow-xl"
            onClick={() => crreateCourse("Math")}
          >
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:border-purple-300">
              <div className="flex flex-col items-center space-y-4">
                <div className="w-20 h-20 rounded-full bg-gradient-to-r from-purple-400 to-purple-600 flex items-center justify-center group-hover:from-purple-500 group-hover:to-purple-700 transition-all duration-300">
                  <img 
                    src="https://www.figma.com/file/6b4R8evBkii6mI53IA4vSS/image/61930117e428a1f0f7268f888a84145f93aa0664" 
                    alt="Math" 
                    className="w-12 h-12 object-contain filter brightness-0 invert"
                  />
                </div>
                <p className="text-lg font-semibold text-gray-700 group-hover:text-purple-600 transition-colors duration-300">
                  Math
                </p>
              </div>
            </div>
          </div>

          <div 
            className="subject-card group cursor-pointer transform transition-all duration-300 hover:scale-105 hover:shadow-xl"
            onClick={() => crreateCourse("Computer")}
          >
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:border-orange-300">
              <div className="flex flex-col items-center space-y-4">
                <div className="w-20 h-20 rounded-full bg-gradient-to-r from-orange-400 to-orange-600 flex items-center justify-center group-hover:from-orange-500 group-hover:to-orange-700 transition-all duration-300">
                  <img 
                    src="https://www.figma.com/file/6b4R8evBkii6mI53IA4vSS/image/a64c93efe984ab29f1dfb9e8d8accd9ba449f272" 
                    alt="Computer" 
                    className="w-12 h-12 object-contain filter brightness-0 invert"
                  />
                </div>
                <p className="text-lg font-semibold text-gray-700 group-hover:text-orange-600 transition-colors duration-300">
                  Computer
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {showPopup && (
        <Popup onClose={() => setShowPopup(false)} subject={subject} />
      )}
    </div>
  )
}

export default CreateCourse;
