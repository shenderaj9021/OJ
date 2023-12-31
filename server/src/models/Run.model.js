const mongoose = require('mongoose');

const runSchema = new mongoose.Schema({
    code: {
        type: String,
        required: true,
    },
    language: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        enum: ['Pending', 'Running', 'Completed', 'Failed'],
        default: 'Pending',
    },
    // input:String,
    // output: String,
    testCases:[
        {
            input: String,
            output: String,
        },
    ],
    error: String,
    errorAt:Number,
    passedTestCases: Number,
    totalTestCases: Number,
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    
},  { _id: true, strict: false });

const Run = mongoose.model('Run', runSchema);

module.exports = Run;
