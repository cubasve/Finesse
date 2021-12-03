import React, { useContext } from "react";
import GoodDebt from "../GoodDebt/GoodDebt";
import BadDebt from "../BadDebt/BadDebt";
import AssetLiabilityContext from "../../context/AssetLiabilityContext";
import { Popover, OverlayTrigger, Button, Tooltip } from "react-bootstrap";
import { InfoLg } from "react-bootstrap-icons";
import { calculateSum, formatAmount } from "../../utils/calculations";
import DoughnutChart from "../common/DoughnutChart";
import { ListUl, PieChart } from "react-bootstrap-icons";
import { FinancialStatementContext } from "../../context/FinancialStatementContext";

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
		<Button variant="info" size="sm" style={{ borderRadius: 50 }}>
			<InfoLg color="white" />
		</Button>
	</OverlayTrigger>
);

export default function Liabilities() {
	const { totalBadDebt, totalGoodDebt, totalLiabilities } = useContext(
		AssetLiabilityContext
	);

	const { chartView, handleViewChange } = useContext(FinancialStatementContext);

	const totalLiabilityAmount = calculateSum(totalLiabilities);
	const totalGoodDebtAmount = calculateSum(totalGoodDebt);
	const totalBadDebtAmount = calculateSum(totalBadDebt);

	const renderTooltip = (props) => (
		<Tooltip id="button-tooltip" {...props}>
			{chartView ? "Chart View" : "List View"}
		</Tooltip>
	);

	return (
		<div className="border">
			<div style={{ display: "flex", justifyContent: "space-between" }}>
				<span>
					<OverlayTrigger placement="top" overlay={renderTooltip}>
						<Button
							onClick={handleViewChange}
							size="sm"
							variant="outline-primary"
						>
							{chartView ? <PieChart /> : <ListUl />}
						</Button>
					</OverlayTrigger>
				</span>
				<span className="title">
					LIABILITIES <LiabilityPopover />
				</span>
				<span className="title">{formatAmount(totalLiabilityAmount)}</span>
			</div>

			{chartView ? (
				<DoughnutChart
					backgroundColor={["rgb(0,128,0)", "rgb(139, 69, 19)"]}
					borderColor={["rgb(0,128,0)", "rgb(139, 69, 19)"]}
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
