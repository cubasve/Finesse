import React, { Component } from "react";
import financialStatementService from "../utils/financialStatementService";

const IncomeContext = React.createContext();
export const IncomeConsumer = IncomeContext.Consumer;

export class IncomeProvider extends Component {
	state = {
		totalIncome: [],

		totalEarnedIncome: [],
		newEarnedIncome: {
			type: "Job",
			amount: "",
			category: "Earned",
			class: "Income",
		},
		earnedFormInvalid: true,

		totalPortfolioIncome: [],
		newPortfolioIncome: {
			type: "Stock",
			amount: "",
			category: "Portfolio",
			class: "Income",
		},
		portfolioFormInvalid: true,

		totalPassiveIncome: [],
		newPassiveIncome: {
			type: "Real Estate",
			amount: "",
			category: "Passive",
			class: "Income",
		},
		passiveFormInvalid: true,
	};
	earnedFormRef = React.createRef();
	portfolioFormRef = React.createRef();
	passiveFormRef = React.createRef();

	//Earned Income Methods
	handleEarnedIncomeSubmit = async (e) => {
		e.preventDefault();
		if (!this.earnedFormRef.current.checkValidity()) return;
		try {
			await financialStatementService
				.create({
					type: this.state.newEarnedIncome.type,
					amount: this.state.newEarnedIncome.amount,
					category: this.state.newEarnedIncome.category,
					class: this.state.newEarnedIncome.class,
				})
				.then((data) => {
					this.setState({
						totalEarnedIncome: data.user.userFinances.filter(
							(elem) => elem.category === "Earned"
						),
						totalIncome: data.user.userFinances.filter(
							(elem) =>
								elem.category === "Earned" ||
								elem.category === "Portfolio" ||
								elem.category === "Passive"
						),
						newEarnedIncome: {
							type: "Job",
							amount: "",
							category: "Earned",
							class: "Income",
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

	handleEarnedIncomeDelete = async (e) => {
		try {
			await financialStatementService
				.deleteOne({ id: e.target.value })
				.then((data) => {
					this.setState({
						totalEarnedIncome: data.user.userFinances.filter(
							(elem) => elem.category === "Earned"
						),
						totalIncome: data.user.userFinances.filter(
							(elem) =>
								elem.category === "Earned" ||
								elem.category === "Portfolio" ||
								elem.category === "Passive"
						),
					});
				});
		} catch (err) {
			console.error(err);
		}
	};

	//Portfolio Income Methods
	handlePortfolioIncomeSubmit = async (e) => {
		e.preventDefault();
		if (!this.portfolioFormRef.current.checkValidity()) return;
		try {
			await financialStatementService
				.create({
					type: this.state.newPortfolioIncome.type,
					amount: this.state.newPortfolioIncome.amount,
					category: this.state.newPortfolioIncome.category,
					class: this.state.newPortfolioIncome.class,
				})
				.then((data) => {
					this.setState({
						totalPortfolioIncome: data.user.userFinances.filter(
							(elem) => elem.category === "Portfolio"
						),
						totalIncome: data.user.userFinances.filter(
							(elem) =>
								elem.category === "Earned" ||
								elem.category === "Portfolio" ||
								elem.category === "Passive"
						),
						newPortfolioIncome: {
							type: "Stock",
							amount: "",
							category: "Portfolio",
							class: "Income",
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

	handlePortfolioIncomeDelete = async (e) => {
		try {
			await financialStatementService
				.deleteOne({ id: e.target.value })
				.then((data) => {
					this.setState({
						totalPortfolioIncome: data.user.userFinances.filter(
							(elem) => elem.category === "Portfolio"
						),
						totalIncome: data.user.userFinances.filter(
							(elem) =>
								elem.category === "Earned" ||
								elem.category === "Portfolio" ||
								elem.category === "Passive"
						),
					});
				});
		} catch (err) {
			console.error(err);
		}
	};

	//Passive Income Methods
	handlePassiveIncomeSubmit = async (e) => {
		e.preventDefault();
		if (!this.passiveFormRef.current.checkValidity()) return;
		try {
			await financialStatementService
				.create({
					type: this.state.newPassiveIncome.type,
					amount: this.state.newPassiveIncome.amount,
					category: this.state.newPassiveIncome.category,
					class: this.state.newPassiveIncome.class,
				})
				.then((data) => {
					this.setState({
						totalPassiveIncome: data.user.userFinances.filter(
							(elem) => elem.category === "Passive"
						),
						totalIncome: data.user.userFinances.filter(
							(elem) =>
								elem.category === "Earned" ||
								elem.category === "Portfolio" ||
								elem.category === "Passive"
						),
						newPassiveIncome: {
							type: "Real Estate",
							amount: "",
							category: "Passive",
							class: "Income",
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

	handlePassiveIncomeDelete = async (e) => {
		try {
			await financialStatementService
				.deleteOne({ id: e.target.value })
				.then((data) => {
					this.setState({
						totalPassiveIncome: data.user.userFinances.filter(
							(elem) => elem.category === "Passive"
						),
						totalIncome: data.user.userFinances.filter(
							(elem) =>
								elem.category === "Earned" ||
								elem.category === "Portfolio" ||
								elem.category === "Passive"
						),
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
			earnedFormInvalid,
			totalPortfolioIncome,
			newPortfolioIncome,
			portfolioFormInvalid,
			totalPassiveIncome,
			newPassiveIncome,
			passiveFormInvalid,
		} = this.state;

		const {
			handleEarnedIncomeSubmit,
			handleEarnedIncomeChange,
			handleEarnedIncomeDelete,
			earnedFormRef,
			handlePortfolioIncomeSubmit,
			handlePortfolioIncomeChange,
			handlePortfolioIncomeDelete,
			portfolioFormRef,
			handlePassiveIncomeSubmit,
			handlePassiveIncomeChange,
			handlePassiveIncomeDelete,
			passiveFormRef,
		} = this;
		return (
			<IncomeContext.Provider
				value={{
					totalIncome,
					totalEarnedIncome,
					newEarnedIncome,
					earnedFormInvalid,
					earnedFormRef,
					totalPortfolioIncome,
					newPortfolioIncome,
					portfolioFormInvalid,
					portfolioFormRef,
					totalPassiveIncome,
					newPassiveIncome,
					passiveFormInvalid,
					passiveFormRef,
					handleEarnedIncomeSubmit,
					handleEarnedIncomeChange,
					handleEarnedIncomeDelete,
					handlePortfolioIncomeSubmit,
					handlePortfolioIncomeChange,
					handlePortfolioIncomeDelete,
					handlePassiveIncomeSubmit,
					handlePassiveIncomeChange,
					handlePassiveIncomeDelete,
				}}
			>
				{this.props.children}
				{/* this.props.children = components you want to provide this data to */}
			</IncomeContext.Provider>
		);
	}
}

export default IncomeContext;
