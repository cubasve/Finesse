import React, { useContext } from "react";
import AssetLiabilityContext from "../../context/AssetLiabilityContext";
import { Table, Popover, OverlayTrigger, Button } from "react-bootstrap";
import {
	calculatePercentage,
	calculateSum,
	formatAmount,
} from "../../utils/calculations";
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

	const totalLiabilityAmount = calculateSum(totalLiabilities);
	const totalBadDebtAmount = calculateSum(totalBadDebt);

	return (
		<>
			<h5 style={{ display: "flex", justifyContent: "space-between" }}>
				<span className="percentage">
					{calculatePercentage(totalLiabilityAmount, totalBadDebtAmount)}%
				</span>
				<span>
					Bad Debt <BadDebtPopover />
				</span>
				<span>{formatAmount(totalBadDebtAmount)}</span>
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
