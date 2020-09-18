import React from 'react';
import Table from 'react-bootstrap/Table';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

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
                                <td className="left">{ca.type}</td>
                                <td className="right">{ca.amount}</td>
                                {/* <td><button value="Update">U</button></td>
                                    <td><button value="Delete">X</button></td>  */}
                            </tr>
                        </tbody >
                    </Table >
                </div >
            ))
            }

            < Form ref={props.cashFormRef} onSubmit={props.handleCashSubmit} >
                <Form.Row>
                    <Form.Group>
                        <select
                            name="type"
                            value={props.newCash.type}
                            onChange={props.handleCashChange}
                            className="select"
                        >
                            {cashOptions.map((option) => (
                                <option key={option} value={option}>{option}</option>
                            ))}
                        </select>
                    </Form.Group>
                    <Form.Group>
                        <Form.Control
                            name="amount"
                            value={props.newCash.amount}
                            onChange={props.handleCashChange}
                            required
                            pattern="[1-9]\d{0,}\.?\d{0,2}"
                            placeholder="Bank Accounts"
                            autocomplete="off"
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