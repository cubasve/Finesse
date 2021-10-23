import React, { useContext } from "react";
import { Table, Button } from "react-bootstrap";
import IncomeExpenseContext from "../../context/IncomeExpenseContext";
import calculatePercentage from "../../utils/calculations";
import FormInput from "../common/FormInput";

const portfolioIncomeOptions = [
	"Stock",
	"Bond",
	"Index/Mutual Fund",
	"GIC",
	"REIT",
	"Other",
];

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
					{calculatePercentage(totalIncomeNumber, totalPortfolioIncomeNumber)}%
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
			<FormInput
				formRef={portfolioFormRef}
				handleSubmit={handlePortfolioIncomeSubmit}
				handleChange={handlePortfolioIncomeChange}
				newEntity={newPortfolioIncome}
				options={portfolioIncomeOptions}
				placeholder="Dividend/Interest"
				formInvalid={portfolioFormInvalid}
			/>
		</>
	);
}
