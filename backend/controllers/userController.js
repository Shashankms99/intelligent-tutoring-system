// userController.js

const User = require('../models/User');

const getusers = async (req, res) => {
  try {
    const { role } = req.params;
    if (role !== 'tutor' && role !== 'student') {
      return res.status(400).json({ error: 'Invalid role' });
    }

    const users = await User.find({ role }); // Assuming each user has a 'role' field
    res.json(users);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch users' });
  }
};

module.exports = { getusers };
