import React, { useContext } from "react";
import { Table, Button } from "react-bootstrap";
import AssetLiabilityContext from "../../context/AssetLiabilityContext";
import {
	calculatePercentage,
	determineTotalAmount,
	showTotalAmount,
} from "../../utils/calculations";
import FormInput from "../common/FormInput";

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
		handleCommodityChange,
		commodityFormInvalid,
		totalAssets,
	} = useContext(AssetLiabilityContext);

	const totalAssetAmount = determineTotalAmount(totalAssets);
	const totalCommodityAmount = determineTotalAmount(totalCommodities);

	return (
		<>
			<h5 style={{ display: "flex", justifyContent: "space-between" }}>
				<span className="percentage">
					{calculatePercentage(totalAssetAmount, totalCommodityAmount)}%
				</span>
				<span>Commodities</span>
				<span>${showTotalAmount(totalCommodityAmount)}</span>
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
