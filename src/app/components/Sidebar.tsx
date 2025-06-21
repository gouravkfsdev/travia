"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faShoppingCart,
  faTimes,
  faPowerOff,
  faUser,
  faChevronDown,
  faChargingStation,
  faMapMarkedAlt,
  faCity,
  faUsers,
  faChartBar,
  faTags,
  faCommentDots,
  faStar,
  faSearch,
  faImage,
  faCog,
  faBell,
  faList,
  faGlobe,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import { Constant } from "../api/constant";
import { useAuth } from '../service/auth';

export interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
  const pathname = usePathname();
  const [openDropdowns, setOpenDropdowns] = useState<Record<string, boolean>>({});

  const toggleDropdown = (key: string) => {
    setOpenDropdowns((prev) => ({ ...prev, [key]: !prev[key] }));
  };
  const router = useRouter();
  const { user, loading } = useAuth();
  const menuItems = [
    {
      icon: faHome,
      label: "Dashboard",
      href: "/auth/dashboard",
    },
    {
      icon: faMapMarkedAlt,
      label: "Places",
      href: "/auth/places",
    },
    {
      icon: faGlobe,
      label: "Countries",
      dropdownKey: "countries",
      submenu: [
        { label: "All Countries", href: "/auth/countries" },
        { label: "Add Country", href: "/auth/countries/add" },
      ],
    },
    {
      icon: faMapMarkedAlt,
      label: "States",
      dropdownKey: "states",
      submenu: [
        { label: "All States", href: "/auth/states" },
        { label: "Add State", href: "/auth/states/add" },
      ],
    },
    {
      icon: faCity,
      label: "Cities",
      dropdownKey: "cities",
      submenu: [
        { label: "All Cities", href: "/auth/cities" },
        { label: "Add City", href: "/auth/cities/add" },
      ],
    },
    {
      icon: faTags,
      label: "Tags & Travel Types",
      href: "/auth/tags",
    },
    {
      icon: faCommentDots,
      label: "Comments",
      dropdownKey: "comments",
      submenu: [
        { label: "All Comments", href: "/auth/comments" },
        { label: "Reported Comments", href: "/auth/comments/reported" },
      ],
    },
    {
      icon: faStar,
      label: "Ratings",
      href: "/auth/ratings",
    },
    {
      icon: faChartBar,
      label: "Analytics",
      dropdownKey: "analytics",
      submenu: [
        { label: "Visit Analytics", href: "/auth/analytics/visits" },
        { label: "Top Places", href: "/auth/analytics/trending" },
      ],
    },
    {
      icon: faUsers,
      label: "Users & Roles",
      href: "/auth/users",
    },
    {
      icon: faSearch,
      label: "Search Logs",
      href: "/auth/search-logs",
    },
    {
      icon: faImage,
      label: "Media Manager",
      href: "/auth/media",
    },
    {
      icon: faBell,
      label: "Notifications",
      href: "/auth/notifications",
    },
    {
      icon: faCog,
      label: "Settings",
      dropdownKey: "settings",
      submenu: [
        { label: "SEO Settings", href: "/auth/settings/seo" },
        { label: "General Settings", href: "/auth/settings/general" },
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
            {menuItems.map((item, index) => {
              const isActive = pathname.startsWith(item.href || "") && !item.dropdownKey;
              const isDropdownOpen = item.dropdownKey && openDropdowns[item.dropdownKey];

              return (
                <div key={index}>
                  <a
                    href={item.href || "#"}
                    className={`flex items-center justify-between px-3 py-2 rounded text-sm font-medium transition-colors w-full
                ${isActive
                        ? "bg-[#184062] text-white shadow-md"
                        : "text-[#184062] hover:bg-[#e58d0f] hover:text-white"
                      }`}
                    onClick={(e) => {
                      if (item.dropdownKey) {
                        e.preventDefault();
                        toggleDropdown(item.dropdownKey);
                      }
                    }}
                  >
                    <div className="flex items-center">
                      <FontAwesomeIcon icon={item.icon} className="h-5 w-5 mr-3" />
                      {item.label}
                    </div>
                    {item.dropdownKey && (
                      <FontAwesomeIcon
                        icon={faChevronDown}
                        className={`transition-transform ${isDropdownOpen ? "rotate-180" : ""}`}
                      />
                    )}
                  </a>

                  {item.dropdownKey && isDropdownOpen && (
                    <div className="ml-8 mt-1 space-y-1">
                      {item.submenu?.map((subItem, subIndex) => {
                        const isSubActive = pathname.startsWith(subItem.href);
                        return (
                          <a
                            key={subIndex}
                            href={subItem.href}
                            className={`block text-sm px-3 py-1 rounded 
                        ${isSubActive
                                ? "bg-[#184062] text-white shadow"
                                : "text-[#184062] hover:bg-[#e58d0f] hover:text-white"
                              }`}
                          >
                            {subItem.label}
                          </a>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })}
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
