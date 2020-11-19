import React from 'react';
import GoodDebt from '../GoodDebt/GoodDebt';
import BadDebt from '../BadDebt/BadDebt';
import { Popover, OverlayTrigger, Button } from 'react-bootstrap';

const popover = (
    <Popover id="popover-basic">
        <Popover.Title as="h3">Liability</Popover.Title>
        <Popover.Content>Something that takes money out of your pocket</Popover.Content>

    </Popover>
);
const LiabilityPopover = () => (
    <OverlayTrigger trigger="click" placement="top" overlay={popover}>
        <Button variant="success" size="sm">&#8505;</Button>
    </OverlayTrigger>
)

function calculateTotalLiability(totalLiabilityNumber) {
    if (!totalLiabilityNumber) return 0;
    if (Number.isInteger(totalLiabilityNumber)) return totalLiabilityNumber;
    return totalLiabilityNumber.toFixed(2);
}

export default function Liabilities({ totalLiabilities, totalGoodDebt, newGoodDebt, handleGoodDebtSubmit, handleGoodDebtChange, handleGoodDebtDelete, goodDebtFormInvalid, goodDebtFormRef, totalBadDebt, newBadDebt, handleBadDebtSubmit, handleBadDebtChange, handleBadDebtDelete, badDebtFormInvalid, badDebtFormRef }) {

    const totalLiabilityNumber = totalLiabilities.map(elem => elem.amount).reduce((acc, num) => acc + num, 0);

    return (
        <div className="border">
            <span className="title">
                <span>LIABILITIES <LiabilityPopover /></span>
                {/* <span className="right">${totalLiabilities.map(elem => elem.amount).reduce((acc, num) => acc + num, 0)}</span> */}
                <span className="right">${calculateTotalLiability(totalLiabilityNumber)}</span>
            </span>

            <GoodDebt
                totalGoodDebt={totalGoodDebt}
                newGoodDebt={newGoodDebt}
                handleGoodDebtSubmit={handleGoodDebtSubmit}
                handleGoodDebtChange={handleGoodDebtChange}
                handleGoodDebtDelete={handleGoodDebtDelete}
                goodDebtFormInvalid={goodDebtFormInvalid}
                goodDebtFormRef={goodDebtFormRef}
                totalLiabilities={totalLiabilities}
            />
            <BadDebt
                totalBadDebt={totalBadDebt}
                newBadDebt={newBadDebt}
                handleBadDebtSubmit={handleBadDebtSubmit}
                handleBadDebtChange={handleBadDebtChange}
                handleBadDebtDelete={handleBadDebtDelete}
                badDebtFormInvalid={badDebtFormInvalid}
                badDebtFormRef={badDebtFormRef}
                totalLiabilities={totalLiabilities}
            />
        </div>
    )
}