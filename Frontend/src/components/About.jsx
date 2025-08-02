import React from "react";
import Tilt from "react-parallax-tilt";

import { motion } from "framer-motion";

import { styles } from "../styles";
// import { services } from "../constants";
import { SectionWrapper } from "../hoc";
import { fadeIn, textVariant } from "../utils/motion";
import ComputersCanvas from './canvas/Computers';

const ServiceCard = ({ index, title, icon }) => (
  <Tilt className='xs:w-[250px] w-full'>
    <motion.div
      variants={fadeIn("right", "spring", index * 0.5, 0.75)}
      className='w-full green-pink-gradient p-[1px] rounded-[20px] shadow-card'
    >
      <div
        options={{
          max: 45,
          scale: 1,
          speed: 450,
        }}
        className='bg-tertiary rounded-[20px] py-5 px-12 min-h-[280px] flex justify-evenly items-center flex-col'
      >
        <img
          src={icon}
          alt='web-development'
          className='w-16 h-16 object-contain'
        />

        <h3 className='text-white text-[20px] font-bold text-center'>
          {title}
        </h3>
      </div>
    </motion.div>
  </Tilt>
);

const About = () => {
  return (
    <>
      <motion.div variants={textVariant()}>
        <p className={styles.sectionSubText}>Introduction</p>
        <h2 className={styles.sectionHeadText}>Overview.</h2>
      </motion.div>

      <motion.p
  variants={fadeIn("", "", 0.1, 1)}
  className='mt-4 text-secondary text-[17px] max-w-3xl leading-[30px]'
>

Amazon Web Services (AWS) is a comprehensive cloud computing platform provided by Amazon, offering a wide range of infrastructure and application services. Launched in 2006, AWS enables individuals, startups, and enterprises to build and scale applications without investing heavily in physical hardware. Its services are delivered on-demand and follow a pay-as-you-go pricing model, making it cost-effective and flexible.

AWS offers core services such as compute (Amazon EC2, Lambda), storage (Amazon S3, EBS), databases (Amazon RDS, DynamoDB), and networking (VPC, Route 53). It also provides advanced solutions in artificial intelligence, machine learning, analytics, DevOps, IoT, and security. With a global infrastructure spanning multiple regions and availability zones, AWS ensures high availability, scalability, and disaster recovery.<br></br>

Security is a key focus for AWS, offering features like encryption, identity and access management (IAM), and compliance with global standards. It supports various deployment models, including public, private, and hybrid cloud architectures.<br></br>

Organizations use AWS for hosting websites, running enterprise applications, big data processing, backup and disaster recovery, and deploying microservices. Its scalability, reliability, and innovation have made AWS a leader in the cloud computing industry, empowering businesses to innovate and scale faster.


</motion.p>

<motion.div
  variants={fadeIn("", "", 0.1, 1)}
  className='mt-4 text-secondary text-[17px] max-w-3xl leading-[30px]'
>
  <p>
    {/* <span className="text-white">Degree:</span> Masters of Comuter Applications(MCA) &nbsp; <span className="text-white">CGPA:</span> 8.8 */}
  </p>
  {/* <p className='mt-2'>
    <span className="text-white">Email:</span> krishna23tiwari.kt@gmail.com
  </p> */}
</motion.div>

        
      {/* <div className='mt-20 flex flex-wrap gap-10'>
        {services.map((service, index) => (
          <ServiceCard key={service.title} index={index} {...service} />
        ))}
      </div> */}
    </>
  );
};

export default SectionWrapper(About, "about");


// import React, { useEffect, useState } from "react";
// import Tilt from "react-parallax-tilt";
// import { motion } from "framer-motion";
// import { styles } from "../styles";
// import { SectionWrapper } from "../hoc";
// import { fadeIn, textVariant } from "../utils/motion";
// import axios from "axios";
// import baseurl from "./BaseUrl";

// const ServiceCard = ({ index, title, icon }) => (
//   <Tilt className='xs:w-[250px] w-full'>
//     <motion.div
//       variants={fadeIn("right", "spring", index * 0.5, 0.75)}
//       className='w-full green-pink-gradient p-[1px] rounded-[20px] shadow-card'
//     >
//       <div className='bg-tertiary rounded-[20px] py-5 px-12 min-h-[280px] flex justify-evenly items-center flex-col'>
//         <img src={icon} alt='service' className='w-16 h-16 object-contain' />
//         <h3 className='text-white text-[20px] font-bold text-center'>
//           {title}
//         </h3>
//       </div>
//     </motion.div>
//   </Tilt>
// );

// const About = () => {
//   const [aboutData, setAboutData] = useState(null);
//   const [editMode, setEditMode] = useState(false);
//   const isAdmin = localStorage.getItem("adminLoggedIn") === "true";

//   useEffect(() => {
//     axios.get(`${baseurl}about/`)
//       .then((res) => setAboutData(res.data))
//       .catch((err) => console.error("Error loading about info:", err));
//   }, []);

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setAboutData((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleServiceChange = (index, key, value) => {
//     const updatedServices = [...aboutData.services];
//     updatedServices[index][key] = value;
//     setAboutData({ ...aboutData, services: updatedServices });
//   };

//   const addService = () => {
//     setAboutData((prev) => ({
//       ...prev,
//       services: [...prev.services, { title: "", icon: "" }],
//     }));
//   };

//   const removeService = (index) => {
//     const updated = [...aboutData.services];
//     updated.splice(index, 1);
//     setAboutData({ ...aboutData, services: updated });
//   };

//   const handleSave = async () => {
//     try {
//       const res = await axios.post(`{baseurl}about/`, aboutData, {
//         headers: { Authorization: "Bearer your_token_if_any" }, // Optional
//       });
//       alert("About info updated successfully!");
//       setEditMode(false);
//     } catch (error) {
//       alert("Failed to update");
//     }
//   };

//   if (!aboutData) return <div className="text-white">Loading...</div>;

//   return (
//     <>
//       <motion.div variants={textVariant()}>
//         <p className={styles.sectionSubText}>Introduction</p>
//         <h2 className={styles.sectionHeadText}>Overview.</h2>
//       </motion.div>

//       {isAdmin && !editMode && (
//         <button
//           onClick={() => setEditMode(true)}
//           className="bg-blue-600 text-white px-4 py-2 rounded mt-4"
//         >
//           Edit About Info
//         </button>
//       )}

//       {editMode ? (
//         <div className="mt-6 space-y-4">
//           <textarea
//             name="intro"
//             rows="5"
//             className="w-full p-2 rounded"
//             value={aboutData.intro}
//             onChange={handleInputChange}
//           />
//           <input
//             name="degree"
//             placeholder="Degree"
//             className="w-full p-2 rounded"
//             value={aboutData.degree}
//             onChange={handleInputChange}
//           />
//           <input
//             name="cgpa"
//             placeholder="CGPA"
//             className="w-full p-2 rounded"
//             value={aboutData.cgpa}
//             onChange={handleInputChange}
//           />
//           <input
//             name="email"
//             placeholder="Email"
//             className="w-full p-2 rounded"
//             value={aboutData.email}
//             onChange={handleInputChange}
//           />

//           <h3 className="text-white mt-6">Services</h3>
//           {aboutData.services.map((service, index) => (
//             <div key={index} className="flex gap-2 mb-2">
//               <input
//                 value={service.title}
//                 onChange={(e) =>
//                   handleServiceChange(index, "title", e.target.value)
//                 }
//                 placeholder="Title"
//                 className="p-1 rounded w-1/2"
//               />
//               <input
//                 value={service.icon}
//                 onChange={(e) =>
//                   handleServiceChange(index, "icon", e.target.value)
//                 }
//                 placeholder="Icon URL"
//                 className="p-1 rounded w-1/2"
//               />
//               <button
//                 onClick={() => removeService(index)}
//                 className="bg-red-500 px-2 text-white"
//               >
//                 X
//               </button>
//             </div>
//           ))}

//           <button onClick={addService} className="bg-green-600 px-4 py-1 rounded text-white mt-2">
//             Add Service
//           </button>

//           <div className="flex gap-4 mt-4">
//             <button onClick={handleSave} className="bg-blue-600 px-4 py-2 text-white rounded">
//               Save
//             </button>
//             <button onClick={() => setEditMode(false)} className="bg-gray-600 px-4 py-2 text-white rounded">
//               Cancel
//             </button>
//           </div>
//         </div>
//       ) : (
//         <>
//           <motion.p
//             variants={fadeIn("", "", 0.1, 1)}
//             className='mt-4 text-secondary text-[17px] max-w-3xl leading-[30px]'
//           >
//             {aboutData.intro}
//           </motion.p>

//           <motion.p
//             variants={fadeIn("", "", 0.1, 1)}
//             className='mt-4 text-secondary text-[17px] max-w-3xl leading-[30px]'
//           >
//             <p><span className="text-white">Degree:</span> {aboutData.degree} &nbsp;
//               <span className="text-white">CGPA:</span> {aboutData.cgpa}</p>
//             <p className="mt-2"><span className="text-white">Email:</span> {aboutData.email}</p>
//           </motion.p>

//           <div className='mt-20 flex flex-wrap gap-10'>
//             {aboutData.services.map((service, index) => (
//               <ServiceCard key={index} index={index} {...service} />
//             ))}
//           </div>
//         </>
//       )}
//     </>
//   );
// };

// export default SectionWrapper(About, "about");
