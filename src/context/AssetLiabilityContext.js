import React, { createContext, Component } from "react";
import financialStatementService from "../utils/financialStatementService";

const AssetLiabilityContext = createContext();
export const AssetLiabilityConsumer = AssetLiabilityContext.Consumer;

export class AssetLiabilityProvider extends Component {
	state = {
		totalAssets: [],
		totalLiabilities: [],

		totalPaperAssets: [],
		newPaperAsset: {
			type: "Stock",
			amount: "",
			category: "Paper",
			class: "Asset",
		},
		paperAssetFormInvalid: true,

		totalRealEstate: [],
		newRealEstate: {
			type: "Residential",
			amount: "",
			category: "RealEstate",
			class: "Asset",
		},
		realEstateFormInvalid: true,

		totalBusiness: [],
		newBusiness: {
			type: "Sole proprietorship",
			amount: "",
			category: "Business",
			class: "Asset",
		},
		businessFormInvalid: true,

		totalCommodities: [],
		newCommodity: {
			type: "Metals",
			amount: "",
			category: "Commodity",
			class: "Asset",
		},
		commodityFormInvalid: true,

		totalCash: [],
		newCash: {
			type: "Chequing Account",
			amount: "",
			category: "Cash",
			class: "Asset",
		},
		cashFormInvalid: true,

		totalGoodDebt: [],
		newGoodDebt: {
			type: "Real Estate",
			amount: "",
			category: "GoodDebt",
			class: "Liability",
		},
		goodDebtFormInvalid: true,

		totalBadDebt: [],
		newBadDebt: {
			type: "Home Mortgage",
			amount: "",
			category: "BadDebt",
			class: "Liability",
		},
		badDebtFormInvalid: true,
	};

	render() {
		return (
			<AssetLiabilityContext.Provider>
				{this.props.children}
			</AssetLiabilityContext.Provider>
		);
	}
}
