import React, { useContext } from "react";
import AssetLiabilityContext from "../../context/AssetLiabilityContext";
import { Table, Popover, OverlayTrigger, Button } from "react-bootstrap";
import calculatePercentage from "../../utils/calculations";
import { InfoLg } from "react-bootstrap-icons";
import FormInput from "../common/FormInput";

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
		<Button variant="info" size="sm">
			<InfoLg />
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
			<FormInput
				formRef={goodDebtFormRef}
				handleSubmit={handleGoodDebtSubmit}
				handleChange={handleGoodDebtChange}
				newEntity={newGoodDebt}
				options={goodDebtOptions}
				placeholder="Debt Value"
				formInvalid={goodDebtFormInvalid}
			/>
		</>
	);
}
