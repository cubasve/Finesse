import React, { useContext } from "react";
import AssetLiabilityContext from "../../context/AssetLiabilityContext";
import {
	calculatePercentage,
	calculateSum,
	formatAmount,
} from "../../utils/calculations";
import FormInput from "../common/FormInput";
import EntityTable from "../common/EntityTable";

const commodityOptions = [
	"Metals",
	"Energy",
	"Livestock & Meat",
	"Agriculture",
	"Cryptocurrency",
	"Other",
];

export default function Commodities() {
	const {
		totalCommodities,
		handleCommodityDelete,
		commodityFormRef,
		handleCommoditySubmit,
		newCommodity,
		updatedCommodity,
		handleCommodityChange,
		commodityFormInvalid,
		handleGetCurrentCommodity,
		handleCommodityUpdateChange,
		handleCommodityUpdateSubmit,
		totalAssets,
	} = useContext(AssetLiabilityContext);

	const totalAssetAmount = calculateSum(totalAssets);
	const totalCommodityAmount = calculateSum(totalCommodities);

	return (
		<>
			<h5
				style={{
					alignItems: "center",
					display: "flex",
					justifyContent: "space-between",
				}}
			>
				<span className="percentage">
					{calculatePercentage(totalAssetAmount, totalCommodityAmount)}%
				</span>
				<span>Commodities</span>
				<span>{formatAmount(totalCommodityAmount)}</span>
			</h5>
			<EntityTable
				totalEntity={totalCommodities}
				handleUpdateSubmit={handleCommodityUpdateSubmit}
				updatedEntity={updatedCommodity}
				handleUpdateChange={handleCommodityUpdateChange}
				options={commodityOptions}
				handleGetCurrentEntity={handleGetCurrentCommodity}
				handleDelete={handleCommodityDelete}
			/>
			<FormInput
				formRef={commodityFormRef}
				handleSubmit={handleCommoditySubmit}
				handleChange={handleCommodityChange}
				newEntity={newCommodity}
				options={commodityOptions}
				placeholder="Purchase Price"
				formInvalid={commodityFormInvalid}
			/>
		</>
	);
}
