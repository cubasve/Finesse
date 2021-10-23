import React, { useContext } from "react";
import AssetLiabilityContext from "../../context/AssetLiabilityContext";
import { Table, Popover, OverlayTrigger, Button } from "react-bootstrap";
import calculatePercentage from "../../utils/calculations";
import { InfoLg } from "react-bootstrap-icons";
import FormInput from "../common/FormInput";

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
		<Button variant="info" size="sm">
			<InfoLg />
		</Button>
	</OverlayTrigger>
);

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
					{calculatePercentage(totalLiabilityNumber, totalBadDebtNumber)}%
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
			<FormInput
				formRef={badDebtFormRef}
				handleSubmit={handleBadDebtSubmit}
				handleChange={handleBadDebtChange}
				newEntity={newBadDebt}
				options={badDebtOptions}
				placeholder="Debt Value"
				formInvalid={badDebtFormInvalid}
			/>
		</>
	);
}
