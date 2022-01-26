import React, { useContext } from "react";
import BalanceSheet from "../../components/BalanceSheet/BalanceSheet";
import IncomeStatement from "../../components/IncomeStatement/IncomeStatement";
// import {
// 	FileEarmarkSpreadsheet,
// 	FileEarmarkPdf,
// 	CloudDownload,
// } from "react-bootstrap-icons";
import { Form } from "react-bootstrap";
import FinancialStatementContext from "../../context/FinancialStatementContext";
// import { generatePath } from "react-router";

export default function FinancialStatementPage() {
	const {
		yearOptions,
		monthOptions,
		monthYear,
		handleMonthChange,
		handleYearChange,
	} = useContext(FinancialStatementContext);

	console.log("FinancialStatementContext", monthYear);

	// const x = generatePath("/financialstatement/:year/:month", {
	// 	year,
	// 	month,
	// });
	// console.log("generatePath", x);

	return (
		<div>
			<h5
				style={{
					display: "flex",
					justifyContent: "center",
					gap: 10,
					alignItems: "center",
					marginBottom: 30,
				}}
			>
				<span>YEAR</span>
				<span>
					<Form.Control
						as="select"
						onChange={handleYearChange}
						size="sm"
						style={{ width: 100 }}
						value={monthYear.year}
					>
						{yearOptions.map((year) => (
							<option key={year} value={year}>
								{year}
							</option>
						))}
					</Form.Control>
				</span>
				<span>MONTH</span>
				<span>
					<Form.Control
						as="select"
						onChange={handleMonthChange}
						size="sm"
						style={{ width: 120 }}
						value={monthYear.month}
					>
						{Object.keys(monthOptions).map((month, index) => (
							<option key={month} value={index + 1}>
								{month}
							</option>
						))}
					</Form.Control>
				</span>
			</h5>
			<div className="FinancialStatement">
				<div>
					<BalanceSheet />
				</div>
				<div>
					<IncomeStatement />
				</div>
			</div>
		</div>
	);
}
