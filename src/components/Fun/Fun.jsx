import React, { useContext } from "react";
import IncomeExpenseContext from "../../context/IncomeExpenseContext";
import {
	calculatePercentage,
	calculateSum,
	formatAmount,
} from "../../utils/calculations";
import FormInput from "../common/FormInput";
import EntityTable from "../common/EntityTable";

const funOptions = [
	"Shopping",
	"Services",
	"Entertainment",
	"Events",
	"Dining out",
	"Other",
];

export default function TreatYourself() {
	const {
		totalExpenses,
		totalTreatYourself,
		handleTreatYourselfSubmit,
		handleTreatYourselfChange,
		handleTreatYourselfDelete,
		handleGetCurrentTreatYourself,
		handleTreatYourselfUpdateChange,
		handleTreatYourselfUpdateSubmit,
		newTreatYourself,
		updatedTreatYourself,
		treatYourselfFormInvalid,
		treatYourselfFormRef,
	} = useContext(IncomeExpenseContext);

	const totalTreatYourselfAmount = calculateSum(totalTreatYourself);
	const totalExpenseAmount = calculateSum(totalExpenses);
	return (
		<>
			<h5 style={{ display: "flex", justifyContent: "space-between" }}>
				<span className="percentage">
					{calculatePercentage(totalExpenseAmount, totalTreatYourselfAmount)}%
				</span>
				<span>Fun</span>
				<span>{formatAmount(totalTreatYourselfAmount)}</span>
			</h5>
			<EntityTable
				totalEntity={totalTreatYourself}
				handleUpdateSubmit={handleTreatYourselfUpdateSubmit}
				updatedEntity={updatedTreatYourself}
				handleUpdateChange={handleTreatYourselfUpdateChange}
				options={funOptions}
				handleGetCurrentEntity={handleGetCurrentTreatYourself}
				handleDelete={handleTreatYourselfDelete}
			/>
			<FormInput
				formRef={treatYourselfFormRef}
				handleSubmit={handleTreatYourselfSubmit}
				handleChange={handleTreatYourselfChange}
				newEntity={newTreatYourself}
				options={funOptions}
				placeholder="Treat Yourself"
				formInvalid={treatYourselfFormInvalid}
			/>
		</>
	);
}
