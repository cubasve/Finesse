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
	const { totalAssets } = useContext(AssetLiabilityContext);
	const totalAssetAmount = calculateSum(totalAssets);

	return (
		<div className="border">
			<span className="title">
				<span>
					ASSETS <AssetPopover />
				</span>
				<span className="right">{formatAmount(totalAssetAmount)}</span>
			</span>
			<Cash />
			<PaperAssets />
			<RealEstate />
			<Business />
			<Commodities />
		</div>
	);
}
