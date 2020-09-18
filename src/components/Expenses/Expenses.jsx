import React from 'react';
import PayYourselfFirst from '../PayYourselfFirst/PayYourselfFirst';
import Table from 'react-bootstrap/Table';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

const expenseOptions = ['Taxes', 'Housing', 'Transportation', 'Food', 'Children', 'Debt Payments', 'Entertainment', 'Donations', 'Other'];

export default function Expenses(props) {
    return (
        <div className="border">
            <span className="title">
                <span>EXPENSES</span>
                {/* <span className="right">${props.totalExpenses.map(elem => elem.amount).reduce(function (acc, num) {
                    return acc + num;
                }, 0)}
                </span> */}
            </span>
            <PayYourselfFirst
                totalPayYourselfFirst={props.totalPayYourselfFirst}
                newPayYourselfFirst={props.newPayYourselfFirst}
                handleSelfFirstSubmit={props.handleSelfFirstSubmit}
                handleSelfFirstChange={props.handleSelfFirstChange}
                handleSelfFirstDelete={props.handleSelfFirstDelete}
                selfFirstFormInvalid={props.selfFirstFormInvalid}
                selfFirstFormRef={props.selfFirstFormRef}
            />

            <h5>
                <span>Expenses</span>
                <span className="right">${props.totalExpenses.map(elem => elem.amount).reduce(function (acc, num) {
                    return acc + num;
                }, 0)}
                </span>
            </h5>

            {props.totalExpenses.map(ex => (
                <div key={ex.amount}>
                    <Table borderless hover size="sm">
                        <tbody>
                            <tr>
                                <td className="left">
                                    <Button
                                        name={ex.amount}
                                        value={ex._id}
                                        onClick={props.handleExpenseDelete}
                                        variant="danger"
                                        size="sm"
                                        className="delete">X</Button>
                                    {ex.type}
                                </td>
                                <td className="right">{ex.amount}</td>
                            </tr>
                        </tbody>
                    </Table>
                </div>
            ))}
            <Form ref={props.expenseFormRef} onSubmit={props.handleExpenseSubmit}>
                <Form.Row>
                    <Form.Group>
                        <select
                            name="type"
                            value={props.newExpense.type}
                            onChange={props.handleExpenseChange}
                            className="select"
                        >
                            {expenseOptions.map((option) => (
                                <option key={option} value={option}>{option}</option>
                            ))}
                        </select>
                    </Form.Group>
                    <Form.Group>
                        <Form.Control
                            name="amount"
                            value={props.newExpense.amount}
                            onChange={props.handleExpenseChange}
                            required
                            pattern="[1-9]\d{0,}\.?\d{0,2}"
                            autocomplete="off"
                            size="sm"
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Control
                            type="hidden"
                            name="category"
                            value={props.newExpense.category}
                            onChange={props.handleExpenseChange}
                        />
                        <Button
                            className="form-submission"
                            onClick={props.handleExpenseSubmit}
                            disabled={props.expenseFormInvalid}
                            size="sm"
                        >ADD</Button>
                    </Form.Group>
                </Form.Row>
            </Form>
        </div >
    )
}
