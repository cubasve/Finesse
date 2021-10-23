import React, { useContext } from "react";
import { Table, Button } from "react-bootstrap";
import AssetLiabilityContext from "../../context/AssetLiabilityContext";
import calculatePercentage from "../../utils/calculations";
import FormInput from "../common/FormInput";

const paperAssetsOptions = [
	"Stock",
	"Bond",
	"Index/Mutual Fund",
	"GIC",
	"REIT",
	"Other",
];

function calculateTotalPaperAsset(totalPaperNumber) {
	if (!totalPaperNumber) return 0;
	if (Number.isInteger(totalPaperNumber)) return totalPaperNumber;
	return totalPaperNumber.toFixed(2);
}

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

	const totalAssetNumber = totalAssets
		.map((elem) => elem.amount)
		.reduce((acc, num) => acc + num, 0);

	const totalPaperNumber = totalPaperAssets
		.map((elem) => elem.amount)
		.reduce((acc, num) => acc + num, 0);

	return (
		<>
			<h5>
				<span className="left percentage">
					{calculatePercentage(totalAssetNumber, totalPaperNumber)}%
				</span>
				<span>Paper</span>
				<span className="right">
					${calculateTotalPaperAsset(totalPaperNumber)}
				</span>
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
