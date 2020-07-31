import React, { Component } from 'react';
import financialStatementService from '../../utils/financialStatementService';
import Table from 'react-bootstrap/Table';

const commodityOptions = ['Metals', 'Energy', 'Livestock & Meat', 'Agriculture', 'Cryptocurrency', 'Other'];

export default class Commodities extends Component {
    state = {
        totalCommodities: [],
        newCommodity: {
            type: 'Metals',
            amount: '',
            category: 'Commodity'
        },
        formInvalid: true,
    }
    formRef = React.createRef(); //object that provides access to a DOM element - validate form before creating newEarnedIncome

    async componentDidMount() {
        try {
            let data = await financialStatementService.show()
                .then(data => {
                    this.setState({ totalCommodities: data.user.userFinances.filter(elem => (elem.category === 'Commodity')) })
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
                type: this.state.newCommodity.type, amount: this.state.newCommodity.amount,
                category: this.state.newCommodity.category
            })
                .then(
                    this.setState(state => ({
                        totalCommodities: [...state.totalCommodities, state.newCommodity],
                        //add newEarnedIncome onto pre-existing totalEarnedIncome array
                        newCommodity: {
                            type: 'Metals',
                            amount: '',
                            category: 'Commodity'
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
        const newCommodity = { ...this.state.newCommodity, [e.target.name]: e.target.value }
        this.setState({ newCommodity: newCommodity, formInvalid: !this.formRef.current.checkValidity() })
    }

    render() {
        return (
            <section>
                <h5>
                    <span>Commodities</span>
                    {/* <span>$</span> */}
                </h5>
                {this.state.totalCommodities.map(c => (
                    <div key={c.amount}>
                        <Table hover size="sm">
                            <tbody>
                                <tr>
                                    <td>{c.type}</td>
                                    <td className="right">{c.amount}</td>
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
                            value={this.state.newCommodity.type}
                            onChange={this.handleChange}
                        >
                            {commodityOptions.map((option) => (
                                <option key={option} value={option}>{option}</option>
                            ))}
                        </select>
                    </label>
                    <label>
                        <input
                            name="amount"
                            value={this.state.newCommodity.amount}
                            onChange={this.handleChange}
                            required
                            pattern="[1-9]\d{0,}\.?\d{0,2}"
                            placeholder="Purchase Price"
                            autocomplete="off"
                        />
                    </label>
                    <label>
                        <input
                            type="hidden"
                            name="category"
                            value={this.state.newCommodity.category}
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