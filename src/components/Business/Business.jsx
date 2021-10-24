import React, { useContext } from "react";
import { Table, Button } from "react-bootstrap";
import AssetLiabilityContext from "../../context/AssetLiabilityContext";
import {
	calculatePercentage,
	determineTotalAmount,
	showTotalAmount,
} from "../../utils/calculations";
import FormInput from "../common/FormInput";

const businessOptions = ["Sole proprietorship", "Partnership", "Corporation"];

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

	const totalAssetAmount = determineTotalAmount(totalAssets);
	const totalBusinessAmount = determineTotalAmount(totalBusiness);

	return (
		<>
			<h5 style={{ display: "flex", justifyContent: "space-between" }}>
				<span className="percentage">
					{calculatePercentage(totalAssetAmount, totalBusinessAmount)}%
				</span>
				<span>Business</span>
				<span>${showTotalAmount(totalBusinessAmount)}</span>
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
