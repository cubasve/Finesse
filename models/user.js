const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const Schema = mongoose.Schema;

const SALT_ROUNDS = 6;

const earned = new Schema({
	type: {
		type: String,
		enum: ["Job", "Self-Employment", "Other"],
	},
	amount: Number,
	month: {
		type: Number,
		match: [1 - 12],
	},
	year: { type: Number, match: [/\d{4}/] },
	category: {
		type: String,
		enum: ["Earned"],
	},
});

const portfolio = new Schema({
	type: {
		type: String,
		enum: ["Stock", "Bond", "Index/Mutual Fund", "GIC", "REIT", "Other"],
	},
	amount: Number,
	month: {
		type: Number,
		match: [1 - 12],
	},
	year: { type: Number, match: [/\d{4}/] },
	category: {
		type: String,
		enum: ["Portfolio"],
	},
});

const passive = new Schema({
	type: {
		type: String,
		enum: ["Real Estate", "Business", "Commodities", "Royalties", "Other"],
	},
	amount: Number,
	month: {
		type: Number,
		match: [1 - 12],
	},
	year: { type: Number, match: [/\d{4}/] },
	category: {
		type: String,
		enum: ["Passive"],
	},
});

const selfFirst = new Schema({
	type: {
		type: String,
		enum: ["Invest", "Save"],
	},
	amount: Number,
	month: {
		type: Number,
		match: [1 - 12],
	},
	year: { type: Number, match: [/\d{4}/] },
	category: {
		type: String,
		enum: ["Self"],
	},
});

const necessities = new Schema({
	type: {
		type: String,
		enum: [
			"Taxes",
			"Housing",
			"Transportation",
			"Insurance",
			"Food",
			"Children",
			"Debt Payments",
			"Entertainment",
			"Donations",
			"Other",
		],
	},
	amount: Number,
	month: {
		type: Number,
		match: [1 - 12],
	},
	year: { type: Number, match: [/\d{4}/] },
	category: {
		type: String,
		enum: ["Necessity"],
	},
});

const cash = new Schema({
	type: {
		type: String,
		enum: ["Chequing Account", "Savings Account"],
	},
	amount: Number,
	month: {
		type: Number,
		match: [1 - 12],
	},
	year: { type: Number, match: [/\d{4}/] },
	category: {
		type: String,
		enum: ["Cash"],
	},
});

const paper = new Schema({
	type: {
		type: String,
		enum: ["Stock", "Bond", "Index/Mutual Fund", "GIC", "REIT", "Other"],
	},
	amount: Number,
	month: {
		type: Number,
		match: [1 - 12],
	},
	year: { type: Number, match: [/\d{4}/] },
	category: {
		type: String,
		enum: ["Paper"],
	},
});

const realEstate = new Schema({
	type: {
		type: String,
		enum: ["Residential", "Commercial", "Industrial", "Vacant Land"],
	},
	amount: Number,
	month: {
		type: Number,
		match: [1 - 12],
	},
	year: { type: Number, match: [/\d{4}/] },
	category: {
		type: String,
		enum: ["RealEstate"],
	},
});

const business = new Schema({
	type: {
		type: String,
		enum: ["Sole proprietorship", "Partnership", "Corporation"],
	},
	amount: Number,
	month: {
		type: Number,
		match: [1 - 12],
	},
	year: { type: Number, match: [/\d{4}/] },
	category: {
		type: String,
		enum: ["Business"],
	},
});

const commodities = new Schema({
	type: {
		type: String,
		enum: [
			"Metals",
			"Energy",
			"Livestock & Meat",
			"Agriculture",
			"Cryptocurrency",
			"Other",
		],
	},
	amount: Number,
	month: {
		type: Number,
		match: [1 - 12],
	},
	year: { type: Number, match: [/\d{4}/] },
	category: {
		type: String,
		enum: ["Commodity"],
	},
});

const goodDebt = new Schema({
	type: {
		type: String,
		enum: ["Real Estate", "Business", "Paper", "Commodities", "Other"],
	},
	amount: Number,
	month: {
		type: Number,
		match: [1 - 12],
	},
	year: { type: Number, match: [/\d{4}/] },
	category: {
		type: String,
		enum: ["GoodDebt"],
	},
});

const badDebt = new Schema({
	type: {
		type: String,
		enum: [
			"Home Mortgage",
			"Car Loans",
			"Credit Cards",
			"School Loans",
			"Other",
		],
	},
	amount: Number,
	month: {
		type: Number,
		match: [1 - 12],
	},
	year: { type: Number, match: [/\d{4}/] },
	category: {
		type: String,
		enum: ["BadDebt"],
	},
});

const userSchema = new Schema(
	{
		name: String,
		email: { type: String, required: true, lowercase: true, unique: true },
		password: String,
		// INCOME
		earned: [earned],
		portfolio: [portfolio],
		passive: [passive],
		//EXPENSES
		selfFirst: [selfFirst],
		necessities: [necessities],
		// ASSETS
		cash: [cash],
		paper: [paper],
		realEstate: [realEstate],
		business: [business],
		commodities: [commodities],
		// LIABILITIES
		goodDebt: [goodDebt],
		badDebt: [badDebt],
	},
	{
		timestamps: true,
	}
);

userSchema.set("toJSON", {
	transform: function (doc, ret) {
		// remove the password property when serializing doc to JSON
		delete ret.password;
		return ret;
	},
});

userSchema.pre("save", function (next) {
	//this = current user document being saved
	const user = this;
	if (!user.isModified("password")) return next();

	//password has been changed - salt and hash it
	bcrypt.hash(user.password, SALT_ROUNDS, function (err, hash) {
		if (err) return next(err);
		//replace the user provided password with the hash
		user.password = hash;
		next();
	});
});

userSchema.methods.comparePassword = function (tryPassword, cb) {
	bcrypt.compare(tryPassword, this.password, cb);
};

module.exports = mongoose.model("User", userSchema);
