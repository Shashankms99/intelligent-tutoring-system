import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './SessionForm.css'; // Import the CSS file

const SessionForm = () => {
  const [formData, setFormData] = useState({
    topic: '',
    date: '',
    notes: '',
    selectedUserId: '', // Will store the selected user ID (either tutor or student)
  });
  const [users, setUsers] = useState([]); // Store list of tutors or students
  const [userRole, setUserRole] = useState(''); // Store the logged-in user's role
  const [successMessage, setSuccessMessage] = useState(''); // Success message state

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem('userData'));
    if (userData) {
      setUserRole(userData.role); // Assuming the user object contains a 'role' field
    }
  }, []);

  useEffect(() => {
    if (!userRole) return;

    const fetchUsers = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/users/${userRole === 'tutor' ? 'student' : 'tutor'}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        setUsers(res.data);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, [userRole]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const userData = JSON.parse(localStorage.getItem('userData'));

      const response = await axios.post(
        'http://localhost:5000/api/tutoring/create',
        {
          ...formData,
          userId: userData.id,
          role: userData.role,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setSuccessMessage(response.data.message);
      setFormData({
        topic: '',
        date: '',
        notes: '',
        selectedUserId: '',
      });

      setTimeout(() => setSuccessMessage(''), 3000);
    } catch (error) {
      console.error('Error creating session:', error.response?.data?.message || 'Unknown error');
      alert(error.response?.data?.message || 'Failed to create session.');
    }
  };

  return (
    <form className="session-form" onSubmit={handleSubmit}>
      <h2>Create a Tutoring Session</h2>
      {successMessage && <p className="success-message">{successMessage}</p>}
      <div className="form-row">
        <label>Topic:</label>
        <input
          type="text"
          name="topic"
          placeholder="Topic"
          onChange={handleChange}
          value={formData.topic}
        />
      </div>
      <div className="form-row">
        <label>Date & Time:</label>
        <input
          type="datetime-local"
          name="date"
          onChange={handleChange}
          value={formData.date}
        />
      </div>
      <div className="form-row">
        <label>Notes:</label>
        <textarea
          name="notes"
          placeholder="Notes"
          onChange={handleChange}
          value={formData.notes}
        />
      </div>
      <div className="form-row">
        <label>Select {userRole === 'tutor' ? 'Student' : 'Tutor'}:</label>
        <select
          name="selectedUserId"
          onChange={handleChange}
          value={formData.selectedUserId}
        >
          <option value="">Select {userRole === 'tutor' ? 'Student' : 'Tutor'}</option>
          {users.length > 0 ? (
            users.map((user) => (
              <option key={user._id} value={user._id}>
                {user.name}
              </option>
            ))
          ) : (
            <option value="">No {userRole === 'tutor' ? 'students' : 'tutors'} found</option>
          )}
        </select>
      </div>
      <div className="form-row">
        <button type="submit">Create Session</button>
      </div>
    </form>
  );
};

export default SessionForm;
