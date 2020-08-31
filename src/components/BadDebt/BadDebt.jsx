import React, { Component } from 'react';
import financialStatementService from '../../utils/financialStatementService';
import Table from 'react-bootstrap/Table';
import Popover from 'react-bootstrap/Popover';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Button from 'react-bootstrap/Button';

const badDebtOptions = ['Home Mortgage', 'Car Loans', 'Credit Cards', 'School Loans', 'Other'];

const popover = (
    <Popover id="popover-basic">
        <Popover.Title as="h3">Bad Debt</Popover.Title>
        <Popover.Content>Debt that is used to buy liabilities</Popover.Content>
    </Popover>
);

const BadDebtPopover = () => (
    <OverlayTrigger trigger="click" placement="right" overlay={popover}>
        <Button variant="success">&#8505;</Button>
    </OverlayTrigger>
);

export default class BadDebt extends Component {
    state = {
        totalBadDebt: [],
        newBadDebt: {
            type: 'Home Mortgage',
            amount: '',
            category: 'BadDebt'
        },
        formInvalid: true,
    }
    formRef = React.createRef(); //object that provides access to a DOM element - validate form before creating newEarnedIncome

    async componentDidMount() {
        try {
            let data = await financialStatementService.show()
                .then(data => {
                    this.setState({ totalBadDebt: data.user.userFinances.filter(elem => (elem.category === 'BadDebt')) })
                })
            console.log(data)
        } catch (err) {
            console.error(err);
        }
    }

    handleSubmit = async (e) => {
        e.preventDefault();
        if (!this.formRef.current.checkValidity()) return;
        try {
            await financialStatementService.create({
                type: this.state.newBadDebt.type,
                amount: this.state.newBadDebt.amount,
                category: this.state.newBadDebt.category
            })
                .then(
                    this.setState(state => ({
                        totalBadDebt: [...state.totalBadDebt, state.newBadDebt],
                        //add newEarnedIncome onto pre-existing totalEarnedIncome array
                        newBadDebt: {
                            type: 'Home Mortgage', amount: '',
                            category: 'BadDebt'
                        },
                        formInvalid: true,
                        //reset the inputs for better UX
                    }))
                )
        } catch (err) {
            console.error(err);
        }
    }

    handleChange = e => {
        const newBadDebt = { ...this.state.newBadDebt, [e.target.name]: e.target.value }
        this.setState({ newBadDebt: newBadDebt, formInvalid: !this.formRef.current.checkValidity() })
    }

    render() {
        return (
            <>
                <h5>
                    <span>Bad Debt</span>
                    <BadDebtPopover />
                    <span>$</span>
                </h5>
                {this.state.totalBadDebt.map(bd => (
                    <div key={bd.amount}>
                        <Table hover size="sm">
                            <tbody>
                                <tr>
                                    <td>{bd.type}</td>
                                    <td className="right">{bd.amount}</td>
                                    {/* <td><button value="Update">U</button></td>
                                    <td><button value="Delete">X</button></td> */}
                                </tr>
                            </tbody>
                        </Table>
                    </div>
                ))}
                <form ref={this.formRef} onSubmit={this.handleSubmit}>
                    <label>
                        <select
                            name="type"
                            value={this.state.newBadDebt.type}
                            onChange={this.handleChange}
                        >
                            {badDebtOptions.map((option) => (
                                <option key={option} value={option}>{option}</option>
                            ))}
                        </select>
                    </label>
                    <label>
                        <input
                            name="amount"
                            value={this.state.newBadDebt.amount}
                            onChange={this.handleChange}
                            required
                            pattern="[1-9]\d{0,}\.?\d{0,2}"
                            placeholder="Debt Value"
                            autocomplete="off"
                        />
                    </label>
                    <label>
                        <input
                            type="hidden"
                            name="category"
                            value={this.state.newBadDebt.category}
                            onChange={this.handleChange}
                        />
                    </label>
                    <button
                        className="form-submission"
                        onClick={this.handleSubmit}
                        disabled={this.state.formInvalid}
                    >+</button>
                </form>
            </>
        )
    }
}

