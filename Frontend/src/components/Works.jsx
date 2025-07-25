// import React from "react";
// import Tilt from "react-tilt";
// import { motion } from "framer-motion";

// import { styles } from "../styles";
// import { github } from "../assets";
// import { SectionWrapper } from "../hoc";
// import { projects } from "../constants";
// import { fadeIn, textVariant } from "../utils/motion";

// const ProjectCard = ({
//   index,
//   name,
//   description,
//   tags,
//   image,
//   link,
//   source_code_link,
// }) => {
//   return (
//     <motion.div variants={fadeIn("up", "spring", index * 0.5, 0.75)}>
//       <Tilt
//         options={{
//           max: 45,
//           scale: 1,
//           speed: 450,
//         }}
//         className='bg-tertiary p-5 rounded-2xl sm:w-[360px] w-full'
//       >
//       <a href={link}> <div className='relative w-full h-[230px]'>
//           <img
//             src={image}
//             alt='project_image'
//             className='w-full h-full object-cover rounded-2xl'
//           />

//           <div className='absolute inset-0 flex justify-end m-3 card-img_hover'>
//             <div
//               onClick={() => window.open(source_code_link, "_blank")}
//               className='black-gradient w-10 h-10 rounded-full flex justify-center items-center cursor-pointer'
//             >
//               <img
//                 src={github}
//                 alt='source code'
//                 className='w-1/2 h-1/2 object-contain'
//               />
//             </div>
//           </div>
//         </div>
//         </a>
//         <div className='mt-5'>
//           <h3 className='text-white font-bold text-[24px]'>{name}</h3>
//           <p className='mt-2 text-secondary text-[14px]'>{description}</p>
//         </div>

//         <div className='mt-4 flex flex-wrap gap-2'>
//           {tags.map((tag) => (
//             <p
//               key={`${name}-${tag.name}`}
//               className={`text-[14px] ${tag.color}`}
//             >
//               #{tag.name}
//             </p>
//           ))}
//         </div>
//       </Tilt>
//     </motion.div>
//   );
// };

// const Works = () => {
//   return (
//     <>
//       <motion.div variants={textVariant()}>
//         <p className={`${styles.sectionSubText} `}>My work</p>
//         <h2 className={`${styles.sectionHeadText}`}>Projects.</h2>
//       </motion.div>

//       <div className='w-full flex'>
//         <motion.p
//           variants={fadeIn("", "", 0.1, 1)}
//           className='mt-3 text-secondary text-[17px] max-w-3xl leading-[30px]'
//         >
//           Following projects showcases my skills and experience through
//           real-world examples of my work. Each project is briefly described with
//           links to code repositories and live demos in it. It reflects my
//           ability to solve complex problems, work with different technologies,
//           and manage projects effectively.
//         </motion.p>
//       </div>

//       <div className='mt-20 flex flex-wrap gap-6'>
//         {projects.map((project, index) => (
//           <ProjectCard key={`project-${index}`} index={index} {...project} />
//         ))}
//       </div>
//     </>
//   );
// };

// export default SectionWrapper(Works, "");


// import React, { useEffect, useState } from "react";
// import Tilt from "react-tilt";
// import { motion } from "framer-motion";
// import { styles } from "../styles";
// import { github } from "../assets";
// import { SectionWrapper } from "../hoc";
// import { fadeIn, textVariant } from "../utils/motion";
// import axios from "axios";

// const ProjectCard = ({
//   index,
//   name,
//   description,
//   tags,
//   image,
//   link,
//   source_code_link,
// }) => {
//   return (
//     <motion.div variants={fadeIn("up", "spring", index * 0.5, 0.75)}>
//       <Tilt
//         options={{ max: 45, scale: 1, speed: 450 }}
//         className="bg-tertiary p-5 rounded-2xl sm:w-[360px] w-full"
//       >
//         <a href={link} target="_blank" rel="noopener noreferrer">
//           <div className="relative w-full h-[230px]">
//             <img
//               src={image}
//               alt="project_image"
//               className="w-full h-full object-cover rounded-2xl"
//             />
//             <div className="absolute inset-0 flex justify-end m-3 card-img_hover">
//               <div
//                 onClick={() => window.open(source_code_link, "_blank")}
//                 className="black-gradient w-10 h-10 rounded-full flex justify-center items-center cursor-pointer"
//               >
//                 <img
//                   src={github}
//                   alt="source code"
//                   className="w-1/2 h-1/2 object-contain"
//                 />
//               </div>
//             </div>
//           </div>
//         </a>
//         <div className="mt-5">
//           <h3 className="text-white font-bold text-[24px]">{name}</h3>
//           <p className="mt-2 text-secondary text-[14px]">{description}</p>
//         </div>
//         <div className="mt-4 flex flex-wrap gap-2">
//           {tags.map((tag, i) => (
//             <p key={i} className={`text-[14px] ${tag.color}`}>
//               #{tag.name}
//             </p>
//           ))}
//         </div>
//       </Tilt>
//     </motion.div>
//   );
// };

// const Works = () => {
//   const [projects, setProjects] = useState([]);
//   const [showForm, setShowForm] = useState(false);
//   const [formData, setFormData] = useState({
//     name: "",
//     description: "",
//     image: "",
//     link: "",
//     source_code_link: "",
//     tags: "",
//   });
//   const [isAdmin, setIsAdmin] = useState(false);

//   useEffect(() => {
//     fetchProjects();
//     checkUserRole();
//   }, []);

//   const fetchProjects = async () => {
//     try {
//       const res = await axios.get("http://localhost:5678/projects/getproject");
//       setProjects(res.data);
//     } catch (err) {
//       console.error("Failed to load projects", err);
//     }
//   };

// const checkUserRole = () => {
//   const isAdminLoggedIn = localStorage.getItem("adminLoggedIn");
//   if (isAdminLoggedIn === "true") {
//     setIsAdmin(true);
//   }
// };

//   const handleAddProject = async (e) => {
//     e.preventDefault();
//     const payload = {
//       ...formData,
//       tags: formData.tags.split(",").map((t) => ({
//         name: t.trim(),
//         color: "text-green-400",
//       })),
//     };

//     try {
//       await axios.post("http://localhost:5678/projects/addproject", payload);
//       fetchProjects();
//       setShowForm(false);
//       setFormData({
//         name: "",
//         description: "",
//         image: "",
//         link: "",
//         source_code_link: "",
//         tags: "",
//       });
//     } catch (error) {
//       console.error("Error adding project:", error);
//     }
//   };

//   return (
//     <>
//       <motion.div variants={textVariant()}>
//         <p className={styles.sectionSubText}>My work</p>
//         <h2 className={styles.sectionHeadText}>Projects.</h2>
//       </motion.div>

//       <div className="w-full flex">
//         <motion.p
//           variants={fadeIn("", "", 0.1, 1)}
//           className="mt-3 text-secondary text-[17px] max-w-3xl leading-[30px]"
//         >
//           Following projects showcase my skills and experience...
//         </motion.p>
//       </div>

//       {isAdmin && (
//         <div className="my-5">
//           <button
//             className="bg-blue-600 text-white px-6 py-2 rounded-xl"
//             onClick={() => setShowForm((prev) => !prev)}
//           >
//             {showForm ? "Cancel" : "Add Project"}
//           </button>

//           {showForm && (
//             <form onSubmit={handleAddProject} className="mt-6 grid gap-4">
//               <input
//                 type="text"
//                 placeholder="Project Name"
//                 value={formData.name}
//                 onChange={(e) =>
//                   setFormData({ ...formData, name: e.target.value })
//                 }
//                 className="p-2 rounded-lg bg-tertiary text-white"
//                 required
//               />
//               <input
//                 type="text"
//                 placeholder="Image URL"
//                 value={formData.image}
//                 onChange={(e) =>
//                   setFormData({ ...formData, image: e.target.value })
//                 }
//                 className="p-2 rounded-lg bg-tertiary text-white"
//                 required
//               />
//               <textarea
//                 placeholder="Description"
//                 value={formData.description}
//                 onChange={(e) =>
//                   setFormData({ ...formData, description: e.target.value })
//                 }
//                 className="p-2 rounded-lg bg-tertiary text-white"
//                 required
//               />
//               <input
//                 type="text"
//                 placeholder="Tags (comma separated)"
//                 value={formData.tags}
//                 onChange={(e) =>
//                   setFormData({ ...formData, tags: e.target.value })
//                 }
//                 className="p-2 rounded-lg bg-tertiary text-white"
//               />
//               <input
//                 type="url"
//                 placeholder="Live Link"
//                 value={formData.link}
//                 onChange={(e) =>
//                   setFormData({ ...formData, link: e.target.value })
//                 }
//                 className="p-2 rounded-lg bg-tertiary text-white"
//               />
//               <input
//                 type="url"
//                 placeholder="Source Code Link"
//                 value={formData.source_code_link}
//                 onChange={(e) =>
//                   setFormData({
//                     ...formData,
//                     source_code_link: e.target.value,
//                   })
//                 }
//                 className="p-2 rounded-lg bg-tertiary text-white"
//               />
//               <button
//                 type="submit"
//                 className="bg-green-500 text-white py-2 px-6 rounded-lg"
//               >
//                 Submit
//               </button>
//             </form>
//           )}
//         </div>
//       )}

//       <div className="mt-20 flex flex-wrap gap-6">
//         {projects.map((project, index) => (
//           <ProjectCard key={project._id || index} index={index} {...project} />
//         ))}
//       </div>
//     </>
//   );
// };

// export default SectionWrapper(Works, "");

import React, { useEffect, useState } from "react";
import Tilt from "react-tilt";
import { motion } from "framer-motion";
import { styles } from "../styles";
import { github } from "../assets";
import { SectionWrapper } from "../hoc";
import { fadeIn, textVariant } from "../utils/motion";
import axios from "axios";

const ProjectCard = ({
  index,
  name,
  description,
  tags,
  image,
  link,
  source_code_link,
}) => {
  return (
    <motion.div variants={fadeIn("up", "spring", index * 0.5, 0.75)}>
      <Tilt
        options={{ max: 45, scale: 1, speed: 450 }}
        className="bg-tertiary p-5 rounded-2xl sm:w-[360px] w-full"
      >
        <a href={link} target="_blank" rel="noopener noreferrer">
          <div className="relative w-full h-[230px]">
            <img
              src={image}
              alt="project_image"
              className="w-full h-full object-cover rounded-2xl"
            />
            <div className="absolute inset-0 flex justify-end m-3 card-img_hover">
              <div
                onClick={() => window.open(source_code_link, "_blank")}
                className="black-gradient w-10 h-10 rounded-full flex justify-center items-center cursor-pointer"
              >
                <img
                  src={github}
                  alt="source code"
                  className="w-1/2 h-1/2 object-contain"
                />
              </div>
            </div>
          </div>
        </a>
        <div className="mt-5">
          <h3 className="text-white font-bold text-[24px]">{name}</h3>
          <p className="mt-2 text-secondary text-[14px]">{description}</p>
        </div>
        <div className="mt-4 flex flex-wrap gap-2">
          {tags.map((tag, i) => (
            <p key={i} className={`text-[14px] ${tag.color}`}>
              #{tag.name}
            </p>
          ))}
        </div>
      </Tilt>
    </motion.div>
  );
};

const Works = () => {
  const [projects, setProjects] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    link: "",
    source_code_link: "",
    tags: "",
    image: null,
  });
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    fetchProjects();

    // Real-time role check from localStorage
    const checkLocalStorage = () => {
      const isLoggedIn = localStorage.getItem("adminLoggedIn") === "true";
      setIsAdmin(isLoggedIn);
    };

    checkLocalStorage();

    window.addEventListener("storage", checkLocalStorage);

    return () => window.removeEventListener("storage", checkLocalStorage);
  }, []);

  const fetchProjects = async () => {
    try {
      const res = await axios.get("http://localhost:5678/projects/getproject");
      setProjects(res.data);
    } catch (err) {
      console.error("Failed to load projects", err);
    }
  };

  // const handleAddProject = async (e) => {
  //   e.preventDefault();

  //   const tagsArray = formData.tags.split(",").map((tag) => ({
  //     name: tag.trim(),
  //     color: "text-green-400",
  //   }));

  //   const payload = new FormData();
  //   payload.append("name", formData.name);
  //   payload.append("description", formData.description);
  //   payload.append("link", formData.link);
  //   payload.append("source_code_link", formData.source_code_link);
  //   payload.append("tags", JSON.stringify(tagsArray));
  //   payload.append("image", formData.image);

  //   try {
  //     await axios.post("http://localhost:5678/projects/addproject", payload, {
  //       headers: { "Content-Type": "multipart/form-data" },
  //     });
  //     fetchProjects();
  //     setShowForm(false);
  //     setFormData({
  //       name: "",
  //       description: "",
  //       link: "",
  //       source_code_link: "",
  //       tags: "",
  //       image: null,
  //     });
  //   } catch (error) {
  //     console.error("Error adding project:", error);
  //   }
  // };

 const handleAddProject = async (e) => {
  e.preventDefault();

  const tagsArray = formData.tags.split(",").map((tag) => ({
    name: tag.trim(),
    color: "text-green-400",
  }));

  const payload = new FormData();
  payload.append("name", formData.name);
  payload.append("description", formData.description);
  payload.append("link", formData.link);
  payload.append("source_code_link", formData.source_code_link);
  payload.append("tags", JSON.stringify(tagsArray));
  payload.append("image", formData.image);

  try {
    const response = await axios.post(
      "http://localhost:5678/projects/addproject",
      payload,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    console.log("Project added:", response.data);
    fetchProjects(); // Refresh the project list
    setShowForm(false); // Hide the form
    // Reset the form
    setFormData({
      name: "",
      description: "",
      link: "",
      source_code_link: "",
      tags: "",
      image: null,
    });
  } catch (error) {
    console.error("Error adding project:", error);
  }
};


  
  return (
    <>
      <motion.div variants={textVariant()}>
        <p className={styles.sectionSubText}>My work</p>
        <h2 className={styles.sectionHeadText}>Projects.</h2>
      </motion.div>

      <div className="w-full flex">
        <motion.p
          variants={fadeIn("", "", 0.1, 1)}
          className="mt-3 text-secondary text-[17px] max-w-3xl leading-[30px]"
        >
          Following projects showcase my skills and experience...
        </motion.p>
      </div>

      {isAdmin && (
        <div className="my-8">
          <button
            className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-2 rounded-xl shadow-md hover:scale-105 transition-transform duration-300"
            onClick={() => setShowForm((prev) => !prev)}
          >
            {showForm ? "Cancel" : "Add Project"}
          </button>

          {showForm && (
            <form
              onSubmit={handleAddProject}
              className="mt-6 p-6 bg-[#1f1f1f] rounded-xl grid grid-cols-1 sm:grid-cols-2 gap-4 shadow-lg"
            >
              <input
                type="text"
                placeholder="Project Name"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                className="p-3 rounded-lg bg-[#2a2a2a] text-white"
                required
              />
              <input
                type="file"
                accept="image/*"
                onChange={(e) =>
                  setFormData({ ...formData, image: e.target.files[0] })
                }
                className="p-3 bg-[#2a2a2a] text-white rounded-lg"
                required
              />
              <textarea
                placeholder="Description"
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                className="p-3 rounded-lg bg-[#2a2a2a] text-white col-span-full"
                required
              />
              <input
                type="text"
                placeholder="Tags (comma separated)"
                value={formData.tags}
                onChange={(e) =>
                  setFormData({ ...formData, tags: e.target.value })
                }
                className="p-3 rounded-lg bg-[#2a2a2a] text-white"
              />
              <input
                type="url"
                placeholder="Live Link"
                value={formData.link}
                onChange={(e) =>
                  setFormData({ ...formData, link: e.target.value })
                }
                className="p-3 rounded-lg bg-[#2a2a2a] text-white"
              />
              <input
                type="url"
                placeholder="Source Code Link"
                value={formData.source_code_link}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    source_code_link: e.target.value,
                  })
                }
                className="p-3 rounded-lg bg-[#2a2a2a] text-white"
              />
              <button
                type="submit"
                className="col-span-full bg-green-500 text-white py-2 px-6 rounded-lg hover:bg-green-600 transition"
              >
                Submit Project
              </button>
            </form>
          )}
        </div>
      )}

      <div className="mt-20 flex flex-wrap gap-6">
        {projects.map((project, index) => (
          <ProjectCard key={project._id || index} index={index} {...project} />
        ))}
      </div>
    </>
  );
};

export default SectionWrapper(Works, "");
