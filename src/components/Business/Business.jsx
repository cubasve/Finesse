import React, { Component } from 'react';
import financialStatementService from '../../utils/financialStatementService';
import Table from 'react-bootstrap/Table';

const businessOptions = ['Sole proprietorship', 'Partnership', 'Corporation'];

export default class Business extends Component {
    state = {
        totalBusiness: [],
        newBusiness: {
            type: 'Sole proprietorship',
            amount: '',
            category: 'Business'
        },
        formInvalid: true,
    }
    formRef = React.createRef(); //object that provides access to a DOM element - validate form before creating newEarnedIncome

    async componentDidMount() {
        try {
            let data = await financialStatementService.show()
                .then(data => {
                    this.setState({ totalBusiness: data.user.userFinances.filter(elem => (elem.category === 'Business')) })
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
                type: this.state.newBusiness.type, amount: this.state.newBusiness.amount,
                category: this.state.newBusiness.category
            })
                .then(
                    this.setState(state => ({
                        totalBusiness: [...state.totalBusiness, state.newBusiness],
                        //add newEarnedIncome onto pre-existing totalEarnedIncome array
                        newBusiness: {
                            type: 'Sole proprietorship',
                            amount: '',
                            category: 'Business'
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
        const newBusiness = { ...this.state.newBusiness, [e.target.name]: e.target.value }
        this.setState({ newBusiness: newBusiness, formInvalid: !this.formRef.current.checkValidity() })
    }

    render() {
        return (
            <section>
                <h5>
                    <span>Business</span>
                    {/* <span>$</span> */}
                </h5>
                {this.state.totalBusiness.map(b => (
                    <div key={b.amount}>
                        <Table hover size="sm">
                            <tbody>
                                <tr>
                                    <td>{b.type}</td>
                                    <td className="right">{b.amount}</td>
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
                            value={this.state.newBusiness.type}
                            onChange={this.handleChange}
                        >
                            {businessOptions.map((option) => (
                                <option key={option} value={option}>{option}</option>
                            ))}
                        </select>
                    </label>
                    <label>
                        <input
                            name="amount"
                            value={this.state.newBusiness.amount}
                            onChange={this.handleChange}
                            pattern="[1-9]\d{0,}\.?\d{0,2}"
                            required
                            placeholder="Company Value"
                            autocomplete="off"
                        />
                    </label>
                    <label>
                        <input
                            type="hidden"
                            name="category"
                            value={this.state.newBusiness.category}
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