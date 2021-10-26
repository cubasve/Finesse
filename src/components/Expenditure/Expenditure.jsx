import React, { useContext } from "react";
import PayYourselfFirst from "../PayYourselfFirst/PayYourselfFirst";
import Expenses from "../Expenses/Expenses";
import IncomeExpenseContext from "../../context/IncomeExpenseContext";
import { calculateSum, formatAmount } from "../../utils/calculations";

export default function Expenditure() {
	const { totalExpensesAndSelfFirst } = useContext(IncomeExpenseContext);
	const totalExpenseAndPYFAmount = calculateSum(totalExpensesAndSelfFirst);

	return (
		<div className="border">
			<span className="title">
				<span>EXPENSES</span>
				<span className="right">{formatAmount(totalExpenseAndPYFAmount)}</span>
			</span>

			<PayYourselfFirst />
			<Expenses />
		</div>
	);
}
