import React, { useContext } from "react";
import IncomeExpenseContext from "../../context/IncomeExpenseContext";
import {
	calculatePercentage,
	calculateSum,
	formatAmount,
} from "../../utils/calculations";
import FormInput from "../common/FormInput";
import EntityTable from "../common/EntityTable";

const necessityOptions = [
	"Taxes",
	"Housing",
	"Transportation",
	"Insurance",
	"Food",
	"Children",
	"Debt Payments",
	"Entertainment",
	"Donations",
	"Other",
];

export default function Necessities() {
	const {
		totalExpenses,
		totalNecessities,
		handleNecessityDelete,
		necessityFormRef,
		handleNecessitySubmit,
		newNecessity,
		updatedNecessity,
		handleNecessityChange,
		handleGetCurrentNecessity,
		handleNecessityUpdateChange,
		handleNecessityUpdateSubmit,
		necessityFormInvalid,
	} = useContext(IncomeExpenseContext);

	const totalNecessityAmount = calculateSum(totalNecessities);
	const totalExpenseAmount = calculateSum(totalExpenses);
	return (
		<>
			<h5 style={{ display: "flex", justifyContent: "space-between" }}>
				<span className="percentage">
					{calculatePercentage(totalExpenseAmount, totalNecessityAmount)}%
				</span>
				<span>Necessities</span>
				<span>{formatAmount(totalNecessityAmount)}</span>
			</h5>
			<EntityTable
				totalEntity={totalNecessities}
				handleUpdateSubmit={handleNecessityUpdateSubmit}
				updatedEntity={updatedNecessity}
				handleUpdateChange={handleNecessityUpdateChange}
				options={necessityOptions}
				handleGetCurrentEntity={handleGetCurrentNecessity}
				handleDelete={handleNecessityDelete}
			/>
			<FormInput
				formRef={necessityFormRef}
				handleSubmit={handleNecessitySubmit}
				handleChange={handleNecessityChange}
				newEntity={newNecessity}
				options={necessityOptions}
				placeholder=""
				formInvalid={necessityFormInvalid}
			/>
		</>
	);
}
