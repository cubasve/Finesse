import React, { useContext } from "react";
import AssetLiabilityContext from "../../context/AssetLiabilityContext";
import {
	calculatePercentage,
	calculateSum,
	formatAmount,
} from "../../utils/calculations";
import FormInput from "../common/FormInput";
import EntityTable from "../common/EntityTable";

const paperAssetOptions = [
	"Stock",
	"Bond",
	"Index/Mutual Fund",
	"GIC",
	"REIT",
	"Other",
];

export default function PaperAssets() {
	const {
		totalPaperAssets,
		handlePaperAssetDelete,
		paperAssetFormRef,
		handlePaperAssetSubmit,
		newPaperAsset,
		updatedPaperAsset,
		handlePaperAssetChange,
		paperAssetFormInvalid,
		handleGetCurrentPaperAsset,
		handlePaperAssetUpdateChange,
		handlePaperAssetUpdateSubmit,
		totalAssets,
	} = useContext(AssetLiabilityContext);

	const totalAssetAmount = calculateSum(totalAssets);
	const totalPaperAmount = calculateSum(totalPaperAssets);

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
					{calculatePercentage(totalAssetAmount, totalPaperAmount)}%
				</span>
				<span>Paper</span>
				<span>{formatAmount(totalPaperAmount)}</span>
			</h5>
			<EntityTable
				totalEntity={totalPaperAssets}
				handleUpdateSubmit={handlePaperAssetUpdateSubmit}
				updatedEntity={updatedPaperAsset}
				handleUpdateChange={handlePaperAssetUpdateChange}
				options={paperAssetOptions}
				handleGetCurrentEntity={handleGetCurrentPaperAsset}
				handleDelete={handlePaperAssetDelete}
			/>
			<FormInput
				formRef={paperAssetFormRef}
				handleSubmit={handlePaperAssetSubmit}
				handleChange={handlePaperAssetChange}
				newEntity={newPaperAsset}
				options={paperAssetOptions}
				placeholder="Purchase Price"
				formInvalid={paperAssetFormInvalid}
			/>
		</>
	);
}
