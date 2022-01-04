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
import { Spinner } from "react-bootstrap";

export default class BalanceSheet extends Component {
	state = {
		loading: false,
	};

	async componentDidMount() {
		const { handleFetchBalanceSheetData } = this.context;
		this.setState({ loading: false });
		handleFetchBalanceSheetData();
		this.setState({ loading: false });
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
						color: "maroon",
					}}
				>
					BALANCE SHEET
				</span>
				<h6>
					<strong>EQUITY/NET WORTH = ASSETS - LIABILITIES</strong>
				</h6>
				<h6>
					EQUITY:{" "}
					<span
						style={{
							color: determineColor(equity),
						}}
					>
						{formatAmount(totalAssetAmount)} -{" "}
						{formatAmount(totalLiabilityAmount)} = {formatAmount(equity)}
					</span>
				</h6>
				{this.state.loading ? (
					<Spinner animation="border" size="lg" />
				) : (
					<>
						<Assets />
						<Liabilities />
					</>
				)}
			</>
		);
	}
}
BalanceSheet.contextType = AssetLiabilityContext;
