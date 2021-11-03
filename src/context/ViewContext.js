import React, { createContext, useState } from "react";

export const ViewContext = createContext();

//chartView: false;

export function ViewProvider({ children }) {
	const storedView = localStorage.getItem("chartView");
	const [chartView, setChartView] = useState(JSON.parse(storedView) ?? false);
	/**
	 * storedView: typeof string
	 * JSON.parse(storedView): typeof boolean
	 */

	const handleViewChange = () => {
		setChartView(!chartView);
		localStorage.setItem("chartView", JSON.stringify(!chartView));
	};

	const context = {
		chartView,
		handleViewChange,
	};

	return (
		<ViewContext.Provider value={context}>{children}</ViewContext.Provider>
	);
}
