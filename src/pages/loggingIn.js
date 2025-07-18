// pages/loggingIn.js
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AOS from 'aos';
import 'aos/dist/aos.css';
//this is the page that appears before the dasboard appears
const LoggingIn = () => {
  const navigate = useNavigate();

  useEffect(() => {
    AOS.init({ duration: 1000 }); //initialize aos
    // Delay for 2 seconds, then navigate to dashboard
    const timer = setTimeout(() => {
      navigate("/dashboard");
    }, 1500);
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div  className="logginIn-container" data-aos="fade-up">
        
        <div className="spinner-border text-danger" role="status"></div>
      <h2 className="loggingIn-text">Logging you in...</h2>
      
    </div>
  );
};

export default LoggingIn;
