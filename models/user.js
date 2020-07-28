const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Schema = mongoose.Schema;
// const FinancialStatementSchema = require('../models/financialStatement');

const SALT_ROUNDS = 6;

const userFinances = new Schema({
    income: { type: Schema.Types.ObjectId, ref: "FinancialStatement" },
    expense: { type: Schema.Types.ObjectId, ref: "FinancialStatement" },
    asset: { type: Schema.Types.ObjectId, ref: "FinancialStatement" },
    liability: { type: Schema.Types.ObjectId, ref: "FinancialStatement" }
});

const userSchema = new Schema({
    name: String,
    email: { type: String, required: true, lowercase: true, unique: true },
    password: String,
    userFinances: [userFinances],
    // userFinances: [FinancialStatementSchema]
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
