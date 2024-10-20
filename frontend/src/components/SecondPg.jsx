import React, { useState, useEffect, useRef } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { Typewriter } from "react-simple-typewriter";
import { Menu, X, ChevronDown } from "lucide-react";
import {
  Bar,
  BarChart,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useNavigate } from "react-router-dom";
import C1 from "../assets/C1.jpg";
import C2 from "../assets/C2.jpg";
import C3 from "../assets/C3.jpg";
import C4 from "../assets/C4.jpg";
import C5 from "../assets/C5.jpg";
//empowering
const solutions = [
  "Video Conferencing",
  "Ishaara-WebExtension",
  "Signify",
  "Textify",
  "Community",
  "E-school",
];
// const solutions = [
//   { label: 'Video Conferencing', link: 'http://localhost:3000' },
//   { label: 'Ishaara - WebExtension', link: 'brave://extensions/?id=ghfjgddfjaeklpgopidhnppiaifdpoak' },
//   { label: 'Sign-ify', link: 'http://localhost:4200' },
//   { label: 'Text-ify', link: 'http://127.0.0.1:5000/dashboard' },
//   { label: 'Community', link: '/community' },
//   { label: 'Learning Module', link: 'http://localhost:3001' },
//   { label: 'SignLearner', link: 'http://localhost:3002' }
// ];

const statistics = [
  { name: "Employment Rate", value: 48 },
  { name: "Higher Education", value: 18 },
  { name: "Sign Language Users", value: 70 },
  { name: "Access to Interpreters", value: 30 },
];

const carouselImages = [
  {
    src: C1,
    alt: "A humanoid robot examining a cardboard box",
    caption: "Innovative AI solutions for communication challenges",
  },
  {
    src: C2,
    alt: "A group of smiling Indian women giving thumbs up",
    caption: "Empowering communities through inclusive technology",
  },
  {
    src: C3,
    alt: "A young girl using sign language while sitting at a desk with a laptop",
    caption: "Breaking barriers in education and communication",
  },
];

const features = [
  {
    title: "Sign Language Translator",
    description: "Instantly translate sign language to text and vice versa.",
  },
  {
    title: "Text-to-Speech",
    description:
      "Convert written text into natural-sounding speech effortlessly.",
  },
  {
    title: "Speech-to-Text",
    description: "Accurately transcribe spoken words into written text.",
  },
  {
    title: "Visual Alerts",
    description: "Receive important notifications through visual cues.",
  },
  {
    title: "Live Captioning",
    description: "Real-time captioning for videos and live conversations.",
  },
  {
    title: "Gesture Recognition",
    description: "Advanced AI to recognize and interpret hand gestures.",
  },
];

const Landingpage = () => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/community");
  };
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [count, setCount] = useState(0);
  const targetCount = 466000000; // Approximate number of deaf and mute people worldwide
  const { scrollYProgress } = useScroll();
  const scrollProgress = useTransform(scrollYProgress, [0, 0.9], [0, 1]);

  const featureSliderRef = useRef(null);
  const statsRef = useRef(null);
  const isStatsInView = useInView(statsRef, { once: false, amount: 0.5 });

  useEffect(() => {
    const timer = setInterval(() => {
      setCount((prevCount) => {
        if (prevCount < targetCount) {
          return Math.min(
            prevCount + Math.floor(Math.random() * 1000000),
            targetCount
          );
        }
        clearInterval(timer);
        return prevCount;
      });
    }, 20);

    return () => clearInterval(timer);
  }, []);

  const carouselSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  const featureSliderSettings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <div className="min-h-screen text-gray-800">
      <nav className="bg-[#BFD3E6] bg-opacity-80 p-8 rounded-lg text-gray-800bg-transparent p1-10 shadow-lg fixed w-full z-10">
        <div className="container mx-auto flex justify-between items-center">
          <div>
          <h1 className="p1-20 text-6xl font-extrabold text-black transition-all duration-300 hover:scale-105 pr-4">
            Smwaad
          </h1>
          </div>
          <div className="hidden md:flex space-x-8 ">
            {/* <button
              onClick={() => (window.location.href = "http://localhost:3000")}
              className="bg-white text-black text-lg font-semibold border border-transparent hover:border-[#66B2FF] hover:text-[#66B2FF] transition-colors duration-300 relative py-2 px-4 rounded-lg shadow-md hover:shadow-lg"
            >
              Video Conferencing
              <span className="absolute -bottom-1 left-0 right-0 h-1 bg-[#66B2FF] scale-x-0 transition-transform duration-300 group-hover:scale-x-100"></span>
            </button> */}
              <button
              onClick={() => (window.location.href = "/lobby")}
              className="bg-white text-black text-lg font-semibold border border-transparent hover:border-[#66B2FF] hover:text-[#66B2FF] transition-colors duration-300 relative py-2 px-4 rounded-lg shadow-md hover:shadow-lg"
            >
              Video Conferencing
              <span className="bg-white absolute -bottom-1 left-0 right-0 h-1 bg-[#66B2FF] scale-x-0 transition-transform duration-300 group-hover:scale-x-100"></span>
            </button>

      

            <button
              onClick={() => (window.location.href = "https://multilingualtexttosignlanguage-ox3j.vercel.app/")}
              className="bg-white text-black text-lg font-semibold border border-transparent hover:border-[#66B2FF] hover:text-[#66B2FF] transition-colors duration-300 relative py-2 px-4 rounded-lg shadow-md hover:shadow-lg"
            >
              Signify
              <span className="bg-white absolute -bottom-1 left-0 right-0 h-1 bg-[#66B2FF] scale-x-0 transition-transform duration-300 group-hover:scale-x-100"></span>
            </button>

            <button
              onClick={() =>
                (window.location.href = "http://127.0.0.1:5000/dashboard")
              }
              className="bg-white text-black text-lg font-semibold border border-transparent hover:border-[#66B2FF] hover:text-[#66B2FF] transition-colors duration-300 relative py-2 px-4 rounded-lg shadow-md hover:shadow-lg"
            >
              Textify
              <span className="bg-white absolute -bottom-1 left-0 right-0 h-1 bg-[#66B2FF] scale-x-0 transition-transform duration-300 group-hover:scale-x-100"></span>
            </button>

            <button
              onClick={() => (window.location.href = "/community")}
              className="bg-white text-black text-lg font-semibold border border-transparent hover:border-[#66B2FF] hover:text-[#66B2FF] transition-colors duration-300 relative py-2 px-4 rounded-lg shadow-md hover:shadow-lg"
            >
              Community
              <span className="bg-white absolute -bottom-1 left-0 right-0 h-1 bg-[#66B2FF] scale-x-0 transition-transform duration-300 group-hover:scale-x-100"></span>
            </button>

            <button
              onClick={() => (window.location.href = "http://localhost:3001")}
              className="bg-white text-black text-lg font-semibold border border-transparent hover:border-[#66B2FF] hover:text-[#66B2FF] transition-colors duration-300 relative py-2 px-4 rounded-lg shadow-md hover:shadow-lg"
            >
              Learning Module
              <span className="bg-white absolute -bottom-1 left-0 right-0 h-1 bg-[#66B2FF] scale-x-0 transition-transform duration-300 group-hover:scale-x-100"></span>
            </button>

            <button
              onClick={() => (window.location.href = "https://signavatar.vercel.app/")}
              className="bg-white text-black text-lg font-semibold border border-transparent hover:border-[#66B2FF] hover:text-[#66B2FF] transition-colors duration-300 relative py-2 px-4 rounded-lg shadow-md hover:shadow-lg"
            >
              SignLearner
              <span className="bg-white absolute -bottom-1 left-0 right-0 h-1 bg-[#66B2FF] scale-x-0 transition-transform duration-300 group-hover:scale-x-100"></span>
            </button>
          </div>

          <button
            className="md:hidden text-white focus:outline-none"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
        <motion.div
          className="absolute bottom-0 left-0 right-0 h-1 bg-white"
          style={{ scaleX: scrollProgress, transformOrigin: "0%" }}
        />
      </nav>

      {isMenuOpen && (
        <div className="md:hidden bg-[#FFDAB9] p-4 mt-16 fixed w-full z-10">
          {solutions.map((solution, index) => (
            <a
              key={index}
              href="#"
              className="block py-2 text-gray-800 hover:text-[#FF8C69] transition-colors"
            >
              {solution}
            </a>
          ))}
        </div>
      )}

      <main>
        <div className="h-screen relative">
          <Slider {...carouselSettings} className="h-full">
            {carouselImages.map((image, index) => (
              <div key={index} className="h-screen">
                <div
                  className="h-full bg-cover bg-center flex items-center justify-center"
                  style={{ backgroundImage: `url(${image.src})` }}
                >
                  {/* Motion div for animated text */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }} // Adding a slight delay to sync with page load
                    className="bg-[#BFD3E6] bg-opacity-80 p-8 rounded-lg text-gray-800" // Changed to blue
                  >
                    <h2 className="text-4xl font-bold mb-4 text-black">
                      Welcome to Smwaad
                    </h2>{" "}
                    {/* Optional: Change text color to black */}
                    <div className="text-2xl mb-8">
                      <Typewriter
                        words={[
                          "Empowering communication",
                          "Breaking barriers",
                          "Connecting worlds",
                        ]}
                        loop={0}
                        cursor
                        cursorStyle="|"
                        typeSpeed={70}
                        deleteSpeed={50}
                        delaySpeed={1000}
                      />
                    </div>
                  </motion.div>
                </div>
              </div>
            ))}
          </Slider>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
          className="absolute bottom-4 left-1/2 transform -translate-x-1/2 animate-bounce"
        >
          <ChevronDown size={32} color="#6BAEDC" /> {/* Light blue color */}
        </motion.div>

        <div className="min-h-screen bg-white py-24">
          {" "}
          {/* Change to blue background */}
          <div className="container mx-auto p-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-5xl font-bold mb-12 text-center text-black" // Change text to white
            >
              {count.toLocaleString()}+ people are Deaf and Mute WorldWide
            </motion.div>

            <div className="grid md:grid-cols-2 gap-8 items-center">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                className="bg-[#E0F7FA] p-6 rounded-lg shadow-lg" // Keep light blue background
              >
                <p className="text-lg mb-4 text-gray-800">
                  {" "}
                  {/* Change text to dark gray for contrast */}
                  Our all-in-one app is revolutionizing communication for the
                  deaf and mute community. We're bridging gaps, fostering
                  inclusivity, and empowering individuals to express themselves
                  freely.
                </p>
                <p className="text-lg mb-4 text-gray-800">
                  {" "}
                  {/* Change text to dark gray for contrast */}
                  With cutting-edge technology and a user-centric approach,
                  we're making a significant impact on the lives of millions.
                  Our solutions are designed to be intuitive, efficient, and
                  accessible to all.
                </p>
              </motion.div>
              <div className="grid grid-cols-2 gap-4">
                <motion.img
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                  className="rounded-lg shadow-lg"
                  src={C4}
                  alt="Humanoid robot examining cardboard box"
                />
                <motion.img
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                  className="rounded-lg shadow-lg"
                  src={C5}
                  alt="Smiling women giving thumbs up"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="bg-[#B3E5FC] py-24">
          {" "}
          {/* Light blue background */}
          <div className="container mx-auto p-4">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-4xl font-bold mb-12 text-center text-white"
            >
              Our Innovative Solutions
            </motion.h2>

            <Slider ref={featureSliderRef} {...featureSliderSettings}>
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="p-12 mx-4 my-6 bg-white rounded-lg shadow-lg"
                >
                  <h3 className="text-2xl font-bold mb-4 text-[#007BFF]">
                    {feature.title}
                  </h3>{" "}
                  {/* Blue text */}
                  <p className="text-gray-700">{feature.description}</p>
                </motion.div>
              ))}
            </Slider>
          </div>
        </div>

        <div ref={statsRef} className="min-h-screen bg-white py-24">
          <div className="container mx-auto p-4">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-4xl font-bold mb-12 text-center text-gray-800"
            >
              Key Statistics
            </motion.h2>

            <div className="h-96 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={statistics}>
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="value" fill="#007BFF" /> {/* Blue bar color */}
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* <div className="min-h-screen bg-white py-24">
  <div className="container mx-auto p-4">
    <motion.h2
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="text-4xl font-bold mb-8 text-center text-gray-800"
    >
      Join Our Community
    </motion.h2>
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="bg-[#E0F7FA] p-6 rounded-lg shadow-lg" // Light blue background
    >
      <p className="text-lg mb-4 text-gray-600">
        Become part of our growing community and help us make a difference in the lives of deaf and mute individuals around the world.
        Together, we can create a more inclusive and connected society.
      </p>
      <div className="flex justify-center space-x-4 mt-8">
        <motion.button
          onClick={handleClick}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="bg-[#B3E5FC] text-gray-800 px-6 py-2 rounded-full hover:bg-[#007BFF] hover:text-white transition-colors"
        >
          Community
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="bg-[#007BFF] text-white px-6 py-2 rounded-full hover:bg-[#B3E5FC] hover:text-gray-800 transition-colors"
        >
          Learn More
        </motion.button>
      </div>
    </motion.div>
  </div>
</div> */}
        <div className="min-h-screen bg-white py-24">
          <div className="container mx-auto p-4">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-4xl font-bold mb-8 text-center text-gray-800"
            >
              Join Our Community
            </motion.h2>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="bg-[#E0F7FA] p-6 rounded-lg shadow-lg"
            >
              <p className="text-lg mb-4 text-gray-600">
                Become part of our growing community and help us make a
                difference in the lives of deaf and mute individuals around the
                world. Together, we can create a more inclusive and connected
                society.
              </p>
              <div className="flex justify-center space-x-4 mt-8">
                <motion.button
                  onClick={handleClick}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-[#B3E5FC] text-gray-800 px-6 py-2 rounded-full hover:bg-[#007BFF] hover:text-white transition-colors"
                >
                  Community
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-[#007BFF] text-white px-6 py-2 rounded-full hover:bg-[#B3E5FC] hover:text-gray-800 transition-colors"
                >
                  Learn More
                </motion.button>
              </div>
            </motion.div>
          </div>
        </div>

        <footer className="bg-gray-800 text-white py-8">
          <div className="container mx-auto px-4">
            <div className="flex flex-wrap justify-between items-center">
              <div className="w-full md:w-1/3 mb-6 md:mb-0">
                <h3 className="text-2xl font-bold mb-2">DeafMuteApp</h3>
                <p>Empowering communication for all</p>
              </div>
              <div className="w-full md:w-1/3 mb-6 md:mb-0">
                <h4 className="text-lg font-semibold mb-2">Quick Links</h4>
                <ul>
                  {solutions.map((solution, index) => (
                    <li key={index} className="mb-1">
                      <a
                        href="#"
                        className="hover:text-[#FF8C69] transition-colors"
                      >
                        {solution}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="w-full md:w-1/3">
                <h4 className="text-lg font-semibold mb-2">Connect With Us</h4>
                <div className="flex space-x-4">
                  <a
                    href="#"
                    className="hover:text-[#FF8C69] transition-colors"
                  >
                    <i className="fab fa-facebook"></i>
                  </a>
                  <a
                    href="#"
                    className="hover:text-[#FF8C69] transition-colors"
                  >
                    <i className="fab fa-twitter"></i>
                  </a>
                  <a
                    href="#"
                    className="hover:text-[#FF8C69] transition-colors"
                  >
                    <i className="fab fa-instagram"></i>
                  </a>
                  <a
                    href="#"
                    className="hover:text-[#FF8C69] transition-colors"
                  >
                    <i className="fab fa-linkedin"></i>
                  </a>
                </div>
              </div>
            </div>
            <div className="mt-8 text-center">
              <p>&copy; 2023 DeafMuteApp. All rights reserved.</p>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
};

export default Landingpage;
