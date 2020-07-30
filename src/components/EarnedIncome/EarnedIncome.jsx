import React, { Component } from 'react';
import financialStatementService from '../../utils/financialStatementService';
import Table from 'react-bootstrap/Table';

const earnedIncomeOptions = ['Job', 'Self-Employment', 'Other'];

export default class EarnedIncome extends Component {
    state = {
        totalEarnedIncome: [],
        newEarnedIncome: {
            earnedIncomeType: 'Job',
            amountEarned: '',
        },
        formInvalid: true,
    }
    formRef = React.createRef(); //object that provides access to a DOM element - validate form before creating newEarnedIncome

    //instance of component is created & inserted into DOM during COMMIT phase
    componentDidMount() {
        try {
            console.log('App: componentDidMount')
            financialStatementService.show().then(this.setState(state => ({
                totalEarnedIncome: this.state.totalEarnedIncome.map(el => (
                    <div key={el.amountEarned}>
                        <table>
                            <tr>
                                <td>{el.earnedIncomeType}</td>
                                <td>{el.amountEarned}</td>
                            </tr>
                        </table>
                    </div>
                ))

                // totalEarnedIncome: [{ amountEarned: amount, earnedIncomeType: type }] --> amount & type are undefined

                //totalEarnedIncome: [...state.totalEarnedIncome, state.newEarnedIncome], //--> 1 job stays

                //totalEarnedIncome: [state.newEarnedIncome.earnedIncomeType, state.newEarnedIncome.amountEarned] --> ["Job", ""]

                //type: this.state.newEarnedIncome.earnedIncomeType, amount: this.state.newEarnedIncome.amountEarned

                // totalEarnedIncome: [{
                //     amountEarned: state.newEarnedIncome.amountEarned,
                //     earnedIncomeType: state.newEarnedIncome.earnedIncomeType
                // }] //--> 1 job stays

                //totalEarnedIncome: [...state.totalEarnedIncome],
                //earnedIncomeType: this.state.newEarnedIncome.earnedIncomeType,
                // amountEarned: this.state.newEarnedIncome.amountEarned
            })))
        } catch (err) {
            console.error(err);
        }
    }

    // fetch('api/financialstatements')
    //     .then((res) => res.json())
    //     .then((data) => this.setState({
    //         data: data
    //     }))

    // fetch('api/financialstatements')
    //     .then((res) => res.json())
    //     .then((data) => console.log(data))
    //GET 401 (Unauthorized)  --> {msg: 'Not Authorized'}

    componentDidUpdate() {
        console.log('App: componentDidUpdate')
    }

    handleSubmit = async (e) => {
        e.preventDefault();
        if (!this.formRef.current.checkValidity()) return;
        try {
            await financialStatementService.create({ type: this.state.newEarnedIncome.earnedIncomeType, amount: this.state.newEarnedIncome.amountEarned })
                .then(
                    this.setState(state => ({
                        totalEarnedIncome: [...state.totalEarnedIncome, state.newEarnedIncome],
                        //add newEarnedIncome onto pre-existing totalEarnedIncome array
                        newEarnedIncome: { earnedIncomeType: 'Job', amountEarned: '' },
                        formInvalid: true,
                        //reset the inputs 
                    }))
                )
        } catch (err) {
            console.error(err);
        }
    }

    //triggers after every change to input value/character typed
    handleChange = async (e) => {
        const newEarnedIncome = { ...this.state.newEarnedIncome, [e.target.name]: e.target.value }
        this.setState({ newEarnedIncome: newEarnedIncome, formInvalid: !this.formRef.current.checkValidity() });
    }


    render() {
        console.log('App: render');
        return (
            <section>
                <h5>
                    <span>Earned</span>
                    <span>$</span>
                    {/* {this.state.totalEarnedIncome.amountEarned.map(amount => (
                        <span key={amount}>${amount}</span>
                    ))} */}
                    {/* {this.state.totalEarnedIncome.amountEarned.reduce((acc, num) => (
                        <span>${acc + num}</span>
                    ))} */}
                </h5>
                {this.state.totalEarnedIncome.map(ei => (
                    <div key={ei.amountEarned}>
                        <Table striped bordered hover size="sm">
                            <tbody>
                                <tr>
                                    <td>{ei.earnedIncomeType}</td>
                                    <td>{ei.amountEarned}</td>
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
                            name="earnedIncomeType"
                            value={this.state.newEarnedIncome.earnedIncomeType}
                            onChange={this.handleChange}
                        >
                            {earnedIncomeOptions.map((option) => (
                                <option key={option} value={option}>{option}</option>
                            ))}
                        </select>
                    </label>
                    <label>
                        <input
                            name="amountEarned"
                            value={this.state.newEarnedIncome.amountEarned}
                            onChange={this.handleChange}
                            required
                            pattern="[1-9]\d{0,}\.?\d{0,2}"
                            autocomplete="off"
                            placeholder="Salary/Commission"
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
