import React, { useContext } from "react";
import { Table, Button } from "react-bootstrap";
import IncomeExpenseContext from "../../context/IncomeExpenseContext";
import {
	calculatePercentage,
	calculateSum,
	formatAmount,
} from "../../utils/calculations";
import FormInput from "../common/FormInput";

const expenseOptions = [
	"Taxes",
	"Housing",
	"Transportation",
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
		handleExpenseChange,
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

			{totalExpenses.map((ex) => (
				<div key={ex.amount}>
					<Table borderless hover size="sm">
						<tbody>
							<tr>
								<td className="left">
									<Button
										name={ex.amount}
										value={ex._id}
										onClick={handleExpenseDelete}
										variant="danger"
										size="sm"
										className="delete"
									>
										X
									</Button>
									{ex.type}
								</td>
								<td className="right">{ex.amount}</td>
							</tr>
						</tbody>
					</Table>
				</div>
			))}
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
