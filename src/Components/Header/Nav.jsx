import { NavLink, Link } from 'react-router';
import React, { useState } from 'react';
import { useAuth0 } from "@auth0/auth0-react";


function Nav() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const { loginWithRedirect } = useAuth0();

    return (
        <header className="shadow sticky top-0 z-50 bg-white">
            <nav className="px-4 lg:px-6 py-4">
                <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
                    {/* Mobile Menu Button */}
                    <div className="flex items-center lg:hidden">
                        <button
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className="p-2 text-gray-600 hover:text-orange-700 focus:outline-none"
                        >
                            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                            </svg>
                        </button>
                    </div>

                    {/* Logo */}
                    <div className="flex items-center justify-center lg:justify-start">
                        <Link to="/" className="text-2xl lg:text-3xl font-medium text-black hover:text-orange-700">
                            Pradeep
                        </Link>
                    </div>

                    {/*desktop navigation*/}
                    <div className="hidden lg:flex items-center space-x-8">
                        <ul className="flex space-x-8">
                            <li>
                                <NavLink
                                    to="/"
                                    className={({ isActive }) =>
                                        `text-lg ${isActive ? "text-orange-700" : "text-gray-700"} hover:text-orange-700 transition-colors`
                                    }
                                >
                                    Home
                                </NavLink>
                            </li>
                            <li>
                                <NavLink
                                    to="/Project"
                                    className={({ isActive }) =>
                                        `text-lg ${isActive ? "text-orange-700" : "text-gray-700"} hover:text-orange-700 transition-colors`
                                    }
                                >
                                    Project
                                </NavLink>
                            </li>
                            <li>
                                <NavLink
                                    to="/github"
                                    className={({ isActive }) =>
                                        `text-lg ${isActive ? "text-orange-700" : "text-gray-700"} hover:text-orange-700 transition-colors`
                                    }
                                >
                                    About
                                </NavLink>
                            </li>
                            <li>
                                <NavLink
                                    to="/service"
                                    className={({ isActive }) =>
                                        `text-lg ${isActive ? "text-orange-700" : "text-gray-700"} hover:text-orange-700 transition-colors`
                                    }
                                >
                                    Service
                                </NavLink>
                            </li>
                        </ul>
                    </div>

                    {/* Contact Button */}
                    <div className="flex items-center">
                        <button
                            onClick={() => loginWithRedirect()} 
                            className="text-lg lg:text-xl bg-transparent border-2 border-black text-black hover:bg-orange-700 hover:border-orange-700 hover:text-white px-4 py-2 lg:px-6 lg:py-3 rounded-lg transition-colors"
                        >
                            Let's Chat
                        </button>
                    </div>

                    {/* Mobile Menu */}
                    <div className={`lg:hidden w-full ${isMenuOpen ? 'block' : 'hidden'}`}>
                        <ul className="flex flex-col mt-4 space-y-4">
                            <li>
                                <NavLink
                                    to="/"
                                    onClick={() => setIsMenuOpen(false)}
                                    className={({ isActive }) =>
                                        `block py-2 ${isActive ? "text-orange-700" : "text-gray-700"} hover:text-orange-700`
                                    }
                                >
                                    Home
                                </NavLink>
                            </li>
                            <li>
                                <NavLink
                                    to="/about"
                                    onClick={() => setIsMenuOpen(false)}
                                    className={({ isActive }) =>
                                        `block py-2 ${isActive ? "text-orange-700" : "text-gray-700"} hover:text-orange-700`
                                    }
                                >
                                    Project
                                </NavLink>
                            </li>
                            <li>
                                <NavLink
                                    to="/github"
                                    onClick={() => setIsMenuOpen(false)}
                                    className={({ isActive }) =>
                                        `block py-2 ${isActive ? "text-orange-700" : "text-gray-700"} hover:text-orange-700`
                                    }
                                >
                                    About
                                </NavLink>
                            </li>
                            <li>
                                <NavLink
                                    to="/service"
                                    onClick={() => setIsMenuOpen(false)}
                                    className={({ isActive }) =>
                                        `block py-2 ${isActive ? "text-orange-700" : "text-gray-700"} hover:text-orange-700`
                                    }
                                >
                                    Service
                                </NavLink>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </header>
    )
}

export default Nav;