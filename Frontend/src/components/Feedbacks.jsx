// import React, { useRef } from "react";
// import { motion } from "framer-motion";

// import { styles } from "../styles";
// import { SectionWrapper } from "../hoc";
// import { fadeIn, textVariant } from "../utils/motion";
// import { testimonials } from "../constants";

// // FeedbackCard now accepts a 'link' prop
// const FeedbackCard = ({ index, name, image, link }) => (
//   <motion.div
//     variants={fadeIn("", "spring", index * 0.5, 0.75)}
//     className='bg-black-200 p-4 rounded-3xl w-[320px] flex-shrink-0'
//   >
//     {/* Make the whole card clickable by wrapping it with an anchor tag */}
//     <a href={link} target="_blank" rel="noopener noreferrer">
//       <div className='testimonial-card rounded-lg overflow-hidden shadow-lg p-4'>
//         <img
//           src={image}
//           alt={`certificate-${name}`}
//           className='w-full h-full object-cover rounded-lg'
//         />
//       </div>
//     </a>
//   </motion.div>
// );

// const Feedbacks = () => {
//   const scrollContainerRef = useRef(null);

//   // Scroll left by 300px
//   const scrollLeft = () => {
//     if (scrollContainerRef.current) {
//       scrollContainerRef.current.scrollBy({ left: -300, behavior: "smooth" });
//     }
//   };

//   // Scroll right by 300px
//   const scrollRight = () => {
//     if (scrollContainerRef.current) {
//       scrollContainerRef.current.scrollBy({ left: 300, behavior: "smooth" });
//     }
//   };

//   return (
//     <div className={`mt-12 bg-black-100 rounded-[20px]`}>
//       {/* <div
//         className={`bg-tertiary rounded-2xl ${styles.padding} min-h-[300px]`}
//       >
//         <motion.div variants={textVariant()}>
//           <p className={styles.sectionSubText}>See my Achievements</p>
//           <h2 className={styles.sectionHeadText}>Certificates</h2>
//         </motion.div>
//       </div> */}

//       {/* Scrollable container */}
//       <div className='relative -mt-20 pb-10'>
//         {/* Left Arrow */}
//         <button
//           onClick={scrollLeft}
//           className='absolute left-3 text-black top-1/2 transform -translate-y-1/2 bg-blue-300 p-2 rounded-full shadow-lg z-10'
//         >
//           {"<"}
//         </button>

//         {/* Scrollable Cards */}
//         <div
//           ref={scrollContainerRef}
//           className='flex gap-5 overflow-x-hidden scrollbar-hide px-5'
//         >
//           {testimonials.map((testimonial, index) => (
//             // Pass the link to each FeedbackCard
//             <FeedbackCard key={testimonial.name} index={index} {...testimonial} link={testimonial.link} />
//           ))}
//         </div>

//         {/* Right Arrow */}
//         <button
//           onClick={scrollRight}
//           className='absolute right-3 text-black top-1/2 transform -translate-y-1/2 bg-blue-300 p-2 rounded-full shadow-lg z-10'
//         >
//           {">"}
//         </button>
//       </div>
//     </div>
//   );
// };

// export default SectionWrapper(Feedbacks, "");
