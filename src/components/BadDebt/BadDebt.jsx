import React from 'react';
import { Table, Popover, OverlayTrigger, Button, Form } from 'react-bootstrap';

const badDebtOptions = ['Home Mortgage', 'Car Loans', 'Credit Cards', 'School Loans', 'Other'];

const popover = (
    <Popover id="popover-basic">
        <Popover.Title as="h3">Bad Debt</Popover.Title>
        <Popover.Content>Debt that is used to buy liabilities</Popover.Content>
    </Popover>
);

const BadDebtPopover = () => (
    <OverlayTrigger trigger="click" placement="top" overlay={popover}>
        <Button variant="success" size="sm">&#8505;</Button>
    </OverlayTrigger>
);

export default function BadDebt({ totalBadDebt, handleBadDebtDelete, badDebtFormRef, handleBadDebtSubmit, newBadDebt, handleBadDebtChange, badDebtFormInvalid }) {
    return (
        <>
            <h5>
                <span>Bad Debt <BadDebtPopover /></span>
                <span className="right">${totalBadDebt.map(elem => elem.amount).reduce(function (acc, num) {
                    return acc + num;
                }, 0)}</span>
            </h5>
            {totalBadDebt.map(bd => (
                <div key={bd.amount}>
                    <Table borderless hover size="sm">
                        <tbody>
                            <tr>
                                <td className="left">
                                    <Button
                                        name={bd.amount}
                                        value={bd._id}
                                        onClick={handleBadDebtDelete}
                                        variant="danger"
                                        size="sm"
                                        className="delete">X</Button>
                                    {bd.type}
                                </td>
                                <td className="right">{bd.amount}</td>
                            </tr>
                        </tbody>
                    </Table>
                </div>
            ))
            }
            <Form ref={badDebtFormRef} onSubmit={handleBadDebtSubmit}>
                <Form.Row>
                    <Form.Group>
                        <Form.Control
                            name="type"
                            value={newBadDebt.type}
                            onChange={handleBadDebtChange}
                            as="select"
                            size="sm"
                        >
                            {badDebtOptions.map((option) => (
                                <option key={option} value={option}>{option}</option>
                            ))}
                        </Form.Control>
                    </Form.Group>
                    <Form.Group>
                        <Form.Control
                            name="amount"
                            value={newBadDebt.amount}
                            onChange={handleBadDebtChange}
                            required
                            pattern="[1-9]\d{0,}\.?\d{0,2}"
                            placeholder="Debt Value"
                            autoComplete="off"
                            size="sm"
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Control
                            type="hidden"
                            name="category"
                            value={newBadDebt.category}
                            onChange={handleBadDebtChange}
                        />
                        <Button
                            className="form-submission"
                            onClick={handleBadDebtSubmit}
                            disabled={badDebtFormInvalid}
                            size="sm"
                        >ADD</Button>
                    </Form.Group>
                </Form.Row>
            </Form>
        </>
    )
}
