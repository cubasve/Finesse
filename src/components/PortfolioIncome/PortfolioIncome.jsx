import React from 'react';
// import financialStatementService from '../../utils/financialStatementService';
import Table from 'react-bootstrap/Table';

const portfolioIncomeOptions = ['Stock', 'Bond', 'Index/Mutual Fund', 'GIC', 'REIT', 'Other'];

export default function PortfolioIncome(props) {

    return (
        <section>
            <h5>
                <span>Portfolio</span>
                {/* <span>$</span> */}
            </h5>
            {
                props.totalPortfolioIncome.map(pi => (
                    <div key={pi.amount}>
                        <Table hover size="sm">
                            <tbody>
                                <tr>
                                    <td className="left">{pi.type}</td>
                                    <td className="right">{pi.amount}</td>
                                    {/* <td><button value="Update">U</button></td>
                                        <td><button value="Delete">X</button></td> */}
                                </tr>
                            </tbody>
                        </Table>
                    </div>
                ))
            }

            < form ref={props.formRef} onSubmit={props.handlePortfolioIncomeSubmit} >
                <label>
                    <select
                        name="type"
                        value={props.portfolio.newPortfolioIncome.type}
                        onChange={props.handlePortfolioIncomeChange}
                    >
                        {portfolioIncomeOptions.map((option) => (
                            <option key={option} value={option}>{option}</option>
                        ))}
                    </select>
                </label>
                <label>
                    <input
                        name="amount"
                        value={props.portfolio.newPortfolioIncome.amount}
                        onChange={props.handlePortfolioIncomeChange}
                        required
                        pattern="[1-9]\d{0,}\.?\d{0,2}"
                        placeholder="Dividend/Interest"
                        autocomplete="off"
                    />
                </label>
                <label>
                    <input
                        type="hidden"
                        name="category"
                        value={props.portfolio.newPortfolioIncome.category}
                        onChange={props.handlePortfolioIncomeChange}
                    />
                </label>
                <button
                    className="form-submission"
                    onClick={props.handlePortfolioIncomeSubmit}
                    disabled={props.formInvalid}
                >+</button>
            </form >
        </section >
    )
}

// function introduceYourself(name, title, location, ...skills) {
//     return {
//         name,
//         title,
//         location,
//         technicalSkills: skills,
//     }

// }
// console.log(introduceYourself('Eva', 'Web Developer', 'Toronto', 'HTML', 'CSS', 'JS', 'Node', 'Express', 'React'))

// {
//     name: 'Eva',
//     title: 'Web Developer',
//     location: 'Toronto',
//     technicalSkills: ['HTML', 'CSS', 'JS', 'Node', 'Express', 'React']
// }