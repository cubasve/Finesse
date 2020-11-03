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

export default function Liabilities({ totalLiabilities, totalGoodDebt, newGoodDebt, handleGoodDebtSubmit, handleGoodDebtChange, handleGoodDebtDelete, goodDebtFormInvalid, goodDebtFormRef, totalBadDebt, newBadDebt, handleBadDebtSubmit, handleBadDebtChange, handleBadDebtDelete, badDebtFormInvalid, badDebtFormRef }) {
    return (
        <div className="border">
            <span className="title">
                <span>LIABILITIES <LiabilityPopover /></span>
                <span className="right">${totalLiabilities.map(elem => elem.amount).reduce((acc, num) => acc + num, 0)}</span>
            </span>

            <GoodDebt
                totalGoodDebt={totalGoodDebt}
                newGoodDebt={newGoodDebt}
                handleGoodDebtSubmit={handleGoodDebtSubmit}
                handleGoodDebtChange={handleGoodDebtChange}
                handleGoodDebtDelete={handleGoodDebtDelete}
                goodDebtFormInvalid={goodDebtFormInvalid}
                goodDebtFormRef={goodDebtFormRef}
            />
            <BadDebt
                totalBadDebt={totalBadDebt}
                newBadDebt={newBadDebt}
                handleBadDebtSubmit={handleBadDebtSubmit}
                handleBadDebtChange={handleBadDebtChange}
                handleBadDebtDelete={handleBadDebtDelete}
                badDebtFormInvalid={badDebtFormInvalid}
                badDebtFormRef={badDebtFormRef}
            />
        </div>
    )
}