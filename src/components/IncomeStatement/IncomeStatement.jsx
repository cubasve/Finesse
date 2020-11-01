import React, { Component } from 'react';
import Income from '../../components/Income/Income';
import Expenses from '../../components/Expenses/Expenses';
import financialStatementService from '../../utils/financialStatementService';

export default class IncomeStatement extends Component {
    state = {
        totalIncome: [],

        totalEarnedIncome: [],
        newEarnedIncome: {
            type: 'Job',
            amount: '',
            category: 'Earned',
            class: 'Income',
        },
        earnedFormInvalid: true,

        totalPortfolioIncome: [],
        newPortfolioIncome: {
            type: 'Stock',
            amount: '',
            category: 'Portfolio',
            class: 'Income',
        },
        portfolioFormInvalid: true,

        totalPassiveIncome: [],
        newPassiveIncome: {
            type: 'Real Estate',
            amount: '',
            category: 'Passive',
            class: 'Income',
        },
        passiveFormInvalid: true,

        totalExpenses: [],
        newExpense: {
            type: 'Taxes',
            amount: '',
            category: 'Expense',
            class: 'Expense',
        },
        expenseFormInvalid: true,

        totalPayYourselfFirst: [],
        newPayYourselfFirst: {
            // type: 'Self',
            amount: '',
            category: 'Self',
            class: 'Self'
        },
        selfFirstFormInvalid: true,
    }
    earnedFormRef = React.createRef();
    portfolioFormRef = React.createRef();
    passiveFormRef = React.createRef();
    expenseFormRef = React.createRef();
    selfFirstFormRef = React.createRef();

    async componentDidMount() {
        try {
            await financialStatementService.show().then(
                data => {
                    this.setState({
                        totalEarnedIncome: data.user.userFinances.filter(elem => elem.category === 'Earned'),
                        totalPortfolioIncome: data.user.userFinances.filter(elem => elem.category === 'Portfolio'),
                        totalPassiveIncome: data.user.userFinances.filter(elem => elem.category === 'Passive'),
                        totalExpenses: data.user.userFinances.filter(elem => elem.category === 'Expense'),
                        totalPayYourselfFirst: data.user.userFinances.filter(elem => elem.category === 'Self'),
                        // totalIncome: data.user.userFinances
                        //     .filter(elem => elem.category === 'Earned' && elem.category === 'Portfolio' && elem.category === 'Passive'),
                        // totalIncome: data.user.userFinances.filter(elem => elem.class === 'Income'),
                        totalIncome: data.user.userFinances.filter(elem => elem.category === 'Earned' || elem.category === 'Portfolio' || elem.category === 'Passive'),
                    })
                })
        } catch (err) {
            console.error(err)
        }
    }

    handleEarnedIncomeSubmit = async (e) => {
        e.preventDefault();
        if (!this.earnedFormRef.current.checkValidity()) return;
        try {
            await financialStatementService.create({
                type: this.state.newEarnedIncome.type,
                amount: this.state.newEarnedIncome.amount,
                category: this.state.newEarnedIncome.category,
                class: this.state.newEarnedIncome.class,
            })
                .then(data => {
                    this.setState({
                        totalEarnedIncome: data.user.userFinances.filter(elem => elem.category === 'Earned'),
                        //totalIncome: data.user.userFinances.filter(elem => elem.category === 'Earned'),

                        // totalIncome: data.user.userFinances.filter(elem => elem.category === 'Earned' && elem.category === 'Portfolio' && elem.category === 'Passive'),
                        // totalIncome: data.user.userFinances.filter(elem => elem.class === 'Income'),
                        // totalIncome: data.user.userFinances.filter(elem => elem.category === 'Earned'),
                        totalIncome: data.user.userFinances.filter(elem => elem.category === 'Earned' || elem.category === 'Portfolio' || elem.category === 'Passive'),
                        newEarnedIncome: {
                            type: 'Job',
                            amount: '',
                            category: 'Earned',
                            class: 'Income',
                        },
                        earnedFormInvalid: true,
                    })
                })
        } catch (err) {
            console.error(err);
        }
    }

    handleEarnedIncomeChange = e => {
        const newEarnedIncome = { ...this.state.newEarnedIncome, [e.target.name]: e.target.value }
        this.setState({ newEarnedIncome: newEarnedIncome, earnedFormInvalid: !this.earnedFormRef.current.checkValidity() });
    }

    handleEarnedIncomeDelete = async (e) => {
        try {
            await financialStatementService.deleteOne({ id: e.target.value })
                .then(data => {
                    this.setState({
                        totalEarnedIncome: data.user.userFinances.filter(elem => elem.category === 'Earned')
                    })
                })
        } catch (err) {
            console.error(err);
        }
    }

    handlePortfolioIncomeSubmit = async (e) => {
        e.preventDefault();
        if (!this.portfolioFormRef.current.checkValidity()) return;
        try {
            await financialStatementService.create({
                type: this.state.newPortfolioIncome.type,
                amount: this.state.newPortfolioIncome.amount,
                category: this.state.newPortfolioIncome.category,
                class: this.state.newPortfolioIncome.class,
            })
                .then(data => {
                    this.setState({
                        totalPortfolioIncome: data.user.userFinances.filter(elem => elem.category === 'Portfolio'),
                        // totalIncome: data.user.userFinances.filter(elem => elem.category === 'Portfolio'),
                        // totalIncome: data.user.userFinances.filter(elem => elem.category === 'Earned' && elem.category === 'Portfolio' && elem.category === 'Passive'),
                        // totalIncome: data.user.userFinances.filter(elem => elem.class === 'Income'),

                        // totalIncome: data.user.userFinances.filter(elem => elem.category === 'Portfolio'),
                        totalIncome: data.user.userFinances.filter(elem => elem.category === 'Earned' || elem.category === 'Portfolio' || elem.category === 'Passive'),
                        newPortfolioIncome: {
                            type: 'Stock',
                            amount: '',
                            category: 'Portfolio',
                            class: 'Income',
                        },
                        portfolioFormInvalid: true,
                    })
                })
        } catch (err) {
            console.error(err);
        }
    }

    handlePortfolioIncomeChange = e => {
        const newPortfolioIncome = { ...this.state.newPortfolioIncome, [e.target.name]: e.target.value }
        this.setState({ newPortfolioIncome: newPortfolioIncome, portfolioFormInvalid: !this.portfolioFormRef.current.checkValidity() })
    }

    handlePortfolioIncomeDelete = async (e) => {
        try {
            await financialStatementService.deleteOne({ id: e.target.value })
                .then(data => {
                    this.setState({
                        totalPortfolioIncome: data.user.userFinances.filter(elem => elem.category === 'Portfolio')
                    })
                })
        } catch (err) {
            console.error(err);
        }
    }

    handlePassiveIncomeSubmit = async (e) => {
        e.preventDefault();
        if (!this.passiveFormRef.current.checkValidity()) return;
        try {
            await financialStatementService.create({
                type: this.state.newPassiveIncome.type,
                amount: this.state.newPassiveIncome.amount,
                category: this.state.newPassiveIncome.category,
                class: this.state.newPassiveIncome.class,
            })
                .then(data => {
                    this.setState({
                        totalPassiveIncome: data.user.userFinances.filter(elem => elem.category === 'Passive'),
                        // totalIncome: data.user.userFinances.filter(elem => elem.category === 'Passive'),

                        // totalIncome: data.user.userFinances.filter(elem => elem.category === 'Earned' && elem.category === 'Portfolio' && elem.category === 'Passive'),
                        // totalIncome: data.user.userFinances.filter(elem => elem.class === 'Income'),
                        totalIncome: data.user.userFinances.filter(elem => elem.category === 'Earned' || elem.category === 'Portfolio' || elem.category === 'Passive'),
                        newPassiveIncome: {
                            type: 'Real Estate',
                            amount: '',
                            category: 'Passive',
                            class: 'Income',
                        },
                        passiveFormInvalid: true,
                    })
                })
        } catch (err) {
            console.error(err);
        }
    }

    handlePassiveIncomeChange = e => {
        const newPassiveIncome = { ...this.state.newPassiveIncome, [e.target.name]: e.target.value }
        this.setState({ newPassiveIncome: newPassiveIncome, passiveFormInvalid: !this.passiveFormRef.current.checkValidity() });
    }

    handlePassiveIncomeDelete = async (e) => {
        try {
            await financialStatementService.deleteOne({ id: e.target.value })
                .then(data => {
                    this.setState({
                        totalPassiveIncome: data.user.userFinances.filter(elem => elem.category === 'Passive')
                    })
                })
        } catch (err) {
            console.error(err);
        }
    }

    handleExpenseSubmit = async (e) => {
        e.preventDefault();
        if (!this.expenseFormRef.current.checkValidity()) return;
        try {
            await financialStatementService.create({
                type: this.state.newExpense.type,
                amount: this.state.newExpense.amount,
                category: this.state.newExpense.category,
                class: this.state.newExpense.class,
            })
                .then(data => {
                    this.setState({
                        totalExpenses: data.user.userFinances.filter(elem => elem.category === 'Expense'),
                        newExpense: {
                            type: 'Taxes',
                            amount: '',
                            category: 'Expense',
                            class: 'Expense',
                        },
                        expenseFormInvalid: true,
                    })
                })
        } catch (err) {
            console.error(err);
        }
    }

    handleExpenseChange = e => {
        const newExpense = { ...this.state.newExpense, [e.target.name]: e.target.value }
        this.setState({ newExpense: newExpense, expenseFormInvalid: !this.expenseFormRef.current.checkValidity() })
    }

    handleExpenseDelete = async (e) => {
        try {
            await financialStatementService.deleteOne({ id: e.target.value })
                .then(data => {
                    this.setState({
                        totalExpenses: data.user.userFinances.filter(elem => elem.category === 'Expense')
                    })
                })
        } catch (err) {
            console.error(err);
        }
    }

    handleSelfFirstSubmit = async (e) => {
        e.preventDefault();
        if (!this.selfFirstFormRef.current.checkValidity()) return;
        try {
            await financialStatementService.create({
                // type: this.state.newPayYourselfFirst.type,
                amount: this.state.newPayYourselfFirst.amount,
                category: this.state.newPayYourselfFirst.category,
                class: this.state.newPayYourselfFirst.class,
            })
                .then(data => {
                    this.setState({
                        totalPayYourselfFirst: data.user.userFinances.filter(elem => elem.category === 'Self'),
                        newPayYourselfFirst: {
                            // type: 'Self',
                            amount: '',
                            category: 'Self',
                            class: 'Self',
                        },
                        selfFirstFormInvalid: true,
                    })
                })
        } catch (err) {
            console.error(err);
        }
    }

    handleSelfFirstChange = e => {
        const newPayYourselfFirst = { ...this.state.newPayYourselfFirst, [e.target.name]: e.target.value }
        this.setState({ newPayYourselfFirst: newPayYourselfFirst, selfFirstFormInvalid: !this.selfFirstFormRef.current.checkValidity() })
    }

    handleSelfFirstDelete = async (e) => {
        try {
            await financialStatementService.deleteOne({ id: e.target.value })
                .then(data => {
                    this.setState({
                        totalPayYourselfFirst: data.user.userFinances.filter(elem => elem.category === 'Self')
                    })
                })
        } catch (err) {
            console.error(err);
        }
    }

    render() {
        return (
            <>
                <h6>CASH FLOW = INCOME - EXPENSES</h6>
                <Income
                    totalIncome={this.state.totalIncome}

                    totalEarnedIncome={this.state.totalEarnedIncome}
                    newEarnedIncome={this.state.newEarnedIncome}
                    handleEarnedIncomeSubmit={this.handleEarnedIncomeSubmit}
                    handleEarnedIncomeChange={this.handleEarnedIncomeChange}
                    handleEarnedIncomeDelete={this.handleEarnedIncomeDelete}
                    earnedFormInvalid={this.state.earnedFormInvalid}
                    earnedFormRef={this.earnedFormRef}

                    totalPortfolioIncome={this.state.totalPortfolioIncome}
                    newPortfolioIncome={this.state.newPortfolioIncome}
                    handlePortfolioIncomeSubmit={this.handlePortfolioIncomeSubmit}
                    handlePortfolioIncomeChange={this.handlePortfolioIncomeChange}
                    handlePortfolioIncomeDelete={this.handlePortfolioIncomeDelete}
                    portfolioFormInvalid={this.state.portfolioFormInvalid}
                    portfolioFormRef={this.portfolioFormRef}

                    totalPassiveIncome={this.state.totalPassiveIncome}
                    newPassiveIncome={this.state.newPassiveIncome}
                    handlePassiveIncomeSubmit={this.handlePassiveIncomeSubmit}
                    handlePassiveIncomeChange={this.handlePassiveIncomeChange}
                    handlePassiveIncomeDelete={this.handlePassiveIncomeDelete}
                    passiveFormInvalid={this.state.passiveFormInvalid}
                    passiveFormRef={this.passiveFormRef}
                />

                <Expenses
                    totalExpenses={this.state.totalExpenses}
                    newExpense={this.state.newExpense}
                    handleExpenseSubmit={this.handleExpenseSubmit}
                    handleExpenseChange={this.handleExpenseChange}
                    handleExpenseDelete={this.handleExpenseDelete}
                    expenseFormInvalid={this.state.expenseFormInvalid}
                    expenseFormRef={this.expenseFormRef}

                    totalPayYourselfFirst={this.state.totalPayYourselfFirst}
                    newPayYourselfFirst={this.state.newPayYourselfFirst}
                    handleSelfFirstSubmit={this.handleSelfFirstSubmit}
                    handleSelfFirstChange={this.handleSelfFirstChange}
                    handleSelfFirstDelete={this.handleSelfFirstDelete}
                    selfFirstFormInvalid={this.state.selfFirstFormInvalid}
                    selfFirstFormRef={this.selfFirstFormRef}
                />
            </>
        )
    }
}