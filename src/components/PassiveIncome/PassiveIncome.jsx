import React, { Component } from 'react';
import financialStatementService from '../../utils/financialStatementService';
import Table from 'react-bootstrap/Table';

const passiveIncomeOptions = ['Real Estate', 'Business', 'Commodities', 'Royalties', 'Other'];

export default class PassiveIncome extends Component {
    state = {
        totalPassiveIncome: [],
        newPassiveIncome: {
            type: 'Real Estate',
            amount: '',
            category: 'Passive'
        },
        formInvalid: true,
    }
    formRef = React.createRef(); //object that provides access to a DOM element - validate form before creating newEarnedIncome

    async componentDidMount() {
        try {
            let data = await financialStatementService.show()
                .then(data => {
                    this.setState({ totalPassiveIncome: data.user.userFinances.filter(elem => (elem.category === 'Passive')) })
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
            await financialStatementService.create({ type: this.state.newPassiveIncome.type, amount: this.state.newPassiveIncome.amount, category: this.state.newPassiveIncome.category })
                .then(
                    this.setState(state => ({
                        totalPassiveIncome: [...state.totalPassiveIncome, state.newPassiveIncome],
                        //add newEarnedIncome onto pre-existing totalEarnedIncome array
                        newPassiveIncome: {
                            type: 'Real Estate',
                            amount: '',
                            category: 'Passive'
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
        const newPassiveIncome = { ...this.state.newPassiveIncome, [e.target.name]: e.target.value }
        this.setState({ newPassiveIncome: newPassiveIncome, formInvalid: !this.formRef.current.checkValidity() })
    }

    render() {
        return (
            <section>
                <h5>
                    <span>Passive</span>
                    {/* <span>$</span> */}
                </h5>
                {this.state.totalPassiveIncome.map(pi => (
                    <div key={pi.amount}>
                        <Table hover size="sm">
                            <tbody>
                                <tr>
                                    <td>{pi.type}</td>
                                    <td className="right">{pi.amount}</td>
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
                            value={this.state.newPassiveIncome.type}
                            onChange={this.handleChange}
                        >
                            {passiveIncomeOptions.map((option) => (
                                <option key={option} value={option}>{option}</option>
                            ))}
                        </select>
                    </label>
                    <label>
                        <input
                            name="amount"
                            value={this.state.newPassiveIncome.amount}
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
                            value={this.state.newPassiveIncome.category}
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