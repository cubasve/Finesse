import React, { Component } from "react";
import Assets from "../../components/Assets/Assets";
import Liabilities from "../../components/Liabilities/Liabilities";
import AssetLiabilityContext from "../../context/AssetLiabilityContext";
import {
	calculateDifference,
	determineColor,
	determineTotalAmount,
	showTotalAmount,
} from "../../utils/calculations";

export default class BalanceSheet extends Component {
	async componentDidMount() {
		const { handleFetchBalanceSheetData } = this.context;
		handleFetchBalanceSheetData();
	}

	render() {
		const { totalAssets, totalLiabilities } = this.context;

		const totalAssetAmount = determineTotalAmount(totalAssets);
		const totalLiabilityAmount = determineTotalAmount(totalLiabilities);
		const equity = calculateDifference(totalAssetAmount, totalLiabilityAmount);

		return (
			<>
				<h6>
					<strong>EQUITY/NET WORTH = ASSETS - LIABILITIES</strong>
				</h6>
				<h6>
					EQUITY: {showTotalAmount(totalAssetAmount)} -{" "}
					{showTotalAmount(totalLiabilityAmount)} ={" "}
					<span
						style={{
							color: determineColor(equity),
						}}
					>
						{equity}
					</span>
				</h6>

				<Assets />
				<Liabilities />
			</>
		);
	}
}
BalanceSheet.contextType = AssetLiabilityContext;
