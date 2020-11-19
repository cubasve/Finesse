import React from 'react';
import { Table, Form, Button } from 'react-bootstrap';

const expenseOptions = ['Taxes', 'Housing', 'Transportation', 'Food', 'Children', 'Debt Payments', 'Entertainment', 'Donations', 'Other'];

function calculateTotalExpenseIncome(totalExpenseNumber) {
    if (!totalExpenseNumber) return 0;
    if (Number.isInteger(totalExpenseNumber)) return totalExpenseNumber;
    return totalExpenseNumber.toFixed(2);
}

function calculateExpensePercentage(totalExpensesAndSelfFirst, totalExpenses) {
    if (!totalExpensesAndSelfFirst || !totalExpenses) return 0;
    const percentage = (totalExpenses / totalExpensesAndSelfFirst) * 100;
    if (Number.isInteger(percentage)) return percentage;
    const result = percentage.toFixed(1);
    return result;
}

export default function Expenses({ totalExpensesAndSelfFirst, totalExpenses, handleExpenseDelete, expenseFormRef, handleExpenseSubmit, newExpense, handleExpenseChange, expenseFormInvalid }) {

    const totalExpenseNumber = totalExpenses.map(elem => elem.amount).reduce((acc, num) => acc + num, 0);
    const totalExpensesAndSelfFirstNumber = totalExpensesAndSelfFirst.map(elem => elem.amount).reduce((acc, num) => acc + num, 0);

    return (
        <>
            <h5>
                <span className="left percentage">{calculateExpensePercentage(totalExpensesAndSelfFirstNumber, totalExpenseNumber)}%</span>
                <span>Other Expenses</span>
                <span className="right">${calculateTotalExpenseIncome(totalExpenseNumber)}
                </span>
            </h5>

            {totalExpenses.map(ex => (
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
                            className="select"
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
        </>
    )
}
