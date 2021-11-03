import React, { useContext } from "react";
import PayYourselfFirst from "../PayYourselfFirst/PayYourselfFirst";
import Expenses from "../Expenses/Expenses";
import IncomeExpenseContext from "../../context/IncomeExpenseContext";
import { calculateSum, formatAmount } from "../../utils/calculations";
import DoughnutChart from "../common/DoughnutChart";
import { ListUl, PieChart } from "react-bootstrap-icons";
import { ViewContext } from "../../context/ViewContext";
import { Button } from "react-bootstrap";

export default function Expenditure() {
	const { totalExpenses, totalExpensesAndSelfFirst } =
		useContext(IncomeExpenseContext);

	const { chartView, handleViewChange } = useContext(ViewContext);

	const totalExpenseAndPYFAmount = calculateSum(totalExpensesAndSelfFirst);
	const totalExpenseAmount = calculateSum(totalExpenses);
	return (
		<div className="border">
			<div style={{ display: "flex", justifyContent: "space-between" }}>
				<span>
					<Button
						onClick={handleViewChange}
						size="sm"
						variant="outline-success"
					>
						{chartView ? <PieChart /> : <ListUl />}
					</Button>
				</span>
				<span className="title">EXPENSES</span>
				<span className="title">{formatAmount(totalExpenseAndPYFAmount)}</span>
			</div>

			{chartView ? (
				<DoughnutChart
					backgroundColor={[
						"rgba(255, 206, 86, 0.2)",
						"rgba(75, 192, 192, 0.2)",
					]}
					borderColor={["rgba(255, 206, 86, 1)", "rgba(75, 192, 192, 1)"]}
					borderWidth={1}
					data={[totalExpenseAndPYFAmount, totalExpenseAmount]}
					labels={["Self First", "Expenses"]}
					title="Expense Types"
				/>
			) : (
				<>
					<PayYourselfFirst />
					<Expenses />
				</>
			)}
		</div>
	);
}
