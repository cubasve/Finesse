import React, { useContext } from "react";
import { Table, Form, Button } from "react-bootstrap";
import IncomeExpenseContext from "../../context/IncomeExpenseContext";

const portfolioIncomeOptions = [
	"Stock",
	"Bond",
	"Index/Mutual Fund",
	"GIC",
	"REIT",
	"Other",
];

function calculatePortfolioPercentage(totalIncome, totalPortfolioIncome) {
	if (!totalIncome || !totalPortfolioIncome) return 0;
	const percentage = (totalPortfolioIncome / totalIncome) * 100;
	if (Number.isInteger(percentage)) return percentage;
	const result = percentage.toFixed(1);
	return result;
}

function calculateTotalPortfolioIncome(totalPortfolioIncomeNumber) {
	if (!totalPortfolioIncomeNumber) return 0;
	if (Number.isInteger(totalPortfolioIncomeNumber))
		return totalPortfolioIncomeNumber;
	return totalPortfolioIncomeNumber.toFixed(2);
}

export default function PortfolioIncome() {
	const {
		totalIncome,
		totalPortfolioIncome,
		newPortfolioIncome,
		portfolioFormInvalid,
		portfolioFormRef,
		handlePortfolioIncomeSubmit,
		handlePortfolioIncomeChange,
		handlePortfolioIncomeDelete,
	} = useContext(IncomeExpenseContext);

	const totalIncomeNumber = totalIncome
		.map((elem) => elem.amount)
		.reduce((acc, num) => acc + num, 0);
	const totalPortfolioIncomeNumber = totalPortfolioIncome
		.map((elem) => elem.amount)
		.reduce((acc, num) => acc + num, 0);

	return (
		<>
			<h5>
				<span className="left percentage">
					{calculatePortfolioPercentage(
						totalIncomeNumber,
						totalPortfolioIncomeNumber
					)}
					%
				</span>
				<span>Portfolio</span>
				<span className="right">
					${calculateTotalPortfolioIncome(totalPortfolioIncomeNumber)}
				</span>
			</h5>
			{totalPortfolioIncome.map((pi) => (
				<div key={pi.amount}>
					<Table borderless hover size="sm">
						<tbody>
							<tr>
								<td className="left">
									<Button
										name={pi.amount}
										value={pi._id}
										onClick={handlePortfolioIncomeDelete}
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
			<Form
				ref={portfolioFormRef}
				onSubmit={handlePortfolioIncomeSubmit}
				className="form"
			>
				<Form.Row>
					<Form.Group>
						<Form.Control
							name="type"
							value={newPortfolioIncome.type}
							onChange={handlePortfolioIncomeChange}
							as="select"
							size="sm"
							className="select"
						>
							{portfolioIncomeOptions.map((option) => (
								<option key={option} value={option}>
									{option}
								</option>
							))}
						</Form.Control>
					</Form.Group>
					<Form.Group>
						<Form.Control
							name="amount"
							value={newPortfolioIncome.amount}
							onChange={handlePortfolioIncomeChange}
							required
							pattern="[1-9]\d{0,}\.?\d{0,2}"
							placeholder="Dividend/Interest"
							autoComplete="off"
							size="sm"
						/>
					</Form.Group>
					<Form.Group>
						<Form.Control
							type="hidden"
							name="class"
							value={newPortfolioIncome.class}
							onChange={handlePortfolioIncomeChange}
						/>
					</Form.Group>
					<Form.Group>
						<Form.Control
							type="hidden"
							name="category"
							value={newPortfolioIncome.category}
							onChange={handlePortfolioIncomeChange}
						/>
						<Button
							type="submit"
							className="form-submission"
							onClick={handlePortfolioIncomeSubmit}
							disabled={portfolioFormInvalid}
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
