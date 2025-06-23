import React, { useState } from "react";
import "./Landing.css";
import image from "../../Images/image.png";
import Plant from "../../Images/Plant.svg";
import Plant2 from "../../Images/Plant2.svg"
import Contact from "../Contact/Contact.jsx";
import Header from "../Header/Header.jsx";
import { CgProfile } from "react-icons/cg";
import { IoSchoolSharp } from "react-icons/io5";
import { FaSchool } from "react-icons/fa";
import { NavLink , useNavigate} from "react-router-dom";
import Bot from "../Bot";

function Landing() {
  const [LClass, setLClass] = useState(false);
  const [EMentor, setEMentor] = useState(false);
  const [subject, setSubject] = useState('');
  
  const [facList, setFacList] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate()

  const handleSearch = ()=>{
    // console.log('working')
    navigate(`/Search/${subject}`)
  }

  const AA = ()=>{
    setEMentor(true);
    setLClass(false);
  }

  const BB = ()=>{
    setEMentor(false);
    setLClass(true);
  }

  const teachersList = async(sub)=>{
    setLoading(true);

    const response = await fetch(`/api/course/${sub}`, {
      method: 'GET',
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      }
    });

    const data = await response.json();
    setFacList(data.data);
    console.log(data.data);
    setLoading(false);
  }


  return (
    <>
    <Header/>
    {/* Top Section */}
      <div className="top">
        <div className="left">
          <h1>
          Empowering Minds, Inspiring Futures: <br />Your Gateway to Online Learning with <span className="font-semibold text-blue-600 font-serif text-5xl">DTU E-learning</span>
          </h1>
          {/*  Search  */}

          <div className="w-full flex flex-col sm:flex-row items-center justify-center gap-4 mb-10 px-4">
  <div className="flex items-center w-full sm:max-w-md border border-slate-300 rounded-lg px-3 py-2 bg-white shadow-sm">
    <img
      src="https://www.figma.com/file/6b4R8evBkii6mI53IA4vSS/image/6c476f454537d7f27cae2b4d0f31e2b59b3020f5"
      width={24}
      height={24}
      alt="Search Icon"
      className="mr-2"
    />
    <input
      type="text"
      placeholder="Ex: Math ..."
      value={subject}
      onChange={(e) => setSubject(e.target.value)}
      className="w-full outline-none text-slate-700 placeholder-slate-400"
    />
  </div>

  <button
    onClick={handleSearch}
    className="w-full sm:w-32 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition duration-200"
  >
    Find Teacher
  </button>
</div>


        </div>
        <div className="right">
          <img src={image} width={500} alt="" />
        </div>
      </div>

      {/* Features */}
      <div className="features ">
        <p>Why You Choose Us</p>
        {/* <hr className="underLine"/> */}
        <div className="fets2">
          <div className="fet cursor-pointer mb-5" onClick={AA}>
            <img
              src="https://www.figma.com/file/6b4R8evBkii6mI53IA4vSS/image/622a85ea75414daadf6055613c074c5280b95444"
              alt=""
            />
            <h4>Expert Mentor</h4>
            <p>
              Our expert mentors are the cornerstone of our educational
              approach. With a wealth of knowledge they support our students on
              their journey to success.
            </p>
          </div>

          <div className="fet cursor-pointer mb-5" onClick={BB}>
            <img
              src="https://www.figma.com/file/6b4R8evBkii6mI53IA4vSS/image/1478ee1b2a35123ded761b65c3ed2ceaece0d20f"
              alt=""
            />
            <h4>High Quality Live Class</h4>
            <p>
              We deliver high-quality live classes to our students, providing
              interactive learning experiences led by experienced instructors.{" "}
            </p>
          </div>

          <NavLink to='/contact'>
            <div className="fet cursor-pointer">
              <img
                src="https://www.figma.com/file/6b4R8evBkii6mI53IA4vSS/image/c412120e39b2095486c76978d4cd0bea88fd883b"
                alt=""
              />
              <h4>24/7 Live Support</h4>
              <p>
                We offer our students 24/7 live support. Whether it's a question
                or a challenge at midnight, our dedicated team is here to provide
                guidance, assistance.
              </p>
            </div>
          </NavLink>
        </div>
        {LClass && (
          <div className="flex items-center justify-center">
            <div className="flex gap-5 items-center my-5">
              <img src="https://lh3.googleusercontent.com/kq1PrZ8Kh1Pomlbfq4JM1Gx4z-oVr3HG9TEKzwZfqPLP3TdVYrx0QrIbpR-NmMwgDzhNTgi3FzuzseMpjzkfNrdHK5AzWGZl_RtKB80S-GZmWOQciR9s=w1296-v1-e30" alt="" width={300}/>
              <div className="text-center text-slate-800 px-4 flex flex-col items-center">
  <h1 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4 font-sans">
    High Quality Live Classes
  </h1>
  <p className="text-base sm:text-lg leading-relaxed max-w-xl">
    We deliver high-quality live classes to our students,
    providing interactive learning experiences led by experienced instructors.
  </p>
</div>

            </div>
          </div>
        )}

{EMentor && (
  <div className="mt-10 px-4">
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 justify-items-center">
      
      {/* Card 1 */}
      <div className="bg-[#0E3A59] text-white p-6 rounded-3xl flex flex-col items-center shadow-lg max-w-sm w-full">
        <img
          className="rounded-full mb-4 w-40 h-40 object-cover"
          src="https://media.istockphoto.com/id/1310210662/photo/portrait-of-indian-woman-as-a-teacher-in-sari-standing-isolated-over-white-background-stock.jpg?s=612x612&w=0&k=20&c=EMI42nCFpak1c4JSFvwfN0Qllyxt19dlihYEXAdnCXY="
          alt="Prof. Dina Sharma"
        />
        <div className="space-y-2 text-center">
          <div className="flex items-center justify-center gap-2">
            <CgProfile />
            <p>Prof. Dina Sharma</p>
          </div>
          <div className="flex items-center justify-center gap-2">
            <FaSchool />
            <p>Galaxy University</p>
          </div>
          <div className="flex items-center justify-center gap-2">
            <IoSchoolSharp />
            <p>Ph.D. in Astrophysics</p>
          </div>
        </div>
      </div>

      {/* Card 2 */}
      <div className="bg-[#0E3A59] text-white p-6 rounded-3xl flex flex-col items-center shadow-lg max-w-sm w-full">
        <img
          className="rounded-full mb-4 w-40 h-40 object-cover"
          src="https://media.istockphoto.com/id/1324558913/photo/confident-young-man-in-casual-green-shirt-looking-away-standing-with-crossed-arms-isolated-on.jpg?s=612x612&w=0&k=20&c=NOrKRrUuxvePKijL9sFBHlDwHESv7Van68-hoS-_4hQ="
          alt="Dr. Anand Mishra"
        />
        <div className="space-y-2 text-center">
          <div className="flex items-center justify-center gap-2">
            <CgProfile />
            <p>Dr. Anand Mishra</p>
          </div>
          <div className="flex items-center justify-center gap-2">
            <FaSchool />
            <p>Maharishi University</p>
          </div>
          <div className="flex items-center justify-center gap-2">
            <IoSchoolSharp />
            <p>Ph.D. in Quantum Physics</p>
          </div>
        </div>
      </div>

      {/* Card 3 */}
      <div className="bg-[#0E3A59] text-white p-6 rounded-3xl flex flex-col items-center shadow-lg max-w-sm w-full">
        <img
          className="rounded-full mb-4 w-40 h-40 object-cover"
          src="https://media.istockphoto.com/id/1663458254/photo/portrait-of-beautiful-indian-woman-in-sari.jpg?s=612x612&w=0&k=20&c=raeTJOEyA4sFX_GwrgboXt9ZxtAZ8RkFuljPJnL9sCU="
          alt="Prof. Sunita Patel"
        />
        <div className="space-y-2 text-center">
          <div className="flex items-center justify-center gap-2">
            <CgProfile />
            <p>Prof. Sunita Patel</p>
          </div>
          <div className="flex items-center justify-center gap-2">
            <FaSchool />
            <p>Ramanujan Institute</p>
          </div>
          <div className="flex items-center justify-center gap-2">
            <IoSchoolSharp />
            <p>D.Phil. in Number Theory</p>
          </div>
        </div>
      </div>

    </div>
  </div>
)}
</div>

      {/* Courses */}
      <div className="courses">
      <p>Faculty List</p>
      <hr className="underLine"/>
      <div className="subjects">
        <div className="subject" onClick={()=>teachersList("physics")}>
          <img src="https://www.figma.com/file/6b4R8evBkii6mI53IA4vSS/image/8e9bf690d23d886f63466a814cfbec78187f91d2" alt="Physics" />
          <p>Physics</p>
        </div>
        <div className="subject" onClick={()=>teachersList("chemistry")}>
          <img src="https://www.figma.com/file/6b4R8evBkii6mI53IA4vSS/image/3e546b344774eb0235acc6bf6dad7814a59d6e95" alt="Chemistry" />
          <p>Chemistry</p>
        </div>
        <div className="subject" onClick={()=>teachersList("biology")}>
          <img src="https://www.figma.com/file/6b4R8evBkii6mI53IA4vSS/image/28ac70002ae0a676d9cfb0f298f3e453d12b5555" alt="Zoology" />
          <p>Biology</p>
        </div>
        <div className="subject" onClick={()=>teachersList("math")}>
          <img src="https://www.figma.com/file/6b4R8evBkii6mI53IA4vSS/image/61930117e428a1f0f7268f888a84145f93aa0664" alt="Math" />
          <p>Math</p>
        </div>
        <div className="subject" onClick={()=>teachersList("computer")}>
          <img src="https://www.figma.com/file/6b4R8evBkii6mI53IA4vSS/image/a64c93efe984ab29f1dfb9e8d8accd9ba449f272" alt="Computer" />
          <p>Computer</p>
        </div>
        
      </div>

      <div className="flex items-center justify-center gap-10">
        {!loading && facList && (
          facList.map(fac => (
          <div key={fac._id} className="bg-[#99afbc] p-5 rounded-md ">
            <div className="flex gap-3 items-center mb-2 ">
            <img src="https://www.pngall.com/wp-content/uploads/5/Profile-Male-PNG.png" alt="profile_img" width={50} />
            <div className="flex flex-col justify-center items-start pl-3">
            <p>{fac.enrolledteacher.Firstname} {fac.enrolledteacher.Lastname}</p>
            <h4 className="text-blue-900">{fac.enrolledteacher.Email}</h4>
            </div>
            </div>
            { fac.enrolledteacher.Email === "urttsg@gmail.com" ?
              <h4><span className="font-bold text-brown-800">Education :</span> Post graduate from Calcutta University</h4> 
              : 
              <h4><span className="font-bold text-brown-800">Education :</span> Post graduate from Sister Nivedita university</h4>
            }
            { fac.enrolledteacher.Email === "urttsg@gmail.com" ? <h4>1 years of teaching experience</h4> : <h4>2 years of teaching experience</h4>}
          </div>
        )))}
      </div>

      </div>

      {/* About Us */}
      <div className="about-section bg-white py-24 px-6 sm:px-12 lg:px-24 text-gray-800">
  {/* Header */}
  <div className="text-center mb-16">
    <h2 className="text-4xl font-bold font-inter">About Us</h2>
    <div className="w-24 h-1 mx-auto mt-4 bg-gradient-to-r from-blue-500 to-blue-400 rounded-full"></div>
  </div>

  {/* Content */}
  <div className="flex flex-col lg:flex-row items-center justify-between gap-12 max-w-6xl mx-auto">
    
    {/* Left Image */}
    <div className="w-full lg:w-1/3">
      <img src={Plant2} alt="Decorative Plant Left" className="rounded-xl shadow-md" />
    </div>

    {/* Text Block */}
    <div className="w-full lg:w-1/2 text-center lg:text-left space-y-8">
      <p className="text-lg leading-relaxed text-gray-700">
        At <span className="font-semibold text-gray-900">Shiksharthee</span>, we believe in the power of education to transform lives. Our platform is a gateway to knowledge, offering diverse courses and meaningful learning experiences.
      </p>

      <div>
        <h3 className="inline-block text-xl font-semibold text-white bg-gradient-to-r from-blue-600 to-blue-500 px-4 py-2 rounded-lg shadow">
          Our Story
        </h3>
        <p className="mt-4 text-gray-700 leading-relaxed">
          Born out of a passion for learning, DTU-E-Learning aims to make quality education accessible for everyone. We recognize the needs of today's learners and deliver flexible, effective solutions.
        </p>
      </div>

      <div>
        <h3 className="inline-block text-xl font-semibold text-white bg-gradient-to-r from-blue-600 to-blue-500 px-4 py-2 rounded-lg shadow">
          Our Mission
        </h3>
        <p className="mt-4 text-gray-700 leading-relaxed">
          Our mission is to empower individuals through education. We build a global learning community where students explore passions, sharpen skills, and unlock their full potential through innovation and engagement.
        </p>
      </div>
    </div>

    {/* Right Image */}
    <div className="w-full lg:w-1/3">
      <img src={Plant} alt="Decorative Plant Right" className="rounded-xl shadow-md" />
    </div>
  </div>
</div>


      {/* Contact Us */}
      <div className="contact-us">
        <Contact/>
      </div>

      {/* Floating Chat Bot */}
      <Bot />
    </>
  );
}

export default Landing;
