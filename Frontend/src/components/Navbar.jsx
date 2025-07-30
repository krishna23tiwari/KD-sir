

import React, { useEffect, useState } from "react";
import axios from "axios";
// import { klogo } from "../assets";
import { Menu, X } from "lucide-react";
import baseurl from "./BaseUrl";
import FingerprintJS from '@fingerprintjs/fingerprintjs';

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [todayCount, setTodayCount] = useState(0);
  const [totalCount, setTotalCount] = useState(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [counts, setCounts] = useState({ todayCount: 0, totalCount: 0 });
  

    const getAuthHeaders = () => {
    const token = localStorage.getItem("token");
    return { headers: { Authorization: `Bearer ${token}` } };
  };


  useEffect(() => {
    const storedUser = localStorage.getItem("adminLoggedIn");
    trackVisitor();
    if (storedUser === "true") {
      setIsLoggedIn(true);
      fetchCounts(); // fetch counts on refresh
    }
  }, []);



const fetchCounts = async () => {
  try {
    const response = await axios.get(`${baseurl}visitor/counts`);
    // console.log(response.data)
    setCounts(response.data);
  } catch (err) {
    console.error("Error fetching counts:", err);
  }
};

// console.log(`>>>count>>>>`, counts)
const trackVisitor = async () => {
  try {
    const fp = await FingerprintJS.load();
    const result = await fp.get();
    const fingerprint = result.visitorId;

    await axios.post(`${baseurl}visitor/track`, { fingerprint });
  } catch (err) {
    console.error("Error tracking visitor:", err);
  }
};


  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${baseurl}user/login`, {
  email,
  password,
});


      const { token,user, message } = response.data;
      // console.log("Received token from server:", token);
    

      if (user.role === "admin") {
        setIsLoggedIn(true);
        setShowLogin(false);
        setIsMobileMenuOpen(false);

        localStorage.setItem("adminLoggedIn", "true"); 
        localStorage.setItem("token", token);

        window.dispatchEvent(new Event("storage"));
        alert(message || "Login successful!");
        fetchCounts();
      } else {
        alert("Access denied. Only admins can login.");
      }
    } catch (error) {
      alert(error?.response?.data?.message || "Login failed.");
    }
  };

 

  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem("adminLoggedIn"); // ❌ remove on logout
    setEmail("");
    setPassword("");
    setTodayCount(0);
    setTotalCount(0);
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
          {/* <img src={klogo} alt="logo" className="w-9 h-9 object-contain" /> */}
          <p className="text-lg sm:text-xl font-bold">
            KK Tiwari <span className="hidden sm:inline">| Full-Stack Developer</span>
          </p>
        </div>

        {/* Hamburger Icon */}
        <div className="sm:hidden">
          <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
            {isMobileMenuOpen ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>

        {/* Desktop Menu */}
        <ul className="hidden sm:flex gap-6 items-center">
          <li className="cursor-pointer hover:text-gray-300">Home</li>
          <li className="cursor-pointer hover:text-gray-300">Contact</li>
          {isLoggedIn && (
            <>
              <li>Today's Count: <strong>{counts.todayCount}</strong></li>
              <li>Total Count: <strong>{counts.totalCount}</strong></li>
              <li className="cursor-pointer text-red-400 hover:text-red-600" onClick={handleLogout}>Logout</li>
            </>
          )}
        </ul>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <ul className="sm:hidden bg-gray-900 px-6 py-4 space-y-3 text-sm">
          <li className="cursor-pointer hover:text-gray-300">Home</li>
          <li className="cursor-pointer hover:text-gray-300">Contact</li>
          {isLoggedIn && (
            <>
              <li>Today: <strong>{counts.todayCount}</strong></li>
              <li>Total: <strong>{counts. totalCount}</strong></li>
              <li className="cursor-pointer text-red-400 hover:text-red-600" onClick={handleLogout}>Logout</li>
            </>
          )}
        </ul>
      )}

      {/* Login Modal */}
      {showLogin && !isLoggedIn && (
        <div className="absolute top-20 right-8 w-[300px] bg-white p-6 rounded-xl shadow-2xl animate-fade-in z-50">
          <form onSubmit={handleLogin} className="flex flex-col gap-4">
            <h2 className="text-xl font-semibold text-center text-gray-700">Admin Login</h2>
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

