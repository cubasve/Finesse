import React, { useContext } from "react";
import { Table, Form, Button } from "react-bootstrap";
import AssetLiabilityContext from "../../context/AssetLiabilityContext";

const cashOptions = ["Chequing Account", "Savings Account"];

function calculateCashPercentage(totalAssets, totalCash) {
	if (!totalAssets || !totalCash) return 0;
	const percentage = (totalCash / totalAssets) * 100;
	if (Number.isInteger(percentage)) return percentage;
	const result = percentage.toFixed(1);
	return result;
}

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
					{calculateCashPercentage(totalAssetNumber, totalCashNumber)}%
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

			<Form ref={cashFormRef} onSubmit={handleCashSubmit}>
				<Form.Row>
					<Form.Group>
						<Form.Control
							name="type"
							value={newCash.type}
							onChange={handleCashChange}
							as="select"
							size="sm"
							className="select"
						>
							{cashOptions.map((option) => (
								<option key={option} value={option}>
									{option}
								</option>
							))}
						</Form.Control>
					</Form.Group>
					<Form.Group>
						<Form.Control
							name="amount"
							value={newCash.amount}
							onChange={handleCashChange}
							required
							pattern="[1-9]\d{0,}\.?\d{0,2}"
							placeholder="Bank Accounts"
							autoComplete="off"
							size="sm"
						/>
					</Form.Group>
					<Form.Group>
						<Form.Control
							type="hidden"
							name="category"
							value={newCash.category}
							onChange={handleCashChange}
						/>
						<Button
							className="form-submission"
							onClick={handleCashSubmit}
							disabled={cashFormInvalid}
							size="sm"
						>
							ADD
						</Button>
					</Form.Group>
				</Form.Row>
			</Form>
		</>
	);
}
