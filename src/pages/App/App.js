import React, { Component } from 'react';
import './App.css';
import { Route, Switch, Redirect } from 'react-router-dom';
import HomePage from '../HomePage/HomePage';
import SignupPage from '../SignupPage/SignupPage';
import LoginPage from '../LoginPage/LoginPage';
import userService from '../../utils/userService';
import FinancialStatementPage from '../FinancialStatementPage/FinancialStatementPage';
import NavBar from '../../components/NavBar/NavBar';

{/* 
COMPONENT STRUCTURE

HomePage
    NavBar
Signup
    SignupForm
Login
FinancialStatements
    Assets
        Paper
        RealEstate
        Business
        Commodities
    Liabilities
        GoodDebt
        BadDebt
    Income
        Earned
        Portfolio
        Passive
    Expenses
        PayYourselfFirst
*/ }

export default class App extends Component {

  state = {
    user: userService.getUser(),
    earnedIncomeStreams: [],
    newEarnedIncome: {
      earnedIncome: '',
      amountEarned: '',
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
        <NavBar user={this.state.user} handleLogout={this.handleLogout} />
        <Switch>

          <Route exact path="/" render={() => <HomePage user={this.state.user} handleLogout={this.handleLogout} />}></Route>

          <Route exact path="/financialstatement" render={() => (
            userService.getUser() ?
              <main>
                <FinancialStatementPage />
              </main>
              :
              <Redirect to='/login' />
          )}>
          </Route>

          <Route exact path="/signup" render={({ history }) => <SignupPage history={history} handleSignupOrLogin={this.handleSignupOrLogin} />}></Route>

          <Route exact path="/login" render={({ history }) => <LoginPage history={history} handleSignupOrLogin={this.handleSignupOrLogin} />}></Route>

        </Switch>
      </div>
    );
  }

}
