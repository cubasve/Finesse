import React, { useContext } from "react";
import { Table, Form, Button } from "react-bootstrap";
import IncomeExpenseContext from "../../context/IncomeExpenseContext";

const passiveIncomeOptions = [
	"Real Estate",
	"Business",
	"Commodities",
	"Royalties",
	"Other",
];

function calculatePassivePercentage(totalIncome, totalPassiveIncome) {
	if (!totalIncome || !totalPassiveIncome) return 0;
	const percentage = (totalPassiveIncome / totalIncome) * 100;
	if (Number.isInteger(percentage)) return percentage;
	const result = percentage.toFixed(1);
	return result;
}

function calculateTotalPassiveIncome(totalPassiveIncomeNumber) {
	if (!totalPassiveIncomeNumber) return 0;
	if (Number.isInteger(totalPassiveIncomeNumber))
		return totalPassiveIncomeNumber;
	return totalPassiveIncomeNumber.toFixed(2);
}

export default function PassiveIncome() {
	const {
		totalIncome,
		totalPassiveIncome,
		newPassiveIncome,
		passiveFormInvalid,
		passiveFormRef,
		handlePassiveIncomeSubmit,
		handlePassiveIncomeChange,
		handlePassiveIncomeDelete,
	} = useContext(IncomeExpenseContext);

	const totalIncomeNumber = totalIncome
		.map((elem) => elem.amount)
		.reduce((acc, num) => acc + num, 0);
	const totalPassiveIncomeNumber = totalPassiveIncome
		.map((elem) => elem.amount)
		.reduce((acc, num) => acc + num, 0);
	return (
		<>
			<h5>
				<span className="left percentage">
					{calculatePassivePercentage(
						totalIncomeNumber,
						totalPassiveIncomeNumber
					)}
					%
				</span>
				<span>Passive</span>
				<span className="right">
					${calculateTotalPassiveIncome(totalPassiveIncomeNumber)}
				</span>
			</h5>
			{totalPassiveIncome.map((pi) => (
				<div key={pi.amount}>
					<Table borderless hover size="sm">
						<tbody>
							<tr>
								<td className="left">
									<Button
										name={pi.amount}
										value={pi._id}
										onClick={handlePassiveIncomeDelete}
										variant="danger"
										size="sm"
										className="delete"
									>
										X
									</Button>
									{pi.type}
								</td>
								<td className="right">{pi.amount}</td>
							</tr>
						</tbody>
					</Table>
				</div>
			))}
			<Form ref={passiveFormRef} onSubmit={handlePassiveIncomeSubmit}>
				<Form.Row>
					<Form.Group>
						<Form.Control
							name="type"
							value={newPassiveIncome.type}
							onChange={handlePassiveIncomeChange}
							as="select"
							size="sm"
							className="select"
						>
							{passiveIncomeOptions.map((option) => (
								<option key={option} value={option}>
									{option}
								</option>
							))}
						</Form.Control>
					</Form.Group>
					<Form.Group>
						<Form.Control
							name="amount"
							value={newPassiveIncome.amount}
							onChange={handlePassiveIncomeChange}
							required
							pattern="[1-9]\d{0,}\.?\d{0,2}"
							autoComplete="off"
							size="sm"
						/>
					</Form.Group>
					<Form.Group>
						<Form.Control
							type="hidden"
							name="class"
							value={newPassiveIncome.class}
							onChange={handlePassiveIncomeChange}
						/>
					</Form.Group>
					<Form.Group>
						<Form.Control
							type="hidden"
							name="category"
							value={newPassiveIncome.category}
							onChange={handlePassiveIncomeChange}
						/>
						<Button
							className="form-submission"
							onClick={handlePassiveIncomeSubmit}
							disabled={passiveFormInvalid}
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
