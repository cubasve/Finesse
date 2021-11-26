import React from "react";
import BalanceSheet from "../../components/BalanceSheet/BalanceSheet";
import IncomeStatement from "../../components/IncomeStatement/IncomeStatement";
import {
	// FileEarmarkSpreadsheet,
	// FileEarmarkPdf,
	// CloudDownload,
	CalendarDate,
	CalendarFill,
} from "react-bootstrap-icons";
import { Form } from "react-bootstrap";
import userService from "../../utils/userService";

const monthOptions = {
	1: "January",
	2: "February",
	3: "March",
	4: "April",
	5: "May",
	6: "June",
	7: "July",
	8: "August",
	9: "September",
	10: "October",
	11: "November",
	12: "December",
};

// const monthOptions = [
// 	"January",
// 	"February",
// 	"March",
// 	"April",
// 	"May",
// 	"June",
// 	"July",
// 	"August",
// 	"September",
// 	"October",
// 	"November",
// 	"December",
// ];

export default function FinancialStatementPage() {
	const user = userService.getUser();
	const createdUserYear = new Date(user.createdAt).getFullYear();
	const currentYear = new Date().getFullYear();
	const currentMonth = monthOptions[new Date().getMonth() + 1];

	const generateYearOptions = (startYear, endYear) => {
		const result = [];
		for (let i = startYear; i <= endYear; i++) {
			result.push(i);
		}
		return result;
	};

	const yearOptions =
		currentYear - createdUserYear > 3
			? generateYearOptions(createdUserYear, currentYear)
			: generateYearOptions(createdUserYear - 2, createdUserYear);

	return (
		<div>
			<h4 style={{ display: "flex", justifyContent: "center" }}>
				<span>
					<CalendarFill />
					YEAR
				</span>
				<span>
					<Form.Control
						as="select"
						defaultValue={currentYear}
						size="sm"
						style={{ width: 100 }}
					>
						{yearOptions.map((year, index) => (
							<option key={year} value={index + 1}>
								{year}
							</option>
						))}
					</Form.Control>
				</span>
				<span>
					<CalendarDate />
					MONTH
				</span>
				<span>
					<Form.Control
						as="select"
						defaultValue={currentMonth}
						size="sm"
						style={{ width: 120 }}
					>
						{Object.values(monthOptions).map((month) => (
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
