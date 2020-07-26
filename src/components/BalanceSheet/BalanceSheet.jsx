import React from 'react';
// import './BalanceSheet.css'
import Assets from '../Assets/Assets';
import Liabilities from '../Liabilities/Liabilities';


export default function BalanceSheet(props) {
    return (
        <div>
            Balance Sheet
            <Assets assets={props.assets} />
            <Liabilities />
        </div>
    )
}