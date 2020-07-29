import React, { Component } from 'react';
import financialStatementService from '../../utils/financialStatementService';

const portfolioIncomeOptions = ['Stock', 'Bond', 'Index/Mutual Fund', 'GIC', 'REIT', 'Other'];

export default class PortfolioIncome extends Component {
    state = {
        totalPortfolioIncome: [],
        newPortfolioIncome: {
            portfolioIncomeType: 'Stock',
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
            await financialStatementService.create()
                .then(
                    this.setState(state => ({
                        totalPortfolioIncome: [...state.totalPortfolioIncome, state.newPortfolioIncome],
                        //add newEarnedIncome onto pre-existing totalEarnedIncome array
                        newPortfolioIncome: { portfolioIncomeType: 'Stock', amountEarned: '' },
                        formInvalid: true,
                        //reset the inputs for better UX
                    }))
                )
        } catch (err) {
            console.error(err);
        }
    }

    handleChange = e => {
        const newPortfolioIncome = { ...this.state.newPortfolioIncome, [e.target.name]: e.target.value }
        this.setState({ newPortfolioIncome: newPortfolioIncome, formInvalid: !this.formRef.current.checkValidity() })
    }

    render() {
        return (
            <section>
                <h4>
                    <span>Portfolio</span>
                    <span>$</span>
                </h4>
                {this.state.totalPortfolioIncome.map(pi => (
                    <div key={pi.amountEarned}>
                        <table>
                            <tbody>
                                <tr>
                                    <td>{pi.portfolioIncomeType}</td>
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
                            name="portfolioIncomeType"
                            value={this.state.newPortfolioIncome.portfolioIncomeType}
                            onChange={this.handleChange}
                        >
                            {portfolioIncomeOptions.map((option) => (
                                <option key={option} value={option}>{option}</option>
                            ))}
                        </select>
                    </label>
                    <label>
                        <input
                            name="amountEarned"
                            value={this.state.newPortfolioIncome.amountEarned}
                            onChange={this.handleChange}
                            required
                            pattern="[1-9]\d{0,}\.?\d{0,2}"
                            placeholder="Dividend/Interest"
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