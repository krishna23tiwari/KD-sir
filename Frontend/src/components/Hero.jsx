// import { useEffect } from "react";
// import Typed from "typed.js";
// import { motion } from "framer-motion";

// import { styles } from "../styles";
// import { ComputersCanvas } from "./canvas";

// const Hero = () => {
//   useEffect(() => {
//     // Initialize Typed.js on component mount
//     const typed = new Typed(".typing", {
//       strings: ["Krishan Kant Tiwari", "MERN Developer", "Full Stack Developer", "Competitive Programmer"],
//       typeSpeed: 100,
//       backSpeed: 60,
//       loop: true,
//     });

//     // Clean up the Typed.js instance on component unmount
//     return () => {
//       typed.destroy();
//     };
//   }, []);

//   return (
//     <section className={`relative w-full h-screen mx-auto`}>
//       <div
//         className={`absolute inset-0 top-[120px] max-w-7xl mx-auto ${styles.paddingX} flex flex-row items-start gap-5`}
//       >
//         <div className="flex flex-col justify-center items-center mt-5">
//           <div className="w-5 h-5 rounded-full bg-[#915EFF]" />
//           <div className="w-1 sm:h-80 h-40 violet-gradient" />
//         </div>
//         <div>
//           <h1 className={`${styles.heroHeadText} text-white`}>
//             Hi, I'm <span className="typing text-[#915EFF]"></span>
//           </h1>
//           <p className={`${styles.heroSubText} mt-2 text-white-100`}>
//             I'm a passionate Full Stack Web Developer
//             <br className="sm:block hidden" />
//           </p>
//         </div>
//       </div>

//       <ComputersCanvas />

      

      
//       <div className="absolute xs:bottom-10 bottom-32 w-full flex justify-center items-center">
//         <a href="#about">
//           <div className="w-[35px] h-[64px] rounded-3xl border-4 border-secondary flex justify-center items-start p-2">
//             <motion.div
//               animate={{
//                 y: [0, 24, 0],
//               }}
//               transition={{
//                 duration: 1.5,
//                 repeat: Infinity,
//                 repeatType: "loop",
//               }}
//               className="w-3 h-3 rounded-full bg-secondary mb-1"
//             />
//           </div>
//         </a>
//       </div>
//     </section>
//   );
// };

// export default Hero;


// import { useEffect, useState } from "react";
// import Typed from "typed.js";
// import { motion } from "framer-motion";
// import axios from "axios";

// import { styles } from "../styles";
// import { ComputersCanvas } from "./canvas";
// import baseurl from "./BaseUrl";

// // Base URL for API
//  // Adjust if needed

// // Auth token header function
// const getAuthHeaders = () => {
//   const token = localStorage.getItem("token");
//   return { headers: { Authorization: `Bearer ${token}` } };
// };

// const Hero = () => {
//   const [titles, setTitles] = useState([]);
//   const [subheading, setSubheading] = useState("");
//   const [inputTitles, setInputTitles] = useState("");
//   const [inputSubheading, setInputSubheading] = useState("");
//   const [isAdmin, setIsAdmin] = useState(false);



//   useEffect(() => {
//   const isAdminStored = localStorage.getItem("adminLoggedIn");
//   if (isAdminStored === "true") {
//     setIsAdmin(true);
//   }
// }, []);


//   // Fetch hero data
//   useEffect(() => {
//     axios.get(`${baseurl}hero/hero-text`, getAuthHeaders())
//       .then((res) => {
//         const data = res.data;
//         setTitles(data.titles || []);
//         setSubheading(data.subheading || "");
//         setInputTitles((data.titles || []).join(", "));
//         setInputSubheading(data.subheading || "");
//       })
//       .catch((err) => {
//         console.error("Failed to load hero text", err);
//       });
//   }, []);

//   // Setup typed.js animation
//   useEffect(() => {
//     if (titles.length > 0) {
//       const typed = new Typed(".typing", {
//         strings: titles,
//         typeSpeed: 100,
//         backSpeed: 60,
//         loop: true,
//       });

//       return () => typed.destroy();
//     }
//   }, [titles]);

//   // Handle create/update
//   const handleSave = () => {
//     const payload = {
//       titles: inputTitles.split(",").map((t) => t.trim()),
//       subheading: inputSubheading,
//     };

//     axios.put(`${baseurl}hero/hero-text`, payload, getAuthHeaders())
//       .then((res) => {
//         alert("Hero text updated successfully!");
//         setTitles(payload.titles);
//         setSubheading(payload.subheading);
//       })
//       .catch((err) => {
//         console.error("Update failed", err);
//       });
//   };

//   // Handle delete
//   const handleDelete = () => {
//     axios.delete(`${baseurl}hero/hero-text`, getAuthHeaders())
//       .then(() => {
//         alert("Hero text deleted");
//         setTitles([]);
//         setSubheading("");
//         setInputTitles("");
//         setInputSubheading("");
//       })
//       .catch((err) => {
//         console.error("Delete failed", err);
//       });
//   };

//   // Handle create new
//   const handleCreate = () => {
//     const payload = {
//       titles: inputTitles.split(",").map((t) => t.trim()),
//       subheading: inputSubheading,
//     };

//     axios.post(`${baseurl}hero/hero-text`, payload, getAuthHeaders())
//       .then((res) => {
//         alert("Hero text created!");
//         setTitles(payload.titles);
//         setSubheading(payload.subheading);
//       })
//       .catch((err) => {
//         console.error("Create failed", err);
//       });
//   };

//   return (
//     <section className={`relative w-full h-screen mx-auto`}>
//       {/* ADMIN PANEL */}
//       {isAdmin && (
//         <div className="absolute top-5 right-5 bg-white p-4 rounded shadow-md z-10 w-[300px]">
//           <h3 className="font-bold text-lg text-black">Hero Editor</h3>
//           <label className="text-sm text-gray-700">Titles (comma separated)</label>
//           <textarea
//             rows={3}
//             className="w-full border p-1 mt-1 mb-2 text-black"
//             value={inputTitles}
//             onChange={(e) => setInputTitles(e.target.value)}
//           />
//           <label className="text-sm text-gray-700">Subheading</label>
//           <input
//             type="text"
//             className="w-full border p-1 mt-1 mb-3 text-black"
//             value={inputSubheading}
//             onChange={(e) => setInputSubheading(e.target.value)}
//           />
//           <div className="flex justify-between gap-2">
//             <button
//               className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded"
//               onClick={handleSave}
//             >
//               Update
//             </button>
//             <button
//               className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded"
//               onClick={handleCreate}
//             >
//               Create
//             </button>
//             <button
//               className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
//               onClick={handleDelete}
//             >
//               Delete
//             </button>
//           </div>
//         </div>
//       )}

//       {/* HERO SECTION */}
//       <div className={`absolute inset-0 top-[120px] max-w-7xl mx-auto ${styles.paddingX} flex flex-row items-start gap-5`}>
//         <div className="flex flex-col justify-center items-center mt-5">
//           <div className="w-5 h-5 rounded-full bg-[#915EFF]" />
//           <div className="w-1 sm:h-80 h-40 violet-gradient" />
//         </div>

//         <div>
//           <h1 className={`${styles.heroHeadText} text-white`}>
//             Hi, I'm <span className="typing text-[#915EFF]"></span>
//           </h1>
//           <p className={`${styles.heroSubText} mt-2 text-white-100`}>
//             {subheading}
//             <br className="sm:block hidden" />
//           </p>
//         </div>
//       </div>

//       <ComputersCanvas />

//       <div className="absolute xs:bottom-10 bottom-32 w-full flex justify-center items-center">
//         <a href="#about">
//           <div className="w-[35px] h-[64px] rounded-3xl border-4 border-secondary flex justify-center items-start p-2">
//             <motion.div
//               animate={{ y: [0, 24, 0] }}
//               transition={{ duration: 1.5, repeat: Infinity, repeatType: "loop" }}
//               className="w-3 h-3 rounded-full bg-secondary mb-1"
//             />
//           </div>
//         </a>
//       </div>
//     </section>
//   );
// };

// export default Hero;






import { useEffect, useState } from "react";
import Typed from "typed.js";
import { motion } from "framer-motion";
import axios from "axios";

import { styles } from "../styles";
import { ComputersCanvas } from "./canvas";
import baseurl from "./BaseUrl";

const getAuthHeaders = () => {
  const token = localStorage.getItem("token");
  return { headers: { Authorization: `Bearer ${token}` } };
};

const Hero = () => {
  const [titles, setTitles] = useState([]);
  const [subheading, setSubheading] = useState("");
  const [inputTitles, setInputTitles] = useState("");
  const [inputSubheading, setInputSubheading] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const [showEditor, setShowEditor] = useState(false); // 👈 NEW

  useEffect(() => {
    const isAdminStored = localStorage.getItem("adminLoggedIn");
    if (isAdminStored === "true") setIsAdmin(true);
  }, []);

  useEffect(() => {
    axios.get(`${baseurl}hero/hero-text`, getAuthHeaders())
      .then((res) => {
        const data = res.data;
        setTitles(data.titles || []);
        setSubheading(data.subheading || "");
        setInputTitles((data.titles || []).join(", "));
        setInputSubheading(data.subheading || "");
      })
      .catch((err) => {
        console.error("Failed to load hero text", err);
      });
  }, []);

  useEffect(() => {
    if (titles.length > 0) {
      const typed = new Typed(".typing", {
        strings: titles,
        typeSpeed: 100,
        backSpeed: 60,
        loop: true,
      });
      return () => typed.destroy();
    }
  }, [titles]);

  const handleSave = () => {
    const payload = {
      titles: inputTitles.split(",").map((t) => t.trim()),
      subheading: inputSubheading,
    };
    axios.put(`${baseurl}hero/hero-text`, payload, getAuthHeaders())
      .then(() => {
        alert("Hero text updated successfully!");
        setTitles(payload.titles);
        setSubheading(payload.subheading);
        setShowEditor(false);
      })
      .catch((err) => {
        console.error("Update failed", err);
      });
  };

  const handleCreate = () => {
    const payload = {
      titles: inputTitles.split(",").map((t) => t.trim()),
      subheading: inputSubheading,
    };
    axios.post(`${baseurl}hero/hero-text`, payload, getAuthHeaders())
      .then(() => {
        alert("Hero text created!");
        setTitles(payload.titles);
        setSubheading(payload.subheading);
        setShowEditor(false);
      })
      .catch((err) => {
        console.error("Create failed", err);
      });
  };

  return (
    <section className={`relative w-full h-screen mx-auto`}>
      
      {/* === ADMIN BUTTON === */}
      {isAdmin && (
        <div className="absolute top-20 right-5 z-20">
          <button
            onClick={() => setShowEditor(!showEditor)}
            className="bg-[#915EFF] hover:bg-purple-700 text-white px-4 py-2 rounded shadow-lg"
          >
            {showEditor ? "Close Editor" : "Edit Hero Text"}
          </button>
        </div>
      )}

      {/* === ADMIN EDITOR PANEL === */}
      {isAdmin && showEditor && (
        <div className="absolute top-36 right-5 bg-white p-5 rounded-xl shadow-xl w-[350px] z-10 border border-gray-200">
          <h3 className="font-semibold text-xl text-black mb-3">Edit Hero Text</h3>

          <label className="text-sm text-gray-700">Titles (comma separated)</label>
          <textarea
            rows={3}
            className="w-full border border-gray-300 p-2 mt-1 mb-4 rounded text-black"
            value={inputTitles}
            onChange={(e) => setInputTitles(e.target.value)}
          />

          <label className="text-sm text-gray-700">Subheading</label>
          <input
            type="text"
            className="w-full border border-gray-300 p-2 mt-1 mb-4 rounded text-black"
            value={inputSubheading}
            onChange={(e) => setInputSubheading(e.target.value)}
          />

          <div className="flex justify-between">
            <button
              className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded"
              onClick={handleSave}
            >
              Update
            </button>
            <button
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
              onClick={handleCreate}
            >
              Create
            </button>
          </div>
        </div>
      )}

      {/* === HERO DISPLAY === */}
      <div className={`absolute inset-0 top-[120px] max-w-7xl mx-auto ${styles.paddingX} flex flex-row items-start gap-5`}>
        <div className="flex flex-col justify-center items-center mt-5">
          <div className="w-5 h-5 rounded-full bg-[#915EFF]" />
          <div className="w-1 sm:h-80 h-40 violet-gradient" />
        </div>

        <div>
          <h1 className={`${styles.heroHeadText} text-white`}>
            Hi, I'm <span className="typing text-[#915EFF]"></span>
          </h1>
          <p className={`${styles.heroSubText} mt-2 text-white-100`}>
            {subheading}
          </p>
        </div>
      </div>

      <ComputersCanvas />

      <div className="absolute xs:bottom-10 bottom-32 w-full flex justify-center items-center">
        <a href="#about">
          <div className="w-[35px] h-[64px] rounded-3xl border-4 border-secondary flex justify-center items-start p-2">
            <motion.div
              animate={{ y: [0, 24, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, repeatType: "loop" }}
              className="w-3 h-3 rounded-full bg-secondary mb-1"
            />
          </div>
        </a>
      </div>
    </section>
  );
};

export default Hero;
