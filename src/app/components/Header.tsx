"use client";

import React, { useState, useRef, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faSignOutAlt,
  faUserCircle,
  faCog,
  faUser,
} from "@fortawesome/free-solid-svg-icons";

interface HeaderProps {
  onMenuClick: () => void;
}

export default function Header({ onMenuClick }: HeaderProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicked outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <header className="bg-white px-4 lg:px-6 py-3 border-b border-gray-200">
      <div className="flex items-center justify-between">
        {/* Left: Sidebar Toggle and Title */}
        <div className="flex items-center space-x-3">
          <button
            onClick={onMenuClick}
            className="p-1 hover:bg-[#faa934] rounded transition-colors"
          >
            <FontAwesomeIcon icon={faBars} className="h-5 w-5 text-[#184062] hover:text-white" />
          </button>
          <h1 className="text-lg font-semibold text-[#184062] hidden sm:block">
            Dashboard
          </h1>
        </div>

        {/* Right: User Profile Dropdown */}
        <div className="relative flex items-center space-x-4" ref={dropdownRef}>
          <div
            className="w-8 h-8 rounded-full flex items-center justify-center cursor-pointer" style={{ backgroundColor: '#184062' , marginRight: '0px' }}
            onClick={() => setIsOpen(!isOpen)}
          >
            <FontAwesomeIcon icon={faUser} className="h-5 w-5 text-white" />
          </div>

          {isOpen && (
            <div className="absolute right-0 top-10 w-40 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
              <ul className="py-2 text-sm text-[#184062]">
                <li className="px-4 py-2 hover:bg-[#faa934] cursor-pointer flex items-center gap-2 hover:text-white">
                  <FontAwesomeIcon icon={faUserCircle} /> Profile
                </li>
                <li className="px-4 py-2 hover:bg-[#faa934] cursor-pointer flex items-center gap-2 hover:text-white">
                  <FontAwesomeIcon icon={faCog} /> Settings
                </li>
                <li className="px-4 py-2 hover:bg-[#faa934] cursor-pointer flex items-center gap-2 text-red-600 hover:text-white">
                  <FontAwesomeIcon icon={faSignOutAlt} /> Logout
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
