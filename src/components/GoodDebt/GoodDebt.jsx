import React, { useContext } from "react";
import AssetLiabilityContext from "../../context/AssetLiabilityContext";
import { Table, Popover, OverlayTrigger, Button, Form } from "react-bootstrap";
import calculatePercentage from "../../utils/calculations";

const goodDebtOptions = [
	"Real Estate",
	"Business",
	"Paper",
	"Commodities",
	"Other",
];

const popover = (
	<Popover id="popover-basic">
		<Popover.Title as="h3">Good Debt</Popover.Title>
		<Popover.Content>Debt that is used to buy assets</Popover.Content>
	</Popover>
);

const GoodDebtPopover = () => (
	<OverlayTrigger trigger="click" placement="top" overlay={popover}>
		<Button variant="success" size="sm">
			&#8505;
		</Button>
	</OverlayTrigger>
);

function calculateGoodDebt(totalGoodDebtNumber) {
	if (!totalGoodDebtNumber) return 0;
	if (Number.isInteger(totalGoodDebtNumber)) return totalGoodDebtNumber;
	return totalGoodDebtNumber.toFixed(2);
}

export default function GoodDebt() {
	const {
		totalGoodDebt,
		handleGoodDebtDelete,
		goodDebtFormRef,
		handleGoodDebtSubmit,
		newGoodDebt,
		handleGoodDebtChange,
		goodDebtFormInvalid,
		totalLiabilities,
	} = useContext(AssetLiabilityContext);

	const totalLiabilityNumber = totalLiabilities
		.map((elem) => elem.amount)
		.reduce((acc, num) => acc + num, 0);

	const totalGoodDebtNumber = totalGoodDebt
		.map((elem) => elem.amount)
		.reduce((acc, num) => acc + num, 0);

	return (
		<>
			<h5>
				<span className="left percentage">
					{calculatePercentage(totalLiabilityNumber, totalGoodDebtNumber)}%
				</span>
				<span>
					Good Debt <GoodDebtPopover />
				</span>
				<span className="right">${calculateGoodDebt(totalGoodDebtNumber)}</span>
			</h5>
			{totalGoodDebt.map((gd) => (
				<div key={gd.amount}>
					<Table borderless hover size="sm">
						<tbody>
							<tr>
								<td className="left">
									<Button
										name={gd.amount}
										value={gd._id}
										onClick={handleGoodDebtDelete}
										variant="danger"
										size="sm"
										className="delete"
									>
										X
									</Button>
									{gd.type}
								</td>
								<td className="right">{gd.amount}</td>
							</tr>
						</tbody>
					</Table>
				</div>
			))}
			<Form ref={goodDebtFormRef} onSubmit={handleGoodDebtSubmit}>
				<Form.Row>
					<Form.Group>
						<Form.Control
							name="type"
							value={newGoodDebt.type}
							onChange={handleGoodDebtChange}
							as="select"
							size="sm"
							className="select"
						>
							{goodDebtOptions.map((option) => (
								<option key={option} value={option}>
									{option}
								</option>
							))}
						</Form.Control>
					</Form.Group>
					<Form.Group>
						<Form.Control
							name="amount"
							value={newGoodDebt.amount}
							onChange={handleGoodDebtChange}
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
							value={newGoodDebt.category}
							onChange={handleGoodDebtChange}
						/>
						<Button
							className="form-submission"
							onClick={handleGoodDebtSubmit}
							disabled={goodDebtFormInvalid}
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
