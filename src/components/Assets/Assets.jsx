import React, { useContext } from "react";
import PaperAssets from "../PaperAssets/PaperAssets";
import RealEstate from "../RealEstate/RealEstate";
import Business from "../Business/Business";
import Commodities from "../Commodities/Commodities";
import Cash from "../Cash/Cash";
import AssetLiabilityContext from "../../context/AssetLiabilityContext";
import { Popover, OverlayTrigger, Button } from "react-bootstrap";
import { InfoLg } from "react-bootstrap-icons";

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

function calculateTotalAsset(totalAssetNumber) {
	if (!totalAssetNumber) return 0;
	if (Number.isInteger(totalAssetNumber)) return totalAssetNumber;
	return totalAssetNumber.toFixed(2);
}

export default function Assets() {
	const { totalAssets } = useContext(AssetLiabilityContext);

	const totalAssetNumber = totalAssets
		.map((elem) => elem.amount)
		.reduce((acc, num) => acc + num, 0);

	return (
		<div className="border">
			<span className="title">
				<span>
					ASSETS <AssetPopover />
				</span>
				{/* <span className="right">${totalAssets.map(elem => elem.amount).reduce((acc, num) => acc + num, 0)}</span> */}
				<span className="right">${calculateTotalAsset(totalAssetNumber)}</span>
			</span>
			<Cash />
			<PaperAssets />
			<RealEstate />
			<Business />
			<Commodities />
		</div>
	);
}
