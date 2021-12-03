import React, { useState } from "react";
import BarChart from "../../components/common/BarChart";
import { Card, Tabs, Tab, Accordion } from "react-bootstrap";
import userService from "../../utils/userService";

export default function OverviewPage() {
	const [tab, setTab] = useState(1);
	const user = userService.getUser();

	const getWelcomeMessage = () => {
		const time = new Date().getHours();
		if (time >= 0 && time < 12) {
			return `Good morning, ${user.name}`;
		} else if (time >= 12 && time < 17) {
			return `Good afternoon, ${user.name}`;
		}
		return `Good evening, ${user.name}`;
	};
	return (
		<div>
			<h4>{getWelcomeMessage()}</h4>
			<Card style={{ margin: 30 }} border="dark">
				<Card.Body>
					<Tabs
						activeKey={tab}
						onSelect={(tab) => setTab(tab)}
						className="mb-3"
						variant="pills"
					>
						<Tab eventKey="1" title="Equity & Cash Flow">
							<BarChart
								title="Bar Chart Test"
								labels={[
									"January",
									"February",
									"March",
									"April",
									"May",
									"June",
									"July",
								]}
								datasets={[
									{
										label: "Equity",
										data: [1, -2, 3, 4, 5, 6, 7],
										backgroundColor: "rgba(255, 99, 132, 0.5)",
									},
									{
										label: "Cash Flow",
										data: [7, 6, 5, 4, 3, 2, 1],
										backgroundColor: "rgba(53, 162, 235, 0.5)",
									},
								]}
							/>
						</Tab>
						<Tab eventKey="2" title="Income & Expenses">
							<BarChart
								title="Bar Chart Test"
								labels={[
									"January",
									"February",
									"March",
									"April",
									"May",
									"June",
									"July",
								]}
								datasets={[
									{
										label: "Total Income",
										data: [1, -2, 3, 4, 5, 6, 7],
										backgroundColor: "rgba(255, 99, 132, 0.5)",
									},
									{
										label: "Total Expenses",
										data: [7, 6, 5, 4, 3, 2, 1],
										backgroundColor: "rgba(53, 162, 235, 0.5)",
									},
								]}
							/>
						</Tab>
						<Tab eventKey="3" title="Assets & Liabilities">
							<BarChart
								title="Bar Chart Test"
								labels={[
									"January",
									"February",
									"March",
									"April",
									"May",
									"June",
									"July",
								]}
								datasets={[
									{
										label: "Total Assets",
										data: [1, -2, 3, 4, 5, 6, 7],
										backgroundColor: "rgba(255, 99, 132, 0.5)",
									},
									{
										label: "Total Liabilities",
										data: [7, 6, 5, 4, 3, 2, 1],
										backgroundColor: "rgba(53, 162, 235, 0.5)",
									},
								]}
							/>
						</Tab>
					</Tabs>
				</Card.Body>
			</Card>
		</div>
	);
}
