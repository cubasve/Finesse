import React from 'react';
import { Table, Popover, OverlayTrigger, Button, Form } from 'react-bootstrap';

const goodDebtOptions = ['Real Estate', 'Business', 'Paper', 'Commodities', 'Other'];

const popover = (
    <Popover id="popover-basic">
        <Popover.Title as="h3">Good Debt</Popover.Title>
        <Popover.Content>Debt that is used to buy assets</Popover.Content>
    </Popover>
);

const GoodDebtPopover = () => (
    <OverlayTrigger trigger="click" placement="top" overlay={popover}>
        <Button variant="success" size="sm">&#8505;</Button>
    </OverlayTrigger>
);

function calculateGoodDebtPercentage(totalLiabilities, totalGoodDebt) {
    if (!totalLiabilities && !totalGoodDebt) return 0;
    const percentage = (totalGoodDebt / totalLiabilities) * 100;
    const result = percentage.toFixed(1);
    return result;
}

export default function GoodDebt({ totalGoodDebt, handleGoodDebtDelete, goodDebtFormRef, handleGoodDebtSubmit, newGoodDebt, handleGoodDebtChange, goodDebtFormInvalid, totalLiabilities }) {

    const totalLiabilityNumber = totalLiabilities.map(elem => elem.amount).reduce((acc, num) => acc + num, 0);
    const totalGoodDebtNumber = totalGoodDebt.map(elem => elem.amount).reduce((acc, num) => acc + num, 0);

    return (
        <>
            <h5>
                <span className="left">{calculateGoodDebtPercentage(totalLiabilityNumber, totalGoodDebtNumber)}%</span>
                <span>Good Debt <GoodDebtPopover /></span>
                <span className="right">${totalGoodDebt.map(elem => elem.amount).reduce(function (acc, num) {
                    return acc + num;
                }, 0)}</span>
            </h5>
            {totalGoodDebt.map(gd => (
                <div key={gd.amount}>
                    <Table borderless hover size="sm">
                        <tbody>
                            <tr>
                                <td className="left">
                                    <Button
                                        name={gd.amount}
                                        value={gd._id}
                                        onClick={handleGoodDebtDelete}
                                        variant="danger"
                                        size="sm"
                                        className="delete">X</Button>
                                    {gd.type}
                                </td>
                                <td className="right">{gd.amount}</td>
                            </tr>
                        </tbody>
                    </Table>
                </div>
            ))}
            <Form ref={goodDebtFormRef} onSubmit={handleGoodDebtSubmit}>
                <Form.Row>
                    <Form.Group>
                        <Form.Control
                            name="type"
                            value={newGoodDebt.type}
                            onChange={handleGoodDebtChange}
                            as="select"
                            size="sm"
                        >
                            {goodDebtOptions.map((option) => (
                                <option key={option} value={option}>{option}</option>
                            ))}
                        </Form.Control>
                    </Form.Group>
                    <Form.Group>
                        <Form.Control
                            name="amount"
                            value={newGoodDebt.amount}
                            onChange={handleGoodDebtChange}
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
                            value={newGoodDebt.category}
                            onChange={handleGoodDebtChange}
                        />
                        <Button
                            className="form-submission"
                            onClick={handleGoodDebtSubmit}
                            disabled={goodDebtFormInvalid}
                            size="sm"
                        >ADD</Button>
                    </Form.Group>
                </Form.Row>
            </Form>
        </>
    )
}