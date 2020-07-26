import React, { Component } from 'react';
import './App.css';
import BalanceSheet from './components/BalanceSheet/BalanceSheet';
import IncomeStatement from './components/IncomeStatement/IncomeStatement';

{/* 
COMPONENT STRUCTURE

financialStatements
    balanceSheet
        assets
            paper
            realEstate
            business
            commodities
        liabilities
            goodDebt
            badDebt
    incomeStatement
        income
            earned
            portfolio
            passive
        expenses
            payYourselfFirst
*/ }

export default class App extends Component {
  constructor() {
    super();
    this.state = {

    }
  }


  render() {
    return (
      <div className="App">
        <header className="App-header">FINESSE</header>
        <main>
          <BalanceSheet />
          <IncomeStatement />

        </main>
      </div>
    )
  }

}
