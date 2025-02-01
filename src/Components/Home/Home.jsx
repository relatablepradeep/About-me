import React, { useState } from "react";
import { Link, NavLink } from "react-router";
import Slide from '../../Animation/Text/Slide'


function Home() {
  const [selected, setSelected] = useState(null);

  const projects = [
    { id: 1, title: "Project One", color: "bg-red-500", link: "/project/portfolio" },
    { id: 2, title: "Project Two", color: "bg-blue-500", link: "/project/portfolio" },
    { id: 3, title: "Project Three", color: "bg-green-500", link: "/project/portfolio" },
    { id: 4, title: "Project Four", color: "bg-yellow-500", link: "/project/portfolio" },
  ];

  return (
    <>
      <div className="min-h-screen w-full flex font-poppins">
        {/* Left Section */}
        <div className="w-3/4 p-4">
          <section className="relative pt-16">
            <div className="flex flex-col items-start px-28">
              {/* Introduction Section */}
              <div className="relative">
                <h1 className="text-8xl font-inter leading-tight tracking-tight">
                  Hi! I Am
                  <button className="absolute left-96 top-5 rounded-lg p-5 bg-blue-600 text-5xl text-white border-2 font-montserrat hover:bg-blue-700 transition-colors">
                    Frontend
                  </button>
                </h1>
              </div>

              {/* About Me Section */}
              <div className="mt-16">
                <h1 className="text-5xl font-montserrat font-bold mb-6 tracking-wide">About Me</h1>
                <p className="text-3xl font-inter leading-relaxed text-gray-700">
                  I'm Pradeep from Uttarakhand, India. I enjoy programming and exploring new technologies. I've participated in around 10 hackathons, winning 3 of them along the way.
                </p>
              </div>

              {/* What I Do Section */}
              <div className="mt-16">
                <h1 className="text-5xl font-montserrat font-bold mb-6 tracking-wide">What I do?</h1>
                <p className="text-3xl font-inter leading-relaxed text-gray-700">
                  Currently, I’m working on my personal projects, including Ayurlife (medical), Oppa (manga/comic), and a college website.
                </p>
              </div>
            </div>
          </section>
        </div>

        {/* Right Section with Image */}
        <aside className="w-2/3 p-4 text-white font-inter bg-[#FFDAB3]">
          <div className="flex relative">
            <h3 className="text-black text-4xl absolute left-40 top-10">You should hire me so that you have at least one less problem in life</h3>
          </div>
          <div>
            <Link to="/" className="flex items-center relative">
              <img src="/Pradeep.png" className="absolute -top-40 h-auto" alt="Myself" />
            </Link>
          </div>
          <div className="flex">
            <div className="relative w-full">
              <div className="border-white shadow-md border-2 bg-white rounded-md mt-96 absolute top-80 h-28 w-full">
                <div>
                  <input
                    type="email"
                    className="w-full h-24 text-3xl text-black mt-1.5 border-white rounded-md placeholder:text-center placeholder:text-xl focus:outline-none focus:ring-0 focus:border-white"
                    placeholder="Want to contact me? Drop your email here"
                  />
                  <div className="flex text-black relative ml-80 left-9">
                    <button className="border-white focus:border-gray-900 h-24 w-28 bg-white absolute bottom-0.5 left-96">
                      <Link to="#" className="flex items-center relative mt-5 mb-3">
                        <img
                          src="/icons8-arrow-50.png"
                          className="absolute left-6 h-16"
                          alt="Submit"
                        />
                      </Link>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </aside>
      </div>








      
      <div className="flex justify-center items-center h-[1010px]  bg-gray-900 relative">


        <Slide className=""></Slide>
  
  
  <div className="absolute bg-gray-800 rounded-xl text-gray-100 text-5xl h-[500px] w-[1600px] top-[500px] left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10 shadow-lg">
    <h2 className="absolute left-96 ml-80 text-gray-300">Portfolio</h2>
    <div className="absolute text-2xl top-16 left-80">
      <h3>Portfolio featuring real-time chat, chatbot, video calls, payment integration, and authorization.</h3>
    </div>
  </div>

  
  <div className="absolute bg-gray-700 opacity-80 rounded-xl text-gray-100 text-5xl h-[500px] w-[1600px] top-[400px] left-1/2 transform -translate-x-1/2 z-20 shadow-xl">
    <h2 className="absolute left-96 ml-80 text-gray-300">Onicha</h2>
    <div className="absolute text-2xl top-16 left-80">
      <h3>A hub for anime shorts, manga comics, thrilling trailers, and a real-time chat system—all in one place</h3>
    </div>
  </div>





  
  <div className="absolute bg-teal-600 opacity-90 rounded-xl text-gray-100 text-5xl h-[400px] w-[1600px] top-[550px] left-1/2 transform -translate-x-1/2 z-20 shadow-xl">
    <h2 className="absolute left-96 ml-80 text-gray-300">Aurleaf</h2>
    <div className="absolute text-2xl top-16 left-60">
      <h3>Aurleaf is a healthcare platform offering appointment scheduling, video calls, real-time chat, and chatbot support.</h3>
    </div>
  </div>




  <div className="absolute bg-cyan-900 opacity-100 rounded-xl text-cyan-300 text-5xl h-[300px] w-[1600px] top-[700px] left-1/2 transform -translate-x-1/2 z-20 shadow-xl">
    <h2 className="absolute ml-96 left-64 text-cyan-300">Apni-patshala</h2>
    <div className="absolute text-2xl top-16 left-96 ml-40">
      <h3>Your ultimate destination for everything tech!</h3>
    </div>
  </div>

</div>













      {/* Footer Section */}
      <div className="w-full flex bg-gray-900 h-80">
        <div className="relative">
          <div className="text-white my-24 mx-32 text-3xl">
            <h1>Project</h1>
            <h2>Statistics 2025</h2>
            <button className="text-white border-2 border-yellow-600 rounded-md bg-yellow-600 text-lg p-3 mt-6">
              <Link to="#">Know More</Link>
            </button>
          </div>
        </div>
        <div className="relative">
          <h1 className="ml-80 absolute text-white text-3xl left-1 mt-28 flex-col"><span className="ml-10">Code.Create.Deliver.</span></h1>
          <div className="flex">
            <button className="text-white border-2 border-[#A64D79] bg-[#A64D79] text-lg p-3 mt-44 ml-96 bottom-2">
              <Link to="#" className="px-4">Hire Me</Link>
            </button>
            <span>
              <button className=" border-2 border-[#2A3335] bg-[#2A3335] text-lg p-3 bottom-2 text-white mt-44">
                <Link to="#">
                  <svg xmlns="http://www.w3.org/2000/svg" className="animate-bounce w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 5v14m0 0l-7-7m7 7l7-7" />
                  </svg>
                  CV
                </Link>
              </button>
            </span>
          </div>

          <div className="relative left-80 bottom-44">
            <div className="ml-96">
              <div className="ml-96 text-white text-2xl">
                <h2>Responsive Web Design</h2>
                <div>____________________________</div>
              </div>
              <div className="ml-96 text-white text-2xl">
                <h2>Modern UI/UX Designs</h2>
                <div>____________________________</div>
              </div>
              <div className="ml-96 text-white text-2xl">
                <h2>Custom Web Development</h2>
                <div>_____________________________</div>
              </div>
            </div>
          </div>
        </div>
      </div>

     
    </>
  );
}

export default Home;
