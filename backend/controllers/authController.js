const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Register a new user
const register = async (req, res) => {
    const { name, email, password, role, disabilityType, otherDisability } = req.body;

    // Log the incoming data to debug
    console.log(req.body);

    // Check if user already exists
    const userExists = await User.findOne({ email });
    if (userExists) {
        return res.status(400).json({ message: 'User already exists' });
    }

    // Validate that if 'disabilityType' is 'other', 'otherDisability' is provided
    if (disabilityType === 'other' && !otherDisability) {
        return res.status(400).json({ message: 'Please specify the disability type.' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const user = new User({
        name,
        email,
        password: hashedPassword,
        role,  // tutor or student
        disabilityType,
        otherDisability: disabilityType === 'other' ? otherDisability : null,
    });

    try {
        await user.save();
        const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
        return res.status(201).json({ token });
    } catch (error) {
        return res.status(500).json({ message: 'Error saving user', error: error.message });
    }
};

// Login
// Login
const login = async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
        return res.status(404).json({ message: 'User not found' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Create and send the token, including user id and role
    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });

    // Return user data along with the token
    res.json({
        token,
        user: {
            id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
            disabilityType: user.disabilityType,
            otherDisability: user.otherDisability
        }
    });
};


module.exports = { register, login };
