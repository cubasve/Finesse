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
import DoughnutChart from "../common/DoughnutChart";

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

		const getColor = (income, expense, cashFlow) => {
			// A blank income statement
			if (income === 0 && expense === 0) return "blue";
			return determineColor(cashFlow);
		};

		return (
			<>
				<span
					style={{
						fontSize: "24px",
						fontWeight: 500,
						color: getColor(
							totalIncomeAmount,
							totalExpensesAndPYFAmount,
							cashFlow
						),
					}}
				>
					INCOME STATEMENT
				</span>
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
				<DoughnutChart />
			</>
		);
	}
}
IncomeStatement.contextType = IncomeExpenseContext;
