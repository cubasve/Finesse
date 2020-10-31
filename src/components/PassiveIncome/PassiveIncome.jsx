import React from 'react';
import Table from 'react-bootstrap/Table';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

const passiveIncomeOptions = ['Real Estate', 'Business', 'Commodities', 'Royalties', 'Other'];

export default function PassiveIncome(props) {
    return (
        <>
            <h5>
                <span>Passive</span>
                <span className="right">${props.totalPassiveIncome.map(elem => elem.amount).reduce(function (acc, num) {
                    return acc + num;
                }, 0)}</span>
            </h5>
            {props.totalPassiveIncome.map(pi => (
                <div key={pi.amount}>
                    <Table borderless hover size="sm">
                        <tbody>
                            <tr>
                                <td className="left">
                                    <Button
                                        name={pi.amount}
                                        value={pi._id}
                                        onClick={props.handlePassiveIncomeDelete}
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
            <Form ref={props.passiveFormRef} onSubmit={props.handlePassiveIncomeSubmit}>
                <Form.Row>
                    <Form.Group>
                        <Form.Control
                            name="type"
                            value={props.newPassiveIncome.type}
                            onChange={props.handlePassiveIncomeChange}
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
                            value={props.newPassiveIncome.amount}
                            onChange={props.handlePassiveIncomeChange}
                            required
                            pattern="[1-9]\d{0,}\.?\d{0,2}"
                            autocomplete="off"
                            size="sm"
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Control
                            type="hidden"
                            name="class"
                            value={props.newPassiveIncome.class}
                            onChange={props.handlePassiveIncomeChange}
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Control
                            type="hidden"
                            name="category"
                            value={props.newPassiveIncome.category}
                            onChange={props.handlePassiveIncomeChange}
                        />
                        <Button
                            className="form-submission"
                            onClick={props.handlePassiveIncomeSubmit}
                            disabled={props.passiveFormInvalid}
                            size="sm"
                        >ADD</Button>
                    </Form.Group>
                </Form.Row>
            </Form>
        </>
    )
}