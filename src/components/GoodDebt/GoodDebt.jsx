import React, { useContext } from "react";
import AssetLiabilityContext from "../../context/AssetLiabilityContext";
import { Popover, OverlayTrigger, Button } from "react-bootstrap";
import {
	calculatePercentage,
	calculateSum,
	formatAmount,
} from "../../utils/calculations";
import { InfoLg } from "react-bootstrap-icons";
import FormInput from "../common/FormInput";
import EntityTable from "../common/EntityTable";

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
		<Button variant="info" size="sm" style={{ borderRadius: 50 }}>
			<InfoLg />
		</Button>
	</OverlayTrigger>
);

export default function GoodDebt() {
	const {
		totalGoodDebt,
		handleGoodDebtDelete,
		goodDebtFormRef,
		handleGoodDebtSubmit,
		newGoodDebt,
		updatedGoodDebt,
		handleGoodDebtChange,
		goodDebtFormInvalid,
		handleGetCurrentGoodDebt,
		handleGoodDebtUpdateChange,
		handleGoodDebtUpdateSubmit,
		totalLiabilities,
	} = useContext(AssetLiabilityContext);

	const totalLiabilityAmount = calculateSum(totalLiabilities);
	const totalGoodDebtAmount = calculateSum(totalGoodDebt);

	return (
		<>
			<h5 style={{ display: "flex", justifyContent: "space-between" }}>
				<span className="percentage">
					{calculatePercentage(totalLiabilityAmount, totalGoodDebtAmount)}%
				</span>
				<span>
					Good Debt <GoodDebtPopover />
				</span>
				<span>{formatAmount(totalGoodDebtAmount)}</span>
			</h5>
			<EntityTable
				totalEntity={totalGoodDebt}
				handleUpdateSubmit={handleGoodDebtUpdateSubmit}
				updatedEntity={updatedGoodDebt}
				handleUpdateChange={handleGoodDebtUpdateChange}
				options={goodDebtOptions}
				handleGetCurrentEntity={handleGetCurrentGoodDebt}
				handleDelete={handleGoodDebtDelete}
			/>
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
