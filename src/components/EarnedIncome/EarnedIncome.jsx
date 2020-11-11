import React from 'react';
import { Table, Form, Button } from 'react-bootstrap';

const earnedIncomeOptions = ['Job', 'Self-Employment', 'Other'];

function calculateEarnedPercentage(totalIncome, totalEarnedIncome) {
    if (!totalIncome || !totalEarnedIncome) return 0;
    const percentage = (totalEarnedIncome / totalIncome) * 100;
    const result = percentage.toFixed(1);
    return result;
}

function calculateTotalEarnedIncome(totalEarnedIncomeNumber) {
    if (!totalEarnedIncomeNumber) return 0;
    return totalEarnedIncomeNumber.toFixed(2);
}

export default function EarnedIncome({ totalEarnedIncome, handleEarnedIncomeDelete, handleEarnedIncomeSubmit, newEarnedIncome, handleEarnedIncomeChange, earnedFormInvalid, earnedFormRef, totalIncome }) {

    const totalIncomeNumber = totalIncome.map(elem => elem.amount).reduce((acc, num) => acc + num, 0);
    const totalEarnedIncomeNumber = totalEarnedIncome.map(elem => elem.amount).reduce((acc, num) => acc + num, 0);

    return (
        <>
            <h5>
                <span className="left">{calculateEarnedPercentage(totalIncomeNumber, totalEarnedIncomeNumber)}%</span>
                <span>Earned</span>
                <span className="right">${calculateTotalEarnedIncome(totalEarnedIncomeNumber)}</span>
            </h5>
            {totalEarnedIncome.map(ei => (
                <div key={ei._id}>
                    <Table borderless hover size="sm">
                        <tbody>
                            <tr>
                                <td className="left">
                                    {/* <button
                                        name={ei.amount}
                                        value={ei._id}
                                        onClick={props.handleEarnedIncomeUpdate}
                                    >
                                        U
                                    </button> */}
                                    <Button
                                        name={ei.amount}
                                        value={ei._id}
                                        onClick={handleEarnedIncomeDelete}
                                        variant="danger"
                                        size="sm"
                                        className="delete">
                                        X
                                    </Button>
                                    <span></span>
                                    {ei.type}
                                </td>
                                <td className="right">{ei.amount}</td>
                            </tr>
                        </tbody>
                    </Table>
                </div>
            ))}

            <Form ref={earnedFormRef} onSubmit={handleEarnedIncomeSubmit}>
                <Form.Row>
                    <Form.Group>
                        <Form.Control
                            name="type"
                            value={newEarnedIncome.type}
                            onChange={handleEarnedIncomeChange}
                            as="select"
                            size="sm"
                        >
                            {earnedIncomeOptions.map(option => (
                                <option key={option} value={option}>{option}</option>
                            ))}
                        </Form.Control>
                    </Form.Group>
                    <Form.Group>
                        <Form.Control
                            name="amount"
                            value={newEarnedIncome.amount}
                            onChange={handleEarnedIncomeChange}
                            required
                            pattern="[1-9]\d{0,}\.?\d{0,2}"
                            autoComplete="off"
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
                            value={newEarnedIncome.class}
                            onChange={handleEarnedIncomeChange} />
                        <Form.Control
                            type="hidden"
                            name="category"
                            value={newEarnedIncome.category}
                            onChange={handleEarnedIncomeChange} />
                        <Button
                            className="form-submission"
                            onClick={handleEarnedIncomeSubmit}
                            disabled={earnedFormInvalid}
                            size="sm"
                        >ADD</Button>
                    </Form.Group>
                </Form.Row>
            </Form>
        </>
    )
}
