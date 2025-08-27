import React from "react";
import Tilt from "react-parallax-tilt";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import axios from "axios";

import { styles } from "../styles";
import { services } from "../constants";
import { SectionWrapper } from "../hoc";
import { fadeIn, textVariant } from "../utils/motion";
import ComputersCanvas from './canvas/Computers';
import baseurl from "./BaseUrl";

const ServiceCard = ({ index, title, icon }) => (
  <Tilt className="xs:w-[250px] w-full">
    <motion.div
      variants={fadeIn("right", "spring", index * 0.5, 0.75)}
      className="w-full green-pink-gradient p-[1px] rounded-[20px] shadow-card overflow-hidden"
    >
      <div className="bg-tertiary rounded-[20px] flex flex-col h-[300px]">
        
        <div className="h-2/3 w-full">
          <img
            src={icon}
            alt={title}
            className="w-full h-full object-cover rounded-t-[20px]"
          />
        </div>

        {/* Bottom - Title (1/3 height) */}
        <div className="h-1/3 flex items-center justify-center p-4">
          <h3 className="text-white text-[20px] font-bold text-center">
            {title}
          </h3>
        </div>
      </div>
    </motion.div>
  </Tilt>
);


const About = () => {

const [aboutData, setAboutData] = useState(null);
const [showForm, setShowForm] = useState(false);
const [intro, setIntro] = useState("");
const [servicesList, setServicesList] = useState([{ title: "", icon: "" }]);
const [loading, setLoading] = useState(true);

const isAdmin = localStorage.getItem("adminLoggedIn") === "true";



  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true); // start loading
        const res = await axios.get(`${baseurl}about/showintro`);
        if (res.data) {
          setAboutData(res.data);
          setIntro(res.data.introduction || "");
          setServicesList(res.data.services || []);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false); 
      }
    };

    fetchData();
  }, []);

console.log(`>>>>about>>>`, aboutData)


  return (
    <>
   

      <motion.div variants={textVariant()} initial="show" animate="show">
  <p className={styles.sectionSubText}>Introduction</p>
  <h2 className={styles.sectionHeadText}>Overview.</h2>
</motion.div>



      {loading ? (
        <p className="mt-4 text-secondary text-[17px]">Loading...</p>
      ) : (
        aboutData?.introduction && (
          <motion.p
            variants={fadeIn("", "", 0.1, 1)}
            initial="show"
  animate="show"
            className="mt-4 text-secondary text-[17px] max-w-3xl leading-[30px] whitespace-pre-line"
          >
            {aboutData.introduction}
          </motion.p>
        )
      )}

{isAdmin && !showForm && (
  <button
    onClick={() => setShowForm(true)}
    className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
  >
    {aboutData ? "Edit Intro & Services" : "Add Intro & Services"}
  </button>
)}

{isAdmin && showForm && (
  <form
    onSubmit={async (e) => {
  e.preventDefault();

  const formData = new FormData();
  formData.append("introduction", intro);
  formData.append("services", JSON.stringify(servicesList.map(s => ({
    title: s.title,
    description: s.description || "",
    icon: s.icon || "" 
  }))));

  
  servicesList.forEach((srv, idx) => {
    if (srv.iconFile) {
      formData.append(`icon${idx}`, srv.iconFile);
    }
  });

  try {
    if (aboutData) {
      await axios.put(
        `${baseurl}about/editintro/${aboutData._id}`,
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );
    } else {
      await axios.post(`${baseurl}about/saveintro`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
    }
    alert("Saved!");
    setShowForm(false);
    const updated = await axios.get(`${baseurl}about/showintro`);
    setAboutData(updated.data);
  } catch (err) {
    console.error(err);
    alert("Error saving data");
  }
}}

    className="mt-6 space-y-4"
  >
    <textarea
      className="w-full p-2 border rounded text-gray-400"
      rows={6}
      placeholder="Introduction text"
      value={intro}
      onChange={(e) => setIntro(e.target.value)}
    />

    {servicesList.map((srv, idx) => (
      <div key={idx} className="flex gap-2">
        <input
          type="text"
          placeholder="Service Title"
          value={srv.title}
          onChange={(e) => {
            const copy = [...servicesList];
            copy[idx].title = e.target.value;
            setServicesList(copy);
          }}
          className="p-2 border rounded text-gray-400 flex-1"
        />
   

        <input
  type="file"
  accept="image/*"
  onChange={(e) => {
    const copy = [...servicesList];
    copy[idx].iconFile = e.target.files[0]; 
    setServicesList(copy);
  }}
  className="p-2 border rounded text-gray-400 flex-1"
/>

        <button
          type="button"
          className="bg-red-500 text-gray-400 px-2 rounded"
          onClick={() => {
            const copy = [...servicesList];
            copy.splice(idx, 1);
            setServicesList(copy);
          }}
        >
          ✕
        </button>
      </div>
    ))}

    <button
      type="button"
      className="px-3 py-1 bg-green-500 text-white rounded"
      onClick={() =>
        setServicesList([...servicesList, { title: "", icon: "" }])
      }
    >
      + Add Service
    </button>

    <br />

    <button
      type="submit"
      className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
    >
      Save Intro & Services
    </button>
  </form>
)}


<motion.div
  variants={fadeIn("", "", 0.1, 1)}
  className='mt-4 text-secondary text-[17px] max-w-3xl leading-[30px]'
>

 
</motion.div>



      <div className="mt-20 flex flex-wrap gap-10">
  {loading ? (
    <p className="text-secondary text-[17px]">Loading services...</p>
  ) : (
    aboutData?.services?.length > 0 ? (
      aboutData.services.map((service, index) => (
        <ServiceCard key={index} index={index} {...service} />
      ))
    ) : (
      <p className="text-secondary text-[17px]">No services added yet.</p>
    )
  )}
</div>

    </>
  );
};

export default SectionWrapper(About, "about");

