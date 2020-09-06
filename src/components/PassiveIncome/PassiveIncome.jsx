import React from 'react';
import Table from 'react-bootstrap/Table';
import FormControl from 'react-bootstrap/FormControl';

const passiveIncomeOptions = ['Real Estate', 'Business', 'Commodities', 'Royalties', 'Other'];

export default function PassiveIncome(props) {
    return (
        <section>
            <h5>
                <span>Passive</span>
                <span className="right">${props.totalPassiveIncome.map(elem => elem.amount).reduce(function (acc, num) {
                    return acc + num;
                }, 0)}</span>
            </h5>
            {props.totalPassiveIncome.map(pi => (
                <div key={pi.amount}>
                    <Table hover size="sm">
                        <tbody>
                            <tr>
                                <td>{pi.type}</td>
                                <td className="right">{pi.amount}</td>
                                {/* <td><button value="Update">U</button></td>
                                    <td><button value="Delete">X</button></td> */}
                            </tr>
                        </tbody>
                    </Table>
                </div>
            ))}
            {/* <form ref={props.formRef} onSubmit={props.handlePassiveIncomeSubmit}> */}
            <form ref={props.passiveFormRef} onSubmit={props.handlePassiveIncomeSubmit}>
                {/* <InputGroup>
                        <DropdownButton
                            id="dropdown-item-button"
                            title="Earned"
                            variant="outline-secondary"
                            name="type"
                            value={this.state.newPassiveIncome.type}
                            onChange={this.handleChange}>
                            <Dropdown.Item as="button">Job</Dropdown.Item>
                            <Dropdown.Item as="button">Self-Employment</Dropdown.Item>
                            <Dropdown.Item as="button">Other</Dropdown.Item>
                        </DropdownButton>
                        <FormControl
                            name="amount"
                            value={this.state.newPassiveIncome.amount}
                            onChange={this.handleChange}
                            required
                            pattern="[1-9]\d{0,}\.?\d{0,2}"
                            autocomplete="off"
                            placeholder="Salary/Commission" />
                    </InputGroup> */}
                <label>
                    <select
                        name="type"
                        value={props.newPassiveIncome.type}
                        onChange={props.handlePassiveIncomeChange}
                    >
                        {passiveIncomeOptions.map((option) => (
                            <option key={option} value={option}>{option}</option>
                        ))}
                    </select>
                </label>
                <label>
                    <input
                        name="amount"
                        value={props.newPassiveIncome.amount}
                        onChange={props.handlePassiveIncomeChange}
                        required
                        pattern="[1-9]\d{0,}\.?\d{0,2}"
                        autocomplete="off"
                    />
                </label>
                <label>
                    <input
                        type="hidden"
                        name="category"
                        value={props.newPassiveIncome.category}
                        onChange={props.handlePassiveIncomeChange}
                    />
                </label>
                <button
                    className="form-submission"
                    onClick={props.handlePassiveIncomeSubmit}
                    disabled={props.passiveFormInvalid}
                >ADD</button>
            </form>
        </section >
    )
}