const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const financialStatementSchema = new Schema(
    {
        type: String,
        type: Number,
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model('FinancialStatement', financialStatementSchema);