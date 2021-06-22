import React, { Component } from "react";
import Income from "../../components/Income/Income";
import Expenditure from "../../components/Expenditure/Expenditure";
import financialStatementService from "../../utils/financialStatementService";
import IncomeContext, {
	IncomeProvider,
	IncomeConsumer,
} from "../../context/IncomeContext";

export default class IncomeStatement extends Component {
	state = {
		totalIncome: [],
		totalExpensesAndSelfFirst: [],

		totalExpenses: [],
		newExpense: {
			type: "Taxes",
			amount: "",
			category: "Expense",
			class: "Expense",
		},
		expenseFormInvalid: true,

		totalPayYourselfFirst: [],
		newPayYourselfFirst: {
			// type: 'Self',
			amount: "",
			category: "Self",
			class: "Self",
		},
		selfFirstFormInvalid: true,
	};
	expenseFormRef = React.createRef();
	selfFirstFormRef = React.createRef();

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

	//Expense Methods
	handleExpenseSubmit = async (e) => {
		e.preventDefault();
		if (!this.expenseFormRef.current.checkValidity()) return;
		try {
			await financialStatementService
				.create({
					type: this.state.newExpense.type,
					amount: this.state.newExpense.amount,
					category: this.state.newExpense.category,
					class: this.state.newExpense.class,
				})
				.then((data) => {
					this.setState({
						totalExpenses: data.user.userFinances.filter(
							(elem) => elem.category === "Expense"
						),
						totalExpensesAndSelfFirst: data.user.userFinances.filter(
							(elem) => elem.category === "Expense" || elem.category === "Self"
						),
						newExpense: {
							type: "Taxes",
							amount: "",
							category: "Expense",
							class: "Expense",
						},
						expenseFormInvalid: true,
					});
				});
		} catch (err) {
			console.error(err);
		}
	};

	handleExpenseChange = (e) => {
		const newExpense = {
			...this.state.newExpense,
			[e.target.name]: e.target.value,
		};
		this.setState({
			newExpense: newExpense,
			expenseFormInvalid: !this.expenseFormRef.current.checkValidity(),
		});
	};

	handleExpenseDelete = async (e) => {
		try {
			await financialStatementService
				.deleteOne({ id: e.target.value })
				.then((data) => {
					this.setState({
						totalExpenses: data.user.userFinances.filter(
							(elem) => elem.category === "Expense"
						),
						totalExpensesAndSelfFirst: data.user.userFinances.filter(
							(elem) => elem.category === "Expense" || elem.category === "Self"
						),
					});
				});
		} catch (err) {
			console.error(err);
		}
	};

	//Pay Yourself First Methods
	handleSelfFirstSubmit = async (e) => {
		e.preventDefault();
		if (!this.selfFirstFormRef.current.checkValidity()) return;
		try {
			await financialStatementService
				.create({
					// type: this.state.newPayYourselfFirst.type,
					amount: this.state.newPayYourselfFirst.amount,
					category: this.state.newPayYourselfFirst.category,
					class: this.state.newPayYourselfFirst.class,
				})
				.then((data) => {
					this.setState({
						totalPayYourselfFirst: data.user.userFinances.filter(
							(elem) => elem.category === "Self"
						),
						totalExpensesAndSelfFirst: data.user.userFinances.filter(
							(elem) => elem.category === "Expense" || elem.category === "Self"
						),
						newPayYourselfFirst: {
							// type: 'Self',
							amount: "",
							category: "Self",
							class: "Self",
						},
						selfFirstFormInvalid: true,
					});
				});
		} catch (err) {
			console.error(err);
		}
	};

	handleSelfFirstChange = (e) => {
		const newPayYourselfFirst = {
			...this.state.newPayYourselfFirst,
			[e.target.name]: e.target.value,
		};
		this.setState({
			newPayYourselfFirst: newPayYourselfFirst,
			selfFirstFormInvalid: !this.selfFirstFormRef.current.checkValidity(),
		});
	};

	handleSelfFirstDelete = async (e) => {
		try {
			await financialStatementService
				.deleteOne({ id: e.target.value })
				.then((data) => {
					this.setState({
						totalPayYourselfFirst: data.user.userFinances.filter(
							(elem) => elem.category === "Self"
						),
						totalExpensesAndSelfFirst: data.user.userFinances.filter(
							(elem) => elem.category === "Expense" || elem.category === "Self"
						),
					});
				});
		} catch (err) {
			console.error(err);
		}
	};

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
		const totalExpensesAndSelfFirstNumber = this.state.totalExpensesAndSelfFirst
			.map((elem) => elem.amount)
			.reduce((acc, num) => acc + num, 0);

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
