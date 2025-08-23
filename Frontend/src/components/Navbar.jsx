

// import React, { useEffect, useState, useRef } from "react";
// import axios from "axios";
// // import { klogo } from "../assets";
// import { Menu, X } from "lucide-react";
// import baseurl from "./BaseUrl";
// import FingerprintJS from '@fingerprintjs/fingerprintjs';
// import { Link } from 'react-router-dom';

// const Navbar = ({ heroRef, contactRef,experienceRef }) => {
//   const [isLoggedIn, setIsLoggedIn] = useState(false);
//   const [showLogin, setShowLogin] = useState(false);
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
//   const [counts, setCounts] = useState({ todayCount: 0, totalCount: 0 });

//     const [mainUrl, setMainUrl] = useState(""); // URL from DB
//   const [editingUrl, setEditingUrl] = useState(false);
//   const urlInputRef = useRef(null);
  

//     const getAuthHeaders = () => {
//     const token = localStorage.getItem("token");
//     return { headers: { Authorization: `Bearer ${token}` } };
//   };

//     const scrollToHero = () => {
//     heroRef?.current?.scrollIntoView({ behavior: "smooth" });
//     setIsMobileMenuOpen(false);
//   };

//     const fetchMainUrl = async () => {
//     try {
//       const res = await axios.get(`${baseurl}url/`);
//       setMainUrl(res.data.url);
//     } catch (err) {
//       console.error("Failed to load URL:", err);
//     }
//   };


//     const saveMainUrl = async () => {
//     try {
//       await axios.put(`${baseurl}url/`, { url: mainUrl }, getAuthHeaders());
//       alert("Link updated successfully!");
//       setEditingUrl(false);
//     } catch (err) {
//       console.error("Failed to update URL:", err);
//       alert("Failed to update link");
//     }
//   };

//     const handleMainButtonClick = () => {
//     if (isLoggedIn) {
//       setEditingUrl((prev) => !prev);
//       setTimeout(() => urlInputRef.current?.focus(), 100);
//     } else {
//       if (mainUrl) window.open(mainUrl, "_blank");
//     }
//   };



//   const scrollToContact = () => {
//   contactRef?.current?.scrollIntoView({ behavior: "smooth" });
//   history.replaceState(null, "", "#contact");
//   setIsMobileMenuOpen(false);
// };

// const scrollToExperience = () => {
//   experienceRef?.current?.scrollIntoView({ behavior: "smooth" });
//   history.replaceState(null, "", "#experience");
//   setIsMobileMenuOpen(false);
// };




//   useEffect(() => {
//         fetchMainUrl();

//     const storedUser = localStorage.getItem("adminLoggedIn");
//     trackVisitor();
//     if (storedUser === "true") {
//       setIsLoggedIn(true);
//       fetchCounts();
//     }
//   }, []);



// const fetchCounts = async () => {
//   try {
//     const response = await axios.get(`${baseurl}visitor/counts`);
//     // console.log(response.data)
//     setCounts(response.data);
//   } catch (err) {
//     console.error("Error fetching counts:", err);
//   }
// };

// // console.log(`>>>count>>>>`, counts)
// // const trackVisitor = async () => {
// //   try {
// //     const fp = await FingerprintJS.load();
// //     const result = await fp.get();
// //     const fingerprint = result.visitorId;

// //     const res = await axios.post(`${baseurl}visitor/track`, { fingerprint });
// //     console.log(`>>>data>>>`, res.data)
// //   } catch (err) {
// //     console.error("Error tracking visitor:", err);
// //   }
// // };


// const trackVisitor = async () => {
//   try {
//     const res = await axios.post(`${baseurl}visitor/track`);
//     console.log(">>>data>>>", res.data);
//   } catch (err) {
//     console.error("Error tracking visitor:", err?.response?.data || err);
//   }
// };


//   const handleLogin = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await axios.post(`${baseurl}user/login`, {
//   email,
//   password,
// });


//       const { token,user, message } = response.data;
//       // console.log("Received token from server:", token);
    

//       if (user.role === "admin") {
//         setIsLoggedIn(true);
//         setShowLogin(false);
//         setIsMobileMenuOpen(false);

//         localStorage.setItem("adminLoggedIn", "true"); 
//         localStorage.setItem("token", token);

//         window.dispatchEvent(new Event("storage"));
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
//     localStorage.removeItem("adminLoggedIn");
//     localStorage.removeItem("token");  
//     setEmail("");
//     setPassword("");
//     setIsMobileMenuOpen(false);
//     alert("Logged out.");
//   };

//   return (



// <nav className="w-full text-white shadow-lg fixed top-0 left-0 z-50">
//   <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
//     {/* Logo */}
//     <div
//       className="flex items-center gap-2 cursor-pointer"
//       onClick={() => !isLoggedIn && setShowLogin(true)}
//     >
//       <p className="text-lg sm:text-xl font-bold">
//         Ashutosh
//         <span className="hidden sm:inline"> </span>
//       </p>
//     </div>

//     {/* Hamburger Icon */}
//     <div className="sm:hidden">
//       <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
//         {isMobileMenuOpen ? <X size={26} /> : <Menu size={26} />}
//       </button>
//     </div>

//     {/* Desktop Menu */}
//     <ul className="hidden sm:flex gap-6 items-center">
//       <li onClick={scrollToHero} className="cursor-pointer hover:text-gray-300">
//         Home
//       </li>

//          <li onClick={scrollToExperience} className="cursor-pointer hover:text-gray-300">
//   Experience
// </li>

//       <li onClick={scrollToContact} className="cursor-pointer hover:text-gray-300">
//         Contact
//       </li>

//        <li onClick={scrollToContact} className="cursor-pointer hover:text-gray-300">
//         Resume
//       </li>

 
//       {/* Open Link Button inside menu */}
//       {/* <li>
//         <button
//           onClick={() => {
//             if (isLoggedIn) {
//               setEditingUrl((prev) => !prev);
//               setTimeout(() => urlInputRef.current?.focus(), 100);
//             } else {
//               if (mainUrl) window.open(mainUrl, "_blank");
//             }
//           }}
//           className={`px-4 py-2 rounded ${
//             isLoggedIn
//               ? "bg-green-600 hover:bg-green-700"
//               : "bg-blue-600 hover:bg-blue-700"
//           }`}
//         >
//           Open Link
//         </button>
//       </li> */}

//       {isLoggedIn && editingUrl && (
//         <>
//           <li>
//             <input
//               ref={urlInputRef}
//               type="text"
//               value={mainUrl}
//               onChange={(e) => setMainUrl(e.target.value)}
//               placeholder="Enter URL"
//               className="px-3 py-1 rounded bg-gray-800 text-white w-[300px]"
//             />
//           </li>
//           <li>
//             <button
//               onClick={saveMainUrl}
//               className="px-3 py-1 bg-indigo-500 hover:bg-indigo-600 rounded text-white"
//             >
//               Save
//             </button>
//           </li>
//         </>
//       )}

//       {isLoggedIn && (
//         <>
//           <li>Today's Count: <strong>{counts.todayCount}</strong></li>
//           <li>Total Count: <strong>{counts.totalCount}</strong></li>
//           <li
//             className="cursor-pointer text-red-400 hover:text-red-600"
//             onClick={handleLogout}
//           >
//             Logout
//           </li>
//         </>
//       )}
//     </ul>
//   </div>

//   {/* Mobile Menu */}
//   {isMobileMenuOpen && (
//     <ul className="sm:hidden bg-gray-900 px-6 py-4 space-y-4 text-sm">
//       <li onClick={scrollToHero} className="cursor-pointer hover:text-gray-300">
//         Home
//       </li>
//                <li onClick={scrollToExperience} className="cursor-pointer hover:text-gray-300">
//   Experience
// </li>
//       <li onClick={scrollToContact} className="cursor-pointer hover:text-gray-300">
//         Contact
//       </li>

//         <li onClick={scrollToContact} className="cursor-pointer hover:text-gray-300">
//         Resume
//       </li>

//       {/* Mobile Open Link Button */}
//       <li>
//         <button
//           onClick={() => {
//             if (isLoggedIn) {
//               setEditingUrl((prev) => !prev);
//               setTimeout(() => urlInputRef.current?.focus(), 100);
//             } else {
//               if (mainUrl) window.open(mainUrl, "_blank");
//             }
//           }}
//           className={`w-full px-4 py-2 rounded ${
//             isLoggedIn
//               ? "bg-green-600 hover:bg-green-700"
//               : "bg-blue-600 hover:bg-blue-700"
//           }`}
//         >
//           Open Link
//         </button>

//         {isLoggedIn && editingUrl && (
//           <div className="mt-2 flex flex-col gap-2">
//             <input
//               ref={urlInputRef}
//               type="text"
//               value={mainUrl}
//               onChange={(e) => setMainUrl(e.target.value)}
//               placeholder="Enter URL"
//               className="px-3 py-2 rounded bg-gray-800 text-white w-full"
//             />
//             <button
//               onClick={saveMainUrl}
//               className="px-3 py-2 bg-indigo-500 hover:bg-indigo-600 rounded text-white w-full"
//             >
//               Save
//             </button>
//           </div>
//         )}
//       </li>

//       {isLoggedIn && (
//         <>
//           <li>Today: <strong>{counts.todayCount}</strong></li>
//           <li>Total: <strong>{counts.totalCount}</strong></li>
//           <li
//             className="cursor-pointer text-red-400 hover:text-red-600"
//             onClick={handleLogout}
//           >
//             Logout
//           </li>
//         </>
//       )}
//     </ul>
//   )}

//   {/* Login Modal */}
//   {showLogin && !isLoggedIn && (
//     <div className="absolute top-20 right-8 w-[300px] bg-white p-6 rounded-xl shadow-2xl animate-fade-in z-50">
//       <form onSubmit={handleLogin} className="flex flex-col gap-4">
//         <h2 className="text-xl font-semibold text-center text-gray-700">
//           Admin Login
//         </h2>
//         <input
//           type="email"
//           placeholder="Email"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//           className="border border-gray-300 rounded-lg px-3 py-2"
//           required
//         />
//         <input
//           type="password"
//           placeholder="Password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//           className="border border-gray-300 rounded-lg px-3 py-2"
//           required
//         />
//         <button
//           type="submit"
//           className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-lg py-2 font-semibold"
//         >
//           Sign In
//         </button>
//         <button
//           type="button"
//           onClick={() => setShowLogin(false)}
//           className="text-sm text-center text-gray-500 hover:text-red-500"
//         >
//           Cancel
//         </button>
//       </form>
//     </div>
//   )}
// </nav>




    

//   );
// };

// export default Navbar;




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
