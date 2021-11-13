import React from "react";
import { Doughnut } from "react-chartjs-2";

export default function DoughnutChart(props) {
	const { backgroundColor, borderColor, borderWidth, data, labels, title } =
		props;

	const doughnutData = {
		labels: labels,
		datasets: [
			{
				label: title,
				data,
				backgroundColor,
				borderColor,
				borderWidth,
			},
		],
	};

	return <Doughnut data={doughnutData} />;
}
