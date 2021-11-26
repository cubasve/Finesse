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

const monthOptions = [
	"January",
	"February",
	"March",
	"April",
	"May",
	"June",
	"July",
	"August",
	"September",
	"October",
	"November",
	"December",
];

export default function FinancialStatementPage() {
	const user = userService.getUser();
	const createdUserYear = new Date(user.createdAt).getFullYear();
	const currentYear = new Date().getFullYear();
	const currentMonth = monthOptions[new Date().getMonth()];

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
			<h4 style={{ display: "flex", justifyContent: "center" }}>
				<span>YEAR</span>
				<span>
					<Form.Control
						as="select"
						defaultValue={currentYear}
						size="sm"
						style={{ width: 200 }}
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
						style={{ width: 200 }}
					>
						{monthOptions.map((month) => (
							<option key={month} value={month}>
								{month}
							</option>
						))}
					</Form.Control>
				</span>
			</h4>

			{/* <h4>
				<span>YEAR</span>
				<span>MONTH</span>
				<span>
					<FileEarmarkSpreadsheet />
				</span>
				<span>
					<FileEarmarkPdf />
				</span>
				<span>
					<CloudDownload />
				</span>
			</h4> */}
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
