import React, { useContext } from "react";
import GoodDebt from "../GoodDebt/GoodDebt";
import BadDebt from "../BadDebt/BadDebt";
import AssetLiabilityContext from "../../context/AssetLiabilityContext";
import { Popover, OverlayTrigger, Button } from "react-bootstrap";
import { InfoLg } from "react-bootstrap-icons";
import { calculateSum, formatAmount } from "../../utils/calculations";

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
	const { totalLiabilities } = useContext(AssetLiabilityContext);
	const totalLiabilityAmount = calculateSum(totalLiabilities);

	return (
		<div className="border">
			<span className="title">
				<span>
					LIABILITIES <LiabilityPopover />
				</span>

				<span className="right">{formatAmount(totalLiabilityAmount)}</span>
			</span>

			<GoodDebt />
			<BadDebt />
		</div>
	);
}
