import React from 'react';
import PaperAssets from '../PaperAssets/PaperAssets';
import RealEstate from '../RealEstate/RealEstate';
import Business from '../Business/Business';
import Commodities from '../Commodities/Commodities'

export default function Assets(props) {
    return (
        <div>
            Assets
            <PaperAssets />
            <RealEstate />
            <Business />
            <Commodities />
        </div>
    )
}