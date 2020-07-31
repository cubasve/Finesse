import React, { Component } from 'react';
import financialStatementService from '../../utils/financialStatementService';
import PayYourselfFirst from '../PayYourselfFirst/PayYourselfFirst';
import Table from 'react-bootstrap/Table';

const expenseOptions = ['Housing', 'Transportation', 'Food', 'Kids', 'Debt Payments', 'Entertainment', 'Donations', 'Other'];

export default class Expenses extends Component {
    state = {
        totalExpenses: [],
        newExpense: {
            type: 'Housing',
            amount: '',
            category: 'Expense'
        },
        formInvalid: true,
    }
    formRef = React.createRef(); //object that provides access to a DOM element - validate form before creating newEarnedIncome

    async componentDidMount() {
        try {
            let data = await financialStatementService.show()
                .then(data => {
                    this.setState({ totalExpenses: data.user.userFinances.filter(elem => (elem.category === 'Expense')) })
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
                type: this.state.newExpense.type, amount: this.state.newExpense.amount,
                category: this.state.newExpense.category
            })
                .then(
                    this.setState(state => ({
                        totalExpenses: [...state.totalExpenses, state.newExpense],
                        //add newEarnedIncome onto pre-existing totalEarnedIncome array
                        newExpense: {
                            type: 'Housing',
                            amount: '',
                            category: 'Expense'
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
        const newExpense = { ...this.state.newExpense, [e.target.name]: e.target.value }
        this.setState({ newExpense: newExpense, formInvalid: !this.formRef.current.checkValidity() })
    }

    render() {
        return (
            <div className="border">
                <span className="title">EXPENSES</span>
                <PayYourselfFirst />
                {/* <h4>
                    Expenses
                    $
                    <span><div>Expenses</div></span>
                    <span><div>$</div></span>
                    <PayYourselfFirst />
                </h4> */}
                {this.state.totalExpenses.map(ex => (
                    <div key={ex.amount}>
                        <Table hover size="sm">
                            <tbody>
                                <tr>
                                    <td>{ex.type}</td>
                                    <td className="right">{ex.amount}</td>
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
                            value={this.state.newExpense.type}
                            onChange={this.handleChange}
                        >
                            {expenseOptions.map((option) => (
                                <option key={option} value={option}>{option}</option>
                            ))}
                        </select>
                    </label>
                    <label>
                        <input
                            name="amount"
                            value={this.state.newExpense.amount}
                            onChange={this.handleChange}
                            required
                            pattern="[1-9]\d{0,}\.?\d{0,2}"
                            autocomplete="off"
                        />
                    </label>
                    <label>
                        <input
                            type="hidden"
                            name="category"
                            value={this.state.newExpense.category}
                            onChange={this.handleChange}
                        />
                    </label>
                    <button
                        className="form-submission"
                        onClick={this.handleSubmit}
                        disabled={this.state.formInvalid}
                    >+</button>
                </form>
            </div>
        )
    }
}
