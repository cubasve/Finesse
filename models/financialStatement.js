const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const financialStatementSchema = new Schema(
    {
        income: {
            description: String,
            amount: Number,
            type: ['Earned', 'Portfolio', 'Passive'],
            required: true,
        },
        expense: {
            description: String,
            amount: Number,
            required: true,
        },
        asset: {
            description: String,
            amount: Number,
            type: ['Paper', 'Real Estate', 'Business', 'Commodities']
        },
        liability: {
            description: String,
            amount: Number,
            type: ['Good Debt', 'Bad Debt']
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model('FinancialStatement', financialStatementSchema);