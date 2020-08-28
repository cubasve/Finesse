import React from 'react';
import GoodDebt from '../GoodDebt/GoodDebt';
import BadDebt from '../BadDebt/BadDebt';
import Popover from 'react-bootstrap/Popover';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Button from 'react-bootstrap/Button';

const popover = (
    <Popover id="popover-basic">
        <Popover.Title as="h3">Liability</Popover.Title>
        <Popover.Content>Something that takes money out of your pocket</Popover.Content>

    </Popover>
);
const LiabilityPopover = () => (
    <OverlayTrigger trigger="click" placement="right" overlay={popover}>
        <Button variant="success">&#8505;</Button>
    </OverlayTrigger>
)

export default function Liabilities(props) {
    return (
        <div className="border">
            <span className="title">LIABILITIES</span>
            <LiabilityPopover />
            <GoodDebt />
            <BadDebt />
        </div>
    )
}