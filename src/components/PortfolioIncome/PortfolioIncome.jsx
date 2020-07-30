import React, { Component } from 'react';
import financialStatementService from '../../utils/financialStatementService';
import Table from 'react-bootstrap/Table';

const portfolioIncomeOptions = ['Stock', 'Bond', 'Index/Mutual Fund', 'GIC', 'REIT', 'Other'];

export default class PortfolioIncome extends Component {
    state = {
        totalPortfolioIncome: [],
        newPortfolioIncome: {
            type: 'Stock',
            amount: '',
            category: 'Portfolio'
        },
        formInvalid: true,
    }
    formRef = React.createRef(); //object that provides access to a DOM element - validate form before creating newEarnedIncome

    async componentDidMount() {
        try {
            let data = await financialStatementService.show()
                .then(data => {
                    this.setState({ totalPortfolioIncome: data.user.userFinances.filter(elem => (elem.category === 'Portfolio')) })
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
                type: this.state.newPortfolioIncome.type, amount: this.state.newPortfolioIncome.amount,
                category: this.state.newPortfolioIncome.category
            })
                .then(
                    this.setState(state => ({
                        totalPortfolioIncome: [...state.totalPortfolioIncome, state.newPortfolioIncome],
                        //add newEarnedIncome onto pre-existing totalEarnedIncome array
                        newPortfolioIncome: {
                            type: 'Stock',
                            amount: '',
                            category: 'Portfolio'
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
        const newPortfolioIncome = { ...this.state.newPortfolioIncome, [e.target.name]: e.target.value }
        this.setState({ newPortfolioIncome: newPortfolioIncome, formInvalid: !this.formRef.current.checkValidity() })
    }

    render() {
        return (
            <section>
                <h5>
                    <span>Portfolio</span>
                    <span>$</span>
                </h5>
                {this.state.totalPortfolioIncome.map(pi => (
                    <div key={pi.amount}>
                        <Table striped bordered hover size="sm">
                            <tbody>
                                <tr>
                                    <td>{pi.type}</td>
                                    <td>{pi.amount}</td>
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
                            value={this.state.newPortfolioIncome.type}
                            onChange={this.handleChange}
                        >
                            {portfolioIncomeOptions.map((option) => (
                                <option key={option} value={option}>{option}</option>
                            ))}
                        </select>
                    </label>
                    <label>
                        <input
                            name="amount"
                            value={this.state.newPortfolioIncome.amount}
                            onChange={this.handleChange}
                            required
                            pattern="[1-9]\d{0,}\.?\d{0,2}"
                            placeholder="Dividend/Interest"
                            autocomplete="off"
                        />
                    </label>
                    <label>
                        <input
                            type="hidden"
                            name="category"
                            value={this.state.newPortfolioIncome.category}
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