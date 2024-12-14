import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ShowSessions = () => {
  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSessions = async () => {
      try {
        const token = localStorage.getItem('token');
        const userData = JSON.parse(localStorage.getItem('userData')); // Parse userData from localStorage
        const userId = userData?.id; // Access the userId from the 'id' field of the parsed userData object
        console.log(userId); // Logging the userId

        if (!userId) {
          alert('User ID not found');
          return;
        }

        const res = await axios.get('http://localhost:5000/api/sessions', {
          headers: {
            Authorization: `Bearer ${token}`,
            'User-Id': userId, // Send userId in headers
          },
        });
        setSessions(res.data.sessions); // Assuming `sessions` is returned as an array inside an object
      } catch (error) {
        console.error('Error fetching sessions:', error);
        alert('Failed to fetch sessions.');
      } finally {
        setLoading(false);
      }
    };

    fetchSessions();
  }, []);

  if (loading) {
    return <p>Loading sessions...</p>;
  }

  return (
    <div>
      <h2>Your Sessions</h2>
      {sessions.length > 0 ? (
        <ul>
          {sessions.map((session) => (
            <li key={session._id}>
              <h3>Topic: {session.topic}</h3>
              <p>Date: {new Date(session.date).toLocaleString()}</p>
              <p>Notes: {session.notes}</p>
              
            </li>
          ))}
        </ul>
      ) : (
        <p>No sessions found.</p>
      )}
    </div>
  );
};

export default ShowSessions;
