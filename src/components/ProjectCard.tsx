'use client'

import { useState } from 'react';

const ProjectCard = ({ title, description }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className={`bg-white p-4 rounded shadow-md w-64 h-40 flex items-center justify-center text-center transition-transform transform ${isHovered ? 'scale-105' : 'scale-100'}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative">
        <h3 className={`text-xl font-bold mb-2 ${isHovered ? 'opacity-0' : 'opacity-100'}`}>{title}</h3>
        <p className={`absolute inset-0 flex items-center justify-center transition-opacity ${isHovered ? 'opacity-100' : 'opacity-0'}`}>{description}</p>
      </div>
    </div>
  );
};

export default ProjectCard;