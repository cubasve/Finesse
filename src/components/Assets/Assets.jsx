import React from 'react';
import PaperAssets from '../PaperAssets/PaperAssets';
import RealEstate from '../RealEstate/RealEstate';
import Business from '../Business/Business';
import Commodities from '../Commodities/Commodities'

export default function Assets(props) {
    return (
        <div className="border">
            <span className="title">ASSETS</span>
            <button
                style={{ borderRadius: '50%' }}
            >&#8505;</button>
            <p>CASH: </p>
            <PaperAssets />
            <RealEstate />
            <Business />
            <Commodities />
        </div>
    )
}