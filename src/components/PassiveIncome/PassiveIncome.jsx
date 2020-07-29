import React, { Component } from 'react';
import financialStatementService from '../../utils/financialStatementService';

const passiveIncomeOptions = ['Real Estate', 'Business', 'Commodities', 'Royalties', 'Other'];

export default class PassiveIncome extends Component {
    state = {
        totalPassiveIncome: [],
        newPassiveIncome: {
            passiveIncomeType: 'Real Estate',
            amountEarned: '',
        },
        formInvalid: true,
    }
    formRef = React.createRef(); //object that provides access to a DOM element - validate form before creating newEarnedIncome

    handleSubmit = async (e) => {
        // alert('ADD INCOME CLICKED');
        e.preventDefault();
        if (!this.formRef.current.checkValidity()) return;
        try {
            await financialStatementService.create({ type: this.state.newPassiveIncome.passiveIncomeType, amount: this.state.newPassiveIncome.amountEarned })
                .then(
                    this.setState(state => ({
                        totalPassiveIncome: [...state.totalPassiveIncome, state.newPassiveIncome],
                        //add newEarnedIncome onto pre-existing totalEarnedIncome array
                        newPassiveIncome: { passiveIncomeType: 'Real Estate', amountEarned: '' },
                        formInvalid: true,
                        //reset the inputs for better UX
                    }))
                )
        } catch (err) {
            console.error(err);
        }
    }

    handleChange = e => {
        const newPassiveIncome = { ...this.state.newPassiveIncome, [e.target.name]: e.target.value }
        this.setState({ newPassiveIncome: newPassiveIncome, formInvalid: !this.formRef.current.checkValidity() })
    }

    render() {
        return (
            <section>
                <h4>
                    <span>Passive</span>
                    <span>$</span>
                </h4>
                {this.state.totalPassiveIncome.map(pi => (
                    <div key={pi.amountEarned}>
                        <table>
                            <tbody>
                                <tr>
                                    <td>{pi.passiveIncomeType}</td>
                                    <td>{pi.amountEarned}</td>
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
                            name="passiveIncomeType"
                            value={this.state.newPassiveIncome.passiveIncomeType}
                            onChange={this.handleChange}
                        >
                            {passiveIncomeOptions.map((option) => (
                                <option key={option} value={option}>{option}</option>
                            ))}
                        </select>
                    </label>
                    <label>
                        <input
                            name="amountEarned"
                            value={this.state.newPassiveIncome.amountEarned}
                            onChange={this.handleChange}
                            required
                            pattern="[1-9]\d{0,}\.?\d{0,2}"
                            autocomplete="off"
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