import React from "react";
import Tilt from "react-tilt";
import { motion } from "framer-motion";

import { styles } from "../styles";
import { services } from "../constants";
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
I'm a passionate Full Stack Web Developer and Competitive Programmer with one year of hands-on experience as a trainee at REGex Software. During this time, I’ve contributed to the development and deployment of dynamic and scalable web applications, working across both frontend and backend technologies.<br></br>

I’ve gained extensive experience with React.js, Next.js, Node.js, Express.js, MongoDB, MySQL, PostgreSQL, HTML, CSS, and JavaScript, and have collaborated on real-world projects in agile environments.<br></br>

At REGex Software, I’ve been actively involved in the full software development lifecycle — from brainstorming and building features to deploying and maintaining production-ready applications. I take pride in writing clean, efficient code and continuously improving my skills to stay current with modern web development trends.


</motion.p>

<motion.div
  variants={fadeIn("", "", 0.1, 1)}
  className='mt-4 text-secondary text-[17px] max-w-3xl leading-[30px]'
>
  <p>
    <span className="text-white">Degree:</span> Masters of Comuter Applications(MCA) &nbsp; <span className="text-white">CGPA:</span> 8.8
  </p>
  <p className='mt-2'>
    <span className="text-white">Email:</span> krishna23tiwari.kt@gmail.com
  </p>
</motion.div>

        
      <div className='mt-20 flex flex-wrap gap-10'>
        {services.map((service, index) => (
          <ServiceCard key={service.title} index={index} {...service} />
        ))}
      </div>
    </>
  );
};

export default SectionWrapper(About, "about");
