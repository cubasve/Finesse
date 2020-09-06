import React from 'react';
import Table from 'react-bootstrap/Table';

const commodityOptions = ['Metals', 'Energy', 'Livestock & Meat', 'Agriculture', 'Cryptocurrency', 'Other'];

export default function Commodities(props) {
    return (
        <section>
            <h5>
                <span>Commodities</span>
                <span className="right">${props.totalCommodities.map(elem => elem.amount).reduce(function (acc, num) {
                    return acc + num;
                }, 0)}</span>
            </h5>
            {props.totalCommodities.map(c => (
                <div key={c.amount}>
                    <Table hover size="sm">
                        <tbody>
                            <tr>
                                <td>{c.type}</td>
                                <td className="right">{c.amount}</td>
                                {/* <td><button value="Update">U</button></td>
                                    <td><button value="Delete">X</button></td> */}
                            </tr>
                        </tbody>
                    </Table>
                </div>
            ))}
            <form ref={props.commodityFormRef} onSubmit={props.handleCommoditySubmit}>
                <label>
                    <select
                        name="type"
                        value={props.newCommodity.type}
                        onChange={props.handleCommodityChange}
                    >
                        {commodityOptions.map((option) => (
                            <option key={option} value={option}>{option}</option>
                        ))}
                    </select>
                </label>
                <label>
                    <input
                        name="amount"
                        value={props.newCommodity.amount}
                        onChange={props.handleCommodityChange}
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
                        value={props.newCommodity.category}
                        onChange={props.handleCommodityChange}
                    />
                </label>
                <button
                    className="form-submission"
                    onClick={props.handleCommoditySubmit}
                    disabled={props.commodityFormInvalid}
                >ADD</button>
            </form>
        </section >
    )
}