import React from 'react';
import Popover from 'react-bootstrap/Popover';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import Form from 'react-bootstrap/Form';

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
                                    <td className="left"><strong>{pi.amount}%</strong> Allocated to Financial Future</td>
                                    <td className="right">$</td>
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
