import React, { Component } from "react";
import financialStatementService from "../utils/financialStatementService";
const IncomeExpenseContext = React.createContext();
export const IncomeExpenseConsumer = IncomeExpenseContext.Consumer;

export class IncomeExpenseProvider extends Component {
	constructor(props) {
		super(props);
		this.state = { message: "" };
		this.month = this.props.monthYear.month;
		this.year = this.props.monthYear.year;
	}

	componentDidUpdate() {
		console.log("this.props UPDATE", this.month, this.year);
	}

	state = {
		totalIncome: [],
		totalExpenses: [],

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

		totalNecessities: [],
		newNecessity: {
			type: "Taxes",
			amount: "",
			category: "Necessity",
			month: 11,
			year: 2021,
		},
		updatedNecessity: {},
		necessityFormInvalid: true,

		totalPayYourselfFirst: [],
		newPayYourselfFirst: {
			type: "Invest",
			amount: "",
			category: "Self",
			month: 11,
			year: 2021,
		},
		updatedPayYourselfFirst: {},
		selfFirstFormInvalid: true,

		totalTreatYourself: [],
		newTreatYourself: {
			type: "Shopping",
			amount: "",
			category: "Fun",
			month: 11,
			year: 2021,
		},
		updatedTreatYourself: {},
		treatYourselfFormInvalid: true,
	};
	earnedFormRef = React.createRef();
	portfolioFormRef = React.createRef();
	passiveFormRef = React.createRef();
	necessityFormRef = React.createRef();
	selfFirstFormRef = React.createRef();
	treatYourselfFormRef = React.createRef();

	handleFetchData = async () => {
		try {
			await financialStatementService.show().then((data) => {
				const { earned, portfolio, passive, selfFirst, necessities, fun } =
					data.user;
				this.setState({
					totalEarnedIncome: earned,
					totalPortfolioIncome: portfolio,
					totalPassiveIncome: passive,

					totalNecessities: necessities,
					totalPayYourselfFirst: selfFirst,
					totalTreatYourself: fun,

					totalIncome: [...earned, ...portfolio, ...passive],
					totalExpenses: [...selfFirst, ...necessities, ...fun],
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

	handleGetCurrentNecessity = (id) => {
		const currentNecessity = this.state.totalNecessities.find(
			({ _id }) => _id === id
		);
		this.setState({ updatedNecessity: currentNecessity });
	};

	handleGetCurrentPayYourselfFirst = (id) => {
		const currentPayYourselfFirst = this.state.totalPayYourselfFirst.find(
			({ _id }) => _id === id
		);
		this.setState({ updatedPayYourselfFirst: currentPayYourselfFirst });
	};

	handleGetCurrentTreatYourself = (id) => {
		const currentTreatYourself = this.state.totalTreatYourself.find(
			({ _id }) => _id === id
		);
		this.setState({ updatedTreatYourself: currentTreatYourself });
	};

	/*---------EARNED INCOME METHODS-------- */
	handleEarnedIncomeSubmit = async (e) => {
		e.preventDefault();
		if (!this.earnedFormRef.current.checkValidity()) return;
		try {
			const { type, amount, category, month, year } =
				this.state.newEarnedIncome;
			await financialStatementService
				.create({
					type,
					amount,
					category,
					month,
					year,
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
		e.preventDefault();
		try {
			const { type, amount, category, _id } = this.state.updatedEarnedIncome;
			await financialStatementService
				.update({
					id: _id,
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
			const { type, amount, category, month, year } =
				this.state.newPortfolioIncome;
			await financialStatementService
				.create({
					type,
					amount,
					category,
					month,
					year,
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
		e.preventDefault();
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
			const { type, amount, category, month, year } =
				this.state.newPassiveIncome;
			await financialStatementService
				.create({
					type,
					amount,
					category,
					month,
					year,
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
		e.preventDefault();
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

	/*---------NECESSITY METHODS-------- */
	handleNecessitySubmit = async (e) => {
		e.preventDefault();
		if (!this.necessityFormRef.current.checkValidity()) return;
		try {
			const { type, amount, category, month, year } = this.state.newNecessity;
			await financialStatementService
				.create({
					type,
					amount,
					category,
					month,
					year,
				})
				.then((data) => {
					const { necessities, selfFirst, fun } = data.user;
					this.setState({
						totalNecessities: necessities,
						totalExpenses: [...selfFirst, ...necessities, ...fun],
						newNecessity: {
							type: "Taxes",
							amount: "",
							category: "Necessity",
							month: 11,
							year: 2021,
						},
						necessityFormInvalid: true,
					});
				});
		} catch (err) {
			console.error(err);
		}
	};

	handleNecessityChange = (e) => {
		const newNecessity = {
			...this.state.newNecessity,
			[e.target.name]: e.target.value,
		};
		this.setState({
			newNecessity: newNecessity,
			necessityFormInvalid: !this.necessityFormRef.current.checkValidity(),
		});
	};

	handleNecessityUpdateChange = (e) => {
		const updatedNecessity = {
			...this.state.updatedNecessity,
			[e.target.name]: e.target.value,
		};
		this.setState({
			updatedNecessity: updatedNecessity,
		});
	};

	handleNecessityDelete = async (e) => {
		const entity = this.state.totalNecessities.find(
			({ _id }) => _id === e.target.value
		);
		try {
			await financialStatementService
				.deleteOne({ id: entity._id, category: entity.category })
				.then((data) => {
					const { necessities, selfFirst, fun } = data.user;
					this.setState({
						totalNecessities: necessities,
						totalExpenses: [...selfFirst, ...necessities, ...fun],
					});
				});
		} catch (err) {
			console.error(err);
		}
	};

	handleNecessityUpdateSubmit = async (e) => {
		e.preventDefault();
		try {
			const { type, amount, category } = this.state.updatedNecessity;
			await financialStatementService
				.update({
					id: e.target.value,
					type,
					amount,
					category,
				})
				.then((data) => {
					const { necessities, selfFirst, fun } = data.user;
					this.setState({
						totalNecessities: necessities,
						totalExpenses: [...necessities, ...selfFirst, ...fun],
						updatedNecessity: {},
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
			const { type, amount, category, month, year } =
				this.state.newPayYourselfFirst;
			await financialStatementService
				.create({
					type,
					amount,
					category,
					month,
					year,
				})
				.then((data) => {
					const { selfFirst, necessities, fun } = data.user;
					this.setState({
						totalPayYourselfFirst: selfFirst,
						totalExpenses: [...selfFirst, ...necessities, ...fun],
						newPayYourselfFirst: {
							type: "Invest",
							amount: "",
							category: "Self",
							month: 11,
							year: 2021,
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
		const entity = this.state.totalPayYourselfFirst.find(
			({ _id }) => _id === e.target.value
		);
		try {
			await financialStatementService
				.deleteOne({ id: entity._id, category: entity.category })
				.then((data) => {
					const { selfFirst, necessities, fun } = data.user;
					this.setState({
						totalPayYourselfFirst: selfFirst,
						totalExpenses: [...selfFirst, ...necessities, ...fun],
					});
				});
		} catch (err) {
			console.error(err);
		}
	};

	handleSelfFirstUpdateSubmit = async (e) => {
		e.preventDefault();
		try {
			const { type, amount, category } = this.state.updatedPayYourselfFirst;
			await financialStatementService
				.update({
					id: e.target.value,
					type,
					amount,
					category,
				})
				.then((data) => {
					const { selfFirst, necessities, fun } = data.user;
					this.setState({
						totalPayYourselfFirst: selfFirst,
						totalExpenses: [...selfFirst, ...necessities, ...fun],
						updatedPayYourselfFirst: {},
					});
				});
		} catch (err) {
			console.error(err);
		}
	};

	/*---------TREAT YOURSELF METHODS-------- */
	handleTreatYourselfSubmit = async (e) => {
		e.preventDefault();
		if (!this.treatYourselfFormRef.current.checkValidity()) return;
		try {
			const { type, amount, category, month, year } =
				this.state.newTreatYourself;
			await financialStatementService
				.create({
					type,
					amount,
					category,
					month,
					year,
				})
				.then((data) => {
					const { selfFirst, necessities, fun } = data.user;
					this.setState({
						totalTreatYourself: fun,
						totalExpenses: [...selfFirst, ...necessities, ...fun],
						newTreatYourself: {
							type: "Shopping",
							amount: "",
							category: "Fun",
							month: 11,
							year: 2021,
						},
						treatYourselfFormInvalid: true,
					});
				});
		} catch (err) {
			console.error(err);
		}
	};

	handleTreatYourselfChange = (e) => {
		const newTreatYourself = {
			...this.state.newTreatYourself,
			[e.target.name]: e.target.value,
		};
		this.setState({
			newTreatYourself,
			treatYourselfFormInvalid:
				!this.treatYourselfFormRef.current.checkValidity(),
		});
	};

	handleTreatYourselfUpdateChange = (e) => {
		const updatedTreatYourself = {
			...this.state.updatedTreatYourself,
			[e.target.name]: e.target.value,
		};
		this.setState({
			updatedTreatYourself,
		});
	};

	handleTreatYourselfDelete = async (e) => {
		const entity = this.state.totalTreatYourself.find(
			({ _id }) => _id === e.target.value
		);
		try {
			await financialStatementService
				.deleteOne({ id: entity._id, category: entity.category })
				.then((data) => {
					const { necessities, selfFirst, fun } = data.user;
					this.setState({
						totalTreatYourself: fun,
						totalExpenses: [...selfFirst, ...necessities, ...fun],
					});
				});
		} catch (err) {
			console.error(err);
		}
	};

	handleTreatYourselfUpdateSubmit = async (e) => {
		e.preventDefault();
		try {
			const { type, amount, category } = this.state.updatedTreatYourself;
			await financialStatementService
				.update({
					id: e.target.value,
					type,
					amount,
					category,
				})
				.then((data) => {
					const { necessities, selfFirst, fun } = data.user;
					this.setState({
						totalTreatYourself: fun,
						totalExpenses: [...necessities, ...selfFirst, ...fun],
						updatedTreatYourself: {},
					});
				});
		} catch (err) {
			console.error(err);
		}
	};

	/*---------RENDER-------- */
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

			totalExpenses,

			totalNecessities,
			newNecessity,
			updatedNecessity,
			necessityFormInvalid,

			totalPayYourselfFirst,
			newPayYourselfFirst,
			updatedPayYourselfFirst,
			selfFirstFormInvalid,

			totalTreatYourself,
			newTreatYourself,
			updatedTreatYourself,
			treatYourselfFormInvalid,
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

			handleNecessitySubmit,
			handleNecessityChange,
			handleNecessityDelete,
			handleGetCurrentNecessity,
			handleNecessityUpdateChange,
			handleNecessityUpdateSubmit,
			necessityFormRef,

			handleSelfFirstSubmit,
			handleSelfFirstChange,
			handleSelfFirstDelete,
			handleGetCurrentPayYourselfFirst,
			handleSelfFirstUpdateChange,
			handleSelfFirstUpdateSubmit,
			selfFirstFormRef,

			handleTreatYourselfSubmit,
			handleTreatYourselfChange,
			handleTreatYourselfDelete,
			handleGetCurrentTreatYourself,
			handleTreatYourselfUpdateChange,
			handleTreatYourselfUpdateSubmit,
			treatYourselfFormRef,
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

					totalExpenses,
					totalNecessities,
					newNecessity,
					updatedNecessity,
					necessityFormInvalid,
					necessityFormRef,

					totalPayYourselfFirst,
					newPayYourselfFirst,
					updatedPayYourselfFirst,
					selfFirstFormInvalid,
					selfFirstFormRef,

					totalTreatYourself,
					newTreatYourself,
					updatedTreatYourself,
					treatYourselfFormInvalid,
					treatYourselfFormRef,

					handleNecessitySubmit,
					handleNecessityChange,
					handleNecessityDelete,
					handleGetCurrentNecessity,
					handleNecessityUpdateChange,
					handleNecessityUpdateSubmit,

					handleSelfFirstSubmit,
					handleSelfFirstChange,
					handleSelfFirstDelete,
					handleGetCurrentPayYourselfFirst,
					handleSelfFirstUpdateChange,
					handleSelfFirstUpdateSubmit,

					handleTreatYourselfSubmit,
					handleTreatYourselfChange,
					handleTreatYourselfDelete,
					handleGetCurrentTreatYourself,
					handleTreatYourselfUpdateChange,
					handleTreatYourselfUpdateSubmit,

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
