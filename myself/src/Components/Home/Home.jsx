import React, { useState } from "react";
import { Link, NavLink } from "react-router";
import Slide from '../../Animation/Text/Slide'
import Scrolling from '../../Animation/Scrolling/Scrolling'
import Animation from '../../Animation/3D/Animation'
import Stack from '../../Animation/Stack/Stack'
import axios from 'axios';

function Home() {
  const [email, setEmail] = useState('');
  const [notification, setNotification] = useState({
    show: false,
    message: '',
    type: '' // 'success', 'error', or 'warning'
  });

  // Function to show notification
  const showNotification = (message, type) => {
    setNotification({
      show: true,
      message,
      type
    });
    
    // Auto hide notification after 4 seconds
    setTimeout(() => {
      setNotification(prev => ({...prev, show: false}));
    }, 4000);
  };

  const handleEmail = async () => {
    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      showNotification("Please enter a valid email address", "error");
      return;
    }

    try {
      const response = await axios.post('http://localhost:3005/email/saveEmail', { email });
      
      // Check response status and message
      if (response.data.success) {
        showNotification("Thank you! Your email has been saved successfully", "success");
        setEmail(''); // Clear input field after successful submission
      } else if (response.data.message?.includes('already exists')) {
        showNotification("This email is already registered with us", "warning");
      } else {
        showNotification("Thank you for your interest!", "success");
      }
    } catch (error) {
      console.error('Error saving email:', error);
      showNotification("Something went wrong. Please try again later", "error");
    }
  };

  return (
    <>
      {/* Notification Popup */}
      {notification.show && (
        <div className={`fixed top-5 right-5 z-50 rounded-lg shadow-lg px-6 py-4 max-w-md transform transition-all duration-500 animate-fade-in-down
                        ${notification.type === 'success' ? 'bg-green-600' : 
                          notification.type === 'error' ? 'bg-red-600' : 
                          'bg-yellow-600'} text-white`}>
          <div className="flex items-center">
            {notification.type === 'success' && (
              <svg className="w-6 h-6 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
              </svg>
            )}
            {notification.type === 'error' && (
              <svg className="w-6 h-6 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            )}
            {notification.type === 'warning' && (
              <svg className="w-6 h-6 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path>
              </svg>
            )}
            <p className="font-medium">{notification.message}</p>
          </div>
          
          {/* Close button */}
          <button 
            onClick={() => setNotification(prev => ({...prev, show: false}))}
            className="absolute top-2 right-2 text-white hover:text-gray-200"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
        </div>
      )}

      <div className="min-h-screen w-full flex flex-col lg:flex-row font-poppins overflow-x-hidden">
        <div className="w-full lg:w-1/2 p-2 sm:p-4 flex flex-col justify-center">
          <section className="relative pt-4 sm:pt-8 lg:pt-16">
            <div className="flex flex-col items-start px-2 sm:px-4 md:px-12 relative sm:bottom-48 lg:bottom-16 lg:px-16 xl:px-20">
              <div className="relative w-full flex items-center gap-2 sm:gap-4 flex-wrap">
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl 2xl:text-8xl font-inter leading-tight tracking-tight">
                  Hi! I Am
                </h1>
                <button className="rounded-lg px-3 sm:px-4 md:px-5 py-1 sm:py-2 md:py-3 bg-blue-600 
                                  text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl text-white 
                                  border-2 font-montserrat hover:bg-blue-700 transition-colors">
                  Frontend
                </button>
              </div>

              <div className="mt-8 sm:mt-10 lg:mt-16 w-full">
                <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-montserrat font-bold mb-2 sm:mb-4 lg:mb-6 tracking-wide">About Me</h1>
                <p className="text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl font-inter leading-relaxed text-gray-700">
                  I'm Pradeep from Uttarakhand, India. I enjoy programming and exploring new technologies. I've participated in around 10 hackathons, winning 3 of them along the way.
                </p>
              </div>

              <div className="mt-8 sm:mt-10 lg:mt-16 w-full">
                <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-montserrat font-bold mb-2 sm:mb-4 lg:mb-6 tracking-wide">What I do?</h1>
                <p className="text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl font-inter leading-relaxed text-gray-700">
                  Currently, I'm working on my personal projects, including Ayurlife (medical), Oppa (manga/comic), and a college website.
                </p>
              </div>
            </div>
          </section>
        </div>

        <aside className="w-full lg:w-1/2 p-2 sm:p-4 text-white font-inter bg-[#FFDAB3] relative min-h-[400px] sm:min-h-[500px] md:min-h-[600px] lg:min-h-screen flex flex-col">
          <Animation></Animation>
          
          <div className="mb-6 sm:mb-10 lg:mb-0 mt-6 sm:mt-10 lg:mt-0 w-full">
            <div className="relative w-full">
              <div className="border-white shadow-md border-2 bg-white rounded-md
                            relative lg:absolute lg:bottom-12 xl:bottom-20 2xl:bottom-32
                            h-16 sm:h-20 md:h-24 lg:h-28 w-full mx-auto">
                <div className="flex items-center h-full">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full h-full text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl 2xl:text-3xl
                              text-black px-4 border-white rounded-md
                              placeholder:text-center placeholder:text-xs sm:placeholder:text-sm md:placeholder:text-base lg:placeholder:text-lg
                              focus:outline-none focus:ring-0 focus:border-white"
                    placeholder="Want to contact me? Drop your email here"
                    onKeyPress={(e) => {
                      if (e.key === 'Enter') handleEmail();
                    }}
                  />
                  <button 
                    onClick={handleEmail} 
                    className="absolute right-2 top-1/2 -translate-y-1/2
                               border-white focus:border-gray-900 
                               h-10 w-10 sm:h-12 sm:w-12 md:h-16 md:w-16 lg:h-20 lg:w-20
                               bg-white rounded-md flex items-center justify-center
                               hover:bg-gray-100 transition-colors"
                  >
                    <div className="flex items-center justify-center h-full w-full">
                      <img
                        src="/icons8-arrow-50.png"
                        className="h-6 sm:h-8 md:h-10 lg:h-12 xl:h-14"
                        alt="Submit"
                      />
                    </div>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </aside>  
      </div>

      <div className="bg-gray-900">
        <Slide />
      </div>

      <div className="bg-gray-900 flex flex-col items-center justify-center h-screen">
        <Stack />
      </div>

      <div className="w-full bg-gray-900 h-auto py-12 px-4 sm:px-6 md:px-20 flex justify-between items-center text-white flex-wrap gap-x-5">
        {/* Left Section */}
        <div className="flex flex-col items-start text-left">
          <h1 className="text-base sm:text-lg md:text-2xl lg:text-3xl">Project</h1>
          <h2 className="text-sm sm:text-base md:text-xl lg:text-2xl mt-1">Statistics 2025</h2>
          <button className="mt-3 px-2 sm:px-4 md:px-6 py-1 sm:py-2 text-white border-2 border-yellow-600 bg-yellow-600 rounded-md text-xs sm:text-sm md:text-lg lg:text-xl">
            <Link to="#">Know More</Link>
          </button>
        </div>

        {/* Right Section */}
        <div className="flex flex-col items-start text-left">
          <h1 className="text-base sm:text-lg md:text-2xl lg:text-3xl">Code. Create. Deliver.</h1>
          <div className="flex gap-2 sm:gap-3 md:gap-5 mt-3">
            <button className="px-2 sm:px-4 md:px-6 py-1 sm:py-2 text-white border-2 border-[#A64D79] bg-[#A64D79] text-xs sm:text-sm md:text-lg lg:text-xl rounded-md">
              <Link to="#">Hire Me</Link>
            </button>
            
            <button className="px-2 sm:px-4 md:px-6 py-1 sm:py-2 border-2 border-[#2A3335] bg-[#2A3335] text-white text-xs sm:text-sm md:text-lg lg:text-xl rounded-md flex items-center gap-2">
              <Link to="#">
                <svg xmlns="http://www.w3.org/2000/svg" className="animate-bounce w-3 sm:w-4 md:w-6 h-3 sm:h-4 md:h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 5v14m0 0l-7-7m7 7l7-7" />
                </svg>
                CV
              </Link>
            </button>
          </div>
        </div>
      </div>

      <Scrolling/>
    </>
  );
}

export default Home;
