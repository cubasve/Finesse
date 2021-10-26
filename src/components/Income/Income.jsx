import React, { useContext } from "react";
import "./Income.css";
import Earned from "../EarnedIncome/EarnedIncome";
import Portfolio from "../PortfolioIncome/PortfolioIncome";
import Passive from "../PassiveIncome/PassiveIncome";
import IncomeExpenseContext from "../../context/IncomeExpenseContext";
import { calculateSum, formatAmount } from "../../utils/calculations";

export default function Income() {
	const { totalIncome } = useContext(IncomeExpenseContext);
	const totalIncomeAmount = calculateSum(totalIncome);

	return (
		<div className="border">
			<span className="title">
				<span>INCOME</span>
				<span className="right">{formatAmount(totalIncomeAmount)}</span>
			</span>

			<Earned />
			<Portfolio />
			<Passive />
		</div>
	);
}
