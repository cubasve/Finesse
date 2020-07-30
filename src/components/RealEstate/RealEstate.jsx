import React, { Component } from 'react';
import financialStatementService from '../../utils/financialStatementService';

const realEstateOptions = ['Residential', 'Commercial', 'Industrial', 'Land'];

export default class RealEstate extends Component {
    state = {
        totalRealEstate: [],
        newRealEstate: {
            type: 'Residential',
            amount: '',
            category: 'RealEstate'
        },
        formInvalid: true,
    }
    formRef = React.createRef(); //object that provides access to a DOM element - validate form before creating newEarnedIncome

    async componentDidMount() {
        try {
            let data = await financialStatementService.show();
            let filter = await data.user.userFinances.filter(elem => (elem.category == 'RealEstate'))
            console.log(data)
            this.setState({ totalRealEstate: data.user.userFinances })

        } catch (err) {
            console.error(err);
        }
    }

    handleSubmit = async (e) => {
        // alert('ADD INCOME CLICKED');
        e.preventDefault();
        if (!this.formRef.current.checkValidity()) return;
        try {
            await financialStatementService.create({
                type: this.state.newRealEstate.type,
                amount: this.state.newRealEstate.amount,
                category: this.state.newRealEstate.category
            })
                .then(
                    this.setState(state => ({
                        totalRealEstate: [...state.totalRealEstate, state.newRealEstate],
                        //add newEarnedIncome onto pre-existing totalEarnedIncome array
                        newRealEstate: {
                            type: 'Residential',
                            amount: '',
                            category: 'RealEstate'
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
        const newRealEstate = { ...this.state.newRealEstate, [e.target.name]: e.target.value }
        this.setState({ newRealEstate: newRealEstate, formInvalid: !this.formRef.current.checkValidity() })
    }

    render() {
        return (
            <section>
                <h5>
                    <span>Real Estate</span>
                    <span>$</span>
                </h5>
                {this.state.totalRealEstate.map(re => (
                    <div key={re.amount}>
                        <table>
                            <tbody>
                                <tr>
                                    <td>{re.type}</td>
                                    <td>{re.amount}</td>
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
                            name="type"
                            value={this.state.newRealEstate.type}
                            onChange={this.handleChange}
                        >
                            {realEstateOptions.map((option) => (
                                <option key={option} value={option}>{option}</option>
                            ))}
                        </select>
                    </label>
                    <label>
                        <input
                            name="amount"
                            value={this.state.newRealEstate.amount}
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
                            value={this.state.newRealEstate.category}
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