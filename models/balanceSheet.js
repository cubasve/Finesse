const mongoose = require('mongoose');

const balanceSheetSchema = new mongoose.Schema(
    {
        asset: {
            description: String,
            amount: Number,
            // enum: ['Paper', 'Real Estate', 'Business', 'Commodity'],
            unique: true,
            required: true,
        },
        liability: {
            description: String,
            amount: Number,
            required: true,
            unique: true,
        }
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model('BalanceSheet', balanceSheetSchema);