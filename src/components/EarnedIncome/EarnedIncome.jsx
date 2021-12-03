import React, { useContext } from "react";
import IncomeExpenseContext from "../../context/IncomeExpenseContext";
import {
	calculatePercentage,
	calculateSum,
	formatAmount,
} from "../../utils/calculations";
import FormInput from "../common/FormInput";
import EntityTable from "../common/EntityTable";
import { Badge } from "react-bootstrap";

const earnedIncomeOptions = ["Job", "Self-Employment", "Other"];

export default function EarnedIncome() {
	const {
		totalIncome,
		totalEarnedIncome,
		newEarnedIncome,
		updatedEarnedIncome,
		earnedFormInvalid,
		handleEarnedIncomeSubmit,
		handleEarnedIncomeChange,
		handleEarnedIncomeUpdateChange,
		handleGetCurrentEarnedIncome,
		handleEarnedIncomeDelete,
		handleEarnedIncomeUpdateSubmit,
		earnedFormRef,
	} = useContext(IncomeExpenseContext);

	const totalIncomeAmount = calculateSum(totalIncome);
	const totalEarnedIncomeAmount = calculateSum(totalEarnedIncome);

	return (
		<>
			<h5 style={{ display: "flex", justifyContent: "space-between" }}>
				<span className="percentage">
					{calculatePercentage(totalIncomeAmount, totalEarnedIncomeAmount)}%
				</span>
				<span>
					Earned
					<Badge
						pill
						bg="primary"
						style={{
							fontSize: 12,
							position: "absolute",
							backgroundColor: "yellow",
						}}
					>
						{calculatePercentage(totalIncomeAmount, totalEarnedIncomeAmount)}%
					</Badge>
				</span>
				<span>{formatAmount(totalEarnedIncomeAmount)}</span>
			</h5>
			<EntityTable
				totalEntity={totalEarnedIncome}
				handleUpdateSubmit={handleEarnedIncomeUpdateSubmit}
				updatedEntity={updatedEarnedIncome}
				handleUpdateChange={handleEarnedIncomeUpdateChange}
				options={earnedIncomeOptions}
				handleGetCurrentEntity={handleGetCurrentEarnedIncome}
				handleDelete={handleEarnedIncomeDelete}
			/>
			<FormInput
				formRef={earnedFormRef}
				handleSubmit={handleEarnedIncomeSubmit}
				handleChange={handleEarnedIncomeChange}
				newEntity={newEarnedIncome}
				options={earnedIncomeOptions}
				placeholder="Salary/Commission"
				formInvalid={earnedFormInvalid}
			/>
		</>
	);
}
