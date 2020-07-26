const mongoose = require('mongoose');

const incomeStatementSchema = new mongoose.Schema(
    {
        income: {
            description: String,
            amount: Number,
            enum: ['Earned', 'Portfolio', 'Passive'],
            unique: true,
            required: true,
        },
        expense: {
            description: String,
            amount: Number,
            required: true,
        }
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model('IncomeStatement', incomeStatementSchema);