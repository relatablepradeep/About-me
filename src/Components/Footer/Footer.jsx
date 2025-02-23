import React from 'react';
import { Link } from 'react-router';

function Footer() {
    return (
        <footer className="bg-gray-100 border-gray-100 shadow-xl p-8 w-full rounded-t-xl">
            <div className="flex flex-col items-center text-center max-w-7xl mx-auto px-4">
                
              
                <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold whitespace-nowrap">
                    Got a killer idea?
                </h1>
                <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold mt-2 whitespace-nowrap">
                    Let's bring it to life!
                </h1>

               
                <div className="flex flex-row flex-wrap justify-center items-center gap-3 sm:gap-5 mt-6">
                    
                  
                    <button className="relative overflow-hidden font-medium text-sm sm:text-base md:text-lg border-2 border-black rounded-lg focus:outline-none focus:ring-4 focus:ring-gray-500">
                        <Link to="#" className="relative inline-block px-3 sm:px-4 md:px-6 py-2 sm:py-3 transition-all duration-300 ease-in-out group">
                            <span className="absolute top-0 left-0 w-0 h-0 transition-all duration-200 border-t-2 border-black group-hover:w-full ease"></span>
                            <span className="absolute bottom-0 right-0 w-0 h-0 transition-all duration-200 border-b-2 border-black group-hover:w-full ease"></span>
                            <span className="absolute top-0 left-0 w-full h-0 transition-all duration-300 delay-200 bg-black group-hover:h-full ease"></span>
                            <span className="absolute bottom-0 left-0 w-full h-0 transition-all duration-300 delay-200 bg-black group-hover:h-full ease"></span>
                            <span className="absolute inset-0 w-full h-full duration-300 delay-300 bg-gray-900 opacity-0 group-hover:opacity-100"></span>
                            <span className="relative transition-colors duration-300 delay-200 group-hover:text-white ease">
                                Wanna Chat?
                            </span>
                        </Link>
                    </button>

                 
                    <button className="relative overflow-hidden font-medium text-sm sm:text-base md:text-lg border-2 border-black rounded-lg focus:outline-none focus:ring-4 focus:ring-gray-500">
                        <Link to="#" className="relative inline-block px-3 sm:px-4 md:px-6 py-2 sm:py-3 transition-all duration-300 ease-in-out group">
                            <span className="absolute top-0 left-0 w-0 h-0 transition-all duration-200 border-t-2 border-black group-hover:w-full ease"></span>
                            <span className="absolute bottom-0 right-0 w-0 h-0 transition-all duration-200 border-b-2 border-black group-hover:w-full ease"></span>
                            <span className="absolute top-0 left-0 w-full h-0 transition-all duration-300 delay-200 bg-black group-hover:h-full ease"></span>
                            <span className="absolute bottom-0 left-0 w-full h-0 transition-all duration-300 delay-200 bg-black group-hover:h-full ease"></span>
                            <span className="absolute inset-0 w-full h-full duration-300 delay-300 bg-gray-900 opacity-0 group-hover:opacity-100"></span>
                            <span className="relative transition-colors duration-300 delay-200 group-hover:text-white ease">
                                Send an email
                            </span>
                        </Link>
                    </button>

                </div>

             
                <div className="mt-6 text-lg sm:text-xl md:text-2xl hover:text-blue-500">
                    <Link to="https://x.com/dakkupradeep" target="_blank" rel="noopener noreferrer">
                        Follow me on X
                    </Link>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
