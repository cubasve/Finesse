import { generatePath } from "react-router";
import { useHistory } from "react-router-dom";
import React, { createContext, useState } from "react";
import userService from "../utils/userService";
export const FinancialStatementContext = createContext();

//chartView: false;

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

export function FinancialStatementProvider({ children }) {
	const user = userService.getUser();
	const createdAccountYear = user
		? new Date(user.createdAt).getFullYear()
		: new Date().getFullYear();
	const currentYear = new Date().getFullYear();
	const currentMonth = new Date().getMonth() + 1;

	const storedView = sessionStorage.getItem("chartView");
	const [chartView, setChartView] = useState(JSON.parse(storedView) ?? false);
	/**
	 * storedView: typeof string
	 * JSON.parse(storedView): typeof boolean
	 */
	const [selected, setSelected] = useState("");
	const [editing, setEditing] = useState(false);
	const [showModal, setShowModal] = useState(false);

	let history = useHistory();

	const storedMonthYear = sessionStorage.getItem("monthYear");
	const [monthYear, setMonthYear] = useState(
		JSON.parse(storedMonthYear) ?? { month: currentMonth, year: currentYear }
	);

	const getPath = (monthYear) => {
		const path = generatePath("/financialstatement/:year/:month", {
			year: monthYear.year,
			month: monthYear.month,
		});
		return path;
	};

	const handleMonthChange = (e) => {
		const { value } = e.target;
		const updatedValue = { ...monthYear, month: Number(value) };
		setMonthYear(updatedValue);
		sessionStorage.setItem("monthYear", JSON.stringify(updatedValue));
		history.push(getPath(updatedValue));
	};

	const handleYearChange = (e) => {
		const { value } = e.target;
		const updatedValue = { ...monthYear, year: Number(value) };
		setMonthYear(updatedValue);
		sessionStorage.setItem("monthYear", JSON.stringify(updatedValue));
		history.push(getPath(updatedValue));
	};

	const handleViewChange = () => {
		setChartView(!chartView);
		sessionStorage.setItem("chartView", JSON.stringify(!chartView));
	};
	const handleStartEditing = () => setEditing(true);
	const handleFinishEditing = () => setEditing(false);

	const handleCloseModal = () => setShowModal(false);
	const handleShowModal = () => setShowModal(true);

	const generateYearOptions = (startYear, endYear) => {
		const result = [];
		for (let i = startYear; i <= endYear; i++) {
			result.push(i);
		}
		return result;
	};

	const yearOptions =
		currentYear - createdAccountYear > 5
			? generateYearOptions(createdAccountYear, currentYear)
			: generateYearOptions(createdAccountYear - 4, createdAccountYear);

	const context = {
		chartView,
		handleViewChange,
		selected,
		editing,
		showModal,

		yearOptions,
		monthOptions,
		setSelected,
		handleStartEditing,
		handleFinishEditing,
		handleCloseModal,
		handleShowModal,

		monthYear,
		handleMonthChange,
		handleYearChange,
	};

	return (
		<FinancialStatementContext.Provider value={context}>
			{children}
		</FinancialStatementContext.Provider>
	);
}

export default FinancialStatementContext;
