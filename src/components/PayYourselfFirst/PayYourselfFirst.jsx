import React, { useContext } from "react";
import { Popover, OverlayTrigger, Button } from "react-bootstrap";
import IncomeExpenseContext from "../../context/IncomeExpenseContext";
import {
	calculatePercentage,
	calculateSum,
	formatAmount,
} from "../../utils/calculations";
import { InfoLg } from "react-bootstrap-icons";
import FormInput from "../common/FormInput";
import EntityTable from "../common/EntityTable";

const selfFirstOptions = ["Invest", "Save"];

const popover = (
	<Popover id="popover-basic">
		<Popover.Title as="h3">Pay Yourself First</Popover.Title>
		<Popover.Content>
			Prioritize your financial future by deducting a percentage of your
			paycheque FIRST before you pay for other expenses. As your income
			increases, this percentage should increase accordingly.
		</Popover.Content>
	</Popover>
);

const PayYourselfPopover = () => (
	<OverlayTrigger trigger="click" placement="top" overlay={popover}>
		<Button variant="info" size="sm" style={{ borderRadius: 50 }}>
			<InfoLg />
		</Button>
	</OverlayTrigger>
);

export default function PayYourselfFirst() {
	const {
		totalExpenses,
		totalPayYourselfFirst,
		handleSelfFirstDelete,
		selfFirstFormRef,
		handleSelfFirstSubmit,
		newPayYourselfFirst,
		updatedPayYourselfFirst,
		handleSelfFirstChange,
		handleGetCurrentPayYourselfFirst,
		handleSelfFirstUpdateChange,
		handleSelfFirstUpdateSubmit,
		selfFirstFormInvalid,
	} = useContext(IncomeExpenseContext);

	const totalSelfFirstAmount = calculateSum(totalPayYourselfFirst);
	const totalExpensesAndPYFAmount = calculateSum(totalExpenses);

	return (
		<>
			<h5 style={{ display: "flex", justifyContent: "space-between" }}>
				<span className="percentage">
					{calculatePercentage(totalExpensesAndPYFAmount, totalSelfFirstAmount)}
					%
				</span>
				<span>
					Pay Yourself First <PayYourselfPopover />
				</span>

				<span>{formatAmount(totalSelfFirstAmount)}</span>
			</h5>
			<EntityTable
				totalEntity={totalPayYourselfFirst}
				handleUpdateSubmit={handleSelfFirstUpdateSubmit}
				updatedEntity={updatedPayYourselfFirst}
				handleUpdateChange={handleSelfFirstUpdateChange}
				options={selfFirstOptions}
				handleGetCurrentEntity={handleGetCurrentPayYourselfFirst}
				handleDelete={handleSelfFirstDelete}
			/>
			<FormInput
				formRef={selfFirstFormRef}
				handleSubmit={handleSelfFirstSubmit}
				handleChange={handleSelfFirstChange}
				newEntity={newPayYourselfFirst}
				options={selfFirstOptions}
				placeholder="Save/ Invest/ Tithe"
				formInvalid={selfFirstFormInvalid}
			/>
		</>
	);
}
