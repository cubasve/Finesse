import React, { Component } from "react";
import Assets from "../../components/Assets/Assets";
import Liabilities from "../../components/Liabilities/Liabilities";
import financialStatementService from "../../utils/financialStatementService";

export default class BalanceSheet extends Component {
	async componentDidMount() {
		//
	}

	//Equity Calculation Methods
	calculateEquity = (calculateTotalAsset, calculateTotalLiability) => {
		if (!calculateTotalAsset && !calculateTotalLiability) return 0;
		let equity = calculateTotalAsset - calculateTotalLiability;
		if (Number.isInteger(equity)) return equity;
		console.log(equity);
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
		const totalAssetNumber = this.state.totalAssets
			.map((elem) => elem.amount)
			.reduce((acc, num) => acc + num, 0);
		const totalLiabilityNumber = this.state.totalLiabilities
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

				<Assets
					totalAssets={this.state.totalAssets}
					totalPaperAssets={this.state.totalPaperAssets}
					newPaperAsset={this.state.newPaperAsset}
					handlePaperAssetSubmit={this.handlePaperAssetSubmit}
					handlePaperAssetChange={this.handlePaperAssetChange}
					handlePaperAssetDelete={this.handlePaperAssetDelete}
					paperAssetFormInvalid={this.state.paperAssetFormInvalid}
					paperAssetFormRef={this.paperAssetFormRef}
					totalRealEstate={this.state.totalRealEstate}
					newRealEstate={this.state.newRealEstate}
					handleRealEstateSubmit={this.handleRealEstateSubmit}
					handleRealEstateChange={this.handleRealEstateChange}
					handleRealEstateDelete={this.handleRealEstateDelete}
					realEstateFormInvalid={this.state.realEstateFormInvalid}
					realEstateFormRef={this.realEstateFormRef}
					totalBusiness={this.state.totalBusiness}
					newBusiness={this.state.newBusiness}
					handleBusinessSubmit={this.handleBusinessSubmit}
					handleBusinessChange={this.handleBusinessChange}
					handleBusinessDelete={this.handleBusinessDelete}
					businessFormInvalid={this.state.businessFormInvalid}
					businessFormRef={this.businessFormRef}
					totalCommodities={this.state.totalCommodities}
					newCommodity={this.state.newCommodity}
					handleCommoditySubmit={this.handleCommoditySubmit}
					handleCommodityChange={this.handleCommodityChange}
					handleCommodityDelete={this.handleCommodityDelete}
					commodityFormInvalid={this.state.commodityFormInvalid}
					commodityFormRef={this.commodityFormRef}
					totalCash={this.state.totalCash}
					newCash={this.state.newCash}
					handleCashSubmit={this.handleCashSubmit}
					handleCashChange={this.handleCashChange}
					handleCashDelete={this.handleCashDelete}
					cashFormInvalid={this.state.cashFormInvalid}
					cashFormRef={this.cashFormRef}
				/>
				<Liabilities
					totalLiabilities={this.state.totalLiabilities}
					totalGoodDebt={this.state.totalGoodDebt}
					newGoodDebt={this.state.newGoodDebt}
					handleGoodDebtSubmit={this.handleGoodDebtSubmit}
					handleGoodDebtChange={this.handleGoodDebtChange}
					handleGoodDebtDelete={this.handleGoodDebtDelete}
					goodDebtFormInvalid={this.state.goodDebtFormInvalid}
					goodDebtFormRef={this.goodDebtFormRef}
					totalBadDebt={this.state.totalBadDebt}
					newBadDebt={this.state.newBadDebt}
					handleBadDebtSubmit={this.handleBadDebtSubmit}
					handleBadDebtChange={this.handleBadDebtChange}
					handleBadDebtDelete={this.handleBadDebtDelete}
					badDebtFormInvalid={this.state.badDebtFormInvalid}
					badDebtFormRef={this.badDebtFormRef}
				/>
			</>
		);
	}
}
