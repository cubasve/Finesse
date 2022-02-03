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

export default function FinancialStatementPage() {
	const {
		// yearOptions,
		// monthOptions,
		monthYear,
		handleMonthChange,
		handleYearChange,
	} = useContext(FinancialStatementContext);

	const currentYear = new Date().getFullYear();
	const currentMonth = new Date().getMonth() + 1;

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
					<Form.Select
						onChange={handleYearChange}
						size="sm"
						style={{ width: 100 }}
						defaultValue={currentYear}
						value={monthYear.year}
					>
						{/* {yearOptions.map((year) => (
									<option key={year} value={year}>
										{year}
									</option>
								))} */}
						<option value={currentYear}>{currentYear}</option>
						<option value={currentYear - 1}>{currentYear - 1}</option>
						<option value={currentYear - 2}>{currentYear - 2}</option>
					</Form.Select>
				</span>
				<span>MONTH</span>
				<span>
					<Form.Select
						onChange={handleMonthChange}
						size="sm"
						style={{ width: 120 }}
						defaultValue={currentMonth}
						value={monthYear.month}
					>
						{/* {Object.keys(monthOptions).map((month, index) => (
									<option key={month} value={index + 1}>
										{month}
									</option>
								))} */}
						<option value={1}>January</option>
						<option value={2}>February</option>
						<option value={3}>March</option>
						<option value={4}>April</option>
						<option value={5}>May</option>
						<option value={6}>June</option>
						<option value={7}>July</option>
						<option value={8}>August</option>
						<option value={9}>September</option>
						<option value={10}>October</option>
						<option value={11}>November</option>
						<option value={12}>December</option>
					</Form.Select>
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
