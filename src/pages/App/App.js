import React, { Component } from 'react';
import './App.css';
import { Route, Switch, Redirect } from 'react-router-dom';
import HomePage from '../HomePage/HomePage';
// import SignupPage from '../SignupPage/SignUpPage'; //for localhost:3000
import SignupPage from '../SignupPage/SignupPage'; //for Heroku deployment

import LoginPage from '../LoginPage/LoginPage';
import userService from '../../utils/userService';
import FinancialStatementPage from '../FinancialStatementPage/FinancialStatementPage';
import NavBar from '../../components/NavBar/NavBar';

export default class App extends Component {

  state = {
    user: userService.getUser(),
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
        <NavBar user={this.state.user} handleLogout={this.handleLogout} />
        <br />
        <br />
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
