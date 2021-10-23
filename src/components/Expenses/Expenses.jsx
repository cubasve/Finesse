import React, { useContext } from "react";
import { Table, Button } from "react-bootstrap";
import IncomeExpenseContext from "../../context/IncomeExpenseContext";
import calculatePercentage from "../../utils/calculations";
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

function calculateTotalExpenseIncome(totalExpenseNumber) {
	if (!totalExpenseNumber) return 0;
	if (Number.isInteger(totalExpenseNumber)) return totalExpenseNumber;
	return totalExpenseNumber.toFixed(2);
}

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

	const totalExpenseNumber = totalExpenses
		.map((elem) => elem.amount)
		.reduce((acc, num) => acc + num, 0);

	const totalExpensesAndSelfFirstNumber = totalExpensesAndSelfFirst
		.map((elem) => elem.amount)
		.reduce((acc, num) => acc + num, 0);

	return (
		<>
			<h5>
				<span className="left percentage">
					{calculatePercentage(
						totalExpensesAndSelfFirstNumber,
						totalExpenseNumber
					)}
					%
				</span>
				<span>Other Expenses</span>
				<span className="right">
					${calculateTotalExpenseIncome(totalExpenseNumber)}
				</span>
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
