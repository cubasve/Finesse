const User = require("../models/user");

module.exports = {
	show,
	create,
	update,
	deleteOne,
};

async function show(req, res) {
	try {
		const user = await User.findById({ _id: req.user._id }); //req.body._id OR req.user._id?
		return res.json({ user: user }); //explicitly return to fetch call
	} catch (err) {
		console.error(err);
		return res.status(400).json(err);
	}
}

async function create(req, res) {
	try {
		const user = await User.findById({ _id: req.user._id });
		console.log(req.body);
		//req.user = user you get back from token VS user = User.findById(...) is the user document from Mongoose
		// user.userFinances.push({
		// 	type: req.body.type,
		// 	amount: req.body.amount,
		// 	category: req.body.category,
		// });
		const { type, amount, month, year, category } = req.body;
		if (category === "Earned") {
			user.earned.push({
				type,
				amount,
				month,
				year,
				category,
			});
			await user.save();
		} else if (category === "Portfolio") {
			user.portfolio.push({
				type,
				amount,
				month,
				year,
				category,
			});
			await user.save();
		} else if (category === "Passive") {
			user.passive.push({
				type,
				amount,
				month,
				year,
				category,
			});
			await user.save();
		}
		res.json({ user: user });
	} catch (err) {
		console.error(err);
		return res.status(400).json(err);
	}
}

async function update(req, res) {
	try {
		const user = await User.findById({ _id: req.user._id });
		const { id, type, amount, category } = req.body;
		if (category === "Earned") {
			const entityToUpdate = user.earned.id(id);
			entityToUpdate.set({ type, amount });
			await user.save();
		} else if (category === "Portfolio") {
			const entityToUpdate = user.portfolio.id(id);
			entityToUpdate.set({ type, amount });
			await user.save();
		} else if (category === "Passive") {
			const entityToUpdate = user.passive.id(id);
			entityToUpdate.set({ type, amount });
			await user.save();
		}
		res.json({ user: user });
	} catch (err) {
		console.error(err);
		return res.status(400).json(err);
	}
}

async function updateExample(req, res) {
	try {
		const user = await User.findById({ _id: req.user._id });
		const id = user.userFinances.id(req.body.id);
		id.set({ type: req.body.type, amount: req.body.amount });
		await user.save();
		res.json({ user: user });
	} catch (err) {
		console.error(err);
		return res.status(400).json(err);
	}
}

async function deleteOne(req, res) {
	try {
		const user = await User.findById({ _id: req.user._id });
		console.log("req.body", req.body);
		const { id, category } = req.body;
		if (category === "Earned") {
			const entityToDelete = user.earned.id(id);
			entityToDelete.remove();
			await user.save();
		} else if (category === "Portfolio") {
			const entityToDelete = user.portfolio.id(id);
			entityToDelete.remove();
			await user.save();
		} else if (category === "Passive") {
			const entityToDelete = user.passive.id(id);
			entityToDelete.remove();
			await user.save();
		}
		res.json({ user: user });
	} catch (err) {
		console.error(err);
		return res.status(400).json(err);
	}
}

async function deleteEarnedIncome(req, res) {
	try {
		const user = await User.findById({ _id: req.user._id });
		const id = user.earned.id(req.body.id);
		id.remove(); //or just req.body.id
		//id.pull(req.body)
		//id.pull()
		await user.save();
		res.json({ user: user });
	} catch (err) {
		console.error(err);
		return res.status(400).json(err);
	}
}
