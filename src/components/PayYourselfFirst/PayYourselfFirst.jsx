import React from 'react';
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

// const totalIncomeNumber = { props.totalIncome.map(elem => elem.amount).reduce((acc, num) => acc + num, 0) }

const PayYourselfFirstAllocation = (percentage, totalIncome) => {
    const decimal = percentage / 100;
    console.log(decimal);
    console.log(totalIncome);
    const percentageOfIncome = decimal * totalIncome;
    console.log(percentageOfIncome);
    return percentageOfIncome;
}

export default function PayYourselfFirst(props) {
    return (
        <>
            <h5>
                <span>Pay Yourself First </span>
                <PayYourselfPopover />
                <span className="right">$</span>
            </h5>
            {
                props.totalPayYourselfFirst.map(pi => (
                    <div key={pi.amount}>
                        <Table borderless hover size="sm">
                            <tbody>
                                <tr>
                                    <td className="left">
                                        <Button
                                            name={pi.amount}
                                            value={pi._id}
                                            onClick={props.handleSelfFirstDelete}
                                            variant="danger"
                                            size="sm"
                                            className="delete">X</Button>
                                        <strong>{pi.amount}%</strong> Allocation
                                        </td>
                                    <td className="right">${PayYourselfFirstAllocation(pi.amount, { props.totalIncome.map(elem => elem.amount).reduce((acc, num) => acc + num, 0) })}</td>
                                </tr>
                            </tbody>
                        </Table>
                    </div>
                ))
            }
            <Form ref={props.selfFirstFormRef} onSubmit={props.handleSelfFirstSubmit} className="selfFirst">
                <Form.Row>
                    <Form.Group>
                        <Form.Control
                            name="amount"
                            value={props.newPayYourselfFirst.amount}
                            onChange={props.handleSelfFirstChange}
                            required
                            pattern="[1-9]\d{0,1}"
                            placeholder="% of Total Income"
                            autocomplete="off"
                            size="sm"
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Control
                            type="hidden"
                            name="class"
                            value={props.newPayYourselfFirst.class}
                            onChange={props.handleSelfFirstChange}
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Control
                            type="hidden"
                            name="category"
                            value={props.newPayYourselfFirst.category}
                            onChange={props.handleSelfFirstChange}
                        />
                        <Button
                            type="submit"
                            className="form-submission"
                            onClick={props.handleSelfFirstSubmit}
                            disabled={props.selfFirstFormInvalid}
                            size="sm"
                        >ADD</Button>
                    </Form.Group>
                </Form.Row>
            </Form>
        </>
    )
}
