import React, { Component } from 'react';

const earnedIncomeOptions = ['Job', 'Self-Employment', 'Other'];
const sum = 0;

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

    addEarnedIncome = e => {
        // alert('ADD INCOME CLICKED');
        e.preventDefault();
        if (!this.formRef.current.checkValidity()) return;
        this.setState(state => ({
            totalEarnedIncome: [...state.totalEarnedIncome, state.newEarnedIncome],
            //replace (not mutating) --> add newEarnedIncome onto pre-existing totalEarnedIncome array
            newEarnedIncome: { earnedIncomeType: '', amountEarned: '' }
            //reset the inputs for better UX
        }));
    }

    handleChange = e => {
        const newEarnedIncome = { ...this.state.newEarnedIncome, [e.target.name]: e.target.value }
        this.setState({ newEarnedIncome: newEarnedIncome, formInvalid: !this.formRef.current.checkValidity() })
    }

    // {earnedIncomeOptions.map((option) => (
    //     <option key={option} value={option}>{option}</option>
    // ))}

    render() {
        return (
            <section>
                <h4>
                    <span>Earned</span>
                    {this.state.totalEarnedIncome.amountEarned.map(amount => (
                        <span key={amount}>${amount}</span>
                    ))}
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
                                </tr>
                            </tbody>
                        </table>
                    </div>
                ))}
                <form ref={this.formRef} onSubmit={this.addEarnedIncome}>
                    <label>
                        <select
                            name="earnedIncomeType"
                            value={this.state.newEarnedIncome.earnedIncomeType}
                            onChange={this.handleChange}
                        >
                            {/* <option selected value="Job">Job</option>
                            <option value="Self-Employment">Self-Employment</option>
                            <option value="Other">Other</option> */}
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
                            // type="number"
                            // min="0"
                            pattern="[1-9]\d{0,}\.?\d{0,2}"
                            min="0"
                            placeholder="Salary/Commission"
                        />
                    </label>
                    <button
                        className="form-submission"
                        onClick={this.addEarnedIncome}
                        disabled={this.state.formInvalid}
                    >+</button>
                </form>
            </section >
        )
    }
}

// state = {
//     totalEarnedIncome: [],
//     newEarnedIncome: {
//         earnedIncomeType: '',
//         amountEarned: '',
//     }
// }