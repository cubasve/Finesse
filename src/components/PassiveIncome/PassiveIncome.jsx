import React from 'react';
import { Table, Form, Button } from 'react-bootstrap';

const passiveIncomeOptions = ['Real Estate', 'Business', 'Commodities', 'Royalties', 'Other'];

function calculatePassivePercentage(totalIncome, totalPassiveIncome) {
    const percentage = (totalPassiveIncome / totalIncome) * 100;
    const result = percentage.toFixed(1);
    return result;
}

export default function PassiveIncome({ totalPassiveIncome, handlePassiveIncomeDelete, passiveFormRef, handlePassiveIncomeSubmit, newPassiveIncome, handlePassiveIncomeChange, passiveFormInvalid, totalIncome }) {

    const totalIncomeNumber = totalIncome.map(elem => elem.amount).reduce((acc, num) => acc + num, 0);
    const totalPassiveIncomeNumber = totalPassiveIncome.map(elem => elem.amount).reduce((acc, num) => acc + num, 0);
    return (
        <>
            <h5>
                <span className="left">{calculatePassivePercentage(totalIncomeNumber, totalPassiveIncomeNumber)}%</span>
                <span>Passive</span>
                <span className="right">${totalPassiveIncome.map(elem => elem.amount).reduce(function (acc, num) {
                    return acc + num;
                }, 0)}</span>
            </h5>
            {totalPassiveIncome.map(pi => (
                <div key={pi.amount}>
                    <Table borderless hover size="sm">
                        <tbody>
                            <tr>
                                <td className="left">
                                    <Button
                                        name={pi.amount}
                                        value={pi._id}
                                        onClick={handlePassiveIncomeDelete}
                                        variant="danger"
                                        size="sm"
                                        className="delete">X</Button>
                                    {pi.type}
                                </td>
                                <td className="right">{pi.amount}</td>
                            </tr>
                        </tbody>
                    </Table>
                </div>
            ))}
            <Form ref={passiveFormRef} onSubmit={handlePassiveIncomeSubmit}>
                <Form.Row>
                    <Form.Group>
                        <Form.Control
                            name="type"
                            value={newPassiveIncome.type}
                            onChange={handlePassiveIncomeChange}
                            as="select"
                            size="sm"
                        >
                            {passiveIncomeOptions.map((option) => (
                                <option key={option} value={option}>{option}</option>
                            ))}
                        </Form.Control>
                    </Form.Group>
                    <Form.Group>
                        <Form.Control
                            name="amount"
                            value={newPassiveIncome.amount}
                            onChange={handlePassiveIncomeChange}
                            required
                            pattern="[1-9]\d{0,}\.?\d{0,2}"
                            autoComplete="off"
                            size="sm"
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Control
                            type="hidden"
                            name="class"
                            value={newPassiveIncome.class}
                            onChange={handlePassiveIncomeChange}
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Control
                            type="hidden"
                            name="category"
                            value={newPassiveIncome.category}
                            onChange={handlePassiveIncomeChange}
                        />
                        <Button
                            className="form-submission"
                            onClick={handlePassiveIncomeSubmit}
                            disabled={passiveFormInvalid}
                            size="sm"
                        >ADD</Button>
                    </Form.Group>
                </Form.Row>
            </Form>
        </>
    )
}