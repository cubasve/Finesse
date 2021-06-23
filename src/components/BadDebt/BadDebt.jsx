import React from "react";
import AssetLiabilityContext from "../../context/AssetLiabilityContext";
import { Table, Popover, OverlayTrigger, Button, Form } from "react-bootstrap";

const badDebtOptions = [
	"Home Mortgage",
	"Car Loans",
	"Credit Cards",
	"School Loans",
	"Other",
];

const popover = (
	<Popover id="popover-basic">
		<Popover.Title as="h3">Bad Debt</Popover.Title>
		<Popover.Content>Debt that is used to buy liabilities</Popover.Content>
	</Popover>
);

const BadDebtPopover = () => (
	<OverlayTrigger trigger="click" placement="top" overlay={popover}>
		<Button variant="success" size="sm">
			&#8505;
		</Button>
	</OverlayTrigger>
);

function calculateBadDebtPercentage(totalLiabilities, totalBadDebt) {
	if (!totalLiabilities || !totalBadDebt) return 0;
	const percentage = (totalBadDebt / totalLiabilities) * 100;
	if (Number.isInteger(percentage)) return percentage;
	const result = percentage.toFixed(1);
	return result;
}

function calculateBadDebt(totalBadDebtNumber) {
	if (!totalBadDebtNumber) return 0;
	if (Number.isInteger(totalBadDebtNumber)) return totalBadDebtNumber;
	return totalBadDebtNumber.toFixed(2);
}

export default function BadDebt() {
	const {
		totalBadDebt,
		handleBadDebtDelete,
		badDebtFormRef,
		handleBadDebtSubmit,
		newBadDebt,
		handleBadDebtChange,
		badDebtFormInvalid,
		totalLiabilities,
	} = useContext(AssetLiabilityContext);

	const totalLiabilityNumber = totalLiabilities
		.map((elem) => elem.amount)
		.reduce((acc, num) => acc + num, 0);

	const totalBadDebtNumber = totalBadDebt
		.map((elem) => elem.amount)
		.reduce((acc, num) => acc + num, 0);

	return (
		<>
			<h5>
				<span className="left percentage">
					{calculateBadDebtPercentage(totalLiabilityNumber, totalBadDebtNumber)}
					%
				</span>
				<span>
					Bad Debt <BadDebtPopover />
				</span>
				<span className="right">${calculateBadDebt(totalBadDebtNumber)}</span>
			</h5>
			{totalBadDebt.map((bd) => (
				<div key={bd.amount}>
					<Table borderless hover size="sm">
						<tbody>
							<tr>
								<td className="left">
									<Button
										name={bd.amount}
										value={bd._id}
										onClick={handleBadDebtDelete}
										variant="danger"
										size="sm"
										className="delete"
									>
										X
									</Button>
									{bd.type}
								</td>
								<td className="right">{bd.amount}</td>
							</tr>
						</tbody>
					</Table>
				</div>
			))}
			<Form ref={badDebtFormRef} onSubmit={handleBadDebtSubmit}>
				<Form.Row>
					<Form.Group>
						<Form.Control
							name="type"
							value={newBadDebt.type}
							onChange={handleBadDebtChange}
							as="select"
							size="sm"
							className="select"
						>
							{badDebtOptions.map((option) => (
								<option key={option} value={option}>
									{option}
								</option>
							))}
						</Form.Control>
					</Form.Group>
					<Form.Group>
						<Form.Control
							name="amount"
							value={newBadDebt.amount}
							onChange={handleBadDebtChange}
							required
							pattern="[1-9]\d{0,}\.?\d{0,2}"
							placeholder="Debt Value"
							autoComplete="off"
							size="sm"
						/>
					</Form.Group>
					<Form.Group>
						<Form.Control
							type="hidden"
							name="category"
							value={newBadDebt.category}
							onChange={handleBadDebtChange}
						/>
						<Button
							className="form-submission"
							onClick={handleBadDebtSubmit}
							disabled={badDebtFormInvalid}
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
