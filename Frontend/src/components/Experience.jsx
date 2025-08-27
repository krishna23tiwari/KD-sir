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
