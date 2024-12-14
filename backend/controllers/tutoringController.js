const Session = require('../models/Session');
const User = require('../models/User'); // Ensure you import the User model

// Create a new session
const createSession = async (req, res) => {
    const { selectedUserId, topic, date, notes, userId } = req.body; // Include userId from frontend

    if (!userId) {
        return res.status(400).json({ message: 'User ID is required.' });
    }

    try {
        // Determine whether the user is a tutor or a student
        let tutor, student;
        if (req.body.role === 'tutor') {
            tutor = userId; // Logged-in user is the tutor
            student = selectedUserId; // The selected user is the student
        } else {
            student = userId; // Logged-in user is the student
            tutor = selectedUserId; // The selected user is the tutor
        }

        // Create the session
        const session = new Session({
            tutor,
            student,
            topic,
            date,
            notes,
        });

        const savedSession = await session.save();

        // Add the session ID to the tutor's and student's `sessions` arrays
        await User.findByIdAndUpdate(tutor, { $push: { sessions: savedSession._id } });
        await User.findByIdAndUpdate(student, { $push: { sessions: savedSession._id } });

        res.status(201).json({ 
            message: 'Session created successfully!', 
            session: savedSession 
        });
    } catch (error) {
        console.error('Error creating session:', error);
        res.status(500).json({ message: 'Failed to create session. Please try again later.' });
    }
};

// Get sessions for a specific user (student or tutor)
const getSessions = async (req, res) => {
    const { userId } = req.params; // Get userId from request parameters

    if (!userId) {
        return res.status(400).json({ message: 'User ID is required.' });
    }

    try {
        const sessions = await Session.find({
            $or: [{ tutor: userId }, { student: userId }],
        });

        res.json(sessions);
    } catch (error) {
        console.error('Error retrieving sessions:', error);
        res.status(500).json({ message: 'Failed to retrieve sessions. Please try again later.' });
    }
};

module.exports = { createSession, getSessions };
