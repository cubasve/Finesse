import React from 'react';
import PayYourselfFirst from '../PayYourselfFirst/PayYourselfFirst';
import Expenses from '../Expenses/Expenses';


export default function Expenditure({ totalExpensesAndSelfFirst, totalExpenses, handleExpenseDelete, expenseFormRef, handleExpenseSubmit, newExpense, handleExpenseChange, expenseFormInvalid, totalPayYourselfFirst, newPayYourselfFirst, handleSelfFirstSubmit, handleSelfFirstChange, handleSelfFirstDelete, selfFirstFormInvalid, selfFirstFormRef }) {
    return (
        <div className="border">
            <span className="title"><span>EXPENSES</span></span>

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