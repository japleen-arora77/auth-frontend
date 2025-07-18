import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ToastContainer } from 'react-toastify'
import './auth.css';

const  Register = () => {
    const [form, setForm] = useState({name:'', email:'', password:''});

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
        // const {name, value} = e.target;
        // console.log(name, value);
      };
      const handleSubmit = async (e) => {
        e.preventDefault();
        try {
          const res = await fetch("https://auth-backend-setp.onrender.com/api/register",{
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(form),
          });
          const data = await res.json();
          if (res.ok) {
            console.log("✅ Registration successful:", data);
            alert(" Registration successful");
            //toast.success("Registration successful!");
          } else {
            console.error("❌ Registration failed:", data);
            alert(`❌ Registration Failed: ${data.message || "Invalid data"}`);
            //toast.error(data.message || "Registration failed");
          }
        } catch (err) {
          console.error("❌ Error:", err);
          //toast.error("Server error");
        }
      };
      


    return (
        <div  className='auth-container'>
            <div className='auth-box'>
      <h2>Sign Up</h2>
      <form onSubmit={handleSubmit}>
        <input name="name" placeholder="Name" onChange={handleChange} required /><br />
        <input name="email" type="email" placeholder="Email" onChange={handleChange} required /><br />
        <input name="password" type="password" placeholder="Password" onChange={handleChange} required /><br />
        <button type="submit">Sign Up</button>
        <span>Already have an account ?<Link to="/login">Login</Link></span>
      </form>
      </div>
      <ToastContainer />
    </div>
    );

};
export default Register;