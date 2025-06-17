import { NavLink, Link } from 'react-router';
import React, { useState } from 'react';
import { useAuth0 } from "@auth0/auth0-react";
import { Link as ScrollLink, Element } from 'react-scroll';

function Nav() {
    const [currentNavIndex, setCurrentNavIndex] = useState(0);
    const { loginWithRedirect } = useAuth0();

    const navItems = [
        { 
            id: 'section1', 
            label: 'Home',
            type: 'scroll'
        },
        { 
            id: 'section2', 
            label: 'Project',
            type: 'scroll'
        },
        { 
            id: 'section3', 
            label: 'About Me',
            type: 'scroll'
        },
        { 
            id: 'section4', 
            label: 'Service',
            type: 'scroll'
        }
    ];

    const nextNav = () => {
        setCurrentNavIndex((prev) => (prev + 1) % navItems.length);
    };

    const prevNav = () => {
        setCurrentNavIndex((prev) => (prev - 1 + navItems.length) % navItems.length);
    };

    const handleNavClick = () => {
        // Auto advance to next item after clicking current one
        setTimeout(() => {
            nextNav();
        }, 300);
    };

    return (
        <header className="shadow sticky top-0 z-50 bg-white">
            <nav className="px-4 lg:px-6 py-4">
                <div className="lg:flex lg:flex-wrap lg:justify-between lg:items-center mx-auto max-w-screen-xl">
                    
                    {/* Desktop Layout */}
                    <div className="hidden lg:flex lg:justify-between lg:items-center w-full">
                        {/* Logo */}
                        <div className="flex items-center">
                            <Link to="/" className="text-2xl lg:text-3xl font-medium text-black hover:text-orange-700">
                                Pradeep
                            </Link>
                        </div>

                        {/* Desktop Navigation */}
                        <div className="flex items-center space-x-8">
                            <ul className="flex space-x-8">
                                <li>
                                    <ScrollLink
                                        to="section1"
                                        smooth={true}
                                        duration={100}
                                        offset={-80}
                                        className="text-lg text-gray-700 hover:text-orange-700 transition-colors cursor-pointer"
                                    >
                                        Home
                                    </ScrollLink>
                                </li>
                                <li>
                                    <ScrollLink
                                        to="section2"
                                        smooth={true}
                                        duration={100}
                                        offset={-80}
                                        className="text-lg text-gray-700 hover:text-orange-700 transition-colors cursor-pointer"
                                    >
                                        Project
                                    </ScrollLink>
                                </li>
                                <li>
                                    <ScrollLink
                                        to="section3"
                                        smooth={true}
                                        duration={100}
                                        offset={-80}
                                        className="text-lg text-gray-700 hover:text-orange-700 transition-colors cursor-pointer"
                                    >
                                        About Me
                                    </ScrollLink>
                                </li>
                                <li>
                                    <ScrollLink
                                        to="section4"
                                        smooth={true}
                                        duration={100}
                                        offset={-80}
                                        className="text-lg text-gray-700 hover:text-orange-700 transition-colors cursor-pointer"
                                    >
                                        Service
                                    </ScrollLink>
                                </li>
                            </ul>
                        </div>

                        {/* Contact Button */}
                        <div className="flex items-center">
                            <button
                                onClick={() => loginWithRedirect()} 
                                className="text-xl bg-transparent border-2 border-black text-black hover:bg-orange-700 hover:border-orange-700 hover:text-white px-6 py-3 rounded-lg transition-colors"
                            >
                                Let's Chat
                            </button>
                        </div>
                    </div>

                    {/* Mobile Layout */}
                    <div className="lg:hidden w-full">
                        {/* Mobile Carousel Navigation */}
                        <div className="flex items-center justify-center py-4">
                            <div className="flex items-center space-x-4 bg-gray-50 rounded-full px-4 py-2 shadow-inner">
                                {/* Previous Button */}
                                <button
                                    onClick={prevNav}
                                    className="p-2 text-gray-600 hover:text-orange-700 transition-colors"
                                    aria-label="Previous navigation item"
                                >
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                                    </svg>
                                </button>

                                {/* Current Navigation Item */}
                                <div className="min-w-[100px] text-center">
                                    <ScrollLink
                                        to={navItems[currentNavIndex].id}
                                        smooth={true}
                                        duration={100}
                                        offset={-80}
                                        onClick={handleNavClick}
                                        className="text-lg font-medium text-gray-700 hover:text-orange-700 transition-colors cursor-pointer inline-block"
                                    >
                                        {navItems[currentNavIndex].label}
                                    </ScrollLink>
                                </div>

                                {/* Next Button */}
                                <button
                                    onClick={nextNav}
                                    className="p-2 text-gray-600 hover:text-orange-700 transition-colors"
                                    aria-label="Next navigation item"
                                >
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                    </svg>
                                </button>
                            </div>
                        </div>

                        {/* Mobile Contact Button */}
                        {/* <div className="flex justify-center pb-2">
                            <button
                                onClick={() => loginWithRedirect()} 
                                className="text-sm bg-transparent border-2 border-black text-black hover:bg-orange-700 hover:border-orange-700 hover:text-white px-4 py-2 rounded-lg transition-colors"
                            >
                                Let's Chat
                            </button>
                        </div> */}
                    </div>
                </div>
            </nav>
        </header>
    )
}

export default Nav;