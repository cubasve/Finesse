import React, { Component } from "react";
import "./App.css";
import { Route, Switch, Redirect } from "react-router-dom";
import HomePage from "../HomePage/HomePage";
// import SignupPage from '../SignupPage/SignUpPage'; //for localhost:3000
import SignupPage from "../SignupPage/SignupPage"; //for Heroku deployment
import FinancialStatementContext from "../../context/FinancialStatementContext";
import LoginPage from "../LoginPage/LoginPage";
import userService from "../../utils/userService";
import FinancialStatementPage from "../FinancialStatementPage/FinancialStatementPage";
import TfsaPage from "../TfsaPage/TfsaPage";
import NavBar from "../../components/NavBar/NavBar";
import OverviewPage from "../OverviewPage/OverviewPage";
import { IncomeExpenseProvider } from "../../context/IncomeExpenseContext";
import { AssetLiabilityProvider } from "../../context/AssetLiabilityContext";

export default class App extends Component {
	state = {
		user: userService.getUser(),
	};

	handleLogout = () => {
		userService.logout();
		this.setState({ user: null });
	};

	handleSignupOrLogin = async () => {
		this.setState({ user: userService.getUser() });
	};

	render() {
		const { month, year } = this.context;

		return (
			<IncomeExpenseProvider>
				<AssetLiabilityProvider>
					<div className="App">
						<NavBar user={this.state.user} handleLogout={this.handleLogout} />
						<br />
						<br />
						<Switch>
							<Route
								exact
								path="/"
								render={() => (
									<HomePage
										user={this.state.user}
										handleLogout={this.handleLogout}
									/>
								)}
							></Route>

							<Route
								exact
								path={`/financialstatement/${year}/${month}`}
								render={() =>
									userService.getUser() ? (
										<main>
											<FinancialStatementPage />
										</main>
									) : (
										<Redirect to="/login" />
									)
								}
							></Route>

							<Route
								exact
								path="/tfsa"
								render={() =>
									userService.getUser() ? <TfsaPage /> : <Redirect to="login" />
								}
							/>

							<Route
								exact
								path="/signup"
								render={({ history }) => (
									<SignupPage
										history={history}
										handleSignupOrLogin={this.handleSignupOrLogin}
									/>
								)}
							></Route>

							<Route
								exact
								path="/login"
								render={({ history }) => (
									<LoginPage
										history={history}
										handleSignupOrLogin={this.handleSignupOrLogin}
									/>
								)}
							></Route>

							<Route
								exact
								path="/overview"
								render={() =>
									userService.getUser() ? (
										<OverviewPage />
									) : (
										<Redirect to="login" />
									)
								}
							/>
						</Switch>
					</div>
				</AssetLiabilityProvider>
			</IncomeExpenseProvider>
		);
	}
}
App.contextType = FinancialStatementContext;
