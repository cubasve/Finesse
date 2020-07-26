const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const incomeStatementSchema = new Schema(
    {
        income: {
            description: String,
            amount: Number,
            //enum: ['Earned', 'Portfolio', 'Passive'],
            //enum = string must ne in the provided list
            unique: true,
            required: true,
            assets: [asset], //is this embedding valid?
        },
        expense: {
            description: String,
            amount: Number,
            required: true,
            liabilities: [liability], //is this embedding valid?
        }
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model('IncomeStatement', incomeStatementSchema);