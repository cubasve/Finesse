import React, { useContext } from "react";
import PayYourselfFirst from "../PayYourselfFirst/PayYourselfFirst";
import Expenses from "../Expenses/Expenses";
import IncomeExpenseContext from "../../context/IncomeExpenseContext";
import {
	determineTotalAmount,
	showTotalAmount,
} from "../../utils/calculations";

export default function Expenditure() {
	const { totalExpensesAndSelfFirst } = useContext(IncomeExpenseContext);
	const totalExpenseAndPYFAmount = determineTotalAmount(
		totalExpensesAndSelfFirst
	);

	return (
		<div className="border">
			<span className="title">
				<span>EXPENSES</span>
				<span className="right">
					${showTotalAmount(totalExpenseAndPYFAmount)}
				</span>
			</span>

			<PayYourselfFirst />
			<Expenses />
		</div>
	);
}
