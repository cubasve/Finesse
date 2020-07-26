const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
    {
        name: String,
        email: { type: String, required: true, lowercase: true, unique: true },
        password: {
            type: String,
            select: false,
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model('User', userSchema);
