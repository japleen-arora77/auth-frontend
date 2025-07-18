import './App.css';
import { Route, Routes } from "react-router-dom";
import Register from './pages/register.js';
import Login from './pages/login.js';
import Dashboard from './pages/dashboard.js';
import ProtectedRoute from './pages/protectedRoute.js';
//import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
      <Routes>
        <Route path="/" element={<Register />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} /> 
        <Route path="/dashboard" 
         element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }  /> {/* ✅ Add this */}
      </Routes>
  );
}

export default App;
