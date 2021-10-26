import React, { useContext } from "react";
import { Table, Button } from "react-bootstrap";
import IncomeExpenseContext from "../../context/IncomeExpenseContext";
import {
	calculatePercentage,
	calculateSum,
	formatAmount,
} from "../../utils/calculations";
import FormInput from "../common/FormInput";

const portfolioIncomeOptions = [
	"Stock",
	"Bond",
	"Index/Mutual Fund",
	"GIC",
	"REIT",
	"Other",
];

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

	const totalIncomeAmount = calculateSum(totalIncome);
	const totalPortfolioIncomeAmount = calculateSum(totalPortfolioIncome);

	return (
		<>
			<h5 style={{ display: "flex", justifyContent: "space-between" }}>
				<span className="percentage">
					{calculatePercentage(totalIncomeAmount, totalPortfolioIncomeAmount)}%
				</span>
				<span>Portfolio</span>
				<span>{formatAmount(totalPortfolioIncomeAmount)}</span>
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
										&#9985;
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
