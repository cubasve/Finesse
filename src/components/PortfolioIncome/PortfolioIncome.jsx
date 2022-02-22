import React, { useContext } from "react";
import IncomeExpenseContext from "../../context/IncomeExpenseContext";
import {
	calculatePercentage,
	calculateSum,
	formatAmount,
} from "../../utils/calculations";
import FormInput from "../common/FormInput";
import EntityTable from "../common/EntityTable";

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
		updatedPortfolioIncome,
		handlePortfolioIncomeSubmit,
		handlePortfolioIncomeChange,
		handlePortfolioIncomeDelete,
		handleGetCurrentPortfolioIncome,
		handlePortfolioIncomeUpdateChange,
		handlePortfolioIncomeUpdateSubmit,
	} = useContext(IncomeExpenseContext);

	const totalIncomeAmount = calculateSum(totalIncome);
	const totalPortfolioIncomeAmount = calculateSum(totalPortfolioIncome);

	return (
		<>
			<h5
				style={{
					alignItems: "center",
					display: "flex",
					justifyContent: "space-between",
				}}
			>
				<span className="percentage">
					{calculatePercentage(totalIncomeAmount, totalPortfolioIncomeAmount)}%
				</span>
				<span>Portfolio</span>
				<span>{formatAmount(totalPortfolioIncomeAmount)}</span>
			</h5>
			<EntityTable
				totalEntity={totalPortfolioIncome}
				handleUpdateSubmit={handlePortfolioIncomeUpdateSubmit}
				updatedEntity={updatedPortfolioIncome}
				handleUpdateChange={handlePortfolioIncomeUpdateChange}
				options={portfolioIncomeOptions}
				handleGetCurrentEntity={handleGetCurrentPortfolioIncome}
				handleDelete={handlePortfolioIncomeDelete}
			/>
			<FormInput
				formRef={portfolioFormRef}
				handleSubmit={handlePortfolioIncomeSubmit}
				handleChange={handlePortfolioIncomeChange}
				newEntity={newPortfolioIncome}
				options={portfolioIncomeOptions}
				placeholder="Capital Gains"
				formInvalid={portfolioFormInvalid}
			/>
		</>
	);
}
