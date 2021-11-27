import React from "react";
import BalanceSheet from "../../components/BalanceSheet/BalanceSheet";
import IncomeStatement from "../../components/IncomeStatement/IncomeStatement";
// import {
// 	FileEarmarkSpreadsheet,
// 	FileEarmarkPdf,
// 	CloudDownload,
// } from "react-bootstrap-icons";
import { Form } from "react-bootstrap";
import userService from "../../utils/userService";

const monthOptions = {
	January: 1,
	February: 2,
	March: 3,
	April: 4,
	May: 5,
	June: 6,
	July: 7,
	August: 8,
	September: 9,
	October: 10,
	November: 11,
	December: 12,
};

export default function FinancialStatementPage() {
	const user = userService.getUser();
	const createdUserYear = new Date(user.createdAt).getFullYear();
	const currentYear = new Date().getFullYear();
	const currentMonth = new Date().getMonth() + 1;

	console.log(user);
	const generateYearOptions = (startYear, endYear) => {
		const result = [];
		for (let i = startYear; i <= endYear; i++) {
			result.push(i);
		}
		return result;
	};

	const yearOptions =
		currentYear - createdUserYear > 5
			? generateYearOptions(createdUserYear, currentYear)
			: generateYearOptions(createdUserYear - 4, createdUserYear);

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
						defaultValue={currentYear}
						size="sm"
						style={{ width: 100 }}
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
						defaultValue={currentMonth}
						size="sm"
						style={{ width: 120 }}
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
