import React, { useContext } from "react";
import "./Income.css";
import Earned from "../EarnedIncome/EarnedIncome";
import Portfolio from "../PortfolioIncome/PortfolioIncome";
import Passive from "../PassiveIncome/PassiveIncome";
import IncomeExpenseContext from "../../context/IncomeExpenseContext";
import { calculateSum, formatAmount } from "../../utils/calculations";
import DoughnutChart from "../common/DoughnutChart";
import { ListUl, PieChart } from "react-bootstrap-icons";
import { ViewContext } from "../../context/ViewContext";
import { Button, OverlayTrigger, Tooltip } from "react-bootstrap";

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

	const renderTooltip = (props) => (
		<Tooltip id="button-tooltip" {...props}>
			{chartView ? "Chart View" : "List View"}
		</Tooltip>
	);

	return (
		<div className="border">
			<div style={{ display: "flex", justifyContent: "space-between" }}>
				<span>
					<OverlayTrigger placement="top" overlay={renderTooltip}>
						<Button
							onClick={handleViewChange}
							size="sm"
							variant="outline-primary"
						>
							{chartView ? <PieChart /> : <ListUl />}
						</Button>
					</OverlayTrigger>
				</span>
				<span className="title">INCOME</span>
				<span className="title">{formatAmount(totalIncomeAmount)}</span>
			</div>

			{chartView ? (
				<DoughnutChart
					backgroundColor={[
						"rgba(237, 122, 158)",
						"rgba(14, 155, 209)",
						"rgba(172, 12, 45)",
					]}
					borderColor={[
						"rgba(237, 122, 158)",
						"rgba(14, 155, 209)",
						"rgba(172, 12, 45)",
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
