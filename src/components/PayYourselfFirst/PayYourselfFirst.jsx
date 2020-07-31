import React, { Component } from 'react';

export default class PayYourselfFirst extends Component {

    // state = {
    //     payYourselfFirst: '',
    //     formInvalid: true,
    // }
    // formRef = React.createRef();

    // handleSubmit = e => {
    //     e.preventDefault();
    //     if (!this.formRef.current.checkValidity()) return;
    //     this.setState(state => ({
    //         payYourselfFirst: e.target.value
    //     }))
    // }

    // handleChange = e => {
    //     const payYourselfFirst = { [e.target.name]: e.target.value }
    //     this.setState({ payYourselfFirst: payYourselfFirst, formInvalid: !this.formRef.current.checkValidity() })
    // }

    render() {
        return (
            <div>
                <h5>Pay Yourself First</h5>

                {/* <form ref={this.formRef} onSubmit={this.handleSubmit} >
                    <label>
                        <input
                            name="percentage"
                            value={this.state.payYourselfFirst}
                            onChange={this.handleChange}
                            required
                            pattern="[1-9]\d{0,2}"
                            autocomplete="off"
                        />
                    </label>
                    <button
                        className="form-submission"
                        onClick={this.handleSubmit}
                        disabled={this.state.formInvalid}
                    >+</button>
                </form > */}

            </div>
        )
    }
}