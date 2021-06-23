import React, { useContext } from "react";
import "./Income.css";
import Earned from "../EarnedIncome/EarnedIncome";
import Portfolio from "../PortfolioIncome/PortfolioIncome";
import Passive from "../PassiveIncome/PassiveIncome";
import IncomeExpenseContext from "../../context/IncomeExpenseContext";

function calculateTotalIncome(totalIncomeNumber) {
	if (!totalIncomeNumber) return 0;
	if (Number.isInteger(totalIncomeNumber)) return totalIncomeNumber;
	return totalIncomeNumber.toFixed(2);
}

export default function Income() {
	const { totalIncome } = useContext(IncomeExpenseContext);

	const totalIncomeNumber = totalIncome
		.map((elem) => elem.amount)
		.reduce((acc, num) => acc + num, 0);

	return (
		<div className="border">
			<span className="title">
				<span>INCOME</span>
				<span className="right">
					${calculateTotalIncome(totalIncomeNumber)}
				</span>
			</span>

			<Earned />
			<Portfolio />
			<Passive />
		</div>
	);
}
