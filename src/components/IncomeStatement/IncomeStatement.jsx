import React, { Component } from "react";
import Income from "../../components/Income/Income";
import Expenditure from "../../components/Expenditure/Expenditure";
import IncomeExpenseContext from "../../context/IncomeExpenseContext";

export default class IncomeStatement extends Component {
	async componentDidMount() {
		const { handleFetchData } = this.context;
		handleFetchData();
	}

	//Cash Flow Calculations
	calculateCashFlow = (income, expense) => {
		if (!income && !expense) return 0;
		let cashFlow = income - expense;
		if (Number.isInteger(cashFlow)) return cashFlow;
		return cashFlow.toFixed(2);
	};

	calculateTotalIncome = (totalIncomeNumber) => {
		if (!totalIncomeNumber) return 0;
		if (Number.isInteger(totalIncomeNumber)) return totalIncomeNumber;
		return totalIncomeNumber.toFixed(2);
	};

	calculateTotalExpensesAndSelfFirst = (totalExpensesAndSelfFirstNumber) => {
		if (!totalExpensesAndSelfFirstNumber) return 0;
		if (Number.isInteger(totalExpensesAndSelfFirstNumber))
			return totalExpensesAndSelfFirstNumber;
		return totalExpensesAndSelfFirstNumber.toFixed(2);
	};

	determineAmountColor = (cashFlow) => {
		let threshold = 10;
		if (cashFlow < 0) {
			return "red";
		}
		if (cashFlow > threshold) {
			return "green";
		} else {
			return "yellow";
		}
	};

	render() {
		const { totalIncome, totalExpensesAndSelfFirst } = this.context;

		const totalIncomeNumber = totalIncome
			.map((elem) => elem.amount)
			.reduce((acc, num) => acc + num, 0);

		const totalExpensesAndSelfFirstNumber = totalExpensesAndSelfFirst
			.map((elem) => elem.amount)
			.reduce((acc, num) => acc + num, 0);

		const cashFlow = this.calculateCashFlow(
			totalIncomeNumber,
			totalExpensesAndSelfFirstNumber
		);

		return (
			<>
				<h6>
					<strong>CASH FLOW = INCOME - EXPENSES</strong>
				</h6>
				<h6>
					CASH FLOW: {this.calculateTotalIncome(totalIncomeNumber)} -{" "}
					{this.calculateTotalExpensesAndSelfFirst(
						totalExpensesAndSelfFirstNumber
					)}{" "}
					={" "}
					<span
						style={{
							color:
								cashFlow < 10 && cashFlow > 0
									? "orange"
									: cashFlow >= 10
									? "green"
									: "red",
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
