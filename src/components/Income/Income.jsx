import React, { useContext } from "react";
import "./Income.css";
import Earned from "../EarnedIncome/EarnedIncome";
import Portfolio from "../PortfolioIncome/PortfolioIncome";
import Passive from "../PassiveIncome/PassiveIncome";
import IncomeExpenseContext from "../../context/IncomeExpenseContext";
import { calculateSum, formatAmount } from "../../utils/calculations";
import DoughnutChart from "../common/DoughnutChart";
import { ListUl, PieChart } from "react-bootstrap-icons";
import { Button } from "react-bootstrap";
import { ViewContext } from "../../context/ViewContext";

export default function Income() {
	const {
		totalEarnedIncome,
		totalIncome,
		totalPortfolioIncome,
		totalPassiveIncome,
	} = useContext(IncomeExpenseContext);

	const { chartView, handleViewChange } = useContext(ViewContext);

	const totalIncomeAmount = calculateSum(totalIncome);
	const totalEarnedIncomeAmount = calculateSum(totalEarnedIncome);
	const totalPortfolioIncomeAmount = calculateSum(totalPortfolioIncome);
	const totalPassiveIncomeAmount = calculateSum(totalPassiveIncome);

	return (
		<div className="border">
			<span className="title">
				<span className="left">
					<Button onClick={handleViewChange} size="sm" variant="outline-dark">
						{chartView ? <PieChart /> : <ListUl />}
					</Button>
				</span>
				<span>INCOME</span>
				<span className="right">{formatAmount(totalIncomeAmount)}</span>
			</span>
			{chartView ? (
				<DoughnutChart
					backgroundColor={[
						"rgba(255, 99, 132, 0.2)",
						"rgba(54, 162, 235, 0.2)",
						"rgba(255, 206, 86, 0.2)",
					]}
					borderColor={[
						"rgba(255, 99, 132, 1)",
						"rgba(54, 162, 235, 1)",
						"rgba(255, 206, 86, 1)",
					]}
					borderWidth={1}
					data={[
						totalEarnedIncomeAmount,
						totalPortfolioIncomeAmount,
						totalPassiveIncomeAmount,
					]}
					labels={["Earned Income", "Portfolio Income", "Passive Income"]}
					title="Income Types"
				/>
			) : (
				<>
					<Earned />
					<Portfolio />
					<Passive />
				</>
			)}
		</div>
	);
}
