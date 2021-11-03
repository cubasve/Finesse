import React, { useContext } from "react";
import PaperAssets from "../PaperAssets/PaperAssets";
import RealEstate from "../RealEstate/RealEstate";
import Business from "../Business/Business";
import Commodities from "../Commodities/Commodities";
import Cash from "../Cash/Cash";
import AssetLiabilityContext from "../../context/AssetLiabilityContext";
import { Popover, OverlayTrigger, Button } from "react-bootstrap";
import { InfoLg } from "react-bootstrap-icons";
import { calculateSum, formatAmount } from "../../utils/calculations";
import DoughnutChart from "../common/DoughnutChart";
import { ListUl, PieChart } from "react-bootstrap-icons";
import { ViewContext } from "../../context/ViewContext";

const popover = (
	<Popover id="popover-basic">
		<Popover.Title as="h3">Asset</Popover.Title>
		<Popover.Content>Something that puts money in your pocket</Popover.Content>
	</Popover>
);

const AssetPopover = () => (
	<OverlayTrigger trigger="click" placement="top" overlay={popover}>
		<Button variant="info" size="sm">
			<InfoLg />
		</Button>
	</OverlayTrigger>
);

export default function Assets() {
	const {
		totalAssets,
		totalBusiness,
		totalCash,
		totalCommodities,
		totalPaperAssets,
		totalRealEstate,
	} = useContext(AssetLiabilityContext);

	const { chartView, handleViewChange } = useContext(ViewContext);

	const totalAssetAmount = calculateSum(totalAssets);
	const totalCashAmount = calculateSum(totalCash);
	const totalPaperAmount = calculateSum(totalPaperAssets);
	const totalRealEstateAmount = calculateSum(totalRealEstate);
	const totalBusinessAmount = calculateSum(totalBusiness);
	const totalCommodityAmount = calculateSum(totalCommodities);

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
					ASSETS <AssetPopover />
				</span>
				<span className="title">{formatAmount(totalAssetAmount)}</span>
			</div>

			{chartView ? (
				<DoughnutChart
					backgroundColor={[
						"rgba(54, 162, 235, 0.2)",
						"rgba(255, 206, 86, 0.2)",
						"rgba(75, 192, 192, 0.2)",
						"rgba(153, 102, 255, 0.2)",
						"rgba(255, 159, 64, 0.2)",
					]}
					borderColor={[
						"rgba(54, 162, 235, 1)",
						"rgba(255, 206, 86, 1)",
						"rgba(75, 192, 192, 1)",
						"rgba(153, 102, 255, 1)",
						"rgba(255, 159, 64, 1)",
					]}
					borderWidth={1}
					data={[
						totalCashAmount,
						totalPaperAmount,
						totalRealEstateAmount,
						totalBusinessAmount,
						totalCommodityAmount,
					]}
					labels={[
						"Cash",
						"Paper Assets",
						"Real Estate",
						"Business",
						"Commodities",
					]}
					title="Asset Types"
				/>
			) : (
				<>
					<Cash />
					<PaperAssets />
					<RealEstate />
					<Business />
					<Commodities />
				</>
			)}
		</div>
	);
}
