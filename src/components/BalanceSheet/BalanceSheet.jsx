import React, { Component } from "react";
import Assets from "../../components/Assets/Assets";
import Liabilities from "../../components/Liabilities/Liabilities";
import AssetLiabilityContext from "../../context/AssetLiabilityContext";

export default class BalanceSheet extends Component {
	async componentDidMount() {
		const { handleFetchBalanceSheetData } = this.context;
		handleFetchBalanceSheetData();
	}

	//Equity Calculation Methods
	calculateEquity = (calculateTotalAsset, calculateTotalLiability) => {
		if (!calculateTotalAsset && !calculateTotalLiability) return 0;
		let equity = calculateTotalAsset - calculateTotalLiability;
		if (Number.isInteger(equity)) return equity;
		return equity.toFixed(2);
	};

	calculateTotalAsset = (totalAssetNumber) => {
		if (!totalAssetNumber) return 0;
		if (Number.isInteger(totalAssetNumber)) return totalAssetNumber;
		return totalAssetNumber.toFixed(2);
	};

	calculateTotalLiability = (totalLiabilityNumber) => {
		if (!totalLiabilityNumber) return 0;
		if (Number.isInteger(totalLiabilityNumber)) return totalLiabilityNumber;
		return totalLiabilityNumber.toFixed(2);
	};

	render() {
		const { totalAssets, totalLiabilities } = this.context;

		const totalAssetNumber = totalAssets
			.map((elem) => elem.amount)
			.reduce((acc, num) => acc + num, 0);

		const totalLiabilityNumber = totalLiabilities
			.map((elem) => elem.amount)
			.reduce((acc, num) => acc + num, 0);
		return (
			<>
				<h6>
					<strong>EQUITY/NET WORTH = ASSETS - LIABILITIES</strong>
				</h6>
				<h6>
					EQUITY: {this.calculateTotalAsset(totalAssetNumber)} -{" "}
					{this.calculateTotalLiability(totalLiabilityNumber)} ={" "}
					{this.calculateEquity(totalAssetNumber, totalLiabilityNumber)}
				</h6>

				<Assets />
				<Liabilities />
			</>
		);
	}
}
BalanceSheet.contextType = AssetLiabilityContext;
