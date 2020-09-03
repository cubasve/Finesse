import React, { Component } from 'react';
import Income from '../../components/Income/Income';
import Expenses from '../../components/Expenses/Expenses';
import financialStatementService from '../../utils/financialStatementService';

export default class IncomeStatement extends Component {
    state = {
        totalPortfolioIncome: [],
        // newPortfolioIncome: {
        //     type: 'Stock',
        //     amount: '',
        //     category: 'Portfolio',
        // },
        portfolioIncome: [this.getPortfolioIncome()],

        formInvalid: true,
    }
    formRef = React.createRef(); //object that provides access to a DOM element - validate form before creating newPortfolioIncome

    getPortfolioIncome() {
        return {
            newPortfolioIncome: {
                type: 'Stock',
                amount: '',
                category: 'Portfolio',
            }
        }
    }

    async portfolioComponentDidMount() {
        try {
            let data = await financialStatementService.show()
                .then(data => {
                    this.setState({ totalPortfolioIncome: data.user.userFinances.filter(elem => (elem.category === 'Portfolio')) })
                })
            console.log(data)
        } catch (err) {
            console.error(err);
        }
    }

    handlePortfolioIncomeSubmit = async (e) => {
        e.preventDefault();
        if (!this.formRef.current.checkValidity()) return;
        try {
            await financialStatementService.create({
                type: this.state.newPortfolioIncome.type, amount: this.state.newPortfolioIncome.amount,
                category: this.state.newPortfolioIncome.category
            })
                .then(
                    this.setState(state => ({
                        totalPortfolioIncome: [...state.totalPortfolioIncome, state.newPortfolioIncome],
                        //add newEarnedIncome onto pre-existing totalEarnedIncome array
                        newPortfolioIncome: {
                            type: 'Stock',
                            amount: '',
                            category: 'Portfolio'
                        },
                        formInvalid: true,
                        //reset the inputs for better UX
                    }))
                )
        } catch (err) {
            console.error(err);
        }
    }

    // handlePortfolioIncomeChange = e => {
    //     const newPortfolioIncome = { ...this.state.newPortfolioIncome, [e.target.name]: e.target.value }
    //     this.setState({ newPortfolioIncome: newPortfolioIncome, formInvalid: !this.formRef.current.checkValidity() })
    // }

    handlePortfolioIncomeChange = e => {
        const newPortfolioIncome = { ...this.state.portfolioIncome, [e.target.name]: e.target.value }
        this.setState({ portfolioIncome: newPortfolioIncome, formInvalid: !this.formRef.current.checkValidity() })
    }

    render() {
        return (
            <>
                <Income
                    totalPortfolioIncome={this.state.totalPortfolioIncome}
                    portfolioIncome={this.state.portfolioIncome}
                    portfolioComponentDidMount={this.portfolioComponentDidMount}
                    handlePortfolioIncomeSubmit={this.handlePortfolioIncomeSubmit}
                    handlePortfolioIncomeChange={this.handlePortfolioIncomeChange}

                    formInvalid={this.state.formInvalid}
                    formRef={this.formRef}
                //formRef={this.state.formRef}
                />

                <Expenses />
                CASH FLOW: INCOME - EXPENSES
            </>
        )
    }
}