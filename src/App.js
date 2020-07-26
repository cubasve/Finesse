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
          <Route exact path="/" render={() => (
            <main><FinancialStatement user={this.state.user} handleLogout={this.handleLogout} /></main>
          )}></Route>

          <Route exact path="/signup" render={({ history }) => <SignupPage history={history} handleSignupOrLogin={this.handleSignupOrLogin} />}></Route>

          <Route exact path="/login" render={({ history }) => <LoginPage history={history} handleSignupOrLogin={this.handleSignupOrLogin} />}></Route>

        </Switch>
      </div>
    );
  }

}
