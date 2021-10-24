import React, { useContext } from "react";
import { Table, Button } from "react-bootstrap";
import AssetLiabilityContext from "../../context/AssetLiabilityContext";
import {
	calculatePercentage,
	determineTotalAmount,
	showTotalAmount,
} from "../../utils/calculations";
import FormInput from "../common/FormInput";

const cashOptions = ["Chequing Account", "Savings Account"];

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

	const totalAssetAmount = determineTotalAmount(totalAssets);
	const totalCashAmount = determineTotalAmount(totalCash);

	return (
		<>
			<h5 style={{ display: "flex", justifyContent: "space-between" }}>
				<span className="percentage">
					{calculatePercentage(totalAssetAmount, totalCashAmount)}%
				</span>
				<span>Cash</span>
				<span>${showTotalAmount(totalCashAmount)}</span>
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
