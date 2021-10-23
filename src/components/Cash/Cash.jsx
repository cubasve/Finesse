import React, { useContext } from "react";
import { Table, Button } from "react-bootstrap";
import AssetLiabilityContext from "../../context/AssetLiabilityContext";
import calculatePercentage from "../../utils/calculations";
import FormInput from "../common/FormInput";

const cashOptions = ["Chequing Account", "Savings Account"];

function calculateTotalCash(totalCashNumber) {
	if (!totalCashNumber) return 0;
	if (Number.isInteger(totalCashNumber)) return totalCashNumber;
	return totalCashNumber.toFixed(2);
}

export default function Cash() {
	const {
		totalCash,
		handleCashDelete,
		cashFormRef,
		handleCashSubmit,
		newCash,
		handleCashChange,
		cashFormInvalid,
		totalAssets,
	} = useContext(AssetLiabilityContext);

	const totalAssetNumber = totalAssets
		.map((elem) => elem.amount)
		.reduce((acc, num) => acc + num, 0);

	const totalCashNumber = totalCash
		.map((elem) => elem.amount)
		.reduce((acc, num) => acc + num, 0);

	return (
		<>
			<h5>
				<span className="left percentage">
					{calculatePercentage(totalAssetNumber, totalCashNumber)}%
				</span>
				<span>Cash</span>
				<span className="right">${calculateTotalCash(totalCashNumber)}</span>
			</h5>

			{totalCash.map((ca) => (
				<div key={ca.amount}>
					<Table borderless hover size="sm">
						<tbody>
							<tr>
								<td className="left">
									<Button
										name={ca.amount}
										value={ca._id}
										onClick={handleCashDelete}
										variant="danger"
										size="sm"
										className="delete"
									>
										X
									</Button>
									{ca.type}
								</td>
								<td className="right">{ca.amount}</td>
							</tr>
						</tbody>
					</Table>
				</div>
			))}
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
