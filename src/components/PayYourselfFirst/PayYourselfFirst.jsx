import React, { useContext } from "react";
import { Popover, OverlayTrigger } from "react-bootstrap";
import IncomeExpenseContext from "../../context/IncomeExpenseContext";
import {
	calculatePercentage,
	calculateSum,
	formatAmount,
} from "../../utils/calculations";
import { InfoCircle } from "react-bootstrap-icons";
import FormInput from "../common/FormInput";
import EntityTable from "../common/EntityTable";

const selfFirstOptions = ["Invest", "Save"];

const popover = (
	<Popover id="popover-basic">
		<Popover.Title as="h3">Pay Yourself First</Popover.Title>
		<Popover.Body>
			The government gets paid via taxes. Banks get paid via debt, mortgage, and
			investment fees. All the bills get paid. Everyone gets paid, but you.
			Prioritize your financial future by deducting a percentage of your income
			FIRST before you pay for other expenses (Tip: Automate it!)
		</Popover.Body>
	</Popover>
);

const PayYourselfPopover = () => (
	<OverlayTrigger trigger="click" placement="top" overlay={popover}>
		<InfoCircle color="black" style={{ cursor: "pointer" }} />
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
			<h5
				style={{
					alignItems: "center",
					display: "flex",
					justifyContent: "space-between",
				}}
			>
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
