import React, { Component } from 'react';
import financialStatementService from '../../utils/financialStatementService';
import Table from 'react-bootstrap/Table';

const goodDebtOptions = ['Real Estate', 'Business', 'Paper', 'Commodities', 'Other'];

export default class GoodDebt extends Component {
    state = {
        totalGoodDebt: [],
        newGoodDebt: {
            type: 'Real Estate',
            amount: '',
            category: 'GoodDebt'
        },
        formInvalid: true,
    }
    formRef = React.createRef(); //object that provides access to a DOM element - validate form before creating newEarnedIncome

    async componentDidMount() {
        try {
            let data = await financialStatementService.show()
                .then(data => {
                    this.setState({ totalGoodDebt: data.user.userFinances.filter(elem => (elem.category === 'GoodDebt')) })
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
                type: this.state.newGoodDebt.type, amount: this.state.newGoodDebt.amount,
                category: this.state.newGoodDebt.category
            })
                .then(
                    this.setState(state => ({
                        totalGoodDebt: [...state.totalGoodDebt, state.newGoodDebt],
                        //add newEarnedIncome onto pre-existing totalEarnedIncome array
                        newGoodDebt: {
                            type: 'Real Estate', amount: '',
                            category: 'GoodDebt'
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
        const newGoodDebt = { ...this.state.newGoodDebt, [e.target.name]: e.target.value }
        this.setState({ newGoodDebt: newGoodDebt, formInvalid: !this.formRef.current.checkValidity() })
    }

    render() {
        return (
            <section>
                <h5>
                    <span>Good Debt</span>
                    <span>$</span>
                </h5>
                {this.state.totalGoodDebt.map(gd => (
                    <div key={gd.amount}>
                        <Table striped bordered hover size="sm">
                            <tbody>
                                <tr>
                                    <td>{gd.type}</td>
                                    <td>{gd.amount}</td>
                                    <td><button value="Update">U</button></td>
                                    <td><button value="Delete">X</button></td>
                                </tr>
                            </tbody>
                        </Table>
                    </div>
                ))}
                <form ref={this.formRef} onSubmit={this.handleSubmit}>
                    <label>
                        <select
                            name="type"
                            value={this.state.newGoodDebt.type}
                            onChange={this.handleChange}
                        >
                            {goodDebtOptions.map((option) => (
                                <option key={option} value={option}>{option}</option>
                            ))}
                        </select>
                    </label>
                    <label>
                        <input
                            name="amount"
                            value={this.state.newGoodDebt.amount}
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
                            value={this.state.newGoodDebt.category}
                            onChange={this.handleChange}
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
