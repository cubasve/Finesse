import React, { Component } from 'react';
import financialStatementService from '../../utils/financialStatementService';
import Table from 'react-bootstrap/Table';

const earnedIncomeOptions = ['Job', 'Self-Employment', 'Other'];

export default class EarnedIncome extends Component {
    state = {
        totalEarnedIncome: [],
        newEarnedIncome: {
            // earnedIncomeType: 'Job',
            // amountEarned: '',
            type: 'Job',
            amount: '',
        },
        formInvalid: true,
    }
    formRef = React.createRef(); //object that provides access to a DOM element - validate form before creating newEarnedIncome

    //instance of component is created & inserted into DOM during COMMIT phase
    async componentDidMount() {
        try {
            console.log('App: componentDidMount')
            let data = await financialStatementService.show(); //chain .filter
            //.forEach or .map --> Object.keys/values
            console.log(data)
            this.setState({ totalEarnedIncome: data.user.userFinances })
        } catch (err) {
            console.error(err);
        }
    }

    componentDidUpdate() {
        console.log('App: componentDidUpdate')
    }

    handleSubmit = async (e) => {
        e.preventDefault();
        if (!this.formRef.current.checkValidity()) return;
        try {
            //await financialStatementService.create({ type: this.state.newEarnedIncome.earnedIncomeType, amount: this.state.newEarnedIncome.amountEarned })
            await financialStatementService.create({ type: this.state.newEarnedIncome.type, amount: this.state.newEarnedIncome.amount })
                .then(
                    this.setState(state => ({
                        totalEarnedIncome: [...state.totalEarnedIncome, state.newEarnedIncome],
                        //add newEarnedIncome onto pre-existing totalEarnedIncome array

                        //newEarnedIncome: { earnedIncomeType: 'Job', amountEarned: '' },
                        newEarnedIncome: { type: 'Job', amount: '' },
                        formInvalid: true,
                        //reset the inputs 
                    }))
                )
        } catch (err) {
            console.error(err);
        }
    }

    //triggers after every change to input value/character typed
    handleChange = e => {
        const newEarnedIncome = { ...this.state.newEarnedIncome, [e.target.name]: e.target.value }
        this.setState({ newEarnedIncome: newEarnedIncome, formInvalid: !this.formRef.current.checkValidity() });
    }

    handleUpdate = e => {
        //financialStatementService.update(...)
    }

    handleDelete = e => {
        //financialStatementService.deleteOne(...)
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
                    //<div key={ei.amountEarned}>
                    <div key={ei.amount}>
                        <Table striped bordered hover size="sm">
                            <tbody>
                                <tr>
                                    <td>{ei.type}</td>
                                    <td>{ei.amount}</td>
                                    <td><button value="ei.id" onClick={this.handleUpdate}>U</button></td>
                                    <td><button value="e.id" onClick={this.handleDelete}>X</button></td>
                                </tr>
                            </tbody>
                        </Table>
                    </div>
                ))}
                <form ref={this.formRef} onSubmit={this.handleSubmit}>
                    <label>
                        <select
                            //name="earnedIncomeType"
                            name="type"
                            //value={this.state.newEarnedIncome.earnedIncomeType}
                            value={this.state.newEarnedIncome.type}
                            onChange={this.handleChange}
                        >
                            {earnedIncomeOptions.map(option => (
                                <option key={option} value={option}>{option}</option>
                            ))}
                        </select>
                    </label>
                    <label>
                        <input
                            // name="amountEarned"
                            // value={this.state.newEarnedIncome.amountEarned}
                            name="amount"
                            value={this.state.newEarnedIncome.amount}
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
