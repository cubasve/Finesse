import React, { useContext } from "react";
import IncomeExpenseContext from "../../context/IncomeExpenseContext";
import {
	calculatePercentage,
	calculateSum,
	formatAmount,
} from "../../utils/calculations";
import FormInput from "../common/FormInput";
import EntityTable from "../common/EntityTable";

const passiveIncomeOptions = [
	"Real Estate",
	"Business",
	"Commodities",
	"Royalties",
	"Other",
];

export default function PassiveIncome() {
	const {
		totalIncome,
		totalPassiveIncome,
		newPassiveIncome,
		updatedPassiveIncome,
		passiveFormInvalid,
		passiveFormRef,
		handlePassiveIncomeSubmit,
		handlePassiveIncomeChange,
		handlePassiveIncomeDelete,
		handleGetCurrentPassiveIncome,
		handlePassiveIncomeUpdateChange,
		handlePassiveIncomeUpdateSubmit,
	} = useContext(IncomeExpenseContext);

	const totalIncomeAmount = calculateSum(totalIncome);
	const totalPassiveIncomeAmount = calculateSum(totalPassiveIncome);

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
					{calculatePercentage(totalIncomeAmount, totalPassiveIncomeAmount)}%
				</span>
				<span>Passive</span>
				<span>{formatAmount(totalPassiveIncomeAmount)}</span>
			</h5>
			<EntityTable
				totalEntity={totalPassiveIncome}
				handleUpdateSubmit={handlePassiveIncomeUpdateSubmit}
				updatedEntity={updatedPassiveIncome}
				handleUpdateChange={handlePassiveIncomeUpdateChange}
				options={passiveIncomeOptions}
				handleGetCurrentEntity={handleGetCurrentPassiveIncome}
				handleDelete={handlePassiveIncomeDelete}
			/>
			<FormInput
				formRef={passiveFormRef}
				handleSubmit={handlePassiveIncomeSubmit}
				handleChange={handlePassiveIncomeChange}
				newEntity={newPassiveIncome}
				options={passiveIncomeOptions}
				placeholder=""
				formInvalid={passiveFormInvalid}
			/>
		</>
	);
}
