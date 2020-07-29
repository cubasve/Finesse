import React, { Component } from 'react';
import financialStatementService from '../../utils/financialStatementService';
import PayYourselfFirst from '../PayYourselfFirst/PayYourselfFirst';

const expenseOptions = ['Housing', 'Transportation', 'Food', 'Kids', 'Debt Payments', 'Entertainment', 'Donations', 'Other'];

export default class Expenses extends Component {
    state = {
        totalExpenses: [],
        newExpense: {
            expenseType: 'Housing',
            amountSpent: '',
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
                        totalExpenses: [...state.totalExpenses, state.newExpense],
                        //add newEarnedIncome onto pre-existing totalEarnedIncome array
                        newExpense: { expenseType: 'Housing', amountSpent: '' }
                        //reset the inputs for better UX
                    }))
                )
        } catch (err) {
            console.error(err);
        }
    }

    handleChange = e => {
        const newExpense = { ...this.state.newExpense, [e.target.name]: e.target.value }
        this.setState({ newExpense: newExpense, formInvalid: !this.formRef.current.checkValidity() })
    }

    render() {
        return (
            <section>
                <span>Expenses</span>
                <PayYourselfFirst />
                {/* <h4>
                    Expenses
                    $
                    <span><div>Expenses</div></span>
                    <span><div>$</div></span>
                    <PayYourselfFirst />
                </h4> */}
                {this.state.totalExpenses.map(ex => (
                    <div key={ex.amountSpent}>
                        <table>
                            <tbody>
                                <tr>
                                    <td>{ex.expenseType}</td>
                                    <td>{ex.amountSpent}</td>
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
                            name="expenseType"
                            value={this.state.newExpense.expenseType}
                            onChange={this.handleChange}
                        >
                            {expenseOptions.map((option) => (
                                <option key={option} value={option}>{option}</option>
                            ))}
                        </select>
                    </label>
                    <label>
                        <input
                            name="amountSpent"
                            value={this.state.newExpense.amountSpent}
                            onChange={this.handleChange}
                            pattern="[1-9]\d{0,}\.?\d{0,2}"
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
