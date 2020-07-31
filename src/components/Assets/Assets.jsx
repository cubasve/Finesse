import React from 'react';
import PaperAssets from '../PaperAssets/PaperAssets';
import RealEstate from '../RealEstate/RealEstate';
import Business from '../Business/Business';
import Commodities from '../Commodities/Commodities'

export default function Assets(props) {
    return (
        <div className="border">
            <span className="title">ASSETS</span>
            {/* <button
                type="button"
                className="btn"
                data-toggle="popver"
                title="ASSET"
                data-content="Something that puts money in your pocket" 
            style={{ borderRadius: '50%' }} */}
            <button>&#8505;</button>
            <p>CASH: </p>
            <PaperAssets />
            <RealEstate />
            <Business />
            <Commodities />
        </div>
    )
}