import React, { Component } from "react";
import financialStatementService from "../utils/financialStatementService";

const IncomeExpenseContext = React.createContext();
export const IncomeExpenseConsumer = IncomeExpenseContext.Consumer;

export class IncomeExpenseProvider extends Component {
	state = {
		totalIncome: [],
		totalExpensesAndSelfFirst: [],

		totalEarnedIncome: [],
		newEarnedIncome: {
			type: "Job",
			amount: "",
			category: "Earned",
			month: 11,
			year: 2021,
		},
		updatedEarnedIncome: {},
		earnedFormInvalid: true,

		totalPortfolioIncome: [],
		newPortfolioIncome: {
			type: "Stock",
			amount: "",
			category: "Portfolio",
			month: 11,
			year: 2021,
		},
		updatedPortfolioIncome: {},
		portfolioFormInvalid: true,

		totalPassiveIncome: [],
		newPassiveIncome: {
			type: "Real Estate",
			amount: "",
			category: "Passive",
			month: 11,
			year: 2021,
		},
		updatedPassiveIncome: {},
		passiveFormInvalid: true,

		totalExpenses: [],
		newExpense: {
			type: "Taxes",
			amount: "",
			category: "Expense",
			class: "Expense",
		},
		updatedExpense: {},
		expenseFormInvalid: true,

		totalPayYourselfFirst: [],
		newPayYourselfFirst: {
			type: "Invest",
			amount: "",
			category: "Self",
			class: "Expense",
		},
		updatedPayYourselfFirst: {},
		selfFirstFormInvalid: true,
	};
	earnedFormRef = React.createRef();
	portfolioFormRef = React.createRef();
	passiveFormRef = React.createRef();
	expenseFormRef = React.createRef();
	selfFirstFormRef = React.createRef();

	handleFetchData = async () => {
		try {
			await financialStatementService.show().then((data) => {
				const { earned, portfolio, passive } = data.user;
				this.setState({
					totalEarnedIncome: earned,
					totalPortfolioIncome: portfolio,
					totalPassiveIncome: passive,

					totalExpenses: data.user.userFinances.filter(
						(elem) => elem.category === "Expense"
					),
					totalPayYourselfFirst: data.user.userFinances.filter(
						(elem) => elem.category === "Self"
					),

					totalIncome: [...earned, ...portfolio, ...passive],
					totalExpensesAndSelfFirst: data.user.userFinances.filter(
						(elem) => elem.category === "Expense" || elem.category === "Self"
					),
				});
			});
		} catch (err) {
			console.error(err);
		}
	};

	handleGetCurrentEarnedIncome = (id) => {
		const currentEarnedIncome = this.state.totalEarnedIncome.find(
			({ _id }) => _id === id
		);
		this.setState({ updatedEarnedIncome: currentEarnedIncome });
	};

	handleGetCurrentPortfolioIncome = (id) => {
		const currentPortfolioIncome = this.state.totalPortfolioIncome.find(
			({ _id }) => _id === id
		);
		this.setState({ updatedPortfolioIncome: currentPortfolioIncome });
	};

	handleGetCurrentPassiveIncome = (id) => {
		const currentPassiveIncome = this.state.totalPassiveIncome.find(
			({ _id }) => _id === id
		);
		this.setState({ updatedPassiveIncome: currentPassiveIncome });
	};

	handleGetCurrentExpense = (id) => {
		const currentExpense = this.state.totalExpenses.find(
			({ _id }) => _id === id
		);
		this.setState({ updatedExpense: currentExpense });
	};

	handleGetCurrentPayYourselfFirst = (id) => {
		const currentPayYourselfFirst = this.state.totalPayYourselfFirst.find(
			({ _id }) => _id === id
		);
		this.setState({ updatedPayYourselfFirst: currentPayYourselfFirst });
	};

	/*---------EARNED INCOME METHODS-------- */
	handleEarnedIncomeSubmit = async (e) => {
		e.preventDefault();
		if (!this.earnedFormRef.current.checkValidity()) return;
		try {
			const { type, amount, category } = this.state.newEarnedIncome;
			await financialStatementService
				.create({
					type,
					amount,
					category,
					month: 11,
					year: 2021,
				})
				.then((data) => {
					const { earned, portfolio, passive } = data.user;
					this.setState({
						totalEarnedIncome: earned,
						totalIncome: [...earned, ...portfolio, ...passive],
						newEarnedIncome: {
							type: "Job",
							amount: "",
							category: "Earned",
							month: 11,
							year: 2021,
						},
						earnedFormInvalid: true,
					});
				});
		} catch (err) {
			console.error(err);
		}
	};

	handleEarnedIncomeChange = (e) => {
		const newEarnedIncome = {
			...this.state.newEarnedIncome,
			[e.target.name]: e.target.value,
		};
		console.log("newEarnedIncome", newEarnedIncome);
		this.setState({
			newEarnedIncome: newEarnedIncome,
			earnedFormInvalid: !this.earnedFormRef.current.checkValidity(),
		});
	};

	handleEarnedIncomeUpdateChange = (e) => {
		const updatedEarnedIncome = {
			...this.state.updatedEarnedIncome,
			[e.target.name]: e.target.value,
		};
		this.setState({
			updatedEarnedIncome: updatedEarnedIncome,
		});
	};

	handleEarnedIncomeDelete = async (e) => {
		const entity = this.state.totalEarnedIncome.find(
			({ _id }) => _id === e.target.value
		);
		console.log("e.target.value", e.target.value, "entity", entity);
		try {
			await financialStatementService
				.deleteOne({ id: entity._id, category: entity.category })
				.then((data) => {
					const { earned, portfolio, passive } = data.user;
					this.setState({
						totalEarnedIncome: earned,
						totalIncome: [...earned, ...portfolio, ...passive],
					});
				});
		} catch (err) {
			console.error(err);
		}
	};

	handleEarnedIncomeUpdateSubmit = async (e) => {
		// e.preventDefault();
		try {
			const { type, amount, category } = this.state.updatedEarnedIncome;
			await financialStatementService
				.update({
					id: e.target.value,
					type,
					amount,
					category,
				})
				.then((data) => {
					const { earned, portfolio, passive } = data.user;
					this.setState({
						totalEarnedIncome: earned,
						totalIncome: [...earned, ...portfolio, ...passive],
						updatedEarnedIncome: {},
					});
				});
		} catch (err) {
			console.error(err);
		}
	};

	/*---------PORTFOLIO INCOME METHODS-------- */
	handlePortfolioIncomeSubmit = async (e) => {
		e.preventDefault();
		if (!this.portfolioFormRef.current.checkValidity()) return;
		try {
			const { type, amount, category } = this.state.newPortfolioIncome;
			await financialStatementService
				.create({
					type,
					amount,
					category,
					month: 11,
					year: 2021,
				})
				.then((data) => {
					const { earned, portfolio, passive } = data.user;
					this.setState({
						totalPortfolioIncome: portfolio,
						totalIncome: [...earned, ...portfolio, ...passive],
						newPortfolioIncome: {
							type: "Stock",
							amount: "",
							category: "Portfolio",
							month: 11,
							year: 2021,
						},
						portfolioFormInvalid: true,
					});
				});
		} catch (err) {
			console.error(err);
		}
	};

	handlePortfolioIncomeChange = (e) => {
		const newPortfolioIncome = {
			...this.state.newPortfolioIncome,
			[e.target.name]: e.target.value,
		};
		this.setState({
			newPortfolioIncome: newPortfolioIncome,
			portfolioFormInvalid: !this.portfolioFormRef.current.checkValidity(),
		});
	};

	handlePortfolioIncomeUpdateChange = (e) => {
		const updatedPortfolioIncome = {
			...this.state.updatedPortfolioIncome,
			[e.target.name]: e.target.value,
		};
		this.setState({
			updatedPortfolioIncome: updatedPortfolioIncome,
		});
	};

	handlePortfolioIncomeDelete = async (e) => {
		const entity = this.state.totalPortfolioIncome.find(
			({ _id }) => _id === e.target.value
		);
		try {
			await financialStatementService
				.deleteOne({ id: entity._id, category: entity.category })
				.then((data) => {
					const { earned, portfolio, passive } = data.user;
					this.setState({
						totalPortfolioIncome: portfolio,
						totalIncome: [...earned, ...portfolio, ...passive],
					});
				});
		} catch (err) {
			console.error(err);
		}
	};

	handlePortfolioIncomeUpdateSubmit = async (e) => {
		// e.preventDefault();
		try {
			const { type, amount, category } = this.state.updatedPortfolioIncome;
			await financialStatementService
				.update({
					id: e.target.value,
					type,
					amount,
					category,
				})
				.then((data) => {
					const { earned, portfolio, passive } = data.user;
					this.setState({
						totalPortfolioIncome: portfolio,
						totalIncome: [...earned, ...portfolio, ...passive],
						updatedPortfolioIncome: {},
					});
				});
		} catch (err) {
			console.error(err);
		}
	};

	/*---------PASSIVE INCOME METHODS-------- */
	handlePassiveIncomeSubmit = async (e) => {
		e.preventDefault();
		if (!this.passiveFormRef.current.checkValidity()) return;
		try {
			const { type, amount, category } = this.state.newPassiveIncome;
			await financialStatementService
				.create({
					type,
					amount,
					category,
					month: 11,
					year: 2021,
				})
				.then((data) => {
					const { earned, portfolio, passive } = data.user;
					this.setState({
						totalPassiveIncome: passive,
						totalIncome: [...earned, ...portfolio, ...passive],
						newPassiveIncome: {
							type: "Real Estate",
							amount: "",
							category: "Passive",
							month: 11,
							year: 2021,
						},
						passiveFormInvalid: true,
					});
				});
		} catch (err) {
			console.error(err);
		}
	};

	handlePassiveIncomeChange = (e) => {
		const newPassiveIncome = {
			...this.state.newPassiveIncome,
			[e.target.name]: e.target.value,
		};
		this.setState({
			newPassiveIncome: newPassiveIncome,
			passiveFormInvalid: !this.passiveFormRef.current.checkValidity(),
		});
	};

	handlePassiveIncomeUpdateChange = (e) => {
		const updatedPassiveIncome = {
			...this.state.updatedPassiveIncome,
			[e.target.name]: e.target.value,
		};
		this.setState({
			updatedPassiveIncome: updatedPassiveIncome,
		});
	};

	handlePassiveIncomeDelete = async (e) => {
		const entity = this.state.totalPassiveIncome.find(
			({ _id }) => _id === e.target.value
		);
		try {
			await financialStatementService
				.deleteOne({ id: entity._id, category: entity.category })
				.then((data) => {
					const { earned, portfolio, passive } = data.user;
					this.setState({
						totalPassiveIncome: passive,
						totalIncome: [...earned, ...portfolio, ...passive],
					});
				});
		} catch (err) {
			console.error(err);
		}
	};

	handlePassiveIncomeUpdateSubmit = async (e) => {
		// e.preventDefault();
		try {
			const { type, amount, category } = this.state.updatedPassiveIncome;
			await financialStatementService
				.update({
					id: e.target.value,
					type,
					amount,
					category,
				})
				.then((data) => {
					const { earned, portfolio, passive } = data.user;
					this.setState({
						totalPassiveIncome: passive,
						totalIncome: [...earned, ...portfolio, ...passive],
						updatedPassiveIncome: {},
					});
				});
		} catch (err) {
			console.error(err);
		}
	};

	/*---------EXPENSE METHODS-------- */
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

	handleExpenseUpdateChange = (e) => {
		const updatedExpense = {
			...this.state.updatedExpense,
			[e.target.name]: e.target.value,
		};
		this.setState({
			updatedExpense: updatedExpense,
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

	handleExpenseUpdateSubmit = async (e) => {
		// e.preventDefault();
		try {
			await financialStatementService
				.update({
					id: e.target.value,
					type: this.state.updatedExpense.type,
					amount: this.state.updatedExpense.amount,
				})
				.then((data) => {
					this.setState({
						totalExpenses: data.user.userFinances.filter(
							(elem) => elem.category === "Expense"
						),
						totalExpensesAndSelfFirst: data.user.userFinances.filter(
							(elem) => elem.category === "Expense" || elem.category === "Self"
						),
						updatedExpense: {},
					});
				});
		} catch (err) {
			console.error(err);
		}
	};

	/*---------PAY YOURSELF FIRST METHODS-------- */
	handleSelfFirstSubmit = async (e) => {
		e.preventDefault();
		if (!this.selfFirstFormRef.current.checkValidity()) return;
		try {
			await financialStatementService
				.create({
					type: this.state.newPayYourselfFirst.type,
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
							type: "Invest",
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

	handleSelfFirstUpdateChange = (e) => {
		const updatedSelfFirst = {
			...this.state.updatedPayYourselfFirst,
			[e.target.name]: e.target.value,
		};
		this.setState({
			updatedPayYourselfFirst: updatedSelfFirst,
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

	handleSelfFirstUpdateSubmit = async (e) => {
		// e.preventDefault();
		try {
			await financialStatementService
				.update({
					id: e.target.value,
					type: this.state.updatedPayYourselfFirst.type,
					amount: this.state.updatedPayYourselfFirst.amount,
				})
				.then((data) => {
					this.setState({
						totalPayYourselfFirst: data.user.userFinances.filter(
							(elem) => elem.category === "Self"
						),
						totalExpensesAndSelfFirst: data.user.userFinances.filter(
							(elem) => elem.category === "Expense" || elem.category === "Self"
						),
						updatedPayYourselfFirst: {},
					});
				});
		} catch (err) {
			console.error(err);
		}
	};

	render() {
		const {
			totalIncome,

			totalEarnedIncome,
			newEarnedIncome,
			updatedEarnedIncome,
			earnedFormInvalid,

			totalPortfolioIncome,
			newPortfolioIncome,
			updatedPortfolioIncome,
			portfolioFormInvalid,

			totalPassiveIncome,
			newPassiveIncome,
			updatedPassiveIncome,
			passiveFormInvalid,

			totalExpensesAndSelfFirst,
			totalExpenses,
			newExpense,
			updatedExpense,
			expenseFormInvalid,

			totalPayYourselfFirst,
			newPayYourselfFirst,
			updatedPayYourselfFirst,
			selfFirstFormInvalid,
		} = this.state;

		const {
			handleFetchData,

			handleEarnedIncomeSubmit,
			handleEarnedIncomeChange,
			handleEarnedIncomeUpdateChange,
			handleEarnedIncomeUpdateSubmit,
			handleGetCurrentEarnedIncome,
			handleEarnedIncomeDelete,
			earnedFormRef,

			handlePortfolioIncomeSubmit,
			handlePortfolioIncomeChange,
			handlePortfolioIncomeDelete,
			handleGetCurrentPortfolioIncome,
			handlePortfolioIncomeUpdateChange,
			handlePortfolioIncomeUpdateSubmit,
			portfolioFormRef,

			handlePassiveIncomeSubmit,
			handlePassiveIncomeChange,
			handlePassiveIncomeDelete,
			handleGetCurrentPassiveIncome,
			handlePassiveIncomeUpdateChange,
			handlePassiveIncomeUpdateSubmit,
			passiveFormRef,

			handleExpenseSubmit,
			handleExpenseChange,
			handleExpenseDelete,
			handleGetCurrentExpense,
			handleExpenseUpdateChange,
			handleExpenseUpdateSubmit,
			expenseFormRef,

			handleSelfFirstSubmit,
			handleSelfFirstChange,
			handleSelfFirstDelete,
			handleGetCurrentPayYourselfFirst,
			handleSelfFirstUpdateChange,
			handleSelfFirstUpdateSubmit,
			selfFirstFormRef,
		} = this;

		return (
			<IncomeExpenseContext.Provider
				value={{
					totalIncome,

					totalEarnedIncome,
					newEarnedIncome,
					updatedEarnedIncome,
					earnedFormInvalid,
					earnedFormRef,

					totalPortfolioIncome,
					newPortfolioIncome,
					updatedPortfolioIncome,
					portfolioFormInvalid,
					portfolioFormRef,

					totalPassiveIncome,
					newPassiveIncome,
					updatedPassiveIncome,
					passiveFormInvalid,
					passiveFormRef,

					handleEarnedIncomeSubmit,
					handleEarnedIncomeChange,
					handleEarnedIncomeUpdateChange,
					handleEarnedIncomeUpdateSubmit,
					handleGetCurrentEarnedIncome,
					handleEarnedIncomeDelete,

					handlePortfolioIncomeSubmit,
					handlePortfolioIncomeChange,
					handlePortfolioIncomeDelete,
					handleGetCurrentPortfolioIncome,
					handlePortfolioIncomeUpdateChange,
					handlePortfolioIncomeUpdateSubmit,

					handlePassiveIncomeSubmit,
					handlePassiveIncomeChange,
					handlePassiveIncomeDelete,
					handleGetCurrentPassiveIncome,
					handlePassiveIncomeUpdateChange,
					handlePassiveIncomeUpdateSubmit,

					totalExpensesAndSelfFirst,
					totalExpenses,
					newExpense,
					updatedExpense,
					expenseFormInvalid,
					expenseFormRef,

					totalPayYourselfFirst,
					newPayYourselfFirst,
					updatedPayYourselfFirst,
					selfFirstFormInvalid,
					selfFirstFormRef,

					handleExpenseSubmit,
					handleExpenseChange,
					handleExpenseDelete,
					handleGetCurrentExpense,
					handleExpenseUpdateChange,
					handleExpenseUpdateSubmit,

					handleSelfFirstSubmit,
					handleSelfFirstChange,
					handleSelfFirstDelete,
					handleGetCurrentPayYourselfFirst,
					handleSelfFirstUpdateChange,
					handleSelfFirstUpdateSubmit,

					handleFetchData,
				}}
			>
				{this.props.children}
				{/* this.props.children = components you want to provide this data to */}
			</IncomeExpenseContext.Provider>
		);
	}
}

export default IncomeExpenseContext;
