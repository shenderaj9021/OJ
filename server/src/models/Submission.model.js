const mongoose = require('mongoose');

const submissionSchema = new mongoose.Schema({
    code: {
        type: String,
        required: true,
    },
    language: {
        type: String,
        required: true,
    },
    result: {
        type: String,
        enum: ['Accepted', 'Wrong Answer', 'Time Limit Exceeded', 'Runtime Error', 'Compile Error', 'Other'],
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    problem: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Problem',
        required: true,
    },
    timestamp: {
        type: Date,
        default: Date.now,
    },
},{ _id: true, strict: false });

const Submission = mongoose.model('Submission', submissionSchema);

module.exports = Submission;
