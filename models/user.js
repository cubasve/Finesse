const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Schema = mongoose.Schema;

const SALT_ROUNDS = 6;

const userFinances = new Schema({
    type: {
        type: String, enum: ['Home Mortgage', 'Car Loans', 'Credit Cards', 'School Loans', 'Other', 'Sole proprietorship', 'Partnership', 'Corporation', 'Chequing Account', 'Savings Account', 'Metals', 'Energy', 'Livestock & Meat', 'Agriculture', 'Cryptocurrency', 'Job', 'Self-Employment', 'Taxes', 'Housing', 'Transportation', 'Food', 'Children', 'Debt Payments', 'Entertainment', 'Donations', 'Business', 'Paper', 'Commodities', 'Stock', 'Index/Mutual Fund', 'GIC', 'REIT', 'Real Estate', 'Business', 'Royalties', 'Bond', 'Residential', 'Commercial', 'Industrial', 'Vacant Land']
    },
    amount: Number,
    category: { type: String, enum: ['Earned', 'Portfolio', 'Passive', 'Expense', 'Self', 'Paper', 'RealEstate', 'Business', 'Commodity', 'Cash', 'GoodDebt', 'BadDebt'] },
    class: { type: String, enum: ['Income', 'Expense', 'Self', 'Asset', 'Liability'] },
});

const userSchema = new Schema({
    name: String,
    email: { type: String, required: true, lowercase: true, unique: true },
    password: String,
    userFinances: [userFinances],
}, {
    timestamps: true
});

userSchema.set('toJSON', {
    transform: function (doc, ret) {
        // remove the password property when serializing doc to JSON
        delete ret.password;
        return ret;
    }
});

userSchema.pre('save', function (next) {
    //this = current user document being saved
    const user = this;
    if (!user.isModified('password')) return next();

    //password has been changed - salt and hash it
    bcrypt.hash(user.password, SALT_ROUNDS, function (err, hash) {
        if (err) return next(err);
        //replace the user provided password with the hash
        user.password = hash;
        next();
    });
})

userSchema.methods.comparePassword = function (tryPassword, cb) {
    bcrypt.compare(tryPassword, this.password, cb);
};

module.exports = mongoose.model('User', userSchema);
