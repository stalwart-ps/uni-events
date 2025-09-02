import React from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";

import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Registration from "./pages/Registration";
import Login from "./pages/Login";
import About from "./pages/About";
import FAQ from "./pages/FAQ";
import Events from "./pages/Events";
import Sponsors from "./pages/Sponsors";
import Gallery from "./pages/Gallery";
import Contact from "./pages/Contact";
import Competition from "./pages/Competition";
import ForgetPassword from "./pages/ForgetPassword";

function AnimatedRoutes() {
  const location = useLocation();

  const pageVariants = {
    initial: { opacity: 0, y: 20 },
    in: { opacity: 1, y: 0 },
    out: { opacity: 0, y: -20 },
  };

  const pageTransition = {
    duration: 0.5,
    type: "tween",
    ease: "easeInOut",
  };

  const withAnimation = (Component) => (
    <motion.div
      initial="initial"
      animate="in"
      exit="out"
      variants={pageVariants}
      transition={pageTransition}
    >
      <Component />
    </motion.div>
  );

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={withAnimation(Home)} />
        <Route path="/competition" element={withAnimation(Competition)} />
        <Route path="/registration" element={withAnimation(Registration)} />
        <Route path="/login" element={withAnimation(Login)} />
        <Route path="/about" element={withAnimation(About)} />
        <Route path="/faq" element={withAnimation(FAQ)} />
        <Route path="/events" element={withAnimation(Events)} />
        <Route path="/sponsors" element={withAnimation(Sponsors)} />
        <Route path="/gallery" element={withAnimation(Gallery)} />
        <Route path="/contact" element={withAnimation(Contact)} />
        <Route path="/forget-password" element={withAnimation(ForgetPassword)} />
      </Routes>
    </AnimatePresence>
  );
}

function App() {
  return (
    <Router>
      <Navbar />
      <AnimatedRoutes />
    </Router>
  );
}

export default App;
