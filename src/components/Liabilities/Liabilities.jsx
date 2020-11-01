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

export default function Liabilities(props) {
    return (
        <div className="border">
            <span className="title">
                <span>LIABILITIES <LiabilityPopover /></span>
                <span className="right">${props.totalLiabilities.map(elem => elem.amount).reduce((acc, num) => acc + num, 0)}</span>
            </span>

            <GoodDebt
                totalGoodDebt={props.totalGoodDebt}
                newGoodDebt={props.newGoodDebt}
                handleGoodDebtSubmit={props.handleGoodDebtSubmit}
                handleGoodDebtChange={props.handleGoodDebtChange}
                handleGoodDebtDelete={props.handleGoodDebtDelete}
                goodDebtFormInvalid={props.goodDebtFormInvalid}
                goodDebtFormRef={props.goodDebtFormRef}
            />
            <BadDebt
                totalBadDebt={props.totalBadDebt}
                newBadDebt={props.newBadDebt}
                handleBadDebtSubmit={props.handleBadDebtSubmit}
                handleBadDebtChange={props.handleBadDebtChange}
                handleBadDebtDelete={props.handleBadDebtDelete}
                badDebtFormInvalid={props.badDebtFormInvalid}
                badDebtFormRef={props.badDebtFormRef}
            />
        </div>
    )
}