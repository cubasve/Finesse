import React, { useContext } from "react";
import { Table, Button } from "react-bootstrap";
import AssetLiabilityContext from "../../context/AssetLiabilityContext";
import calculatePercentage from "../../utils/calculations";
import FormInput from "../common/FormInput";

const businessOptions = ["Sole proprietorship", "Partnership", "Corporation"];

function calculateTotalBusiness(totalBusinessNumber) {
	if (!totalBusinessNumber) return 0;
	if (Number.isInteger(totalBusinessNumber)) return totalBusinessNumber;
	return totalBusinessNumber.toFixed(2);
}

export default function Business() {
	const {
		totalBusiness,
		handleBusinessDelete,
		businessFormRef,
		handleBusinessSubmit,
		newBusiness,
		handleBusinessChange,
		businessFormInvalid,
		totalAssets,
	} = useContext(AssetLiabilityContext);

	const totalAssetNumber = totalAssets
		.map((elem) => elem.amount)
		.reduce((acc, num) => acc + num, 0);

	const totalBusinessNumber = totalBusiness
		.map((elem) => elem.amount)
		.reduce((acc, num) => acc + num, 0);

	return (
		<>
			<h5>
				<span className="left percentage">
					{calculatePercentage(totalAssetNumber, totalBusinessNumber)}%
				</span>
				<span>Business</span>
				<span className="right">
					${calculateTotalBusiness(totalBusinessNumber)}
				</span>
			</h5>
			{totalBusiness.map((b) => (
				<div key={b.amount}>
					<Table borderless hover size="sm">
						<tbody>
							<tr>
								<td className="left">
									<Button
										name={b.amount}
										value={b._id}
										onClick={handleBusinessDelete}
										variant="danger"
										size="sm"
										className="delete"
									>
										X
									</Button>
									{b.type}
								</td>
								<td className="right">{b.amount}</td>
							</tr>
						</tbody>
					</Table>
				</div>
			))}
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
