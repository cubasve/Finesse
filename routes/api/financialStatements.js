const express = require("express");
const router = express.Router();
const financialStatementsCtrl = require("../../controllers/financialStatements");

//In server.js:
//app.use('/api/financialStatements', require('./routes/api/financialStatements'));

router.get("/:year/:month", isLoggedIn, financialStatementsCtrl.show); //route: /api/financialStatements/:year/:month
router.post("/:year/:month", isLoggedIn, financialStatementsCtrl.create); //route: /api/financialStatements/:year/:month

router.put("/:id", isLoggedIn, financialStatementsCtrl.update); //route: /api/financialStatements/:id
router.delete("/:id", isLoggedIn, financialStatementsCtrl.deleteOne); //route: /api/financialStatements/:id

module.exports = router;

function isLoggedIn(req, res, next) {
	if (req.user) return next();
	return res.status(401).json({ msg: "Not Authorized" });
}
