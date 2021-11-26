const User = require("../models/user");
const jwt = require("jsonwebtoken");
const SECRET = process.env.SECRET;

module.exports = {
	signup,
	login,
};

async function signup(req, res) {
	//can do password validation here
	const user = new User(req.body);
	try {
		await user.save();
		// First delete data that should not be in token
		const token = createJWT(user);
		res.json({ token });
	} catch (err) {
		// Probably a duplicate email
		res.status(400).json(err);
	}
}

function createJWT(user) {
	return jwt.sign({ user }, SECRET, { expiresIn: "24h" });
}

async function login(req, res) {
	try {
		const user = await User.findOne({ email: req.body.email });
		if (!user) return res.status(401).json({ err: "bad credentials" });
		user.comparePassword(req.body.password, (err, isMatch) => {
			if (isMatch) {
				const token = createJWT(user);
				res.json({ token });
			} else {
				return res.status(401).json({ err: "bad credentials" });
			}
		});
	} catch (err) {
		return res.status(400).json(err);
	}
}
