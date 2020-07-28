import React, { Component } from 'react';
import financialStatementService from '../../utils/financialStatementService';

const badDebtOptions = ['Home Mortgage', 'Car Loans', 'Credit Cards', 'School Loans', 'Other'];

export default class BadDebt extends Component {
    state = {
        totalBadDebt: [],
        newBadDebt: {
            badDebtType: 'Home Mortgage',
            amountOwed: '',
        },
        formInvalid: true,
    }
    formRef = React.createRef(); //object that provides access to a DOM element - validate form before creating newEarnedIncome

    handleSubmit = async (e) => {
        // alert('ADD INCOME CLICKED');
        e.preventDefault();
        if (!this.formRef.current.checkValidity()) return;
        try {
            await financialStatementService.create()
                .then(
                    this.setState(state => ({
                        totalBadDebt: [...state.totalBadDebt, state.newBadDebt],
                        //add newEarnedIncome onto pre-existing totalEarnedIncome array
                        newBadDebt: { badDebtType: '', amountOwed: '' }
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
            <section>
                <h4>
                    <span>Bad Debt</span>
                    <span>$</span>
                </h4>
                {this.state.totalBadDebt.map(bd => (
                    <div key={bd.amountOwed}>
                        <table>
                            <tbody>
                                <tr>
                                    <td>{bd.badDebtType}</td>
                                    <td>{bd.amountOwed}</td>
                                    <td><button value="Update">U</button></td>
                                    <td><button value="Delete">X</button></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                ))}
                <form ref={this.formRef} onSubmit={this.handleSubmit}>
                    <label>
                        <select
                            name="badDebtType"
                            value={this.state.newBadDebt.badDebtType}
                            onChange={this.handleChange}
                        >
                            {badDebtOptions.map((option) => (
                                <option key={option} value={option}>{option}</option>
                            ))}
                        </select>
                    </label>
                    <label>
                        <input
                            name="amountOwed"
                            value={this.state.newBadDebt.amountOwed}
                            onChange={this.handleChange}
                            pattern="[1-9]\d{0,}\.?\d{0,2}"
                            placeholder="Debt Value"
                        />
                    </label>
                    <button
                        className="form-submission"
                        onClick={this.handleSubmit}
                        disabled={this.state.formInvalid}
                    >+</button>
                </form>
            </section >
        )
    }
}

