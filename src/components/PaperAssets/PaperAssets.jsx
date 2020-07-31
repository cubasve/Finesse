import React, { Component } from 'react';
import financialStatementService from '../../utils/financialStatementService';
import Table from 'react-bootstrap/Table';

const paperAssetsOptions = ['Stock', 'Bond', 'Index/Mutual Fund', 'GIC', 'REIT', 'Other'];

export default class PaperAssets extends Component {
    state = {
        totalPaperAssets: [],
        newPaperAsset: {
            type: 'Stock',
            amount: '',
            category: 'Paper'
        },
        formInvalid: true,
    }
    formRef = React.createRef(); //object that provides access to a DOM element - validate form before creating newEarnedIncome

    async componentDidMount() {
        try {
            let data = await financialStatementService.show()
                .then(data => {
                    this.setState({ totalPaperAssets: data.user.userFinances.filter(elem => (elem.category === 'Paper')) })
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
                type: this.state.newPaperAsset.type, amount: this.state.newPaperAsset.amount,
                category: this.state.newPaperAsset.category
            })
                .then(
                    this.setState(state => ({
                        totalPaperAssets: [...state.totalPaperAssets, state.newPaperAsset],
                        //add newEarnedIncome onto pre-existing totalEarnedIncome array
                        newPaperAsset: {
                            type: 'Stock',
                            amount: '',
                            category: 'Paper'
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
        const newPaperAsset = { ...this.state.newPaperAsset, [e.target.name]: e.target.value }
        this.setState({ newPaperAsset: newPaperAsset, formInvalid: !this.formRef.current.checkValidity() })
    }

    render() {
        return (
            <section>
                <h5>
                    <span>Paper</span>
                    {/* <span>$</span> */}
                </h5>
                {this.state.totalPaperAssets.map(pa => (
                    <div key={pa.amount}>
                        <Table hover size="sm">
                            <tbody>
                                <tr>
                                    <td>{pa.type}</td>
                                    <td className="right">{pa.amount}</td>
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
                            value={this.state.newPaperAsset.type}
                            onChange={this.handleChange}
                        >
                            {paperAssetsOptions.map((option) => (
                                <option key={option} value={option}>{option}</option>
                            ))}
                        </select>
                    </label>
                    <label>
                        <input
                            name="amount"
                            value={this.state.newPaperAsset.amount}
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
                            value={this.state.newPaperAsset.category}
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
