import React from 'react';
import PayYourselfFirst from '../PayYourselfFirst/PayYourselfFirst';
import { Table, Form, Button } from 'react-bootstrap';

const expenseOptions = ['Taxes', 'Housing', 'Transportation', 'Food', 'Children', 'Debt Payments', 'Entertainment', 'Donations', 'Other'];

export default function Expenses({ totalExpenses, handleExpenseDelete, expenseFormRef, handleExpenseSubmit, newExpense, handleExpenseChange, expenseFormInvalid, totalIncome, totalPayYourselfFirst, newPayYourselfFirst, handleSelfFirstSubmit, handleSelfFirstChange, handleSelfFirstDelete, selfFirstFormInvalid, selfFirstFormRef }) {
    return (
        <div className="border">
            <span className="title">
                <span>EXPENSES</span>
                {/* <span className="right">${props.totalExpensesAndSelfFirst.map(elem => elem.amount).reduce(function (acc, num) {
                    return acc + num;
                }, 0)}
                </span> */}
            </span>
            <PayYourselfFirst
                totalIncome={totalIncome}
                totalPayYourselfFirst={totalPayYourselfFirst}
                newPayYourselfFirst={newPayYourselfFirst}
                handleSelfFirstSubmit={handleSelfFirstSubmit}
                handleSelfFirstChange={handleSelfFirstChange}
                handleSelfFirstDelete={handleSelfFirstDelete}
                selfFirstFormInvalid={selfFirstFormInvalid}
                selfFirstFormRef={selfFirstFormRef}
            />

            <h5>
                <span>Other Expenses</span>
                <span className="right">${totalExpenses.map(elem => elem.amount).reduce(function (acc, num) {
                    return acc + num;
                }, 0)}
                </span>
            </h5>

            {
                totalExpenses.map(ex => (
                    <div key={ex.amount}>
                        <Table borderless hover size="sm">
                            <tbody>
                                <tr>
                                    <td className="left">
                                        <Button
                                            name={ex.amount}
                                            value={ex._id}
                                            onClick={handleExpenseDelete}
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
                ))
            }
            <Form ref={expenseFormRef} onSubmit={handleExpenseSubmit}>
                <Form.Row>
                    <Form.Group>
                        <Form.Control
                            name="type"
                            value={newExpense.type}
                            onChange={handleExpenseChange}
                            as="select"
                            size="sm"
                        >
                            {expenseOptions.map((option) => (
                                <option key={option} value={option}>{option}</option>
                            ))}
                        </Form.Control>
                    </Form.Group>
                    <Form.Group>
                        <Form.Control
                            name="amount"
                            value={newExpense.amount}
                            onChange={handleExpenseChange}
                            required
                            pattern="[1-9]\d{0,}\.?\d{0,2}"
                            autoComplete="off"
                            size="sm"
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Control
                            type="hidden"
                            name="category"
                            value={newExpense.category}
                            onChange={handleExpenseChange}
                        />
                        <Button
                            className="form-submission"
                            onClick={handleExpenseSubmit}
                            disabled={expenseFormInvalid}
                            size="sm"
                        >ADD</Button>
                    </Form.Group>
                </Form.Row>
            </Form>
        </div >
    )
}
