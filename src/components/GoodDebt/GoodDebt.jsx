import React, { Component } from 'react';
import financialStatementService from '../../utils/financialStatementService';

const goodDebtOptions = ['Real Estate', 'Business', 'Paper', 'Commodities', 'Other'];

export default class goodDebt extends Component {
    state = {
        totalGoodDebt: [],
        newGoodDebt: {
            goodDebtType: 'Real Estate',
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
                        totalGoodDebt: [...state.totalGoodDebt, state.newGoodDebt],
                        //add newEarnedIncome onto pre-existing totalEarnedIncome array
                        newGoodDebt: { goodDebtType: '', amountSpent: '' }
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
                <h4>
                    <span>Good Debt</span>
                    <span>$</span>
                </h4>
                {this.state.totalGoodDebt.map(gd => (
                    <div key={gd.amountSpent}>
                        <table>
                            <tbody>
                                <tr>
                                    <td>{gd.goodDebtType}</td>
                                    <td>{gd.amountSpent}</td>
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
                            name="goodDebtType"
                            value={this.state.newGoodDebt.goodDebtType}
                            onChange={this.handleChange}
                        >
                            {goodDebtOptions.map((option) => (
                                <option key={option} value={option}>{option}</option>
                            ))}
                        </select>
                    </label>
                    <label>
                        <input
                            name="amountSpent"
                            value={this.state.newGoodDebt.amountSpent}
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
