import React from 'react';
import Table from 'react-bootstrap/Table';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

const portfolioIncomeOptions = ['Stock', 'Bond', 'Index/Mutual Fund', 'GIC', 'REIT', 'Other'];

export default function PortfolioIncome(props) {

    return (
        <>
            <h5>
                <span>Portfolio</span>
                <span className="right">${props.totalPortfolioIncome.map(elem => elem.amount).reduce(function (acc, num) {
                    return acc + num;
                }, 0)}</span>
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
            <Form ref={props.portfolioFormRef} onSubmit={props.handlePortfolioIncomeSubmit} className="form">
                <Form.Row>
                    <Form.Group>
                        <select
                            name="type"
                            value={props.newPortfolioIncome.type}
                            onChange={props.handlePortfolioIncomeChange}
                        >
                            {portfolioIncomeOptions.map((option) => (
                                <option key={option} value={option}>{option}</option>
                            ))}
                        </select>
                        {/* <Form.Control
                            as="select"
                            name="type"
                            value={props.newPortfolioIncome.type}
                        // defaultValue="Stock"
                        // custom
                        >
                            {portfolioIncomeOptions.map((option) => (
                                <option key={option} value={option}>{option}</option>
                            ))}
                        </Form.Control> */}
                    </Form.Group>
                    <Form.Group>
                        <Form.Control
                            name="amount"
                            value={props.newPortfolioIncome.amount}
                            onChange={props.handlePortfolioIncomeChange}
                            required
                            pattern="[1-9]\d{0,}\.?\d{0,2}"
                            placeholder="Dividend/Interest"
                            autocomplete="off"
                            size="sm"
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Control
                            type="hidden"
                            name="category"
                            value={props.newPortfolioIncome.category}
                            onChange={props.handlePortfolioIncomeChange}
                        />
                        <Button
                            type="submit"
                            className="form-submission"
                            onClick={props.handlePortfolioIncomeSubmit}
                            disabled={props.portfolioFormInvalid}
                            size="sm"
                        >ADD</Button>
                    </Form.Group>
                </Form.Row>
            </Form>
        </>
    )
}
