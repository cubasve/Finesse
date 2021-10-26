import React, { useContext } from "react";
import { Table, Button } from "react-bootstrap";
import AssetLiabilityContext from "../../context/AssetLiabilityContext";
import {
	calculatePercentage,
	calculateSum,
	formatAmount,
} from "../../utils/calculations";
import FormInput from "../common/FormInput";

const paperAssetsOptions = [
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
		handlePaperAssetChange,
		paperAssetFormInvalid,
		totalAssets,
	} = useContext(AssetLiabilityContext);

	const totalAssetAmount = calculateSum(totalAssets);
	const totalPaperAmount = calculateSum(totalPaperAssets);

	return (
		<>
			<h5 style={{ display: "flex", justifyContent: "space-between" }}>
				<span className="percentage">
					{calculatePercentage(totalAssetAmount, totalPaperAmount)}%
				</span>
				<span>Paper</span>
				<span>{formatAmount(totalPaperAmount)}</span>
			</h5>
			{totalPaperAssets.map((pa) => (
				<div key={pa.amount}>
					<Table borderless hover size="sm">
						<tbody>
							<tr>
								<td className="left">
									<Button
										name={pa.amount}
										value={pa._id}
										onClick={handlePaperAssetDelete}
										variant="danger"
										size="sm"
										className="delete"
									>
										X
									</Button>
									{pa.type}
								</td>
								<td className="right">{pa.amount}</td>
							</tr>
						</tbody>
					</Table>
				</div>
			))}
			<FormInput
				formRef={paperAssetFormRef}
				handleSubmit={handlePaperAssetSubmit}
				handleChange={handlePaperAssetChange}
				newEntity={newPaperAsset}
				options={paperAssetsOptions}
				placeholder="Purchase Price"
				formInvalid={paperAssetFormInvalid}
			/>
		</>
	);
}
