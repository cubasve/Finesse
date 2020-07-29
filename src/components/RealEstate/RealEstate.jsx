import React, { Component } from 'react';
import financialStatementService from '../../utils/financialStatementService';

const realEstateOptions = ['Residential', 'Commercial', 'Industrial', 'Land'];

export default class RealEstate extends Component {
    state = {
        totalRealEstate: [],
        newRealEstate: {
            realEstateType: 'Residential',
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
            await financialStatementService.create({ type: this.state.newRealEstate.realEstateType, amount: this.state.newRealEstate.price })
                .then(
                    this.setState(state => ({
                        totalRealEstate: [...state.totalRealEstate, state.newRealEstate],
                        //add newEarnedIncome onto pre-existing totalEarnedIncome array
                        newRealEstate: { realEstateType: 'Residential', price: '' },
                        formInvalid: true,
                        //reset the inputs for better UX
                    }))
                )
        } catch (err) {
            console.error(err);
        }
    }

    handleChange = e => {
        const newRealEstate = { ...this.state.newRealEstate, [e.target.name]: e.target.value }
        this.setState({ newRealEstate: newRealEstate, formInvalid: !this.formRef.current.checkValidity() })
    }

    render() {
        return (
            <section>
                <h4>
                    <span>Real Estate</span>
                    <span>$</span>
                </h4>
                {this.state.totalRealEstate.map(re => (
                    <div key={re.price}>
                        <table>
                            <tbody>
                                <tr>
                                    <td>{re.realEstateType}</td>
                                    <td>{re.price}</td>
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
                            name="realEstateType"
                            value={this.state.newRealEstate.realEstateType}
                            onChange={this.handleChange}
                        >
                            {realEstateOptions.map((option) => (
                                <option key={option} value={option}>{option}</option>
                            ))}
                        </select>
                    </label>
                    <label>
                        <input
                            name="price"
                            value={this.state.newRealEstate.price}
                            onChange={this.handleChange}
                            required
                            pattern="[1-9]\d{0,}\.?\d{0,2}"
                            placeholder="Purchase Price"
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