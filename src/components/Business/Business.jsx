import React, { Component } from 'react';
import financialStatementService from '../../utils/financialStatementService';

const businessOptions = ['Sole proprietorship', 'Partnership', 'Corporation'];

export default class Business extends Component {
    state = {
        totalBusiness: [],
        newBusiness: {
            businessType: 'Sole proprietorship',
            value: '',
        },
        formInvalid: true,
    }
    formRef = React.createRef(); //object that provides access to a DOM element - validate form before creating newEarnedIncome

    handleSubmit = async (e) => {
        // alert('ADD INCOME CLICKED');
        e.preventDefault();
        if (!this.formRef.current.checkValidity()) return;
        try {
            await financialStatementService.create({ type: this.state.newBusiness.businessType, amount: this.state.newBusiness.value })
                .then(
                    this.setState(state => ({
                        totalBusiness: [...state.totalBusiness, state.newBusiness],
                        //add newEarnedIncome onto pre-existing totalEarnedIncome array
                        newBusiness: { businessType: 'Sole proprietorship', value: '' },
                        formInvalid: true,
                        //reset the inputs for better UX
                    }))
                )
        } catch (err) {
            console.error(err);
        }
    }

    handleChange = e => {
        const newBusiness = { ...this.state.newBusiness, [e.target.name]: e.target.value }
        this.setState({ newBusiness: newBusiness, formInvalid: !this.formRef.current.checkValidity() })
    }

    render() {
        return (
            <section>
                <h4>
                    <span>Business</span>
                    <span>$</span>
                </h4>
                {this.state.totalBusiness.map(b => (
                    <div key={b.value}>
                        <table>
                            <tbody>
                                <tr>
                                    <td>{b.businessType}</td>
                                    <td>{b.value}</td>
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
                            name="businessType"
                            value={this.state.newBusiness.businessType}
                            onChange={this.handleChange}
                        >
                            {businessOptions.map((option) => (
                                <option key={option} value={option}>{option}</option>
                            ))}
                        </select>
                    </label>
                    <label>
                        <input
                            name="value"
                            value={this.state.newBusiness.value}
                            onChange={this.handleChange}
                            pattern="[1-9]\d{0,}\.?\d{0,2}"
                            required
                            placeholder="Company Value"
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