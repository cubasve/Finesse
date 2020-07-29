import React, { Component } from 'react';
import financialStatementService from '../../utils/financialStatementService';

const commodityOptions = ['Metals', 'Energy', 'Livestock & Meat', 'Agriculture', 'Cryptocurrency', 'Other'];

export default class Commodities extends Component {
    state = {
        totalCommodities: [],
        newCommodity: {
            commodityType: 'Metals',
            price: '',
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
                        totalCommodities: [...state.totalCommodities, state.newCommodity],
                        //add newEarnedIncome onto pre-existing totalEarnedIncome array
                        newCommodity: { commodityType: 'Metals', price: '' }
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
                <h4>
                    <span>Commodities</span>
                    <span>$</span>
                </h4>
                {this.state.totalCommodities.map(c => (
                    <div key={c.price}>
                        <table>
                            <tbody>
                                <tr>
                                    <td>{c.commodityType}</td>
                                    <td>{c.price}</td>
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
                            name="commodityType"
                            value={this.state.newCommodity.commodityType}
                            onChange={this.handleChange}
                        >
                            {commodityOptions.map((option) => (
                                <option key={option} value={option}>{option}</option>
                            ))}
                        </select>
                    </label>
                    <label>
                        <input
                            name="price"
                            value={this.state.newCommodity.price}
                            onChange={this.handleChange}
                            pattern="[1-9]\d{0,}\.?\d{0,2}"
                            placeholder="Purchase Price"
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