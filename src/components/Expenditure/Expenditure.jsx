import React from 'react';
import PayYourselfFirst from '../PayYourselfFirst/PayYourselfFirst';
import Expenses from '../Expenses/Expenses';

function calculateTotalExpensesAndSelfFirst(totalExpensesAndSelfFirstNumber) {
    if (!totalExpensesAndSelfFirstNumber) return 0;
    if (Number.isInteger(totalExpensesAndSelfFirstNumber)) return totalExpensesAndSelfFirstNumber;
    return totalExpensesAndSelfFirstNumber.toFixed(2);
}

export default function Expenditure({ totalExpensesAndSelfFirst, totalExpenses, handleExpenseDelete, expenseFormRef, handleExpenseSubmit, newExpense, handleExpenseChange, expenseFormInvalid, totalPayYourselfFirst, newPayYourselfFirst, handleSelfFirstSubmit, handleSelfFirstChange, handleSelfFirstDelete, selfFirstFormInvalid, selfFirstFormRef }) {

    const totalExpensesAndSelfFirstNumber = totalExpensesAndSelfFirst.map(elem => elem.amount).reduce((acc, num) => acc + num, 0);

    return (
        <div className="border">
            <span className="title">
                <span>EXPENSES</span>
                <span className="right">${calculateTotalExpensesAndSelfFirst(totalExpensesAndSelfFirstNumber)}</span>
            </span>

            <PayYourselfFirst
                totalExpensesAndSelfFirst={totalExpensesAndSelfFirst}
                totalPayYourselfFirst={totalPayYourselfFirst}
                newPayYourselfFirst={newPayYourselfFirst}
                handleSelfFirstSubmit={handleSelfFirstSubmit}
                handleSelfFirstChange={handleSelfFirstChange}
                handleSelfFirstDelete={handleSelfFirstDelete}
                selfFirstFormInvalid={selfFirstFormInvalid}
                selfFirstFormRef={selfFirstFormRef}
            />
            <Expenses
                totalExpensesAndSelfFirst={totalExpensesAndSelfFirst}
                totalExpenses={totalExpenses}
                newExpense={newExpense}
                handleExpenseSubmit={handleExpenseSubmit}
                handleExpenseChange={handleExpenseChange}
                handleExpenseDelete={handleExpenseDelete}
                expenseFormInvalid={expenseFormInvalid}
                expenseFormRef={expenseFormRef}
            />
        </div>
    )
}