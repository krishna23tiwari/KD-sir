// import React from "react";
// import {
//   VerticalTimeline,
//   VerticalTimelineElement,
// } from "react-vertical-timeline-component";
// import { motion } from "framer-motion";

// import "react-vertical-timeline-component/style.min.css";

// import { styles } from "../styles";
// import { experiences } from "../constants";
// import { SectionWrapper } from "../hoc";
// import { textVariant } from "../utils/motion";

// const ExperienceCard = ({ experience }) => {
//   return (
//     <VerticalTimelineElement
//       contentStyle={{
//         background: "#1d1836",
//         color: "#fff",
//       }}
//       contentArrowStyle={{ borderRight: "7px solid  #232631" }}
//       date={experience.date}
//       iconStyle={{ background: experience.iconBg }}
//       icon={
//         <div className='flex justify-center items-center w-full h-full'>
//           <img
//             src={experience.icon}
//             alt={experience.company_name}
//             className='w-[60%] h-[60%] object-contain'
//           />
//         </div>
//       }
//     >
//       <div>
//       <div className="inline-flex items-center">
//   <h3 className="text-white text-[24px] font-bold">{experience.title}</h3>
//   <a href={experience.link}><img className="w-10 h-10 ml-5" src="view.jpeg" alt="View" /></a>
// </div>

       
//         <p
//           className='text-secondary text-[16px] font-semibold'
//           style={{ margin: 0 }}
//         >
//           {experience.company_name}
//         </p>
//       </div>

//       <ul className='mt-5 list-disc ml-5 space-y-2'>
//         {experience.points.map((point, index) => (
//           <li
//             key={`experience-point-${index}`}
//             className='text-white-100 text-[14px] pl-1 tracking-wider'
//           >
//             {point}
//           </li>
//         ))}
//       </ul>
//     </VerticalTimelineElement>
//   );
// };

// const Experience = () => {
//   return (
//     <>
//       <motion.div variants={textVariant()}>
//         <p className={`${styles.sectionSubText} text-center`}>
//           What I have done so far
//         </p>
//         <h2 className={`${styles.sectionHeadText} text-center`}>
//           Work Experience.
//         </h2>
//       </motion.div>

//       <div className='mt-20 flex flex-col'>
//         <VerticalTimeline>
//           {experiences.map((experience, index) => (
//             <ExperienceCard
//               key={`experience-${index}`}
//               experience={experience}
//             />
//           ))}
//         </VerticalTimeline>
//       </div>
//     </>
//   );
// };

// export default SectionWrapper(Experience, "work");





// import React, { useState } from "react";
// import axios from "axios";
// import baseurl from "./BaseUrl";

// const ExperienceForm = ({ onSave }) => {
//   const [experience, setExperience] = useState({
//     title: "",
//     company_name: "",
//     icon: "",
//     iconBg: "#000000",
//     startDate: "",
//     endDate: "",
//     isPresent: false,
//     link: "",
//     points: [""],
//   });

//   const handleChange = (e) => {
//     const { name, value, type, checked } = e.target;
//     setExperience({
//       ...experience,
//       [name]: type === "checkbox" ? checked : value,
//     });
//   };

//   const handlePointChange = (index, value) => {
//     const newPoints = [...experience.points];
//     newPoints[index] = value;
//     setExperience({ ...experience, points: newPoints });
//   };

//   const addPoint = () => {
//     setExperience({ ...experience, points: [...experience.points, ""] });
//   };

// const handleSubmit = async (e) => {
//   e.preventDefault();

//   try {
//     const formData = new FormData();
//     formData.append("title", experience.title);
//     formData.append("company_name", experience.company_name);
//     formData.append("iconBg", experience.iconBg || "#000000");
//     formData.append(
//       "date",
//       experience.isPresent
//         ? `${experience.startDate} - Present`
//         : `${experience.startDate} - ${experience.endDate}`
//     );
//     formData.append("link", experience.link);

//     // append points as JSON string
//     formData.append("points", JSON.stringify(experience.points.filter(p => p.trim() !== "")));

//     // append image only if selected
//     if (experience.icon) {
//       formData.append("icon", experience.icon);
//     }

//     const res = await axios.post(
//       "http://localhost:5678/experience/saveexperience",
//       formData,
//       {
//         headers: {
//           "Content-Type": "multipart/form-data",
//         },
//       }
//     );

//     if (res.status === 201) {
//       alert("Experience saved successfully!");
//       onSave && onSave(res.data.experience);

//       // reset form
//       setExperience({
//         title: "",
//         company_name: "",
//         icon: "",
//         iconBg: "#000000",
//         startDate: "",
//         endDate: "",
//         isPresent: false,
//         link: "",
//         points: [""],
//       });
//     }
//   } catch (err) {
//     console.error("Save error:", err.response?.data || err.message);
//     alert("Error saving experience!");
//   }
// };

//   return (
//     <form onSubmit={handleSubmit} className="relative z-50 p-4 bg-gray-900 rounded-xl text-white">
//       <input
//         type="text"
//         name="title"
//         placeholder="Job Title"
//         value={experience.title}
//         onChange={handleChange}
//         className="w-full p-2 mb-2 rounded bg-gray-800"
//         required
//       />
//       <input
//         type="text"
//         name="company_name"
//         placeholder="Company Name"
//         value={experience.company_name}
//         onChange={handleChange}
//         className="w-full p-2 mb-2 rounded bg-gray-800"
//         required
//       />
//       {/* <input
//         type="text"
//         name="icon"
//         placeholder="Icon URL"
//         value={experience.icon}
//         onChange={handleChange}
//         className="w-full p-2 mb-2 rounded bg-gray-800"
//       /> */}

//       <input
//   type="file"
//   name="icon"
//   accept="image/*"
//   onChange={(e) => setExperience({ ...experience, icon: e.target.files[0] })}
//   className="w-full p-2 mb-2 rounded bg-gray-800"
// />

//       <input
//         type="color"
//         name="iconBg"
//         value={experience.iconBg}
//         onChange={handleChange}
//         className="w-16 h-10 mb-2"
//       />

//       <div className="flex gap-2 mb-2">
//         <input
//           type="month"
//           name="startDate"
//           value={experience.startDate}
//           onChange={handleChange}
//           className="p-2 rounded bg-gray-800"
//           required
//         />
//         {!experience.isPresent && (
//           <input
//             type="month"
//             name="endDate"
//             value={experience.endDate}
//             onChange={handleChange}
//             className="p-2 rounded bg-gray-800"
//           />
//         )}
//         <label className="flex items-center text-sm">
//           <input
//             type="checkbox"
//             name="isPresent"
//             checked={experience.isPresent}
//             onChange={handleChange}
//             className="mr-2"
//           />
//           Present
//         </label>
//       </div>

//       <input
//         type="text"
//         name="link"
//         placeholder="Project / Reference Link"
//         value={experience.link}
//         onChange={handleChange}
//         className="w-full p-2 mb-2 rounded bg-gray-800"
//       />

//       <div className="mb-2">
//         <p className="text-sm mb-1">Responsibilities / Points:</p>
//         {experience.points.map((point, index) => (
//           <input
//             key={index}
//             type="text"
//             value={point}
//             onChange={(e) => handlePointChange(index, e.target.value)}
//             placeholder={`Point ${index + 1}`}
//             className="w-full p-2 mb-1 rounded bg-gray-800"
//           />
//         ))}
//         <button
//           type="button"
//           onClick={addPoint}
//           className="bg-blue-600 px-3 py-1 rounded text-sm mt-2"
//         >
//           + Add Point
//         </button>
//       </div>

//       <button
//         type="submit"
//         className="bg-green-600 w-full py-2 rounded font-bold mt-2 relative z-50"
//       >
//         Save Experience
//       </button>
//     </form>
//   );
// };

// export default ExperienceForm;




// import React, { useState } from "react";
// import axios from "axios";
// import baseurl from "./BaseUrl";

// const ExperienceForm = ({ onSave }) => {
//   const [showForm, setShowForm] = useState(false); // ✅ toggle form visibility
//   const [experience, setExperience] = useState({
//     title: "",
//     company_name: "",
//     icon: "",
//     iconBg: "#000000",
//     startDate: "",
//     endDate: "",
//     isPresent: false,
//     link: "",
//     points: [""],
//   });

//   const handleChange = (e) => {
//     const { name, value, type, checked } = e.target;
//     setExperience({
//       ...experience,
//       [name]: type === "checkbox" ? checked : value,
//     });
//   };

//   const handlePointChange = (index, value) => {
//     const newPoints = [...experience.points];
//     newPoints[index] = value;
//     setExperience({ ...experience, points: newPoints });
//   };

//   const addPoint = () => {
//     setExperience({ ...experience, points: [...experience.points, ""] });
//   };

//   const removePoint = (index) => {
//     const newPoints = experience.points.filter((_, i) => i !== index);
//     setExperience({ ...experience, points: newPoints });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       const formData = new FormData();
//       formData.append("title", experience.title);
//       formData.append("company_name", experience.company_name);
//       formData.append("iconBg", experience.iconBg || "#000000");
//       formData.append(
//         "date",
//         experience.isPresent
//           ? `${experience.startDate} - Present`
//           : `${experience.startDate} - ${experience.endDate}`
//       );
//       formData.append("link", experience.link);
//       formData.append(
//         "points",
//         JSON.stringify(experience.points.filter((p) => p.trim() !== ""))
//       );

//       if (experience.icon) {
//         formData.append("icon", experience.icon);
//       }

//       const res = await axios.post(
//         `${baseurl}experience/saveexperience`,
//         formData,
//         { headers: { "Content-Type": "multipart/form-data" } }
//       );

//       if (res.status === 201) {
//         alert("Experience saved successfully!");
//         onSave && onSave(res.data.experience);

//         setExperience({
//           title: "",
//           company_name: "",
//           icon: "",
//           iconBg: "#000000",
//           startDate: "",
//           endDate: "",
//           isPresent: false,
//           link: "",
//           points: [""],
//         });
//         setShowForm(false); // hide form after saving
//       }
//     } catch (err) {
//       console.error("Save error:", err.response?.data || err.message);
//       alert("Error saving experience!");
//     }
//   };

//   // ✅ Check if admin is logged in
//   const isAdmin = localStorage.getItem("adminLoggedIn") === "true";

//   if (!isAdmin) return null; // 🔒 if not admin, show nothing

//   return (
//     <div className="mb-5">
//       {!showForm ? (
//         <button
//           onClick={() => setShowForm(true)}
//           className="bg-blue-600 px-4 py-2 rounded text-white font-bold relative z-50"
//         >
//           + Add Experience
//         </button>
//       ) : (
//         <form
//           onSubmit={handleSubmit}
//           className="relative z-50 p-4 bg-gray-900 rounded-xl text-white"
//         >
//           <input
//             type="text"
//             name="title"
//             placeholder="Job Title"
//             value={experience.title}
//             onChange={handleChange}
//             className="w-full p-2 mb-2 rounded bg-gray-800"
//             required
//           />
//           <input
//             type="text"
//             name="company_name"
//             placeholder="Company Name"
//             value={experience.company_name}
//             onChange={handleChange}
//             className="w-full p-2 mb-2 rounded bg-gray-800"
//             required
//           />

//           <input
//             type="file"
//             name="icon"
//             accept="image/*"
//             onChange={(e) =>
//               setExperience({ ...experience, icon: e.target.files[0] })
//             }
//             className="w-full p-2 mb-2 rounded bg-gray-800"
//           />

//           <input
//             type="color"
//             name="iconBg"
//             value={experience.iconBg}
//             onChange={handleChange}
//             className="w-16 h-10 mb-2"
//           />

//           <div className="flex gap-2 mb-2">
//             <input
//               type="month"
//               name="startDate"
//               value={experience.startDate}
//               onChange={handleChange}
//               className="p-2 rounded bg-gray-800"
//               required
//             />
//             {!experience.isPresent && (
//               <input
//                 type="month"
//                 name="endDate"
//                 value={experience.endDate}
//                 onChange={handleChange}
//                 className="p-2 rounded bg-gray-800"
//               />
//             )}
//             <label className="flex items-center text-sm">
//               <input
//                 type="checkbox"
//                 name="isPresent"
//                 checked={experience.isPresent}
//                 onChange={handleChange}
//                 className="mr-2"
//               />
//               Present
//             </label>
//           </div>

//           <input
//             type="text"
//             name="link"
//             placeholder="Project / Reference Link"
//             value={experience.link}
//             onChange={handleChange}
//             className="w-full p-2 mb-2 rounded bg-gray-800"
//           />

//           {/* ✅ Responsibilities with delete button */}
//           <div className="mb-2">
//             <p className="text-sm mb-1">Responsibilities / Points:</p>
//             {experience.points.map((point, index) => (
//               <div key={index} className="flex items-center mb-1">
//                 <input
//                   type="text"
//                   value={point}
//                   onChange={(e) => handlePointChange(index, e.target.value)}
//                   placeholder={`Point ${index + 1}`}
//                   className="w-full p-2 rounded bg-gray-800"
//                 />
//                 <button
//                   type="button"
//                   onClick={() => removePoint(index)}
//                   className="ml-2 bg-red-600 px-2 py-1 rounded"
//                 >
//                   ❌
//                 </button>
//               </div>
//             ))}
//             <button
//               type="button"
//               onClick={addPoint}
//               className="bg-blue-600 px-3 py-1 rounded text-sm mt-2"
//             >
//               + Add Point
//             </button>
//           </div>

//           <div className="flex gap-2 mt-3">
//             <button
//               type="submit"
//               className="bg-green-600 flex-1 py-2 rounded font-bold"
//             >
//               Save Experience
//             </button>
//             <button
//               type="button"
//               onClick={() => setShowForm(false)}
//               className="bg-gray-600 flex-1 py-2 rounded font-bold"
//             >
//               Cancel
//             </button>
//           </div>
//         </form>
//       )}
//     </div>
//   );
// };

// export default ExperienceForm;




import React, { useEffect, useState } from "react";
import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";
import { motion } from "framer-motion";
import axios from "axios";
import "react-vertical-timeline-component/style.min.css";

import { styles } from "../styles";
import { SectionWrapper } from "../hoc";
import { textVariant } from "../utils/motion";
import AddExperience from "./AddExperince"; // ✅ import the AddExperience form
import baseurl from "./BaseUrl"; // <-- adjust path if needed

// const ExperienceCard = ({ experience }) => {
//   return (
//     <VerticalTimelineElement
//       contentStyle={{
//         background: "#1d1836",
//         color: "#fff",
//       }}
//       contentArrowStyle={{ borderRight: "7px solid  #232631" }}
//       date={experience.date}
//       iconStyle={{ background: experience.iconBg }}
//       icon={
//         <div className="flex justify-center items-center w-full h-full">
//           <img
//             src={experience.icon}
//             alt={experience.company_name}
//             className="w-[60%] h-[60%] object-contain"
//           />
//         </div>
//       }
//     >
//       <div>
//         <div className="inline-flex items-center">
//           <h3 className="text-white text-[24px] font-bold">{experience.title}</h3>
//           {experience.link && (
//             <a href={experience.link} target="_blank" rel="noreferrer">
//               <img className="w-10 h-10 ml-5" src="view.jpeg" alt="View" />
//             </a>
//           )}
//         </div>

//         <p
//           className="text-secondary text-[16px] font-semibold"
//           style={{ margin: 0 }}
//         >
//           {experience.company_name}
//         </p>
//       </div>

//       <ul className="mt-5 list-disc ml-5 space-y-2">
//         {experience.points.map((point, index) => (
//           <li
//             key={`experience-point-${index}`}
//             className="text-white-100 text-[14px] pl-1 tracking-wider"
//           >
//             {point}
//           </li>
//         ))}
//       </ul>
//     </VerticalTimelineElement>
//   );
// };


const ExperienceCard = ({ experience, adminLoggedIn, onEdit, onDelete }) => {
  return (
    <VerticalTimelineElement
      contentStyle={{
        background: "#1d1836",
        color: "#fff",
      }}
      contentArrowStyle={{ borderRight: "7px solid  #232631" }}
      date={experience.date}
      iconStyle={{ background: experience.iconBg }}
      icon={
        <div className="flex justify-center items-center w-full h-full">
          <img
            src={experience.icon}
            alt={experience.company_name}
            className="w-[60%] h-[60%] object-contain"
          />
        </div>
      }
    >
      <div className="flex justify-between items-center">
        <div>
          <div className="inline-flex items-center">
            <h3 className="text-white text-[24px] font-bold">{experience.title}</h3>
            {experience.link && (
              <a href={experience.link} target="_blank" rel="noreferrer">
                <img className="w-10 h-10 ml-5" src="view.jpeg" alt="View" />
              </a>
            )}
          </div>
          <p className="text-secondary text-[16px] font-semibold" style={{ margin: 0 }}>
            {experience.company_name}
          </p>
        </div>

        {/* ✅ Show Edit/Delete buttons only for Admin */}
        {adminLoggedIn && (
          <div className="flex gap-3">
            <button
              onClick={() => onEdit(experience)}
              className="px-3 py-1 bg-yellow-500 rounded-lg text-sm"
            >
              Edit
            </button>
            <button
              onClick={() => onDelete(experience._id)}
              className="px-3 py-1 bg-red-500 rounded-lg text-sm"
            >
              Delete
            </button>
          </div>
        )}
      </div>

      <ul className="mt-5 list-disc ml-5 space-y-2">
        {experience.points.map((point, index) => (
          <li
            key={`experience-point-${index}`}
            className="text-white-100 text-[14px] pl-1 tracking-wider"
          >
            {point}
          </li>
        ))}
      </ul>
    </VerticalTimelineElement>
  );
};



// const Experience = () => {
//   const [experiences, setExperiences] = useState([]);
//   const [adminLoggedIn, setAdminLoggedIn] = useState(false);

//   // 🔥 fetch experiences from backend
//   const fetchExperiences = async () => {
//     try {
//       const res = await axios.get(`${baseurl}experience/getexperience`);
//       setExperiences(res.data);
//     } catch (err) {
//       console.error("Error fetching experiences:", err);
//     }
//   };

//   useEffect(() => {
//     fetchExperiences();

//     // check if admin is logged in from localStorage
//     const adminStatus = localStorage.getItem("adminLoggedIn");
//     setAdminLoggedIn(adminStatus === "true");
//   }, []);

//   return (
//     <>
//       <motion.div variants={textVariant()}>
//         <p className={`${styles.sectionSubText} text-center`}>
//           What I have done so far
//         </p>
//         <h2 className={`${styles.sectionHeadText} text-center`}>
//           Work Experience.
//         </h2>
//       </motion.div>

//       {/* ✅ show AddExperience form if admin is logged in */}
//       {adminLoggedIn && (
//         <div className="my-6">
//           <AddExperience onSave={fetchExperiences} />
//         </div>
//       )}

//       <div className="mt-20 flex flex-col">
//         <VerticalTimeline>
//           {experiences.map((experience, index) => (
//             <ExperienceCard
//               key={`experience-${index}`}
//               experience={experience}
//             />
//           ))}
//         </VerticalTimeline>
//       </div>
//     </>
//   );
// };

const Experience = () => {
  const [experiences, setExperiences] = useState([]);
  const [adminLoggedIn, setAdminLoggedIn] = useState(false);
  const [editingExp, setEditingExp] = useState(null); // ✅ store experience being edited

  const fetchExperiences = async () => {
    try {
      const res = await axios.get(`${baseurl}experience/getexperience`);
      setExperiences(res.data);
    } catch (err) {
      console.error("Error fetching experiences:", err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${baseurl}experience/deleteex/${id}`);
      fetchExperiences();
    } catch (err) {
      console.error("Error deleting experience:", err);
    }
  };

  const handleEdit = (experience) => {
    setEditingExp(experience); // ✅ pass this to AddExperience form
  };

  useEffect(() => {
    fetchExperiences();
    const adminStatus = localStorage.getItem("adminLoggedIn");
    setAdminLoggedIn(adminStatus === "true");
  }, []);

  return (
    <>
      <motion.div variants={textVariant()}>
        <p className={`${styles.sectionSubText} text-center`}>
          What I have done so far
        </p>
        <h2 className={`${styles.sectionHeadText} text-center`}>
          Work Experience.
        </h2>
      </motion.div>

      {adminLoggedIn && (
        <div className="my-6">
          {/* ✅ pass editingExp to form */}
          <AddExperience
            onSave={fetchExperiences}
            editingExp={editingExp}
            clearEdit={() => setEditingExp(null)}
          />
        </div>
      )}

      <div className="mt-20 flex flex-col">
        <VerticalTimeline>
          {experiences.map((experience) => (
            <ExperienceCard
              key={experience._id}
              experience={experience}
              adminLoggedIn={adminLoggedIn}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          ))}
        </VerticalTimeline>
      </div>
    </>
  );
};


export default SectionWrapper(Experience, "work");
