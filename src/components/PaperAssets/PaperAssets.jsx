import React from 'react';
import Table from 'react-bootstrap/Table';

const paperAssetsOptions = ['Stock', 'Bond', 'Index/Mutual Fund', 'GIC', 'REIT', 'Other'];

export default function PaperAssets(props) {



    return (
        <section>
            <h5>
                <span>Paper</span>
                <span className="right">${props.totalPaperAssets.map(elem => elem.amount).reduce(function (acc, num) {
                    return acc + num;
                }, 0)}</span>
            </h5>
            {props.totalPaperAssets.map(pa => (
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
            <form ref={props.paperAssetFormRef} onSubmit={props.handlePaperAssetSubmit}>
                <label>
                    <select
                        name="type"
                        value={props.newPaperAsset.type}
                        onChange={props.handlePaperAssetChange}
                    >
                        {paperAssetsOptions.map((option) => (
                            <option key={option} value={option}>{option}</option>
                        ))}
                    </select>
                </label>
                <label>
                    <input
                        name="amount"
                        value={props.newPaperAsset.amount}
                        onChange={props.handlePaperAssetChange}
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
                        value={props.newPaperAsset.category}
                        onChange={props.handlePaperAssetChange}
                    />
                </label>
                <button
                    className="form-submission"
                    onClick={props.handlePaperAssetSubmit}
                    disabled={props.paperAssetFormInvalid}
                >ADD</button>
            </form>
        </section >
    )
}

