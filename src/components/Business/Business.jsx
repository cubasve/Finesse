import React from "react";
import { Table, Form, Button } from "react-bootstrap";
import AssetLiabilityContext from "../../context/AssetLiabilityContext";

const businessOptions = ["Sole proprietorship", "Partnership", "Corporation"];

function calculateBusinessPercentage(totalAssets, totalBusiness) {
	if (!totalAssets || !totalBusiness) return 0;
	const percentage = (totalBusiness / totalAssets) * 100;
	if (Number.isInteger(percentage)) return percentage;
	const result = percentage.toFixed(1);
	return result;
}

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
					{calculateBusinessPercentage(totalAssetNumber, totalBusinessNumber)}%
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
			<Form ref={businessFormRef} onSubmit={handleBusinessSubmit}>
				<Form.Row>
					<Form.Group>
						<Form.Control
							name="type"
							value={newBusiness.type}
							onChange={handleBusinessChange}
							as="select"
							size="sm"
							className="select"
						>
							{businessOptions.map((option) => (
								<option key={option} value={option}>
									{option}
								</option>
							))}
						</Form.Control>
					</Form.Group>
					<Form.Group>
						<Form.Control
							name="amount"
							value={newBusiness.amount}
							onChange={handleBusinessChange}
							pattern="[1-9]\d{0,}\.?\d{0,2}"
							required
							placeholder="Company Value"
							autoComplete="off"
							size="sm"
						/>
					</Form.Group>
					<Form.Group>
						<Form.Control
							type="hidden"
							name="category"
							value={newBusiness.category}
							onChange={handleBusinessChange}
						/>
						<Button
							className="form-submission"
							onClick={handleBusinessSubmit}
							disabled={businessFormInvalid}
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
