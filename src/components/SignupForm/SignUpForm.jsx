import React, { Component } from "react";
import { Link } from "react-router-dom";
import userService from "../../utils/userService.js";
import { Card } from "react-bootstrap";
import { CashCoin } from "react-bootstrap-icons";

export default class SignUpForm extends Component {
	state = {
		name: "",
		email: "",
		password: "",
		passwordConfirmation: "",
	};

	handleChange = (e) => {
		this.props.updateMessage("");
		this.setState({
			[e.target.name]: e.target.value,
		});
	};

	handleSubmit = async (e) => {
		e.preventDefault();
		try {
			await userService.signup(this.state);
			this.props.handleSignupOrLogin();
			//Successfully signed up
			this.props.handleSignupOrLogin();
			this.props.history.push("/");
		} catch (err) {
			//Invalid user data (probably duplicate email)
			this.props.updateMessage(err.message);
		}
	};

	isFormInvalid() {
		return !(
			this.state.name &&
			this.state.email &&
			this.state.password === this.state.passwordConfirmation
		);
	}

	render() {
		return (
			<div>
				<CashCoin color="maroon" size={96} />
				<Card border="dark" style={{ marginTop: 30 }}>
					<Card.Body>
						<Card.Title>SIGN UP</Card.Title>
						<Card.Text>
							<form className="form-horizontal" onSubmit={this.handleSubmit}>
								<div className="form-group">
									<div className="col-sm-12">
										<input
											type="text"
											className="form-control"
											placeholder="Name"
											value={this.state.name}
											name="name"
											onChange={this.handleChange}
										/>
									</div>
								</div>
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
									<div className="col-sm-12">
										<input
											type="password"
											className="form-control"
											placeholder="Confirm Password"
											value={this.state.passwordConfirmation}
											name="passwordConfirmation"
											onChange={this.handleChange}
										/>
									</div>
								</div>
								<div className="form-group">
									<div className="col-sm-12 text-center">
										<button
											className="btn btn-default"
											disabled={this.isFormInvalid()}
										>
											Sign Up
										</button>
										&nbsp;&nbsp;
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
