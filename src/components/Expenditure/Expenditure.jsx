import React from 'react';
import PayYourselfFirst from '../PayYourselfFirst/PayYourselfFirst';
import Expenses from '../Expenses/Expenses';


export default function Expenditure({ totalExpensesAndSelfFirst, totalExpenses, handleExpenseDelete, expenseFormRef, handleExpenseSubmit, newExpense, handleExpenseChange, expenseFormInvalid, totalIncome, totalPayYourselfFirst, newPayYourselfFirst, handleSelfFirstSubmit, handleSelfFirstChange, handleSelfFirstDelete, selfFirstFormInvalid, selfFirstFormRef }) {
    return (
        <div className="border">
            <span className="title"><span>EXPENSES</span></span>

            <PayYourselfFirst
                totalExpensesAndSelfFirst={this.state.totalExpensesAndSelfFirst}
                totalPayYourselfFirst={this.state.totalPayYourselfFirst}
                newPayYourselfFirst={this.state.newPayYourselfFirst}
                handleSelfFirstSubmit={this.handleSelfFirstSubmit}
                handleSelfFirstChange={this.handleSelfFirstChange}
                handleSelfFirstDelete={this.handleSelfFirstDelete}
                selfFirstFormInvalid={this.state.selfFirstFormInvalid}
                selfFirstFormRef={this.selfFirstFormRef}
            />
            <Expenses
                totalExpensesAndSelfFirst={this.state.totalExpensesAndSelfFirst}
                totalExpenses={this.state.totalExpenses}
                newExpense={this.state.newExpense}
                handleExpenseSubmit={this.handleExpenseSubmit}
                handleExpenseChange={this.handleExpenseChange}
                handleExpenseDelete={this.handleExpenseDelete}
                expenseFormInvalid={this.state.expenseFormInvalid}
                expenseFormRef={this.expenseFormRef}
            />
        </div>
    )
}