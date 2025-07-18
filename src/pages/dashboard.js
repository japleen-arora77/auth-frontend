import React from 'react';
import { useNavigate } from "react-router-dom";
import './auth.css';

const Dashboard = () => {
    // Get stored user from localStorage
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    const navigate = useNavigate();
    const handleLogout = () => {
        localStorage.removeItem("token"); // ❌ Remove JWT
        navigate("/login"); // 🔁 Redirect to login
      };
    
  return (
    <div style={{ padding: "20px" }} className='dashboard-container'>
      <div className='dashboard-box'>
      <h2>Welcome to the Dashboard!</h2>
      <p>This page is accessible after login Only.</p>
      {userInfo ? (
        <>
          <p><strong className='strong-text'>Name:</strong> {userInfo.name}</p>
          <p><strong className='strong-text'>Email:</strong> {userInfo.email}</p>
        </>
      ) : (
        <p>User data not found</p>
      )}
      <button onClick={handleLogout} style={{ marginTop: "20px" }}>
        Logout
      </button>
      </div>
    </div>
  );
};

export default Dashboard;
