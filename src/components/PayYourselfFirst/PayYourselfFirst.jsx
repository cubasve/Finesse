import React, { useState, useEffect } from 'react';
import { Popover, OverlayTrigger, Button, Table, Form } from 'react-bootstrap';

const popover = (
    <Popover id="popover-basic">
        <Popover.Title as="h3">Pay Yourself First</Popover.Title>
        <Popover.Content>Prioritize your financial future by deducting a percentage of your paycheque FIRST before you pay for other expenses. As your income increases, this percentage should increase accordingly.</Popover.Content>
    </Popover>
);

const PayYourselfPopover = () => (
    <OverlayTrigger trigger="click" placement="top" overlay={popover}>
        <Button variant="success" size="sm">&#8505;</Button>
    </OverlayTrigger>
)

const payYourselfFirstAllocation = (percentage, totalIncome) => {
    const decimal = percentage / 100;
    const percentageOfIncome = decimal * totalIncome;
    const allocation = percentageOfIncome.toFixed(2);
    return allocation;
}

// const addTotalAllocation = () => {
//     let total = 0;
//     total += payYourselfFirstAllocation();
//     console.log(total);
//     return total;
// }

export default function PayYourselfFirst({ totalIncome, totalPayYourselfFirst, handleSelfFirstDelete, selfFirstFormRef, handleSelfFirstSubmit, newPayYourselfFirst, handleSelfFirstChange, selfFirstFormInvalid }) {

    const totalIncomeNumber = totalIncome.map(elem => elem.amount).reduce((acc, num) => acc + num, 0);
    const [allocation, setAllocation] = useState([]);

    useEffect(() => { setAllocation(payYourselfFirstAllocation) })

    return (
        <>
            <h5>
                <span>Pay Yourself First</span>
                <PayYourselfPopover />
                <span className="right">$</span>
            </h5>
            {
                totalPayYourselfFirst.map(pi => (
                    <div key={pi.amount}>
                        <Table borderless hover size="sm">
                            <tbody>
                                <tr>
                                    <td className="left">
                                        <Button
                                            name={pi.amount}
                                            value={pi._id}
                                            onClick={handleSelfFirstDelete}
                                            variant="danger"
                                            size="sm"
                                            className="delete">X</Button>
                                        <strong>{pi.amount}%</strong> Allocation
                                        </td>
                                    <td className="right">${payYourselfFirstAllocation(pi.amount, totalIncomeNumber)}</td>
                                </tr>
                            </tbody>
                        </Table>
                    </div>
                ))
            }
            <Form ref={selfFirstFormRef} onSubmit={handleSelfFirstSubmit} className="selfFirst">
                <Form.Row>
                    <Form.Group>
                        <Form.Control
                            name="amount"
                            value={newPayYourselfFirst.amount}
                            onChange={handleSelfFirstChange}
                            required
                            pattern="[1-9]\d{0,1}"
                            placeholder="% of Total Income"
                            autoComplete="off"
                            size="sm"
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Control
                            type="hidden"
                            name="class"
                            value={newPayYourselfFirst.class}
                            onChange={handleSelfFirstChange}
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Control
                            type="hidden"
                            name="category"
                            value={newPayYourselfFirst.category}
                            onChange={handleSelfFirstChange}
                        />
                        <Button
                            type="submit"
                            className="form-submission"
                            onClick={handleSelfFirstSubmit}
                            disabled={selfFirstFormInvalid}
                            size="sm"
                        >ADD</Button>
                    </Form.Group>
                </Form.Row>
            </Form>
        </>
    )
}
