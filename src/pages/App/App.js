import React, { Component } from 'react';
import './App.css';
import { Route, Switch, Redirect } from 'react-router-dom';
import HomePage from '../HomePage/HomePage';
import FinancialStatement from '../FinancialStatementPage/FinancialStatementPage';
import SignupPage from '../SignupPage/SignupPage';
import LoginPage from '../LoginPage/LoginPage';
import userService from '../../utils/userService';

{/* 
COMPONENT STRUCTURE

signup
login
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
      user: userService.getUser(),
    }
  }

  handleLogout = () => {
    userService.logout();
    this.setState({ user: null });
  }

  handleSignupOrLogin = async () => {
    this.setState({ user: userService.getUser() });
  };

  render() {
    return (
      <div className="App">
        <header className="App-header">FINESSE</header>
        <Switch>
          <Route exact path="/" render={() => <HomePage user={this.state.user} handleLogout={this.handleLogout} />}></Route>

          <Route exact path="/FinancialStatement" render={() => (
            <main><FinancialStatement /></main>
          )}></Route>

          <Route exact path="/signup" render={({ history }) => <SignupPage history={history} handleSignupOrLogin={this.handleSignupOrLogin} />}></Route>

          <Route exact path="/login" render={({ history }) => <LoginPage history={history} handleSignupOrLogin={this.handleSignupOrLogin} />}></Route>

        </Switch>
      </div>
    );
  }

}
