import React, { useContext } from "react";
import { Table, Button } from "react-bootstrap";
import IncomeExpenseContext from "../../context/IncomeExpenseContext";
import calculatePercentage from "../../utils/calculations";
import FormInput from "../common/FormInput";

const passiveIncomeOptions = [
	"Real Estate",
	"Business",
	"Commodities",
	"Royalties",
	"Other",
];

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
					{calculatePercentage(totalIncomeNumber, totalPassiveIncomeNumber)}%
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
