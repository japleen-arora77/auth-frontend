import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { Link } from 'react-router-dom';
import { FaEye, FaEyeSlash } from 'react-icons/fa'; //icons of eye
import './auth.css';

const  Login = () => {
    const navigate = useNavigate();
    const [form, setForm] = useState({email:'', password:''});
    const [showPassword, setShowPassword] = useState(false); // to change state of password

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
      };
    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("Loging In:", form);
        // connect this to backend 
        try{
            const res = await fetch("https://auth-backend-setp.onrender.com/api/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(form),
            });
            const data = await res.json();
            if (res.ok) {
        //toast.success("Login successful");
                console.log("✅Login successful ", data); // You can store token here in localStorage
                // ✅ Store token in localStorage
                localStorage.setItem("token", data.token);
                // ✅ Store user info (optional: depends on what backend sends)
                localStorage.setItem("userInfo", JSON.stringify(data.user)); // assuming data.user has email and name
                alert("Login Successful");
                navigate("/loggingin");
                //navigate("/dashboard");// Redirect to home page or dashboard
            } else {
        //toast.error(data.message || "Login failed");
                console.error("❌ Login failed ", data);
                alert("login failed!");
            }
        }
        catch (err) {
            console.error("Login error:", err);
           // toast.error("Something went wrong");
          }
      };


    return (
        <div className='auth-container'>
            <div className='auth-box'>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input name="email" type="email" placeholder="Email" onChange={handleChange} required /><br />
<div className="password-wrapper">
            <input
              name="password"
              type={showPassword ? "text" : "password"} // 👈 toggle type
              placeholder="Password"
              onChange={handleChange}
              required
            />
            <span
              className="toggle-password"
              onClick={() => setShowPassword(!showPassword)} // 👈 toggle logic
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>
        <button type="submit">Login</button>
        <span>Don't have an account ? <Link to="/register"> Sign Up</Link></span>
      </form>
      </div>
    </div>
    );

};
export default Login;