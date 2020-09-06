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
        },

        totalPortfolioIncome: [],
        newPortfolioIncome: {
            type: 'Stock',
            amount: '',
            category: 'Portfolio',
        },

        totalPassiveIncome: [],
        newPassiveIncome: {
            type: 'Real Estate',
            amount: '',
            category: 'Passive'
        },

        formInvalid: true,
    }
    // formRef = React.createRef(); //object that provides access to a DOM element - validate form before creating newPortfolioIncome
    earnedFormRef = React.createRef();
    portfolioFormRef = React.createRef();
    passiveFormRef = React.createRef();

    async componentDidMount() {
        try {
            console.log('App: componentDidMount')
            await financialStatementService.show().then(
                data => {
                    this.setState({
                        totalEarnedIncome: data.user.userFinances.filter(elem => elem.category === 'Earned'),
                        totalPortfolioIncome: data.user.userFinances.filter(elem => elem.category === 'Portfolio'),
                        totalPassiveIncome: data.user.userFinances.filter(elem => elem.category === 'Passive'),
                        // totalIncome: data.user.userFinances
                        //     .filter(elem => (elem.category === 'Earned' || elem.category === 'Portfolio' || elem.category === 'Passive'))
                        //     .reduce((acc, num) => acc + num)
                    })
                })
        } catch (err) {
            console.error(err)
        }
    }

    // handleTotalIncome = async (e) => {

    //     try {
    //         totalIncome: data.user.userFinances.filter(elem => (elem.category === 'Earned'))

    //     } catch (err) {
    //         console.error(err)
    //     }
    // }

    handleEarnedIncomeSubmit = async (e) => {
        e.preventDefault();
        // if (!this.formRef.current.checkValidity()) return;
        if (!this.earnedFormRef.current.checkValidity()) return;
        try {
            await financialStatementService.create({
                type: this.state.newEarnedIncome.type,
                amount: this.state.newEarnedIncome.amount,
                category: this.state.newEarnedIncome.category
            })
                .then(data => {
                    this.setState({
                        totalEarnedIncome: data.user.userFinances.filter(elem => elem.category === 'Earned'),
                        newEarnedIncome: {
                            type: 'Job',
                            amount: '',
                            category: 'Earned'
                        },
                        formInvalid: true,
                    })
                })
        } catch (err) {
            console.error(err);
        }
    }

    handleEarnedIncomeChange = e => {
        const newEarnedIncome = { ...this.state.newEarnedIncome, [e.target.name]: e.target.value }
        // this.setState({ newEarnedIncome: newEarnedIncome, formInvalid: !this.formRef.current.checkValidity() });
        this.setState({ newEarnedIncome: newEarnedIncome, formInvalid: !this.earnedFormRef.current.checkValidity() });
    }

    handlePortfolioIncomeSubmit = async (e) => {
        e.preventDefault();
        // if (!this.formRef.current.checkValidity()) return;
        if (!this.portfolioFormRef.current.checkValidity()) return;
        try {
            await financialStatementService.create({
                type: this.state.newPortfolioIncome.type,
                amount: this.state.newPortfolioIncome.amount,
                category: this.state.newPortfolioIncome.category
            })
                .then(data => {
                    this.setState({
                        totalPortfolioIncome: data.user.userFinances.filter(elem => elem.category === 'Portfolio'),
                        // totalIncome: [...this.state.totalPortfolioIncome, ...this.state.totalEarnedIncome, ...this.state.totalPassiveIncome],
                        newPortfolioIncome: {
                            type: 'Stock',
                            amount: '',
                            category: 'Portfolio',
                        },
                        formInvalid: true,
                    })
                })
        } catch (err) {
            console.error(err);
        }
    }

    handlePortfolioIncomeChange = e => {
        const newPortfolioIncome = { ...this.state.newPortfolioIncome, [e.target.name]: e.target.value }
        // this.setState({ newPortfolioIncome: newPortfolioIncome, formInvalid: !this.formRef.current.checkValidity() })
        this.setState({ newPortfolioIncome: newPortfolioIncome, formInvalid: !this.portfolioFormRef.current.checkValidity() })
    }

    handlePassiveIncomeSubmit = async (e) => {
        e.preventDefault();
        // if (!this.formRef.current.checkValidity()) return;
        if (!this.passiveFormRef.current.checkValidity()) return;
        try {
            await financialStatementService.create({
                type: this.state.newPassiveIncome.type,
                amount: this.state.newPassiveIncome.amount,
                category: this.state.newPassiveIncome.category
            })
                .then(data => {
                    this.setState({
                        totalPassiveIncome: data.user.userFinances.filter(elem => (elem.category === 'Passive')),
                        newPassiveIncome: {
                            type: 'Real Estate',
                            amount: '',
                            category: 'Passive',
                        },
                        formInvalid: true,
                    })
                })
        } catch (err) {
            console.error(err);
        }
    }

    handlePassiveIncomeChange = e => {
        const newPassiveIncome = { ...this.state.newPassiveIncome, [e.target.name]: e.target.value }
        // this.setState({ newPassiveIncome: newPassiveIncome, formInvalid: !this.formRef.current.checkValidity() });
        this.setState({ newPassiveIncome: newPassiveIncome, formInvalid: !this.passiveFormRef.current.checkValidity() });
    }

    render() {
        return (
            <>
                <Income
                    totalIncome={this.state.totalIncome}

                    totalEarnedIncome={this.state.totalEarnedIncome}
                    newEarnedIncome={this.state.newEarnedIncome}
                    handleEarnedIncomeSubmit={this.handleEarnedIncomeSubmit}
                    handleEarnedIncomeChange={this.handleEarnedIncomeChange}

                    totalPortfolioIncome={this.state.totalPortfolioIncome}
                    newPortfolioIncome={this.state.newPortfolioIncome}
                    handlePortfolioIncomeSubmit={this.handlePortfolioIncomeSubmit}
                    handlePortfolioIncomeChange={this.handlePortfolioIncomeChange}

                    totalPassiveIncome={this.state.totalPassiveIncome}
                    newPassiveIncome={this.state.newPassiveIncome}
                    handlePassiveIncomeSubmit={this.handlePassiveIncomeSubmit}
                    handlePassiveIncomeChange={this.handlePassiveIncomeChange}

                    formInvalid={this.state.formInvalid}
                    // formRef={this.formRef}
                    earnedFormRef={this.earnedFormRef}
                    portfolioFormRef={this.portfolioFormRef}
                    passiveFormRef={this.passiveFormRef}
                />

                <Expenses />
                CASH FLOW: INCOME - EXPENSES
            </>
        )
    }
}