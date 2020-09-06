import React from 'react';
import Table from 'react-bootstrap/Table';

const realEstateOptions = ['Residential', 'Commercial', 'Industrial', 'Land'];

export default function RealEstate(props) {
    return (
        <section>
            <h5>
                <span>Real Estate</span>
                <span className="right">${props.totalRealEstate.map(elem => elem.amount).reduce(function (acc, num) {
                    return acc + num;
                }, 0)}</span>
            </h5>

            {props.totalRealEstate.map(re => (
                <div key={re.amount}>
                    <Table hover size="sm">
                        <tbody>
                            <tr>
                                <td>{re.type}</td>
                                <td className="right">{re.amount}</td>
                                {/* <td><button value="Update">U</button></td>
                                    <td><button value="Delete">X</button></td> */}
                            </tr>
                        </tbody>
                    </Table>
                </div>
            ))}
            <form ref={props.realEstateFormRef} onSubmit={props.handleRealEstateSubmit}>
                <label>
                    <select
                        name="type"
                        value={props.newRealEstate.type}
                        onChange={props.handleRealEstateChange}
                    >
                        {realEstateOptions.map((option) => (
                            <option key={option} value={option}>{option}</option>
                        ))}
                    </select>
                </label>
                <label>
                    <input
                        name="amount"
                        value={props.newRealEstate.amount}
                        onChange={props.handleRealEstateChange}
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
                        value={props.newRealEstate.category}
                        onChange={props.handleRealEstateChange}
                    />
                </label>
                <button
                    className="form-submission"
                    onClick={props.handleRealEstateSubmit}
                    disabled={props.realEstateFormInvalid}
                >ADD</button>
            </form>
        </section >
    )
}
