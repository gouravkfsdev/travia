"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faUsers,
  faChartBar,
  faShoppingCart,
  faCog,
  faTimes,
  faPowerOff,
  faUser,
  faChevronDown,
  faChargingStation,
} from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Constant } from "../api/constant";
import { useAuth } from '../service/auth';

export interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
  const [settingsOpen, setSettingsOpen] = useState(false);
  const router = useRouter();
  const { user, loading } = useAuth();
  const menuItems = [
    { icon: faHome, label: "Dashboard", active: true, href: "/auth/dashboard" },
    { icon: faUsers, label: "Users", href: "/auth/users" },
    { icon: faChartBar, label: "Analytics", href: "#" },
    { icon: faShoppingCart, label: "Orders", href: "#" },
    { icon: faCog, label: "Settings", href: "#" },
    {
      icon: faChargingStation,
      label: "State",
      dropdown: true,
      submenu: [
        { label: "Chart Settings", href: "#" },
        { label: "Graph Settings", href: "#" },
      ],
    },
  ];

  const handleLogout = async () => {
    await fetch(Constant.auth.logout, {
      method: "POST",
      credentials: "include",
    });
    router.push("/login");
  };

  if (!user || loading) return <p></p>;

  return (
    <>
      {/* Overlay for Mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-[#d9d4d47d] bg-opacity-50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      <aside
        className={`fixed lg:relative inset-y-0 left-0 z-50 w-64 bg-white transform transition-transform duration-300 ease-in-out shadow-md border-r border-gray-200 lg:shadow-none
        ${isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
        ${!isOpen ? "lg:w-0 lg:overflow-hidden" : ""}`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-3 bg-[#184062] text-white">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-[#faa934] rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-sm">A</span>
            </div>
            <span className="text-lg font-semibold">{user.name}</span>
          </div>
          <button
            onClick={onClose}
            className="p-1 hover:bg-orange-200 lg:hidden"
          >
            <FontAwesomeIcon
              icon={faTimes}
              className="h-5 w-5 text-orange-700"
            />
          </button>
        </div>

        {/* Sidebar Content */}
        <div className="flex flex-col justify-between h-[calc(100vh-64px)]">
          {/* Main Nav Items */}
          <nav className="px-2 py-4 space-y-1 h-full overflow-y-auto custom-scrollbar">
            {menuItems.map((item, index) => (
              <div key={index}>
                <a
                  href={item.href || "#"}
                  className={`flex items-center justify-between px-3 py-2 rounded text-sm font-medium transition-colors w-full
                  ${
                    item.active
                      ? "bg-[#184062] text-white shadow-md"
                      : "text-[#184062] hover:bg-[#e58d0f] hover:text-white"
                  }`}
                  onClick={(e) => {
                    if (item.dropdown) {
                      e.preventDefault();
                      setSettingsOpen(!settingsOpen);
                    }
                  }}
                >
                  <div className="flex items-center">
                    <FontAwesomeIcon
                      icon={item.icon}
                      className="h-5 w-5 mr-3"
                    />
                    {item.label}
                  </div>
                  {item.dropdown && (
                    <FontAwesomeIcon
                      icon={faChevronDown}
                      className={`transition-transform ${
                        settingsOpen ? "rotate-180" : ""
                      }`}
                    />
                  )}
                </a>
                {item.dropdown && settingsOpen && (
                  <div className="ml-8 mt-1 space-y-1">
                    {item.submenu?.map((subItem, subIndex) => (
                      <a
                        key={subIndex}
                        href={subItem.href}
                        className="block text-sm text-[#184062] hover:bg-[#e58d0f] hover:text-white px-3 py-1 rounded"
                      >
                        {subItem.label}
                      </a>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </nav>

          {/* Bottom Icon Row */}
          <div className="flex justify-around items-center p-2 border-t border-gray-200">
            <button
              type="button"
              title="Profile"
              className="text-[#184062] hover:text-white hover:bg-[#e58d0f] p-1 rounded cursor-pointer"
              onClick={() => console.log("Profile clicked")}
            >
              <FontAwesomeIcon icon={faUser} className="h-5 w-5" />
            </button>

            <button
              type="button"
              title="Settings"
              className="text-[#184062] hover:text-white hover:bg-[#e58d0f] p-1 rounded cursor-pointer"
              onClick={() => console.log("Settings clicked")}
            >
              <FontAwesomeIcon icon={faCog} className="h-5 w-5" />
            </button>

            <button
              type="button"
              title="Logout"
              className="text-[#184062] hover:text-white hover:bg-[#e58d0f] p-1 rounded cursor-pointer"
              onClick={handleLogout}
            >
              <FontAwesomeIcon icon={faPowerOff} className="h-5 w-5" />
            </button>
          </div>
        </div>
      </aside>
    </>
  );
}
