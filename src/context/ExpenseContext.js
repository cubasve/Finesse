import React, { Component } from "react";
import financialStatementService from "../utils/financialStatementService";

const ExpenseContext = React.createContext();
export const ExpenseConsumer = ExpenseContext.Consumer;

export class ExpenseProvider extends Component {
	state = {
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

	render() {
		const {
			totalExpensesAndSelfFirst,
			totalExpenses,
			newExpense,
			expenseFormInvalid,
			totalPayYourselfFirst,
			newPayYourselfFirst,
			selfFirstFormInvalid,
		} = this.state;

		const {
			expenseFormRef,
			handleExpenseSubmit,
			handleExpenseChange,
			handleExpenseDelete,
			selfFirstFormRef,
			handleSelfFirstSubmit,
			handleSelfFirstChange,
			handleSelfFirstDelete,
		} = this;
		return (
			<ExpenseContext.Provider
				value={{
					totalExpensesAndSelfFirst,
					totalExpenses,
					newExpense,
					expenseFormInvalid,
					expenseFormRef,
					handleExpenseSubmit,
					handleExpenseChange,
					handleExpenseDelete,
					totalPayYourselfFirst,
					newPayYourselfFirst,
					selfFirstFormInvalid,
					selfFirstFormRef,
					handleSelfFirstSubmit,
					handleSelfFirstChange,
					handleSelfFirstDelete,
				}}
			>
				{this.props.children}
			</ExpenseContext.Provider>
		);
	}
}

export default ExpenseContext;
