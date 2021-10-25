import React, { Component } from "react";
import Income from "../../components/Income/Income";
import Expenditure from "../../components/Expenditure/Expenditure";
import IncomeExpenseContext from "../../context/IncomeExpenseContext";
import {
	calculateDifference,
	determineColor,
	determineTotalAmount,
	showTotalAmount,
} from "../../utils/calculations";

export default class IncomeStatement extends Component {
	async componentDidMount() {
		const { handleFetchData } = this.context;
		handleFetchData();
	}

	render() {
		const { totalIncome, totalExpensesAndSelfFirst } = this.context;

		const totalIncomeAmount = determineTotalAmount(totalIncome);
		const totalExpensesAndPYFAmount = determineTotalAmount(
			totalExpensesAndSelfFirst
		);
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
					CASH FLOW: {showTotalAmount(totalIncomeAmount)} -{" "}
					{showTotalAmount(totalExpensesAndPYFAmount)} ={" "}
					<span
						style={{
							color: determineColor(cashFlow),
						}}
					>
						{cashFlow}
					</span>
				</h6>
				<Income />
				<Expenditure />
			</>
		);
	}
}
IncomeStatement.contextType = IncomeExpenseContext;
