import React, { Component } from 'react';
import Assets from '../../components/Assets/Assets';
import Liabilities from '../../components/Liabilities/Liabilities';

export default class BalanceSheet extends Component {
    state = {
        // totalEarnedIncome: [],
        // newEarnedIncome: {
        //     type: 'Job',
        //     amount: '',
        //     category: 'Earned'
        // },
        // formInvalid: true,
    }

    render() {
        return (
            <>
                <Assets />
                <Liabilities />
                EQUITY/NET WORTH = ASSETS - LIABILITIES
                {/* <div>
                    <span className="statement">BALANCE SHEET</span>
                    <Assets />
                    <Liabilities />
                    EQUITY/NET WORTH = ASSETS - LIABILITIES
                </div>
                <div>
                    <span className="statement">INCOME STATEMENT</span>
                    <Income
                        totalEarnedIncome={this.state.totalEarnedIncome}
                        newEarnedIncome={this.state.newEarnedIncome}
                        formInvalid={this.state.formInvalid} />
                    <Expenses />
                    CASH FLOW: INCOME - EXPENSES
                </div> */}
            </>
        )
    }
}