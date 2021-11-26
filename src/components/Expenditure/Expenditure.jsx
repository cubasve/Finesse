import React, { useContext } from "react";
import PayYourselfFirst from "../PayYourselfFirst/PayYourselfFirst";
import Expenses from "../Expenses/Expenses";
import IncomeExpenseContext from "../../context/IncomeExpenseContext";
import { calculateSum, formatAmount } from "../../utils/calculations";
import DoughnutChart from "../common/DoughnutChart";
import { ListUl, PieChart } from "react-bootstrap-icons";
import { ViewContext } from "../../context/ViewContext";
import { Button, OverlayTrigger, Tooltip } from "react-bootstrap";

export default function Expenditure() {
	const { totalExpenses, totalPayYourselfFirst, totalExpenseAndPYFAmount } =
		useContext(IncomeExpenseContext);

	const { chartView, handleViewChange } = useContext(ViewContext);

	const totalPYFAmount = calculateSum(totalPayYourselfFirst);
	const totalExpenseAmount = calculateSum(totalExpenses);

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
				<span className="title">EXPENSES</span>
				<span className="title">{formatAmount(totalExpenseAndPYFAmount)}</span>
			</div>

			{chartView ? (
				<DoughnutChart
					backgroundColor={["rgb(0,128,0)", "rgb(139, 69, 19)"]}
					borderColor={["rgb(0,128,0)", "rgb(139, 69, 19)"]}
					borderWidth={1}
					data={[totalPYFAmount, totalExpenseAmount]}
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
