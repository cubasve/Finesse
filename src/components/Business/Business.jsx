import React, { useContext } from "react";
import AssetLiabilityContext from "../../context/AssetLiabilityContext";
import {
	calculatePercentage,
	calculateSum,
	formatAmount,
} from "../../utils/calculations";
import FormInput from "../common/FormInput";
import EntityTable from "../common/EntityTable";

const businessOptions = ["Sole proprietorship", "Partnership", "Corporation"];

export default function Business() {
	const {
		totalBusiness,
		handleBusinessDelete,
		businessFormRef,
		handleBusinessSubmit,
		newBusiness,
		updatedBusiness,
		handleBusinessChange,
		businessFormInvalid,
		handleGetCurrentBusiness,
		handleBusinessUpdateChange,
		handleBusinessUpdateSubmit,
		totalAssets,
	} = useContext(AssetLiabilityContext);

	const totalAssetAmount = calculateSum(totalAssets);
	const totalBusinessAmount = calculateSum(totalBusiness);

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
					{calculatePercentage(totalAssetAmount, totalBusinessAmount)}%
				</span>
				<span>Business</span>
				<span>{formatAmount(totalBusinessAmount)}</span>
			</h5>
			<EntityTable
				totalEntity={totalBusiness}
				handleUpdateSubmit={handleBusinessUpdateSubmit}
				updatedEntity={updatedBusiness}
				handleUpdateChange={handleBusinessUpdateChange}
				options={businessOptions}
				handleGetCurrentEntity={handleGetCurrentBusiness}
				handleDelete={handleBusinessDelete}
			/>
			<FormInput
				formRef={businessFormRef}
				handleSubmit={handleBusinessSubmit}
				handleChange={handleBusinessChange}
				newEntity={newBusiness}
				options={businessOptions}
				placeholder="Company Value"
				formInvalid={businessFormInvalid}
			/>
		</>
	);
}
