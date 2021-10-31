import React, { useContext } from "react";
import { Doughnut } from "react-chartjs-2";
import IncomeExpenseContext from "../../context/IncomeExpenseContext";
import { calculateSum } from "../../utils/calculations";

export default function DoughnutChart() {
	const { totalEarnedIncome, totalPortfolioIncome, totalPassiveIncome } =
		useContext(IncomeExpenseContext);

	const totalEarnedIncomeAmount = calculateSum(totalEarnedIncome);
	const totalPortfolioIncomeAmount = calculateSum(totalPortfolioIncome);
	const totalPassiveIncomeAmount = calculateSum(totalPassiveIncome);

	const doughnutData = {
		labels: ["Earned Income", "Portfolio Income", "Passive Income"],
		datasets: [
			{
				label: "Income Types",
				data: [
					totalEarnedIncomeAmount,
					totalPortfolioIncomeAmount,
					totalPassiveIncomeAmount,
				],
				backgroundColor: [
					"rgba(255, 99, 132, 0.2)",
					"rgba(54, 162, 235, 0.2)",
					"rgba(255, 206, 86, 0.2)",
				],
				borderColor: [
					"rgba(255, 99, 132, 1)",
					"rgba(54, 162, 235, 1)",
					"rgba(255, 206, 86, 1)",
				],
				borderWidth: 1,
			},
		],
	};
	return <Doughnut data={doughnutData} />;
}
