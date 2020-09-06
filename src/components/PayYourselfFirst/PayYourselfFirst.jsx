import React, { Component } from 'react';
import Popover from 'react-bootstrap/Popover';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Button from 'react-bootstrap/Button';

const popover = (
    <Popover id="popover-basic">
        <Popover.Title as="h3">Pay Yourself First</Popover.Title>
        <Popover.Content>Prioritize your financial future by deducting a percentage of your paycheque FIRST before you pay for other expenses. As your income increases, this percentage should increase accordingly.</Popover.Content>
    </Popover>
);

const PayYourselfPopover = () => (
    <OverlayTrigger trigger="click" placement="right" overlay={popover}>
        <Button variant="success" size="sm">&#8505;</Button>
    </OverlayTrigger>
)

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
                <h5>
                    <span>Pay Yourself First </span>
                    <PayYourselfPopover />
                </h5>


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