import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { Link } from 'react-router-dom';
import { FaEye, FaEyeSlash } from 'react-icons/fa'; //icons of eye
import './auth.css';

const  Register = () => {
  const navigate = useNavigate();
    const [form, setForm] = useState({name:'', email:'', password:''});
    const [showPassword, setShowPassword] = useState(false); // to change state of password

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
                  // ✅ Auto-login immediately
                const loginRes = await fetch("https://auth-backend-setp.onrender.com/api/login", {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify({ email: form.email, password: form.password }),
                });
                const loginData = await loginRes.json();
                if (loginRes.ok) {
                  localStorage.setItem("token", loginData.token);
                  localStorage.setItem("userInfo", JSON.stringify(loginData.user));
                  alert("Registration successful! Logged in.");
                  navigate("/loggingin");
                  //navigate("/dashboard");
                } else {
                  alert("Registration success, but login failed. Please login manually.");
                  navigate("/login");
                }

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
        <button type="submit">Sign Up</button>
        <span>Already have an account ? <Link to="/login"> Login</Link></span>
      </form>
      </div>
    </div>
    );

};
export default Register;