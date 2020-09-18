import React from 'react';
import Table from 'react-bootstrap/Table';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

const earnedIncomeOptions = ['Job', 'Self-Employment', 'Other'];

export default function EarnedIncome(props) {
    return (
        <>
            <h5>
                <span>Earned</span>
                <span className="right">${props.totalEarnedIncome.map(elem => elem.amount).reduce(function (acc, num) {
                    return acc + num;
                }, 0)}
                </span>
            </h5>
            {props.totalEarnedIncome.map(ei => (
                <div key={ei._id}>
                    <Table borderless hover size="sm">
                        <tbody>
                            <tr>
                                <td className="left">
                                    <button
                                        name={ei.amount}
                                        value={ei._id}
                                    // onClick={props.handleEarnedIncomeUpdate}
                                    >
                                        U
                                    </button>
                                    <button
                                        name={ei.amount}
                                        value={ei._id}
                                        onClick={props.handleEarnedIncomeDelete}>
                                        X
                                    </button>
                                    {ei.type}
                                </td>
                                <td className="right">{ei.amount}</td>
                            </tr>
                        </tbody>
                    </Table>
                </div>
            ))}

            <Form ref={props.earnedFormRef} onSubmit={props.handleEarnedIncomeSubmit}>
                <Form.Row>
                    <Form.Group>
                        <select
                            name="type"
                            value={props.newEarnedIncome.type}
                            onChange={props.handleEarnedIncomeChange}
                            className="select"
                        >
                            {earnedIncomeOptions.map(option => (
                                <option key={option} value={option}>{option}</option>
                            ))}
                        </select>
                    </Form.Group>
                    <Form.Group>
                        <Form.Control
                            name="amount"
                            value={props.newEarnedIncome.amount}
                            onChange={props.handleEarnedIncomeChange}
                            required
                            pattern="[1-9]\d{0,}\.?\d{0,2}"
                            autocomplete="off"
                            placeholder="Salary/Commission"
                            size="sm"
                        />
                    </Form.Group>
                    {/* <Form.Group>
                        <Form.Control
                            type="hidden"
                            name="class"
                            value={props.newEarnedIncome.class}
                            onChange={props.handleEarnedIncomeChange} />
                    </Form.Group> */}
                    <Form.Group>
                        <Form.Control
                            type="hidden"
                            name="class"
                            value={props.newEarnedIncome.class}
                            onChange={props.handleEarnedIncomeChange} />
                        <Form.Control
                            type="hidden"
                            name="category"
                            value={props.newEarnedIncome.category}
                            onChange={props.handleEarnedIncomeChange} />
                        <Button
                            className="form-submission"
                            onClick={props.handleEarnedIncomeSubmit}
                            disabled={props.earnedFormInvalid}
                            size="sm"
                        >ADD</Button>
                    </Form.Group>
                </Form.Row>
            </Form>
        </>
    )
}
