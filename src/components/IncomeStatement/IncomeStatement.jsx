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
						color: "red",
					}}
				>
					INCOME STATEMENT
				</span>
				<h6>
					<strong>CASH FLOW = INCOME - EXPENSES</strong>
				</h6>
				<h6>
					CASH FLOW: {formatAmount(totalIncomeAmount)} -{" "}
					{formatAmount(totalExpenseAmount)} ={" "}
					<span
						style={{
							color: determineColor(cashFlow),
						}}
					>
						{formatAmount(cashFlow)}
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
