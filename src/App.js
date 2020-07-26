import React, { Component } from 'react';
import './App.css';
import { Route, Switch, Redirect } from 'react-router-dom';
import FinancialStatement from './components/FinancialStatement/FinancialStatement';
import SignupPage from './pages/SignupPage/SignupPage';
import LoginPage from './pages/LoginPage/LoginPage';
import userService from './utils/userService';

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

const assets = ['Paper', 'Real Estate', 'Business', 'Commodities'];

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
          <Switch>
            <Route exact path="/" render={() => (
              <FinancialStatement />
            )}></Route>
          </Switch>
        </main>
      </div>
    )
  }

}
