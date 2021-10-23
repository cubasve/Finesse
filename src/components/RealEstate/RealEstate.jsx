import React, { useContext } from "react";
import { Table, Button } from "react-bootstrap";
import AssetLiabilityContext from "../../context/AssetLiabilityContext";
import calculatePercentage from "../../utils/calculations";
import FormInput from "../common/FormInput";

const realEstateOptions = [
	"Residential",
	"Commercial",
	"Industrial",
	"Vacant Land",
];

function calculateTotalRealEstate(totalRealEstateNumber) {
	if (!totalRealEstateNumber) return 0;
	if (Number.isInteger(totalRealEstateNumber)) return totalRealEstateNumber;
	return totalRealEstateNumber.toFixed(2);
}

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

	const totalAssetNumber = totalAssets
		.map((elem) => elem.amount)
		.reduce((acc, num) => acc + num, 0);

	const totalRealEstateNumber = totalRealEstate
		.map((elem) => elem.amount)
		.reduce((acc, num) => acc + num, 0);

	return (
		<>
			<h5>
				<span className="left percentage">
					{calculatePercentage(totalAssetNumber, totalRealEstateNumber)}%
				</span>
				<span>Real Estate</span>
				<span className="right">
					${calculateTotalRealEstate(totalRealEstateNumber)}
				</span>
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
