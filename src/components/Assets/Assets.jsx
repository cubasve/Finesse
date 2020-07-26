import React from 'react';
import PaperAssets from '../PaperAssets/PaperAssets';
import RealEstate from '../RealEstate/RealEstate';
import Business from '../Business/Business';
import Commodities from '../Commodities/Commodities'

export default function Assets(props) {
    return (
        <div>
            Assets
            {/* {
                props.assets.map((asset, index) => (
                    <p key={asset}>{asset}</p>
                ))
            } */}

            <PaperAssets />
            <RealEstate />
            <Business />
            <Commodities />
        </div>
    )
}