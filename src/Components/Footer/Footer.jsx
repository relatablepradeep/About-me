import React from 'react'
import { Link } from 'react-router'

function Footer() {
    return (


        <footer className="bg-gray-100 border-gray-100 shadow-xl  bottom-0 p-4  h-96 w-full border-y rounded-t-xl">
            <div className="flex  relative ">

                <div className="absolute left-96">
                    <h1 className="text-7xl  ml-80 font-semibold">Got a killer idea?</h1>
                    <h1 className="text-7xl  ml-72 font-semibold">Let's bring it to life!</h1>




                    <button className="relative ml-96 left-8 inline-flex items-center justify-center  mt-10 overflow-hidden text-lg font-medium text-black border-2 border-black rounded-md group focus:outline-none focus:ring-4 focus:ring-gray-500">
                        <Link
                            to="#"
                            className="relative inline-flex items-center px-3 pl-5 py-3 overflow-hidden text-black transition-all duration-300 ease-in-out rounded-md group hover:text-white"
                        >
                            {/* Expanding background */}
                            <span className="absolute left-0 block w-full h-0 bg-black transition-all duration-500 ease-in-out group-hover:h-full top-1/2 group-hover:top-0"></span>

                            {/* SVG Arrow animation */}
                            <span className="absolute right-0.5 flex items-center justify-center w-8 h-8 transform translate-x-full transition-transform duration-300 ease-in-out group-hover:translate-x-0">
                                <svg
                                    className="w-5 h-5 text-black group-hover:text-white"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M14 5l7 7m0 0l-7 7m7-7H3"
                                    ></path>
                                </svg>
                            </span>

                            {/* Button Text */}
                            <span className="relative pr-4 transition-colors duration-300 ease-in-out group-hover:text-white">
                                Wanna Chat?
                            </span>
                        </Link>
                    </button>















                    <button className="relative left-16 overflow-hidden font-medium text-black text-lg mt-10 border-2 border-black rounded-lg focus:outline-none focus:ring-4 focus:ring-gray-500">
                        <Link
                            to="#"
                            className="relative inline-block px-5 py-3 text-lg transition-all duration-300 ease-in-out group"
                        >
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


                    <div className="text-black text-2xl ml-96  mt-5 hover:text-blue-500">
                    <Link  to="https://x.com/dakkupradeep" className=" ml-36  ">
                    follow me on x
                    </Link>

                    </div>

                      
                         
                        


                </div>








            </div>



        </footer>
    )
}


export default Footer