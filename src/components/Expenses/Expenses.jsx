import React, { useContext } from "react";
import IncomeExpenseContext from "../../context/IncomeExpenseContext";
import {
	calculatePercentage,
	calculateSum,
	formatAmount,
} from "../../utils/calculations";
import FormInput from "../common/FormInput";
import EntityTable from "../common/EntityTable";

const expenseOptions = [
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

export default function Expenses() {
	const {
		totalExpensesAndSelfFirst,
		totalExpenses,
		handleExpenseDelete,
		expenseFormRef,
		handleExpenseSubmit,
		newExpense,
		updatedExpense,
		handleExpenseChange,
		handleGetCurrentExpense,
		handleExpenseUpdateChange,
		handleExpenseUpdateSubmit,
		expenseFormInvalid,
	} = useContext(IncomeExpenseContext);

	const totalExpenseAmount = calculateSum(totalExpenses);
	const totalExpensesAndPYFAmount = calculateSum(totalExpensesAndSelfFirst);

	return (
		<>
			<h5 style={{ display: "flex", justifyContent: "space-between" }}>
				<span className="percentage">
					{calculatePercentage(totalExpensesAndPYFAmount, totalExpenseAmount)}%
				</span>
				<span>Other Expenses</span>
				<span>{formatAmount(totalExpenseAmount)}</span>
			</h5>
			<EntityTable
				totalEntity={totalExpenses}
				handleUpdateSubmit={handleExpenseUpdateSubmit}
				updatedEntity={updatedExpense}
				handleUpdateChange={handleExpenseUpdateChange}
				options={expenseOptions}
				handleGetCurrentEntity={handleGetCurrentExpense}
				handleDelete={handleExpenseDelete}
			/>
			<FormInput
				formRef={expenseFormRef}
				handleSubmit={handleExpenseSubmit}
				handleChange={handleExpenseChange}
				newEntity={newExpense}
				options={expenseOptions}
				placeholder=""
				formInvalid={expenseFormInvalid}
			/>
		</>
	);
}
