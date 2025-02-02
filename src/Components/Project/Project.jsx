import React, { useState } from 'react';
import { X } from 'lucide-react';
import {Link} from 'react-router'

export default function ProjectGrid() {
  const [expandedId, setExpandedId] = useState(null);

  const projects = [
    { id: 1, name: "Apni Patshala", info: "Quality education platform.", github: "/github/project1" },
    { id: 2, name: "Onicha", info: "Comic books, manga, anime shorts, and trailers, all in one platform.", github: "/github/project2" },
    { id: 3, name: "Portfolio", info: "Showcase my skills.", github: "/github/project3" },
    { id: 4, name: "Aurleaf", info: "Ayurvedic medical platform.", github: "/github/project4" },
  ];
  
  const handleCardClick = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <div className="p-6 grid grid-cols-1 sm:grid-cols-2 gap-6 relative">
      {projects.map((project) => (
        <div
          key={project.id}
          onClick={() => handleCardClick(project.id)}
          className={`
            transition-all duration-300 ease-in-out
            ${expandedId === project.id ? 
              'fixed top-0 left-0 w-full h-full z-50 m-0 rounded-none overflow-y-auto' : 
              'w-full max-w-sm mx-auto rounded-lg h-[20rem]'}
            bg-white shadow-lg p-4 relative border cursor-pointer
            flex flex-col
          `}
        >
          {/* Close Button - Only visible when expanded */}
          {expandedId === project.id && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                setExpandedId(null);
              }}
              className="absolute top-4 right-4 p-2 bg-gray-100 rounded-full hover:bg-gray-200"
            >
              <X className="w-6 h-6" />
            </button>
          )}

          {/* GitHub Button */}
          <Link
            to={project.github}
            onClick={(e) => e.stopPropagation()}
            className={`
              ${expandedId === project.id ? 'hidden' : 'absolute'} 
              top-2 right-2 bg-gray-800 text-white text-xs px-3 py-1 rounded-md
              hover:bg-gray-700 transition-colors
            `}
          >
            GitHub
          </Link>

          {/* Project Name */}
          <h2 className={`
            font-bold text-center
            ${expandedId === project.id ? 'text-2xl mt-12' : 'text-lg mt-6'}
          `}>
            {project.name}
          </h2>

          {/* Info Section */}
          <p className={`
            text-gray-600 text-center
            ${expandedId === project.id ? 'text-base mt-6' : 'text-sm mt-3'}
          `}>
            {project.info}
          </p>

          {/* Expanded Content - Only visible when expanded */}
          {expandedId === project.id && (
            <div className="mt-8 flex-grow">
              <div className="prose max-w-none">
                <h3 className="text-xl font-semibold mb-4">Project Details</h3>
                <p className="text-gray-600">
                  coming soon
                </p>
                <div className="mt-6 space-y-4">
                  <h4 className="text-lg font-semibold">Features</h4>
                  <p className="text-gray-600">
                   coming soon
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Bottom Section - Buttons */}
          <div className={`
            flex justify-between
            ${expandedId === project.id ? 'mt-8' : 'mt-6'}
          `}>
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleCardClick(project.id);
              }}
              className="px-3 py-2 bg-blue-500 text-white text-sm rounded-lg hover:bg-blue-600 transition-colors"
            >
              {expandedId === project.id ? 'Close Details' : 'Read More'}
            </button>
            <Link
              href={project.github}
              onClick={(e) => e.stopPropagation()}
              className="px-3 py-2 bg-gray-800 text-white text-sm rounded-lg hover:bg-gray-700 transition-colors"
            >
              GitHub
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
}