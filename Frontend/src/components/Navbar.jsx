import React, { useEffect, useState } from "react";
import axios from "axios";
import { Menu, X } from "lucide-react";
import baseurl from "./BaseUrl";

const Navbar = ({ heroRef, contactRef, experienceRef, projectsRef }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const scrollToHero = () => {
    heroRef?.current?.scrollIntoView({ behavior: "smooth" });
    setIsMobileMenuOpen(false);
  };

  const scrollToContact = () => {
    contactRef?.current?.scrollIntoView({ behavior: "smooth" });
    history.replaceState(null, "", "#contact");
    setIsMobileMenuOpen(false);
  };

  const scrollToExperience = () => {
    experienceRef?.current?.scrollIntoView({ behavior: "smooth" });
    history.replaceState(null, "", "#experience");
    setIsMobileMenuOpen(false);
  };

   const scrollToProjects = () => {
    projectsRef?.current?.scrollIntoView({ behavior: "smooth" });
    history.replaceState(null, "", "#experience");
    setIsMobileMenuOpen(false);
  };

  
  const resumeLink = "https://workspace.google.com/intl/en_in/";
  
  const openResume = () => {
    window.open(resumeLink, "_blank");
  };

  useEffect(() => {
    const storedUser = localStorage.getItem("adminLoggedIn");
    if (storedUser === "true") {
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${baseurl}user/login`, {
        email,
        password,
      });

      const { token, user, message } = response.data;

      if (user.role === "admin") {
        setIsLoggedIn(true);
        setShowLogin(false);
        setIsMobileMenuOpen(false);

        localStorage.setItem("adminLoggedIn", "true");
        localStorage.setItem("token", token);

        alert(message || "Login successful!");
      } else {
        alert("Access denied. Only admins can login.");
      }
    } catch (error) {
      alert(error?.response?.data?.message || "Login failed.");
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem("adminLoggedIn");
    localStorage.removeItem("token");
    setEmail("");
    setPassword("");
    setIsMobileMenuOpen(false);
    alert("Logged out.");
  };

  return (
    <nav className="w-full text-white shadow-lg fixed top-0 left-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo */}
        <div
          className="flex items-center gap-2 cursor-pointer"
          onClick={() => !isLoggedIn && setShowLogin(true)}
        >
          <p className="text-lg sm:text-xl font-bold">Ashutosh</p>
        </div>

        {/* Hamburger Icon */}
        <div className="sm:hidden">
          <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
            {isMobileMenuOpen ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>

        {/* Desktop Menu */}
        <ul className="hidden sm:flex gap-6 items-center">
          <li onClick={scrollToHero} className="cursor-pointer hover:text-gray-300">
            Home
          </li>
          <li onClick={scrollToExperience} className="cursor-pointer hover:text-gray-300">
            Experience
          </li>
            <li onClick={scrollToProjects} className="cursor-pointer hover:text-gray-300">
            Projects
          </li>
          <li onClick={scrollToContact} className="cursor-pointer hover:text-gray-300">
            Contact
          </li>
         
          <button 
      onClick={openResume} 
      className="cursor-pointer hover:text-gray-300"
    >
      Resume
    </button>

          {isLoggedIn && (
            <li
              className="cursor-pointer text-red-400 hover:text-red-600"
              onClick={handleLogout}
            >
              Logout
            </li>
          )}
        </ul>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <ul className="sm:hidden bg-gray-900 px-6 py-4 space-y-4 text-sm">
          <li onClick={scrollToHero} className="cursor-pointer hover:text-gray-300">
            Home
          </li>
          <li onClick={scrollToExperience} className="cursor-pointer hover:text-gray-300">
            Experience
          </li>
           <li onClick={scrollToProjects} className="cursor-pointer hover:text-gray-300">
            Projects
          </li>
          <li onClick={scrollToContact} className="cursor-pointer hover:text-gray-300">
            Contact
          </li>

          <li onClick={scrollToContact} className="cursor-pointer hover:text-gray-300">
            Resume
          </li>

          {isLoggedIn && (
            <li
              className="cursor-pointer text-red-400 hover:text-red-600"
              onClick={handleLogout}
            >
              Logout
            </li>
          )}
        </ul>
      )}

      {/* Login Modal */}
      {showLogin && !isLoggedIn && (
        <div className="absolute top-20 right-8 w-[300px] bg-white p-6 rounded-xl shadow-2xl animate-fade-in z-50">
          <form onSubmit={handleLogin} className="flex flex-col gap-4">
            <h2 className="text-xl font-semibold text-center text-gray-700">
              Admin Login
            </h2>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2"
              required
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2"
              required
            />
            <button
              type="submit"
              className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-lg py-2 font-semibold"
            >
              Sign In
            </button>
            <button
              type="button"
              onClick={() => setShowLogin(false)}
              className="text-sm text-center text-gray-500 hover:text-red-500"
            >
              Cancel
            </button>
          </form>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
