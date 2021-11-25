import React, { Component } from "react";
import Assets from "../../components/Assets/Assets";
import Liabilities from "../../components/Liabilities/Liabilities";
import AssetLiabilityContext from "../../context/AssetLiabilityContext";
import {
	calculateDifference,
	determineColor,
	calculateSum,
	formatAmount,
} from "../../utils/calculations";

export default class BalanceSheet extends Component {
	async componentDidMount() {
		const { handleFetchBalanceSheetData } = this.context;
		handleFetchBalanceSheetData();
	}

	render() {
		const { totalAssets, totalLiabilities } = this.context;

		const totalAssetAmount = calculateSum(totalAssets);
		const totalLiabilityAmount = calculateSum(totalLiabilities);
		const equity = calculateDifference(totalAssetAmount, totalLiabilityAmount);

		return (
			<>
				<span
					style={{
						fontSize: "24px",
						fontWeight: 500,
						color: "red",
					}}
				>
					BALANCE SHEET
				</span>
				<h6>
					<strong>EQUITY/NET WORTH = ASSETS - LIABILITIES</strong>
				</h6>
				<h6>
					EQUITY: {formatAmount(totalAssetAmount)} -{" "}
					{formatAmount(totalLiabilityAmount)} ={" "}
					<span
						style={{
							color: determineColor(equity),
						}}
					>
						{formatAmount(equity)}
					</span>
				</h6>

				<Assets />
				<Liabilities />
			</>
		);
	}
}
BalanceSheet.contextType = AssetLiabilityContext;
