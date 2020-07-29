import React, { Component } from 'react';
import financialStatementService from '../../utils/financialStatementService';

const paperAssetsOptions = ['Stock', 'Bond', 'Index/Mutual Fund', 'GIC', 'REIT', 'Other'];

export default class PaperAssets extends Component {
    state = {
        totalPaperAssets: [],
        newPaperAsset: {
            paperAssetType: 'Stock',
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
                        totalPaperAssets: [...state.totalPaperAssets, state.newPaperAsset],
                        //add newEarnedIncome onto pre-existing totalEarnedIncome array
                        newPaperAsset: { paperAssetType: 'Stock', price: '' }
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
                <h4>
                    <span>Paper</span>
                    <span>$</span>
                </h4>
                {this.state.totalPaperAssets.map(pa => (
                    <div key={pa.price}>
                        <table>
                            <tbody>
                                <tr>
                                    <td>{pa.paperAssetType}</td>
                                    <td>{pa.price}</td>
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
                            name="paperAssetType"
                            value={this.state.newPaperAsset.paperAssetType}
                            onChange={this.handleChange}
                        >
                            {paperAssetsOptions.map((option) => (
                                <option key={option} value={option}>{option}</option>
                            ))}
                        </select>
                    </label>
                    <label>
                        <input
                            name="price"
                            value={this.state.newPaperAsset.price}
                            onChange={this.handleChange}
                            pattern="[1-9]\d{0,}\.?\d{0,2}"
                            placeholder="Shares X Price"
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
