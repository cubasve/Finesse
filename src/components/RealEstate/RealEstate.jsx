import React, { useContext } from "react";
import { Table, Button } from "react-bootstrap";
import AssetLiabilityContext from "../../context/AssetLiabilityContext";
import {
	calculatePercentage,
	determineTotalAmount,
	showTotalAmount,
} from "../../utils/calculations";
import FormInput from "../common/FormInput";

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
		handleRealEstateChange,
		realEstateFormInvalid,
		totalAssets,
	} = useContext(AssetLiabilityContext);

	const totalAssetAmount = determineTotalAmount(totalAssets);
	const totalRealEstateAmount = determineTotalAmount(totalRealEstate);

	return (
		<>
			<h5 style={{ display: "flex", justifyContent: "space-between" }}>
				<span className="percentage">
					{calculatePercentage(totalAssetAmount, totalRealEstateAmount)}%
				</span>
				<span>Real Estate</span>
				<span>${showTotalAmount(totalRealEstateAmount)}</span>
			</h5>

			{totalRealEstate.map((re) => (
				<div key={re.amount}>
					<Table borderless hover size="sm">
						<tbody>
							<tr>
								<td className="left">
									<Button
										name={re.amount}
										value={re._id}
										onClick={handleRealEstateDelete}
										variant="danger"
										size="sm"
										className="delete"
									>
										X
									</Button>
									{re.type}
								</td>
								<td className="right">{re.amount}</td>
							</tr>
						</tbody>
					</Table>
				</div>
			))}
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
