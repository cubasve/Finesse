import React, { Component } from 'react';
import financialStatementService from '../../utils/financialStatementService';

const earnedIncomeOptions = ['Job', 'Self-Employment', 'Other'];

export default class EarnedIncome extends Component {
    state = {
        totalEarnedIncome: [],
        newEarnedIncome: {
            earnedIncomeType: 'Job',
            amountEarned: '',
        },
        formInvalid: true,
    }
    formRef = React.createRef(); //object that provides access to a DOM element - validate form before creating newEarnedIncome

    componentDidMount() {
        console.log('EarnedIncome: componentDidMount');
        financialStatementService.show({ type: this.state.totalEarnedIncome.earnedIncomeType, amount: this.state.totalEarnedIncome.amountEarned })

        //use fetch to hit a route in controllers --> /api/financialstatements
    }

    handleSubmit = async (e) => {
        // alert('ADD INCOME CLICKED');
        e.preventDefault();
        if (!this.formRef.current.checkValidity()) return;
        try {
            await financialStatementService.create({ type: this.state.newEarnedIncome.earnedIncomeType, amount: this.state.totalEarnedIncome.amountEarned })
                //await financialStatementService.show({ type: this.state.newEarnedIncome.earnedIncomeType, amount: this.state.newEarnedIncome.amountEarned })
                .then(
                    this.setState(state => ({
                        totalEarnedIncome: [...state.totalEarnedIncome, state.newEarnedIncome],
                        //add newEarnedIncome onto pre-existing totalEarnedIncome array
                        newEarnedIncome: { earnedIncomeType: 'Job', amountEarned: '' },
                        formInvalid: true,
                        //reset the inputs 
                    }))
                )
            //financialStatementService.show({ type: this.state.totalEarnedIncome.earnedIncomeType, amount: this.state.totalEarnedIncome.amountEarned })
        } catch (err) {
            console.error(err);
        }
    }

    //triggers after every change to input value/character typed
    handleChange = async (e) => {
        const newEarnedIncome = { ...this.state.newEarnedIncome, [e.target.name]: e.target.value }
        //await financialStatementService.show({ type: newEarnedIncome.earnedIncomeType, amount: newEarnedIncome.amountEarned })
        this.setState({ newEarnedIncome: newEarnedIncome, formInvalid: !this.formRef.current.checkValidity() });
    }


    render() {
        return (
            <section>
                <h4>
                    <span>Earned</span>
                    <span>$</span>
                    {/* {this.state.totalEarnedIncome.amountEarned.map(amount => (
                        <span key={amount}>${amount}</span>
                    ))} */}
                    {/* {this.state.totalEarnedIncome.amountEarned.reduce((acc, num) => (
                        <span>${acc + num}</span>
                    ))} */}
                </h4>
                {this.state.totalEarnedIncome.map(ei => (
                    <div key={ei.amountEarned}>
                        <table>
                            <tbody>
                                <tr>
                                    <td>{ei.earnedIncomeType}</td>
                                    <td>{ei.amountEarned}</td>
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
                            name="earnedIncomeType"
                            value={this.state.newEarnedIncome.earnedIncomeType}
                            onChange={this.handleChange}
                        >
                            {earnedIncomeOptions.map((option) => (
                                <option key={option} value={option}>{option}</option>
                            ))}
                        </select>
                    </label>
                    <label>
                        <input
                            name="amountEarned"
                            value={this.state.newEarnedIncome.amountEarned}
                            onChange={this.handleChange}
                            required
                            pattern="[1-9]\d{0,}\.?\d{0,2}"
                            autocomplete="off"
                            placeholder="Salary/Commission"
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
