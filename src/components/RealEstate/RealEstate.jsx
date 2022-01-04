import React, { useContext } from "react";
import AssetLiabilityContext from "../../context/AssetLiabilityContext";
import {
	calculatePercentage,
	calculateSum,
	formatAmount,
} from "../../utils/calculations";
import FormInput from "../common/FormInput";
import EntityTable from "../common/EntityTable";

const realEstateOptions = [
	"Residential",
	"Commercial",
	"Industrial",
	"Vacant Land",
];

export default function RealEstate() {
	const {
		totalRealEstate,
		handleRealEstateDelete,
		realEstateFormRef,
		handleRealEstateSubmit,
		newRealEstate,
		updatedRealEstate,
		handleRealEstateChange,
		realEstateFormInvalid,
		handleGetCurrentRealEstate,
		handleRealEstateUpdateChange,
		handleRealEstateUpdateSubmit,
		totalAssets,
	} = useContext(AssetLiabilityContext);

	const totalAssetAmount = calculateSum(totalAssets);
	const totalRealEstateAmount = calculateSum(totalRealEstate);

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
					{calculatePercentage(totalAssetAmount, totalRealEstateAmount)}%
				</span>
				<span>Real Estate</span>
				<span>{formatAmount(totalRealEstateAmount)}</span>
			</h5>
			<EntityTable
				totalEntity={totalRealEstate}
				handleUpdateSubmit={handleRealEstateUpdateSubmit}
				updatedEntity={updatedRealEstate}
				handleUpdateChange={handleRealEstateUpdateChange}
				options={realEstateOptions}
				handleGetCurrentEntity={handleGetCurrentRealEstate}
				handleDelete={handleRealEstateDelete}
			/>
			<FormInput
				formRef={realEstateFormRef}
				handleSubmit={handleRealEstateSubmit}
				handleChange={handleRealEstateChange}
				newEntity={newRealEstate}
				options={realEstateOptions}
				placeholder="Purchase Price"
				formInvalid={realEstateFormInvalid}
			/>
		</>
	);
}
