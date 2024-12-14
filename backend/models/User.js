const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        role: { type: String, enum: ['student', 'tutor'], required: true },
        disabilityType: { type: String, required: false }, // Example: "visual", "hearing", etc.
        otherDisability: { type: String, required: false }, // Added for 'other' disability
        sessions: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Session' }], // Array of session IDs
    },
    { timestamps: true }
);

module.exports = mongoose.model('User', userSchema);
