import React, { Component } from "react";
import Income from "../../components/Income/Income";
import Expenses from "../../components/Expenses/Expenses";
import IncomeExpenseContext from "../../context/IncomeExpenseContext";
import {
	calculateDifference,
	determineColor,
	calculateSum,
	formatAmount,
} from "../../utils/calculations";
import { Spinner } from "react-bootstrap";

export default class IncomeStatement extends Component {
	state = {
		loading: false,
	};

	async componentDidMount() {
		const { handleFetchData } = this.context;
		this.setState({ loading: true });
		handleFetchData();
		this.setState({ loading: false });
	}

	async componentDidUpdate(prevProps, prevState) {
		const monthYear = sessionStorage.getItem("monthYear");
		this.month = JSON.parse(monthYear)?.month ?? new Date().getMonth() + 1;
		this.year = JSON.parse(monthYear)?.year ?? new Date().getFullYear();

		if (prevProps.month !== this.month || prevProps.year !== this.year) {
			console.log("pokemons state has changed.");
			const { handleFetchData } = this.context;
			this.setState({ loading: true });
			await handleFetchData();
			this.setState({ loading: false });
		}
	}

	render() {
		const { totalIncome, totalExpenses } = this.context;

		const totalIncomeAmount = calculateSum(totalIncome);
		const totalExpenseAmount = calculateSum(totalExpenses);
		const cashFlow = calculateDifference(totalIncomeAmount, totalExpenseAmount);

		return (
			<>
				<span
					style={{
						fontSize: "24px",
						fontWeight: 500,
						color: "maroon",
					}}
				>
					INCOME STATEMENT
				</span>
				<h6>
					<strong>CASH FLOW = INCOME - EXPENSES</strong>
				</h6>
				<h6>
					CASH FLOW:{" "}
					<span
						style={{
							color: determineColor(cashFlow),
						}}
					>
						{formatAmount(totalIncomeAmount)} -{" "}
						{formatAmount(totalExpenseAmount)} = {formatAmount(cashFlow)}
					</span>
				</h6>
				{this.state.loading ? (
					<Spinner animation="border" size="lg" />
				) : (
					<>
						<Income />
						<Expenses />
					</>
				)}
			</>
		);
	}
}
IncomeStatement.contextType = IncomeExpenseContext;
