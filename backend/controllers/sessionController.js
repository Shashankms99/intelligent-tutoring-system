const Session = require('../models/Session'); // Import the Session model
const User = require('../models/User'); // Import the User model

// Function to get sessions based on the logged-in user
const getsessions = async (req, res) => {
  try {
    const userId = req.headers['user-id']; // Access userId from the headers

    if (!userId) {
      return res.status(400).json({ message: 'User ID is required.' });
    }

    // Populate the sessions for the logged-in user
    const user = await User.findById(userId).populate('sessions');

    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }

    return res.status(200).json({ sessions: user.sessions });
  } catch (error) {
    console.error('Error fetching sessions:', error);
    return res.status(500).json({ message: 'Server error while fetching sessions.' });
  }
};

module.exports = { getsessions };
