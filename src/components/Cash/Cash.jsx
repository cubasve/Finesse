import React, { useContext } from "react";
import AssetLiabilityContext from "../../context/AssetLiabilityContext";
import {
	calculatePercentage,
	calculateSum,
	formatAmount,
} from "../../utils/calculations";
import FormInput from "../common/FormInput";
import EntityTable from "../common/EntityTable";

const cashOptions = ["Chequing Account", "Savings Account"];

export default function Cash() {
	const {
		totalCash,
		handleCashDelete,
		cashFormRef,
		handleCashSubmit,
		newCash,
		updatedCash,
		handleCashChange,
		cashFormInvalid,
		handleGetCurrentCash,
		handleCashUpdateChange,
		handleCashUpdateSubmit,
		totalAssets,
	} = useContext(AssetLiabilityContext);

	const totalAssetAmount = calculateSum(totalAssets);
	const totalCashAmount = calculateSum(totalCash);

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
					{calculatePercentage(totalAssetAmount, totalCashAmount)}%
				</span>
				<span>Cash</span>
				<span>{formatAmount(totalCashAmount)}</span>
			</h5>
			<EntityTable
				totalEntity={totalCash}
				handleUpdateSubmit={handleCashUpdateSubmit}
				updatedEntity={updatedCash}
				handleUpdateChange={handleCashUpdateChange}
				options={cashOptions}
				handleGetCurrentEntity={handleGetCurrentCash}
				handleDelete={handleCashDelete}
			/>
			<FormInput
				formRef={cashFormRef}
				handleSubmit={handleCashSubmit}
				handleChange={handleCashChange}
				newEntity={newCash}
				options={cashOptions}
				placeholder="Bank Accounts"
				formInvalid={cashFormInvalid}
			/>
		</>
	);
}
