import React, { useContext } from "react";
import AssetLiabilityContext from "../../context/AssetLiabilityContext";
import { Popover, OverlayTrigger } from "react-bootstrap";
import {
	calculatePercentage,
	calculateSum,
	formatAmount,
} from "../../utils/calculations";
import { InfoCircle } from "react-bootstrap-icons";
import FormInput from "../common/FormInput";
import EntityTable from "../common/EntityTable";

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
		<InfoCircle color="black" style={{ cursor: "pointer" }} />
	</OverlayTrigger>
);

export default function BadDebt() {
	const {
		totalBadDebt,
		handleBadDebtDelete,
		badDebtFormRef,
		handleBadDebtSubmit,
		newBadDebt,
		updatedBadDebt,
		handleBadDebtChange,
		badDebtFormInvalid,
		handleGetCurrentBadDebt,
		handleBadDebtUpdateChange,
		handleBadDebtUpdateSubmit,
		totalLiabilities,
	} = useContext(AssetLiabilityContext);

	const totalLiabilityAmount = calculateSum(totalLiabilities);
	const totalBadDebtAmount = calculateSum(totalBadDebt);

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
					{calculatePercentage(totalLiabilityAmount, totalBadDebtAmount)}%
				</span>
				<span>
					Bad Debt <BadDebtPopover />
				</span>
				<span>{formatAmount(totalBadDebtAmount)}</span>
			</h5>
			<EntityTable
				totalEntity={totalBadDebt}
				handleUpdateSubmit={handleBadDebtUpdateSubmit}
				updatedEntity={updatedBadDebt}
				handleUpdateChange={handleBadDebtUpdateChange}
				options={badDebtOptions}
				handleGetCurrentEntity={handleGetCurrentBadDebt}
				handleDelete={handleBadDebtDelete}
			/>
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
