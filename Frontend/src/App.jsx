// import { BrowserRouter } from "react-router-dom";

// import { About, Contact, Hero, Navbar, Works, StarsCanvas } from "./components";

// const App = () => {
//   return (
//     <BrowserRouter>
//       <div className='relative z-0 bg-primary'>
//         <div className='bg-hero-pattern bg-cover bg-no-repeat bg-center'>
//           <Navbar />
//           <Hero />
//         </div>
//         <About />
//         {/* <Experience /> */}
//         {/* <Tech /> */}
//         <Works />
//         {/* <Feedbacks /> */}
//         <div className='relative z-0'>
//           <Contact />
//           <StarsCanvas />
//         </div>
//       </div>
//     </BrowserRouter>
//   );
// }

// export default App;


// App.jsx





import { BrowserRouter } from "react-router-dom";
import { About, Contact, Hero, Navbar, Works, StarsCanvas } from "./components";
import React, { useRef } from "react";
import Experience from "./components/Experience";
import Tech from "./components/Tech";

const App = () => {
  const heroRef = useRef(null);
  const contactRef = useRef(null);
 const experienceRef = useRef(null);
 const projectsRef = useRef(null)

  return (
    <BrowserRouter>
      <div className="relative z-0 bg-primary">
        <div className="bg-hero-pattern bg-cover bg-no-repeat bg-center">
          <Navbar heroRef={heroRef} contactRef={contactRef} experienceRef={experienceRef} projectsRef={projectsRef}  />
          <div ref={heroRef}>
            <Hero />
          </div>
        </div>
        <About />
         <div ref={experienceRef}>
          <Experience />
        </div>
        <Tech/>
        <div ref = {projectsRef}>
          <Works />
        </div>
        <div className="relative z-0">
          <div ref={contactRef}>
            <Contact />
          </div>
          <StarsCanvas />
        </div>
      </div>
    </BrowserRouter>
  );
};

export default App;

