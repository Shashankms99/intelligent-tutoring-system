import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Register.css'; // Add a CSS file for styling

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'student', // Default role is 'student'
    disabilityType: '', // Disability fields should be empty initially
    otherDisability: '', // Disability fields should be empty initially
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => {
      if (name === 'role' && value === 'tutor') {
        // If role is changed to 'tutor', set disabilityType and otherDisability to empty
        return { ...prevState, [name]: value, disabilityType: '', otherDisability: '' };
      }
      return { ...prevState, [name]: value };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Log the data being submitted
    const dataToSubmit = {
      ...formData,
      otherDisability: formData.disabilityType === 'other' ? formData.otherDisability : '',
    };
    console.log(dataToSubmit); // Log the data being sent to the server
  
    try {
      await axios.post('http://localhost:5000/api/auth/register', dataToSubmit);
      alert('Registration successful! Redirecting to login...');
      navigate('/login'); // Redirect to login
    } catch (error) {
      console.error(error.response?.data || error); // Log more detailed error message from the server
    }
  };

  return (
    <div className="register-container">
      <h1>Register Now</h1>
      <form onSubmit={handleSubmit} className="register-form">
        <div className="form-row">
          <input
            type="text"
            name="name"
            placeholder="Name"
            onChange={handleChange}
            value={formData.name}
          />
        </div>
        <div className="form-row">
          <input
            type="email"
            name="email"
            placeholder="Email"
            onChange={handleChange}
            value={formData.email}
          />
        </div>
        <div className="form-row">
          <input
            type="password"
            name="password"
            placeholder="Password"
            onChange={handleChange}
            value={formData.password}
          />
        </div>
        <div className="form-row">
          <select name="role" onChange={handleChange} value={formData.role}>
            <option value="student">Student</option>
            <option value="tutor">Tutor</option>
          </select>
        </div>

        {/* Only ask for disability information if the user is a student */}
        {formData.role === 'student' && (
          <>
            <div className="form-row">
              <select
                name="disabilityType"
                onChange={handleChange}
                value={formData.disabilityType}
              >
                <option value="">Select Disability Type</option>
                <option value="visual">Visual</option>
                <option value="hearing">Hearing</option>
                <option value="mobility">Mobility</option>
                <option value="other">Other</option>
              </select>
            </div>

            {formData.disabilityType === 'other' && (
              <div className="form-row">
                <input
                  type="text"
                  name="otherDisability"
                  placeholder="Please specify"
                  onChange={handleChange}
                  value={formData.otherDisability}
                />
              </div>
            )}
          </>
        )}

        <div className="form-row">
          <button type="submit">Register</button>
        </div>
      </form>
    </div>
  );
};

export default Register;
