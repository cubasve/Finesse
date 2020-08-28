import React from 'react';
import PaperAssets from '../PaperAssets/PaperAssets';
import RealEstate from '../RealEstate/RealEstate';
import Business from '../Business/Business';
import Commodities from '../Commodities/Commodities'
import Popover from 'react-bootstrap/Popover';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Button from 'react-bootstrap/Button';

const popover = (
    <Popover id="popover-basic">
        <Popover.Title as="h3">Asset</Popover.Title>
        <Popover.Content>Something that puts money in your pocket</Popover.Content>

    </Popover>
);
const AssetPopover = () => (
    <OverlayTrigger trigger="click" placement="right" overlay={popover}>
        <Button variant="success">&#8505;</Button>
        {/* //<button>&#8505;</button> */}
    </OverlayTrigger>
)

export default function Assets(props) {
    return (
        <div className="border">
            <span className="title">ASSETS</span>
            <AssetPopover />

            {/* <button
                type="button"
                className="btn"
                data-toggle="popver"
                title="ASSET"
                data-content="Something that puts money in your pocket" 
            style={{ borderRadius: '50%' }} */}
            {/* <button>&#8505;</button> */}
            <p>CASH: </p>
            <PaperAssets />
            <RealEstate />
            <Business />
            <Commodities />
        </div>
    )
}