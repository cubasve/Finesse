import React, { Component } from "react";
import Income from "../../components/Income/Income";
import Expenditure from "../../components/Expenditure/Expenditure";
import IncomeExpenseContext from "../../context/IncomeExpenseContext";
import {
	calculateDifference,
	determineColor,
	calculateSum,
	formatAmount,
} from "../../utils/calculations";

export default class IncomeStatement extends Component {
	async componentDidMount() {
		const { handleFetchData } = this.context;
		handleFetchData();
	}

	render() {
		const { totalIncome, totalExpensesAndSelfFirst } = this.context;

		const totalIncomeAmount = calculateSum(totalIncome);
		const totalExpensesAndPYFAmount = calculateSum(totalExpensesAndSelfFirst);
		const cashFlow = calculateDifference(
			totalIncomeAmount,
			totalExpensesAndPYFAmount
		);

		return (
			<>
				<h6>
					<strong>CASH FLOW = INCOME - EXPENSES</strong>
				</h6>
				<h6>
					CASH FLOW: {formatAmount(totalIncomeAmount)} -{" "}
					{formatAmount(totalExpensesAndPYFAmount)} ={" "}
					<span
						style={{
							color: determineColor(cashFlow),
						}}
					>
						{formatAmount(cashFlow)}
					</span>
				</h6>
				<Income />
				<Expenditure />
			</>
		);
	}
}
IncomeStatement.contextType = IncomeExpenseContext;
