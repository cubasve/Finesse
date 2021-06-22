import React, { Component } from "react";
import Income from "../../components/Income/Income";
import Expenditure from "../../components/Expenditure/Expenditure";
import financialStatementService from "../../utils/financialStatementService";
import IncomeContext, {
	IncomeProvider,
	IncomeConsumer,
} from "../../context/IncomeContext";

export default class IncomeStatement extends Component {
	async componentDidMount() {
		try {
			await financialStatementService.show().then((data) => {
				this.setState({
					totalEarnedIncome: data.user.userFinances.filter(
						(elem) => elem.category === "Earned"
					),
					totalPortfolioIncome: data.user.userFinances.filter(
						(elem) => elem.category === "Portfolio"
					),
					totalPassiveIncome: data.user.userFinances.filter(
						(elem) => elem.category === "Passive"
					),

					totalExpenses: data.user.userFinances.filter(
						(elem) => elem.category === "Expense"
					),
					totalPayYourselfFirst: data.user.userFinances.filter(
						(elem) => elem.category === "Self"
					),

					totalIncome: data.user.userFinances.filter(
						(elem) =>
							elem.category === "Earned" ||
							elem.category === "Portfolio" ||
							elem.category === "Passive"
					),
					totalExpensesAndSelfFirst: data.user.userFinances.filter(
						(elem) => elem.category === "Expense" || elem.category === "Self"
					),
				});
			});
		} catch (err) {
			console.error(err);
		}
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
		// const totalIncomeNumber = this.state.totalIncome
		// 	.map((elem) => elem.amount)
		// 	.reduce((acc, num) => acc + num, 0);

		// const totalExpensesAndSelfFirstNumber = this.state.totalExpensesAndSelfFirst
		// 	.map((elem) => elem.amount)
		// 	.reduce((acc, num) => acc + num, 0);

		return (
			<>
				<IncomeProvider>
					<h6>
						<strong>CASH FLOW = INCOME - EXPENSES</strong>
					</h6>
					{/* <h6>
						CASH FLOW: {this.calculateTotalIncome(totalIncomeNumber)} -{" "}
						{this.calculateTotalExpensesAndSelfFirst(
							totalExpensesAndSelfFirstNumber
						)}{" "}
						={" "}
						{this.calculateCashFlow(
							totalIncomeNumber,
							totalExpensesAndSelfFirstNumber
						)}
					</h6> */}
					<Income />
					<Expenditure
						totalExpensesAndSelfFirst={this.state.totalExpensesAndSelfFirst}
						totalExpenses={this.state.totalExpenses}
						newExpense={this.state.newExpense}
						handleExpenseSubmit={this.handleExpenseSubmit}
						handleExpenseChange={this.handleExpenseChange}
						handleExpenseDelete={this.handleExpenseDelete}
						expenseFormInvalid={this.state.expenseFormInvalid}
						expenseFormRef={this.expenseFormRef}
						totalPayYourselfFirst={this.state.totalPayYourselfFirst}
						newPayYourselfFirst={this.state.newPayYourselfFirst}
						handleSelfFirstSubmit={this.handleSelfFirstSubmit}
						handleSelfFirstChange={this.handleSelfFirstChange}
						handleSelfFirstDelete={this.handleSelfFirstDelete}
						selfFirstFormInvalid={this.state.selfFirstFormInvalid}
						selfFirstFormRef={this.selfFirstFormRef}
					/>
				</IncomeProvider>
			</>
		);
	}
}
