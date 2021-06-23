import React from "react";
import BalanceSheet from "../../components/BalanceSheet/BalanceSheet";
import IncomeStatement from "../../components/IncomeStatement/IncomeStatement";
import { IncomeExpenseProvider } from "../../context/IncomeExpenseContext";
import { AssetLiabilityProvider } from "../../context/AssetLiabilityContext";

export default function FinancialStatementPage() {
	return (
		<div className="FinancialStatement">
			<div>
				<AssetLiabilityProvider>
					<span className="statement">BALANCE SHEET</span>
					<BalanceSheet />
				</AssetLiabilityProvider>
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
