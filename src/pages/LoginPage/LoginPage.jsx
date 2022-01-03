import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./LoginPage.css";
import userService from "../../utils/userService";
import { Card } from "react-bootstrap";
import { Coin } from "react-bootstrap-icons";
import FinancialStatementContext from "../../context/FinancialStatementContext";

export default class LoginPage extends Component {
	state = {
		email: "",
		password: "",
	};

	handleChange = (e) => {
		this.setState({
			[e.target.name]: e.target.value,
		});
	};

	handleSubmit = async (e) => {
		e.preventDefault();
		const { currentMonth, currentYear } = this.context;
		try {
			//Update to call login instead of signup
			await userService.login(this.state);
			this.props.handleSignupOrLogin();
			this.props.history.push(
				`/financialstatement/${currentYear}/${currentMonth}`
			);
		} catch (err) {
			console.error(err);
		}
	};

	render() {
		return (
			<div className="LoginPage">
				<Coin color="blue" size={96} />
				<Card border="dark" style={{ marginTop: 30 }}>
					<Card.Body>
						<Card.Title>LOG IN</Card.Title>
						<Card.Text>
							<form className="form-horizontal" onSubmit={this.handleSubmit}>
								<div className="form-group">
									<div className="col-sm-12">
										<input
											type="email"
											className="form-control"
											placeholder="Email"
											value={this.state.email}
											name="email"
											onChange={this.handleChange}
										/>
									</div>
								</div>
								<div className="form-group">
									<div className="col-sm-12">
										<input
											type="password"
											className="form-control"
											placeholder="Password"
											value={this.state.password}
											name="password"
											onChange={this.handleChange}
										/>
									</div>
								</div>
								<div className="form-group">
									<div className="col-sm-12 text-center">
										<button className="btn btn-default">Log In</button>
										&nbsp;&nbsp;&nbsp;
										<Link to="/">Cancel</Link>
									</div>
								</div>
							</form>
						</Card.Text>
					</Card.Body>
				</Card>
			</div>
		);
	}
}

LoginPage.contextType = FinancialStatementContext;
