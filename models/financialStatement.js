const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const financialStatementSchema = new Schema(
    {
        user: {
            type: Schema.Types.ObjectId,
            ref: "User",
        },
        income: {
            type: String,
            amount: Number,
            // type: ['Earned', 'Portfolio', 'Passive'],
        },
        expense: {
            type: String,
            amount: Number,
        },
        asset: {
            type: String,
            amount: Number,
            // type: ['Paper', 'Real Estate', 'Business', 'Commodities']
        },
        liability: {
            type: String,
            amount: Number,
            // type: ['Good Debt', 'Bad Debt']
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model('FinancialStatement', financialStatementSchema);