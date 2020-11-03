import React from 'react';
import { Table, Form, Button } from 'react-bootstrap';

const cashOptions = ['Chequing Account', 'Savings Account'];

export default function Cash(props) {
    return (
        <>
            <h5>
                <span>Cash</span>
                <span className="right">${props.totalCash.map(elem => elem.amount).reduce(function (acc, num) {
                    return acc + num;
                }, 0)}</span>
            </h5>

            {props.totalCash.map(ca => (
                <div key={ca.amount}>
                    <Table borderless hover size="sm">
                        <tbody>
                            <tr>
                                <td className="left">
                                    <Button
                                        name={ca.amount}
                                        value={ca._id}
                                        onClick={props.handleCashDelete}
                                        variant="danger"
                                        size="sm"
                                        className="delete">X</Button>
                                    {ca.type}
                                </td>
                                <td className="right">{ca.amount}</td>
                            </tr>
                        </tbody >
                    </Table >
                </div >
            ))
            }

            < Form ref={props.cashFormRef} onSubmit={props.handleCashSubmit} >
                <Form.Row>
                    <Form.Group>
                        <Form.Control
                            name="type"
                            value={props.newCash.type}
                            onChange={props.handleCashChange}
                            as="select"
                            size="sm"
                        >
                            {cashOptions.map((option) => (
                                <option key={option} value={option}>{option}</option>
                            ))}
                        </Form.Control>
                    </Form.Group>
                    <Form.Group>
                        <Form.Control
                            name="amount"
                            value={props.newCash.amount}
                            onChange={props.handleCashChange}
                            required
                            pattern="[1-9]\d{0,}\.?\d{0,2}"
                            placeholder="Bank Accounts"
                            autoComplete="off"
                            size="sm"
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Control
                            type="hidden"
                            name="category"
                            value={props.newCash.category}
                            onChange={props.handlePaperAssetChange}
                        />
                        <Button
                            className="form-submission"
                            onClick={props.handleCashSubmit}
                            disabled={props.cashFormInvalid}
                            size="sm"
                        >ADD</Button>
                    </Form.Group>
                </Form.Row>
            </Form >
        </>
    )
}