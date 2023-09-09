const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    password: {
        type: String,
        required: true,
    },
    firstName: String,
    lastName: String,
    profileImage: String,
    bio: String,
    dateOfBirth: Date,
    createdProblems: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Problem',
        },
    ],
    solvedProblems: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Problem',
        },
    ],
    submissions: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Submission',
        },
    ],
    isAdmin: {
        type: Boolean,
        default: false,
    },
});

// userSchema.pre('save', async function (next) {
//     if (!this.isModified('password')) {
//         return next();
//     }
//     const salt = await bcrypt.genSalt(10);
//     this.password = await bcrypt.hash(this.password, salt);
//     next();
// });

userSchema.methods.comparePassword = async function (candidatePassword) {
    return await bcrypt.compare(candidatePassword, this.password);
};

const User = mongoose.model('User', userSchema);

module.exports = User;
