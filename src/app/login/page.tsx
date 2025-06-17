"use client";

import { useEffect } from "react";
import { config } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faLock,
  faPlane,
  faPaperPlane,
  faRocket,
  faHelicopter,
  faSuitcaseRolling,
  faMapMarkerAlt,
  faCompass,
  faGlobeAmericas,
  faCamera,
  faMountain,
  faSignInAlt,
  faUserShield,
} from "@fortawesome/free-solid-svg-icons";
import { useHandleLogin } from "./login"; // relative path adjust karein
import Loader from "../components/loader";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useCustomToast } from "../components/CustomToaster"; // adjust path
import { Constant } from "../api/constant";

config.autoAddCss = false;

export default function LoginPage() {
  useEffect(() => {
    document.body.className = "min-h-screen min-h-[100dvh] overflow-hidden";
  }, []);

  const router = useRouter();
  const [user, setUser] = useState<null | { name: string; role: string }>(null);
  const { handleLogin, loading } = useHandleLogin();
  const { showToast, Toasts } = useCustomToast();

  // 🔒 Check if user is already authenticated
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await fetch(Constant.auth.me, {
          method: "GET",
          credentials: "include",
        });

        if (res.ok) {
          const data = await res.json();
          console.log("User data:", data);
          setUser(data.user); //
          router.push("/auth/dashboard"); 
        }
      } catch (err) {
        console.error("Auth check failed", err);
      }
    };

    checkAuth();
  }, [router]);

  // 🔐 Handle login form submit
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const username = form.get("username") as string;
    const password = form.get("password") as string;
    const remember = form.get("remember") as string;

    if (!username || !password) {
      showToast("Please fill all fields", "error");
      return;
    }

    await handleLogin({ username, password , remember }, showToast);
  };

  return (
    <>
      <style jsx global>{`
        @keyframes float {
          0%,
          100% {
            transform: translateY(0px) rotate(0deg);
          }
          50% {
            transform: translateY(-20px) rotate(5deg);
          }
        }
        @keyframes fly-horizontal {
          0% {
            transform: translateX(-100px);
          }
          100% {
            transform: translateX(calc(100vw + 100px));
          }
        }
        @keyframes fly-diagonal {
          0% {
            transform: translateX(-80px) translateY(80vh);
          }
          100% {
            transform: translateX(calc(100vw + 80px)) translateY(0vh);
          }
        }
        @keyframes float-travel {
          0%,
          100% {
            transform: translateY(0px) scale(1);
          }
          50% {
            transform: translateY(-15px) scale(1.05);
          }
        }
        @keyframes pulse-glow {
          0%,
          100% {
            opacity: 0.4;
            transform: scale(1);
          }
          50% {
            opacity: 0.8;
            transform: scale(1.1);
          }
        }
        @keyframes float-up-down {
          0%,
          100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-10px);
          }
        }
        .animate-float {
          animation: float 8s ease-in-out infinite;
        }
        .animate-fly-horizontal {
          animation: fly-horizontal 20s linear infinite;
        }
        .animate-fly-diagonal {
          animation: fly-diagonal 25s linear infinite;
        }
        .animate-float-travel {
          animation: float-travel 6s ease-in-out infinite;
        }
        .animate-pulse-glow {
          animation: pulse-glow 3s ease-in-out infinite;
        }
        .animate-float-up-down {
          animation: float-up-down 4s ease-in-out infinite;
        }
        .city-bg {
          background-image: url("./img/login-back.png");
          background-size: cover;
          background-position: center;
          background-repeat: no-repeat;
        }
      `}</style>

      {/* Background sections */}
      <Toasts />
      <div className="fixed inset-0 w-full h-full">
        <div className="w-full h-[70vh] city-bg relative">
          <div className="absolute inset-0 bg-gradient-to-br from-amber-100/80 via-orange-200/80 to-orange-300/40"></div>
        </div>
        <div className="w-full h-[30vh] bg-gradient-to-r from-amber-800 via-red-900 to-amber-900 relative">
          <div className="absolute top-0 left-4 sm:left-10 transform -translate-y-1/2">
            <img
              src="https://beyondteachings.com/image/shape-15.png"
              alt="Plane logo"
              className="h-12 sm:h-16 animate-float-up-down"
            />
          </div>
        </div>
      </div>

      {/* Animated Icons */}
      <div className="fixed inset-0 pointer-events-none z-30">
        <div className="animate-fly-horizontal absolute top-16 left-0">
          <FontAwesomeIcon
            icon={faPlane}
            className="text-white text-4xl sm:text-5xl drop-shadow-lg"
          />
        </div>
        <div
          className="animate-fly-horizontal absolute top-32 left-0"
          style={{ animationDelay: "-8s" }}
        >
          <FontAwesomeIcon
            icon={faPaperPlane}
            className="text-blue-200 text-3xl sm:text-4xl drop-shadow-lg"
          />
        </div>
        <div className="animate-fly-diagonal absolute bottom-0 left-0">
          <FontAwesomeIcon
            icon={faRocket}
            className="text-yellow-200 text-3xl sm:text-4xl drop-shadow-lg"
          />
        </div>
        <div
          className="animate-fly-diagonal absolute bottom-0 left-0"
          style={{ animationDelay: "-12s" }}
        >
          <FontAwesomeIcon
            icon={faHelicopter}
            className="text-orange-200 text-2xl sm:text-3xl drop-shadow-lg"
          />
        </div>
        <div className="animate-float-travel absolute top-20 right-6 sm:right-24">
          <FontAwesomeIcon
            icon={faSuitcaseRolling}
            className="text-white/80 text-3xl sm:text-4xl drop-shadow-lg"
          />
        </div>
        <div
          className="animate-float-travel absolute top-40 left-4 sm:left-20"
          style={{ animationDelay: "-3s" }}
        >
          <FontAwesomeIcon
            icon={faMapMarkerAlt}
            className="text-blue-200 text-2xl sm:text-3xl drop-shadow-lg"
          />
        </div>
        <div
          className="animate-float-travel absolute bottom-32 sm:bottom-40 right-4 sm:right-16"
          style={{ animationDelay: "-5s" }}
        >
          <FontAwesomeIcon
            icon={faCompass}
            className="text-yellow-200 text-3xl sm:text-4xl drop-shadow-lg"
          />
        </div>
        <div
          className="animate-float-travel absolute top-1/3 left-1/4 sm:left-1/3"
          style={{ animationDelay: "-7s" }}
        >
          <FontAwesomeIcon
            icon={faGlobeAmericas}
            className="text-orange-200 text-2xl sm:text-3xl drop-shadow-lg"
          />
        </div>
        <div
          className="animate-float-travel absolute top-1/4 right-1/3"
          style={{ animationDelay: "-4s" }}
        >
          <FontAwesomeIcon
            icon={faCamera}
            className="text-purple-200 text-2xl sm:text-3xl drop-shadow-lg"
          />
        </div>
        <div
          className="animate-float-travel absolute bottom-1/3 left-1/3"
          style={{ animationDelay: "-6s" }}
        >
          <FontAwesomeIcon
            icon={faMountain}
            className="text-green-200 text-2xl sm:text-3xl drop-shadow-lg"
          />
        </div>
        <div className="animate-pulse-glow absolute top-28 left-1/4 w-2 h-2 sm:w-3 sm:h-3 bg-white rounded-full"></div>
        <div
          className="animate-pulse-glow absolute top-52 right-1/4 w-3 h-3 sm:w-4 sm:h-4 bg-blue-200 rounded-full"
          style={{ animationDelay: "-1s" }}
        ></div>
        <div
          className="animate-pulse-glow absolute bottom-36 left-1/3 w-1 h-1 sm:w-2 sm:h-2 bg-yellow-200 rounded-full"
          style={{ animationDelay: "-2s" }}
        ></div>
        <div
          className="animate-pulse-glow absolute top-1/2 right-1/3 w-2 h-2 sm:w-3 sm:h-3 bg-orange-200 rounded-full"
          style={{ animationDelay: "-1.5s" }}
        ></div>
      </div>

      {/* Login Card */}
      <div className="relative z-20 min-h-screen min-h-[100dvh] flex items-center justify-center p-3 sm:p-4">
        <div className="w-full max-w-sm sm:max-w-md">
          <div className="bg-white/90 backdrop-blur-md rounded-2xl shadow-2xl p-6 sm:p-8 border border-white/30 mx-auto">
            <div className="text-center mb-6 sm:mb-8">
              <div className="mb-4">
                <FontAwesomeIcon
                  icon={faUserShield}
                  className="text-3xl sm:text-4xl text-[#d62424] mb-2"
                />
              </div>
              <h1 className="text-2xl sm:text-3xl font-bold text-[#d62424] mb-2">
                Admin Login
              </h1>
              <p className="text-sm sm:text-base text-gray-600">
                Welcome back! Please sign in to your account.
              </p>
            </div>
            <form className="space-y-5 sm:space-y-6" onSubmit={handleSubmit}>
              <div className="space-y-2">
                <label
                  htmlFor="username"
                  className="block text-sm font-medium text-gray-700"
                >
                  Username or Email
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FontAwesomeIcon
                      icon={faUser}
                      className="text-gray-400 text-sm"
                    />
                  </div>
                  <input
                    type="text"
                    id="username"
                    name="username"
                    required
                    placeholder="Enter your username or email"
                    className="w-full pl-10 pr-4 py-2.5 sm:py-3 border border-gray-300 rounded-lg bg-white text-black text-sm sm:text-base focus:outline-none focus:ring-0"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700"
                >
                  Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FontAwesomeIcon
                      icon={faLock}
                      className="text-gray-400 text-sm"
                    />
                  </div>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    required
                    placeholder="Enter your password"
                    className="w-full pl-10 pr-4 py-2.5 sm:py-3 border border-gray-300 rounded-lg bg-white text-black text-sm sm:text-base focus:outline-none focus:ring-0"
                  />
                </div>
              </div>
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center">
                  <input
                    id="remember"
                    name="remember"
                    type="checkbox"
                    className="h-4 w-4 text-red-600 focus:ring-red-500 border-gray-300 rounded"
                  />
                  <label
                    htmlFor="remember"
                    className="ml-2 block text-gray-700"
                  >
                    Remember me
                  </label>
                </div>
                <div>
                  <a
                    href="#"
                    className="font-medium text-red-600 hover:text-red-500 transition-colors duration-200"
                  >
                    Forgot password?
                  </a>
                </div>
              </div>
              <button
                type="submit"
                className="w-full flex justify-center items-center py-2.5 sm:py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 hover:cursor-pointer focus:outline-none focus:ring-2 focus:ring-offset-2 transform hover:scale-105"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <Loader size="h-6 w-6" />
                    <span className="ml-2">Signing In...</span>
                  </>
                ) : (
                  <>
                    <FontAwesomeIcon icon={faSignInAlt} className="mr-2" />
                    Sign In
                  </>
                )}
              </button>
            </form>
            <div className="mt-6 sm:mt-8 text-center">
              <p className="text-xs text-gray-500">
                © 2025 Admin Panel. All rights reserved.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
