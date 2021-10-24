import React, { useContext } from "react";
import { Table, Button } from "react-bootstrap";
import IncomeExpenseContext from "../../context/IncomeExpenseContext";
import {
	calculatePercentage,
	determineTotalAmount,
	showTotalAmount,
} from "../../utils/calculations";
import FormInput from "../common/FormInput";

const passiveIncomeOptions = [
	"Real Estate",
	"Business",
	"Commodities",
	"Royalties",
	"Other",
];

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

	const totalIncomeAmount = determineTotalAmount(totalIncome);
	const totalPassiveIncomeAmount = determineTotalAmount(totalPassiveIncome);

	return (
		<>
			<h5 style={{ display: "flex", justifyContent: "space-between" }}>
				<span className="percentage">
					{calculatePercentage(totalIncomeAmount, totalPassiveIncomeAmount)}%
				</span>
				<span>Passive</span>
				<span>${showTotalAmount(totalPassiveIncomeAmount)}</span>
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
			<FormInput
				formRef={passiveFormRef}
				handleSubmit={handlePassiveIncomeSubmit}
				handleChange={handlePassiveIncomeChange}
				newEntity={newPassiveIncome}
				options={passiveIncomeOptions}
				placeholder=""
				formInvalid={passiveFormInvalid}
			/>
		</>
	);
}
