// import React, { useEffect, useState } from "react";
// import { Link } from "react-router-dom";

// import { styles } from "../styles";
// import { navLinks } from "../constants";
// import { logo, menu, close, github, klogo } from "../assets";
// import linkedin from "../assets/linkedin.svg";
// import x from "../assets/x.svg";

// const Navbar = () => {
//   const [active, setActive] = useState("");
//   const [toggle, setToggle] = useState(false);
//   const [scrolled, setScrolled] = useState(false);

//   useEffect(() => {
//     const handleScroll = () => {
//       const scrollTop = window.scrollY;
//       if (scrollTop > 100) {
//         setScrolled(true);
//       } else {
//         setScrolled(false);
//       }
//     };

//     window.addEventListener("scroll", handleScroll);

//     return () => window.removeEventListener("scroll", handleScroll);
//   }, []);

//   return (
//     <nav
//       className={`${
//         styles.paddingX
//       } w-full flex items-center py-5 fixed top-0 z-20 ${
//         scrolled ? "bg-primary" : "bg-transparent"
//       }`}
//     >
//       <div className='w-full flex justify-between items-center max-w-7xl mx-auto'>
//         <div className='flex'>
//           <Link
//             to='/'
//             className='flex items-center gap-2'
//             onClick={() => {
//               setActive("");
//               window.scrollTo(0, 0);
//             }}
//           >
//             <img src= {klogo} alt='logo' className='w-9 h-9 object-contain' />
//             <p className='text-white text-[18px] font-bold cursor-pointer flex'>
//               KK Tiwari &nbsp;
//               <span className='sm:block hidden'> | Full-Stack Developer</span>
//             </p>
//           </Link>

//           <div className="flex gap-4 ml-5">
//             <a href="https://www.linkedin.com/in/krishan-kant-tiwari-979bb8328/" target="_blank" aria-label="LinkedIn">
//               <img src={linkedin} alt="LinkedIn" className='w-9 h-9' />
//             </a>
//             <a href="https://github.com/krishna23tiwari" target="_blank" aria-label="GitHub">
//               <img src={github} alt="GitHub" className='w-9 h-9' />
//             </a>
//             {/* <a href="https://x.com/ManuSaini82045" target="_blank" aria-label="Twitter/X">
//               <img src={x} alt="Twitter/X" className='w-9 h-9' />
//             </a> */}
//           </div>
//         </div>

//         {/* Large Screen Menu */}
//         <ul className='list-none hidden sm:flex flex-row gap-10'>
//           {navLinks.map((nav) => (
//             <li
//               key={nav.id}
//               className={`${
//                 active === nav.title ? "text-white" : "text-secondary"
//               } hover:text-white text-[18px] font-medium cursor-pointer relative group`}
//               onClick={() => setActive(nav.title)}
//             >
//               <a href={`#${nav.id}`}>{nav.title}</a>
//               {/* Underline effect */}
//               <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-white group-hover:w-full transition-all duration-300"></span>
//             </li>
//           ))}
//           <li
//             className={`${
//               active === 'Resume' ? "text-white" : "text-secondary"
//             } hover:text-white text-[18px] font-medium cursor-pointer relative group`}
//           >
//             <a
//               href="https://drive.google.com/file/d/1Vvwwoq0LjhpnQDY21CIgCylmxaU5nJ_V/view?usp=sharing"
//               target="_blank"
//               rel="noopener noreferrer"
//             >
//               Resume
//             </a>
//             {/* Underline effect */}
//             <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-white group-hover:w-full transition-all duration-300"></span>
//           </li>
//         </ul>

//         {/* Mobile Menu */}
//         <div className='sm:hidden flex flex-1 justify-end items-center'>
//           <img
//             src={toggle ? close : menu}
//             alt='menu'
//             className='w-[28px] h-[28px] object-contain'
//             onClick={() => setToggle(!toggle)}
//           />

//           <div
//             className={`${
//               !toggle ? "hidden" : "flex"
//             } p-6 black-gradient absolute top-20 right-0 mx-4 my-2 min-w-[140px] z-10 rounded-xl`}
//           >
//             <ul className='list-none flex justify-end items-start flex-1 flex-col gap-4'>
//               {navLinks.map((nav) => (
//                 <li
//                   key={nav.id}
//                   className={`font-poppins font-medium cursor-pointer text-[16px] ${
//                     active === nav.title ? "text-white" : "text-secondary"
//                   }`}
//                   onClick={() => {
//                     setToggle(!toggle);
//                     setActive(nav.title);
//                   }}
//                 >
//                   <a href={`#${nav.id}`}>{nav.title}</a>
//                 </li>
//               ))}
//               <li
//                 className={`font-poppins font-medium cursor-pointer text-[16px] ${
//                   active === 'Resume' ? "text-white" : "text-secondary"
//                 }`}
//               >
//                 <a
//                   href="https://drive.google.com/file/d/1O1QqGlLX0G50ig0-N-BCvoUhD9lVxcTV/view?usp=sharing"
//                   target="_blank"
//                   rel="noopener noreferrer"
//                 >
//                   Resume
//                 </a>
//               </li>
//             </ul>
//           </div>
//         </div>
//       </div>
//     </nav>
//   );
// };

// export default Navbar;


// import React, { useState } from "react";
// import { klogo } from "../assets";

// const Navbar = () => {
//   const [isLoggedIn, setIsLoggedIn] = useState(false);
//   const [showLogin, setShowLogin] = useState(false);

//   const handleLogin = (e) => {
//     e.preventDefault();
//     // Perform your actual auth logic here
//     setIsLoggedIn(true);
//     setShowLogin(false);
//   };

//   return (
//     <nav className='w-full flex items-center py-4 px-6 fixed top-0 z-50  shadow-lg'>
//       <div className='w-full flex justify-between items-center max-w-7xl mx-auto'>

//         {/* Left side logo & name */}
//         <div className='flex items-center gap-2 cursor-pointer' onClick={() => setShowLogin(true)}>
//           <img src={klogo} alt='logo' className='w-9 h-9 object-contain' />
//           <p className='text-white text-lg sm:text-xl font-bold'>
//             KK Tiwari <span className='hidden sm:inline'>| Full-Stack Developer</span>
//           </p>
//         </div>

//         {/* Right side nav items */}
//         <ul className='flex gap-6 sm:gap-10'>
//           <li className='text-white text-[16px] font-medium cursor-pointer hover:text-gray-300'>Home</li>
//           <li className='text-white text-[16px] font-medium cursor-pointer hover:text-gray-300'>Contact</li>
//           {isLoggedIn && (
//             <>
//               <li className='text-white text-[16px] font-medium cursor-pointer hover:text-gray-300'>Today's Count</li>
//               <li className='text-white text-[16px] font-medium cursor-pointer hover:text-gray-300'>Total Count</li>
//             </>
//           )}
//         </ul>
//       </div>

//       {/* Login Modal */}
//       {showLogin && !isLoggedIn && (
//         <div className="absolute top-20 right-8 w-[300px] bg-white p-6 rounded-xl shadow-2xl animate-fade-in z-50">
//           <form onSubmit={handleLogin} className="flex flex-col gap-4">
//             <h2 className="text-xl font-semibold text-center text-gray-700">Login</h2>
//             <input
//               type="text"
//               placeholder="Username"
//               className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
//               required
//             />
//             <input
//               type="password"
//               placeholder="Password"
//               className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
//               required
//             />
//             <button
//               type="submit"
//               className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-lg py-2 font-semibold hover:from-blue-600 hover:to-indigo-700 transition-all"
//             >
//               Sign In
//             </button>
//             <button
//               type="button"
//               onClick={() => setShowLogin(false)}
//               className="text-sm text-center text-gray-500 hover:text-red-500"
//             >
//               Cancel
//             </button>
//           </form>
//         </div>
//       )}
//     </nav>
//   );
// };

// export default Navbar;



// import React, { useState } from "react";
// import axios from "axios";
// import { klogo } from "../assets";
// import { Menu, X } from "lucide-react";

// const Navbar = () => {
//   const [isLoggedIn, setIsLoggedIn] = useState(false);
//   const [showLogin, setShowLogin] = useState(false);
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [todayCount, setTodayCount] = useState(0);
//   const [totalCount, setTotalCount] = useState(0);
//   const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

//   const fetchCounts = async () => {
//     try {
//       const response = await axios.get("http://localhost:5678/visitor/track");
//       const { todayCount, totalCount } = response.data;
//       setTodayCount(todayCount);
//       setTotalCount(totalCount);
//     } catch (err) {
//       console.error("Error fetching count data:", err);
//       alert("Failed to load visitor counts.");
//     }
//   };

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await axios.post("http://localhost:5678/user/login", {
//         email,
//         password,
//       });

//       const { user, message } = response.data;

//       if (user.role === "admin") {
//         setIsLoggedIn(true);
//         setShowLogin(false);
//         setIsMobileMenuOpen(false);
//         alert(message || "Login successful!");
//         fetchCounts();
//       } else {
//         alert("Access denied. Only admins can login.");
//       }
//     } catch (error) {
//       alert(error?.response?.data?.message || "Login failed.");
//     }
//   };

//   const handleLogout = () => {
//     setIsLoggedIn(false);
//     setEmail("");
//     setPassword("");
//     setTodayCount(0);
//     setTotalCount(0);
//     setIsMobileMenuOpen(false);
//     alert("Logged out.");
//   };

//   return (
//     <nav className="w-full text-white shadow-lg fixed top-0 left-0 z-50">
//       <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
//         {/* Logo */}
//         <div
//           className="flex items-center gap-2 cursor-pointer"
//           onClick={() => !isLoggedIn && setShowLogin(true)}
//         >
//           <img src={klogo} alt="logo" className="w-9 h-9 object-contain" />
//           <p className="text-lg sm:text-xl font-bold">
//             KK Tiwari <span className="hidden sm:inline">| Full-Stack Developer</span>
//           </p>
//         </div>

//         {/* Hamburger Icon */}
//         <div className="sm:hidden">
//           <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
//             {isMobileMenuOpen ? <X size={26} /> : <Menu size={26} />}
//           </button>
//         </div>

//         {/* Desktop Menu */}
//         <ul className="hidden sm:flex gap-6 items-center">
//           <li className="cursor-pointer hover:text-gray-300">Home</li>
//           <li className="cursor-pointer hover:text-gray-300">Contact</li>
//           {isLoggedIn && (
//             <>
//               <li>Today's Count: <strong>{todayCount}</strong></li>
//               <li>Total Count: <strong>{totalCount}</strong></li>
//               <li className="cursor-pointer text-red-400 hover:text-red-600" onClick={handleLogout}>Logout</li>
//             </>
//           )}
//         </ul>
//       </div>

//       {/* Mobile Menu */}
//       {isMobileMenuOpen && (
//         <ul className="sm:hidden bg-gray-900 px-6 py-4 space-y-3 text-sm">
//           <li className="cursor-pointer hover:text-gray-300">Home</li>
//           <li className="cursor-pointer hover:text-gray-300">Contact</li>
//           {isLoggedIn && (
//             <>
//               <li>Today: <strong>{todayCount}</strong></li>
//               <li>Total: <strong>{totalCount}</strong></li>
//               <li className="cursor-pointer text-red-400 hover:text-red-600" onClick={handleLogout}>Logout</li>
//             </>
//           )}
//         </ul>
//       )}

//       {/* Login Modal */}
//       {showLogin && !isLoggedIn && (
//         <div className="absolute top-20 right-8 w-[300px] bg-white p-6 rounded-xl shadow-2xl animate-fade-in z-50">
//           <form onSubmit={handleLogin} className="flex flex-col gap-4">
//             <h2 className="text-xl font-semibold text-center text-gray-700">Admin Login</h2>
//             <input
//               type="email"
//               placeholder="Email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               className="border border-gray-300 rounded-lg px-3 py-2"
//               required
//             />
//             <input
//               type="password"
//               placeholder="Password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               className="border border-gray-300 rounded-lg px-3 py-2"
//               required
//             />
//             <button
//               type="submit"
//               className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-lg py-2 font-semibold"
//             >
//               Sign In
//             </button>
//             <button
//               type="button"
//               onClick={() => setShowLogin(false)}
//               className="text-sm text-center text-gray-500 hover:text-red-500"
//             >
//               Cancel
//             </button>
//           </form>
//         </div>
//       )}
//     </nav>
//   );
// };

// export default Navbar;

import React, { useEffect, useState } from "react";
import axios from "axios";
import { klogo } from "../assets";
import { Menu, X } from "lucide-react";
import baseurl from "./BaseUrl";

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [todayCount, setTodayCount] = useState(0);
  const [totalCount, setTotalCount] = useState(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // 🔁 Load login status on first render
  useEffect(() => {
    const storedUser = localStorage.getItem("adminLoggedIn");
    if (storedUser === "true") {
      setIsLoggedIn(true);
      fetchCounts(); // fetch counts on refresh
    }
  }, []);

  const fetchCounts = async () => {
    try {
      // const response = await axios.get(`http://localhost:5678/visitor/track`);
      const response = await axios.get(`${baseurl}visitor/track`);
      const { todayCount, totalCount } = response.data;
      setTodayCount(todayCount);
      setTotalCount(totalCount);
    } catch (err) {
      console.error("Error fetching count data:", err);
      alert("Failed to load visitor counts.");
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      // const response = await axios.post("http://localhost:5678/user/login", {
      //   email,
      //   password,
      // });

      const response = await axios.post(`${baseurl}user/login`, {
  email,
  password,
});


      const { user, message } = response.data;

      if (user.role === "admin") {
        setIsLoggedIn(true);
        setShowLogin(false);
        setIsMobileMenuOpen(false);
        localStorage.setItem("adminLoggedIn", "true"); 
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
          <img src={klogo} alt="logo" className="w-9 h-9 object-contain" />
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
              <li>Today's Count: <strong>{todayCount}</strong></li>
              <li>Total Count: <strong>{totalCount}</strong></li>
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
              <li>Today: <strong>{todayCount}</strong></li>
              <li>Total: <strong>{totalCount}</strong></li>
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

