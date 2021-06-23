import React, { Component } from "react";
import Income from "../../components/Income/Income";
import Expenditure from "../../components/Expenditure/Expenditure";
import financialStatementService from "../../utils/financialStatementService";
import IncomeExpenseContext, {
	IncomeExpenseConsumer,
} from "../../context/IncomeExpenseContext";

export default class IncomeStatement extends Component {
	async componentDidMount() {
		const {
			handleFetchData,
			totalIncome,
			totalExpensesAndSelfFirst,
			totalEarnedIncome,
			totalPortfolioIncome,
			totalPassiveIncome,
			totalPayYourselfFirst,
		} = this.context;

		console.log(this.context);

		handleFetchData();

		// try {
		// 	await financialStatementService.show().then((data) => {
		// 		this.setState({
		// 			totalEarnedIncome: data.user.userFinances.filter(
		// 				(elem) => elem.category === "Earned"
		// 			),
		// 			totalPortfolioIncome: data.user.userFinances.filter(
		// 				(elem) => elem.category === "Portfolio"
		// 			),
		// 			totalPassiveIncome: data.user.userFinances.filter(
		// 				(elem) => elem.category === "Passive"
		// 			),

		// 			totalExpenses: data.user.userFinances.filter(
		// 				(elem) => elem.category === "Expense"
		// 			),
		// 			totalPayYourselfFirst: data.user.userFinances.filter(
		// 				(elem) => elem.category === "Self"
		// 			),

		// 			totalIncome: data.user.userFinances.filter(
		// 				(elem) =>
		// 					elem.category === "Earned" ||
		// 					elem.category === "Portfolio" ||
		// 					elem.category === "Passive"
		// 			),
		// 			totalExpensesAndSelfFirst: data.user.userFinances.filter(
		// 				(elem) => elem.category === "Expense" || elem.category === "Self"
		// 			),
		// 		});
		// 	});
		// } catch (err) {
		// 	console.error(err);
		// }
	}

	//Cash Flow Calculations
	calculateCashFlow = (
		calculateTotalIncome,
		calculateTotalExpensesAndSelfFirst
	) => {
		if (!calculateTotalIncome && !calculateTotalExpensesAndSelfFirst) return 0;
		let cashFlow = calculateTotalIncome - calculateTotalExpensesAndSelfFirst;
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

	render() {
		const {
			totalIncome,
			totalExpensesAndSelfFirst,
			// totalEarnedIncome,
			// totalPortfolioIncome,
			// totalPassiveIncome,
		} = this.context;

		const totalIncomeNumber = totalIncome
			.map((elem) => elem.amount)
			.reduce((acc, num) => acc + num, 0);

		const totalExpensesAndSelfFirstNumber = totalExpensesAndSelfFirst
			.map((elem) => elem.amount)
			.reduce((acc, num) => acc + num, 0);

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
					{this.calculateCashFlow(
						totalIncomeNumber,
						totalExpensesAndSelfFirstNumber
					)}
				</h6>
				<Income />
				<Expenditure />
			</>
		);
	}
}
IncomeStatement.contextType = IncomeExpenseContext;
