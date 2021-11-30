import React, { createContext, useState } from "react";

export const FinancialStatementContext = createContext();

//chartView: false;

export function FinancialStatementProvider({ children }) {
	const storedView = localStorage.getItem("chartView");
	const [chartView, setChartView] = useState(JSON.parse(storedView) ?? false);
	/**
	 * storedView: typeof string
	 * JSON.parse(storedView): typeof boolean
	 */
	const [selected, setSelected] = useState("");
	const [editing, setEditing] = useState(false);
	const [showModal, setShowModal] = useState(false);

	const handleViewChange = () => {
		setChartView(!chartView);
		localStorage.setItem("chartView", JSON.stringify(!chartView));
	};
	const handleStartEditing = () => setEditing(true);
	const handleFinishEditing = () => setEditing(false);

	const handleCloseModal = () => setShowModal(false);
	const handleShowModal = () => setShowModal(true);

	const context = {
		chartView,
		handleViewChange,
		selected,
		editing,
		showModal,
		setSelected,
		handleStartEditing,
		handleFinishEditing,
		handleCloseModal,
		handleShowModal,
	};

	return (
		<FinancialStatementContext.Provider value={context}>
			{children}
		</FinancialStatementContext.Provider>
	);
}

export default FinancialStatementContext;
