import React from "react";
import BalanceSheet from "../../components/BalanceSheet/BalanceSheet";
import IncomeStatement from "../../components/IncomeStatement/IncomeStatement";
import { IncomeExpenseProvider } from "../../context/IncomeExpenseContext";

export default function FinancialStatementPage() {
	return (
		<div className="FinancialStatement">
			<div>
				<span className="statement">BALANCE SHEET</span>
				<BalanceSheet />
			</div>

			<div>
				<IncomeExpenseProvider>
					<span className="statement">INCOME STATEMENT</span>
					<IncomeStatement />
				</IncomeExpenseProvider>
			</div>
		</div>
	);
}
