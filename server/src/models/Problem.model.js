const mongoose = require('mongoose');

const problemSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
    },
    description: {
        type: String,
        required: true,
    },
    inputFormat: String,
    outputFormat: String,
    difficultyLevel: {
        type: String,
        enum: ['Easy', 'Medium', 'Hard'], // Customize difficulty levels as needed
    },
    creator: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    tags: [{ type: String }], // Array of problem tags
    timeLimitInSeconds: Number,
    memoryLimitInMB: Number,
    testCases: [
        {
            input: String,
            output: String,
        },
    ],
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

const Problem = mongoose.model('Problem', problemSchema);

module.exports = Problem;
