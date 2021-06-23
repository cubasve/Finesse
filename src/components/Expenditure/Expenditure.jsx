import React, { useContext } from "react";
import PayYourselfFirst from "../PayYourselfFirst/PayYourselfFirst";
import Expenses from "../Expenses/Expenses";
import IncomeExpenseContext from "../../context/IncomeExpenseContext";

function calculateTotalExpensesAndSelfFirst(totalExpensesAndSelfFirstNumber) {
	if (!totalExpensesAndSelfFirstNumber) return 0;
	if (Number.isInteger(totalExpensesAndSelfFirstNumber))
		return totalExpensesAndSelfFirstNumber;
	return totalExpensesAndSelfFirstNumber.toFixed(2);
}

export default function Expenditure() {
	const { totalExpensesAndSelfFirst } = useContext(IncomeExpenseContext);

	const totalExpensesAndSelfFirstNumber = totalExpensesAndSelfFirst
		.map((elem) => elem.amount)
		.reduce((acc, num) => acc + num, 0);

	return (
		<div className="border">
			<span className="title">
				<span>EXPENSES</span>
				<span className="right">
					${calculateTotalExpensesAndSelfFirst(totalExpensesAndSelfFirstNumber)}
				</span>
			</span>

			<PayYourselfFirst />
			<Expenses />
		</div>
	);
}
