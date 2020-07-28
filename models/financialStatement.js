const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const incomeSchema = new Schema({
    type: String,
    amount: Number
});

const expenseSchema = new Schema({
    type: String,
    amount: Number
});

const assetSchema = new Schema({
    type: String,
    amount: Number
});

const liabilitySchema = new Schema({
    type: String,
    amount: Number
});

const financialStatementSchema = new Schema(
    {
        income: [incomeSchema],
        expense: [expenseSchema],
        asset: [assetSchema],
        liability: [liabilitySchema],
    },
    {
        timestamps: true,
    }
);

// const financialStatementSchema = new Schema(
//     {
//         // user: {
//         //     type: Schema.Types.ObjectId,
//         //     ref: "User",
//         // },
//         income: {
//             type: String,
//             amount: Number,
//             // type: ['Earned', 'Portfolio', 'Passive'],
//         },
//         expense: {
//             type: String,
//             amount: Number,
//         },
//         asset: {
//             type: String,
//             amount: Number,
//             // type: ['Paper', 'Real Estate', 'Business', 'Commodities']
//         },
//         liability: {
//             type: String,
//             amount: Number,
//             // type: ['Good Debt', 'Bad Debt']
//         },
//     },
//     {
//         timestamps: true,
//     }
// );

// const incomeTypeSchema = new Schema({
//     earnedIncomeType: { type: String },
//     earnedIncomeAmount: { type: Number },
//     portfolioIncomeType: { type: String },
//     portfolioIncomeAmount: { type: Number },
//     passiveIncomeType: { type: String },
//     passiveIncomeAmount: { type: Number },
// });

// const expenseSchema = new Schema({
//     expenseType: { type: String },
//     expenseAmount: { type: Number },
// });

// const assetTypeSchema = new Schema({
//     paperAssetType: { type: String },
//     paperAssetAmount: { type: Number },
//     realEstateType: { type: String },
//     realEstateAmount: { type: Number },
//     businessType: { type: String },
//     businessAmount: { type: Number },
//     commodityType: { type: String },
//     commodityAmount: { type: Number },
// });

// const liabilityTypeSchema = new Schema({
//     goodDebtType: { type: String },
//     goodDebtAmount: { type: Number },
//     badDebtType: { type: String },
//     badDebtAmount: { type: Number }
// })

// const financialStatementSchema = new Schema(
//     {
//         // user: {
//         //     type: Schema.Types.ObjectId, ref: "User"
//         // },
//         income: [incomeTypeSchema],
//         expense: [expenseSchema],
//         asset: [assetTypeSchema],
//         liability: [liabilityTypeSchema],
//     },
//     {
//         timestamps: true,
//     }
// );

module.exports = mongoose.model('FinancialStatement', financialStatementSchema);