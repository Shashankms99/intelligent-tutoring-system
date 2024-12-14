import React from 'react';
import { Route, Routes, Link, useNavigate } from 'react-router-dom';
import Register from './components/Register';
import Login from './components/Login';
import SessionForm from './components/SessionForm';
import ShowSessions from './components/ShowSessions'; // Import ShowSessions
import PrivateRoute from './components/PrivateRoute';
import './App.css';

function App() {
  const token = localStorage.getItem('token');
  const user = JSON.parse(localStorage.getItem('user')); // Assuming user details are saved after login
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token'); // Remove the token
    localStorage.removeItem('user'); // Remove user details
    alert('You have been logged out.');
    navigate('/login'); // Redirect to login
  };

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>Intelligent Tutoring System</h1>
        {/* Navigation Bar */}
        <nav className="navbar">
          <ul className="nav-links">
            {!token ? (
              <>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/register">Register</Link></li>
                <li><Link to="/login">Login</Link></li>
              </>
            ) : (
              <>
                <li><Link to="/session">Book Session</Link></li>
                <li><Link to="/show-booked-sessions">Show Booked Sessions</Link></li>
                <li><button className="logout-button" onClick={handleLogout}>Logout</button></li>
              </>
            )}
          </ul>
        </nav>
      </header>

      <main className="main-content">
        <Routes>
          <Route 
            path="/" 
            element={<>
              <h2>Welcome to the Intelligent Tutoring System.<br></br> Your personalized learning journey starts here!</h2>
              <p>
                Revolutionizing education through personalized tutoring sessions. <br></br>
                Whether you're a tutor or a student, our platform is designed to make learning 
                effective and accessible.
              </p>
            </>} 
          />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route 
            path="/session" 
            element={<PrivateRoute><SessionForm userRole={user?.role} /></PrivateRoute>} 
          />
          <Route 
            path="/show-booked-sessions" 
            element={<PrivateRoute><ShowSessions /></PrivateRoute>} 
          />
        </Routes>
      </main>

      <footer className="app-footer">
        <p>&copy; 2024 Intelligent Tutoring System. All Rights Reserved.</p>
      </footer>
    </div>
  );
}

export default App;
