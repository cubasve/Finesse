import React, { Component } from './node_modules/react';
import SignUpForm from '../../components/SignupForm/SignUpForm';
import './SignUpPage.css';

export default class SignUpPage extends Component {
    constructor(props) {
        super(props);
        this.state = { message: '' }
    }

    updateMessage = (msg) => {
        this.setState({ message: msg });
    }

    render() {
        return (
            <div className='SignupPage'>
                <SignUpForm {...this.props} updateMessage={this.updateMessage} />
                <p>{this.state.message}</p>
            </div>
        );
    }
}