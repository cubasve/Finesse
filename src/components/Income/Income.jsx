import React, { useContext } from "react";
import "./Income.css";
import Earned from "../EarnedIncome/EarnedIncome";
import Portfolio from "../PortfolioIncome/PortfolioIncome";
import Passive from "../PassiveIncome/PassiveIncome";
import IncomeExpenseContext from "../../context/IncomeExpenseContext";
import {
	determineTotalAmount,
	showTotalAmount,
} from "../../utils/calculations";

export default function Income() {
	const { totalIncome } = useContext(IncomeExpenseContext);
	const totalIncomeAmount = determineTotalAmount(totalIncome);

	return (
		<div className="border">
			<span className="title">
				<span>INCOME</span>
				<span className="right">${showTotalAmount(totalIncomeAmount)}</span>
			</span>

			<Earned />
			<Portfolio />
			<Passive />
		</div>
	);
}
