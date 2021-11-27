import React from "react";
import { Bar } from "react-chartjs-2";

export default function BarChart({ title, titlePosition, labels, datasets }) {
	const options = {
		responsive: true,
		plugins: {
			legend: {
				position: `${titlePosition ?? "top"}`,
			},
			title: {
				display: true,
				text: `${title}`,
				position: "top",
			},
		},
	};

	const data = {
		labels,
		datasets,
	};

	return <Bar options={options} data={data} />;
}
