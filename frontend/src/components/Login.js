import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Login.css'; // Make sure to create the corresponding CSS file

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/auth/login', formData);

      // Save token and user data in localStorage
      localStorage.setItem('token', res.data.token); // Save the token
      localStorage.setItem('userData', JSON.stringify(res.data.user)); // Save user data (name, email, role, etc.)
      
      alert('Login successful! Redirecting to session...');
      navigate('/session'); // Redirect to session page
    } catch (error) {
      console.error(error);
      alert('Login failed. Please check your credentials.');
    }
  };

  return (
    <div className="login-container">
      <h1>Login Now</h1>
      <form onSubmit={handleSubmit} className="login-form">
        <div className="form-row">
          <input
            type="email"
            name="email"
            placeholder="Email"
            onChange={handleChange}
            value={formData.email}
            className="input-field"
          />
        </div>
        <div className="form-row">
          <input
            type="password"
            name="password"
            placeholder="Password"
            onChange={handleChange}
            value={formData.password}
            className="input-field"
          />
        </div>
        <div className="form-row">
          <button type="submit" className="submit-btn">Login</button>
        </div>
      </form>
    </div>
  );
};

export default Login;
