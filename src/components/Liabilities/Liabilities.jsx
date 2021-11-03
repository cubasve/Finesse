import React, { useContext } from "react";
import GoodDebt from "../GoodDebt/GoodDebt";
import BadDebt from "../BadDebt/BadDebt";
import AssetLiabilityContext from "../../context/AssetLiabilityContext";
import { Popover, OverlayTrigger, Button } from "react-bootstrap";
import { InfoLg } from "react-bootstrap-icons";
import { calculateSum, formatAmount } from "../../utils/calculations";
import DoughnutChart from "../common/DoughnutChart";
import { ListUl, PieChart } from "react-bootstrap-icons";
import { ViewContext } from "../../context/ViewContext";

const popover = (
	<Popover id="popover-basic">
		<Popover.Title as="h3">Liability</Popover.Title>
		<Popover.Content>
			Something that takes money out of your pocket
		</Popover.Content>
	</Popover>
);
const LiabilityPopover = () => (
	<OverlayTrigger trigger="click" placement="top" overlay={popover}>
		<Button variant="info" size="sm">
			<InfoLg />
		</Button>
	</OverlayTrigger>
);

export default function Liabilities() {
	const { totalBadDebt, totalGoodDebt, totalLiabilities } = useContext(
		AssetLiabilityContext
	);

	const { chartView, handleViewChange } = useContext(ViewContext);

	const totalLiabilityAmount = calculateSum(totalLiabilities);
	const totalGoodDebtAmount = calculateSum(totalGoodDebt);
	const totalBadDebtAmount = calculateSum(totalBadDebt);

	return (
		<div className="border">
			<div style={{ display: "flex", justifyContent: "space-between" }}>
				<span>
					<Button
						onClick={handleViewChange}
						size="sm"
						variant="outline-success"
					>
						{chartView ? <PieChart /> : <ListUl />}
					</Button>
				</span>
				<span className="title">
					LIABILITIES <LiabilityPopover />
				</span>
				<span className="title">{formatAmount(totalLiabilityAmount)}</span>
			</div>

			{chartView ? (
				<DoughnutChart
					backgroundColor={[
						"rgba(153, 102, 255, 0.2)",
						"rgba(255, 159, 64, 0.2)",
					]}
					borderColor={["rgba(153, 102, 255, 1)", "rgba(255, 159, 64, 1)"]}
					borderWidth={1}
					data={[totalGoodDebtAmount, totalBadDebtAmount]}
					labels={["Good Debt", "Bad Debt"]}
					title="Liability Types"
				/>
			) : (
				<>
					<GoodDebt />
					<BadDebt />
				</>
			)}
		</div>
	);
}
