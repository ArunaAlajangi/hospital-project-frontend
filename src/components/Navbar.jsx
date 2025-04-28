import React, { useContext, useState } from "react";
import { assets } from "../assets/assets.js";
import { NavLink, useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext.jsx";

const Navbar = () => {
  const navigate = useNavigate();
  const { token, setToken, userData } = useContext(AppContext);
  const [showMenu, setShowMenu] = useState(false);

  const logout = () => {
    setToken(false);
    localStorage.removeItem("token");
  };

  return (
    <div className="flex items-center justify-between text-sm py-4 mb-5 border-b border-b-gray-400">
      <img
        onClick={() => navigate("/")}
        className="w-44 cursor-pointer"
        src={assets.logo01}
        alt="logo"
      />

      <ul className="hidden md:flex items-start gap-5 font-medium">
        {["/", "/doctors", "/about", "/contact"].map((path, idx) => {
          const names = ["HOME", "ALL DOCTORS", "ABOUT", "CONTACT"];
          return (
            <NavLink
              key={path}
              to={path}
              className={({ isActive }) =>
                isActive ? "text-blue-500 border-b-2 border-blue-500" : ""
              }
            >
              <li className="py-1">{names[idx]}</li>
            </NavLink>
          );
        })}
      </ul>

      <div className="flex items-center gap-4">
        {token ? userData && (
          <div className="flex items-center gap-2 cursor-pointer group relative">
            <img className="w-10 rounded-full" src={assets.profile_pic} alt="profile" />
            <img className="w-4" src={assets.dropdown_icon} alt="dropdown" />

            <div className="absolute top-0 right-0 pt-17 text-base font-medium text-gray-600 z-20 hidden group-hover:block">
              <div className="min-w-42 bg-stone-100 rounded flex flex-col gap-2 p-4">
                <p onClick={() => navigate("my-profile")} className="hover:text-black cursor-pointer">
                  My Profile
                </p>
                <p onClick={() => navigate("my-appointments")} className="hover:text-black cursor-pointer">
                  My Appointments
                </p>
                <p onClick={logout} className="hover:text-black cursor-pointer">
                  Logout
                </p>
              </div>
            </div>
          </div>
        ) : (
          <button
            onClick={() => navigate("/login")}
            className="bg-blue-500 text-white px-8 py-3 rounded-full font-light block cursor-pointer"
          >
            Create Account
          </button>
        )}

        <img onClick={() => setShowMenu(true)} className="w-6 md:hidden" src={assets.menu_icon} alt="menu" />

        {/* Mobile Menu */}
        <div
          className={`${
            showMenu ? "fixed w-full" : "h-0 w-0"
          } md:hidden right-0 top-0 bottom-0 z-20 overflow-hidden bg-white transition-all`}
        >
          <div className="flex items-center justify-between px-5 py-6">
            <img className="w-36" src={assets.logo01} alt="logo" />
            <img className="w-7 cursor-pointer" onClick={() => setShowMenu(false)} src={assets.cross_icon} alt="close" />
          </div>

          <ul className="flex flex-col items-center gap-2 mt-5 px-5 text-lg font-medium">
            {["/", "/doctors", "/about", "/contact"].map((path, idx) => {
              const names = ["Home", "ALL DOCTORS", "ABOUT", "CONTACT"];
              return (
                <NavLink key={path} onClick={() => setShowMenu(false)} to={path}>
                  <p className="px-4 py-2 rounded inline-block bg-[#5f6FFF] hover:bg-blue-700 transition-colors duration-300">
                    {names[idx]}
                  </p>
                </NavLink>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
