import React, { Component } from 'react';
import PayYourselfFirst from '../PayYourselfFirst/PayYourselfFirst';
import Table from 'react-bootstrap/Table';

const expenseOptions = ['Housing', 'Transportation', 'Food', 'Kids', 'Debt Payments', 'Entertainment', 'Donations', 'Other'];

export default function Expenses(props) {
    return (
        <div className="border">
            <span className="title">
                <span>EXPENSES</span>
                <span className="right">$
                    {/* {props.totalIncome.map(elem => elem.amount).reduce(function (acc, num) {
                    return acc + num;
                }, 0)} */}
                </span>
            </span>
            <PayYourselfFirst />

            {props.totalExpenses.map(ex => (
                <div key={ex.amount}>
                    <Table hover size="sm">
                        <tbody>
                            <tr>
                                <td>{ex.type}</td>
                                <td className="right">{ex.amount}</td>
                                {/* <td><button value="Update">U</button></td>
                                    <td><button value="Delete">X</button></td> */}
                            </tr>
                        </tbody>
                    </Table>
                </div>
            ))}
            <form ref={props.expenseFormRef} onSubmit={props.handleExpenseSubmit}>
                <label>
                    <select
                        name="type"
                        value={props.newExpense.type}
                        onChange={props.handleExpenseChange}
                    >
                        {expenseOptions.map((option) => (
                            <option key={option} value={option}>{option}</option>
                        ))}
                    </select>
                </label>
                <label>
                    <input
                        name="amount"
                        value={props.newExpense.amount}
                        onChange={props.handleExpenseChange}
                        required
                        pattern="[1-9]\d{0,}\.?\d{0,2}"
                        autocomplete="off"
                    />
                </label>
                <label>
                    <input
                        type="hidden"
                        name="category"
                        value={props.newExpense.category}
                        onChange={props.handleExpenseChange}
                    />
                </label>
                <button
                    className="form-submission"
                    onClick={props.handleExpenseSubmit}
                    disabled={props.expenseFormInvalid}
                >ADD</button>
            </form>
        </div >
    )
}
