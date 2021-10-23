import React, { useContext } from "react";
import { Table, Button } from "react-bootstrap";
import AssetLiabilityContext from "../../context/AssetLiabilityContext";
import calculatePercentage from "../../utils/calculations";
import FormInput from "../common/FormInput";

const commodityOptions = [
	"Metals",
	"Energy",
	"Livestock & Meat",
	"Agriculture",
	"Cryptocurrency",
	"Other",
];

function calculateTotalCommodity(totalCommodityNumber) {
	if (!totalCommodityNumber) return 0;
	if (Number.isInteger(totalCommodityNumber)) return totalCommodityNumber;
	return totalCommodityNumber.toFixed(2);
}

export default function Commodities() {
	const {
		totalCommodities,
		handleCommodityDelete,
		commodityFormRef,
		handleCommoditySubmit,
		newCommodity,
		handleCommodityChange,
		commodityFormInvalid,
		totalAssets,
	} = useContext(AssetLiabilityContext);

	const totalAssetNumber = totalAssets
		.map((elem) => elem.amount)
		.reduce((acc, num) => acc + num, 0);

	const totalCommodityNumber = totalCommodities
		.map((elem) => elem.amount)
		.reduce((acc, num) => acc + num, 0);

	return (
		<>
			<h5>
				<span className="left percentage">
					{calculatePercentage(totalAssetNumber, totalCommodityNumber)}%
				</span>
				<span>Commodities</span>
				<span className="right">
					${calculateTotalCommodity(totalCommodityNumber)}
				</span>
			</h5>
			{totalCommodities.map((c) => (
				<div key={c.amount}>
					<Table borderless hover size="sm">
						<tbody>
							<tr>
								<td className="left">
									<Button
										name={c.amount}
										value={c._id}
										onClick={handleCommodityDelete}
										variant="danger"
										size="sm"
										className="delete"
									>
										X
									</Button>
									{c.type}
								</td>
								<td className="right">{c.amount}</td>
							</tr>
						</tbody>
					</Table>
				</div>
			))}
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
