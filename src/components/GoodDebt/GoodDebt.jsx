import React from 'react';
import Table from 'react-bootstrap/Table';
import Popover from 'react-bootstrap/Popover';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

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

export default function GoodDebt(props) {
    return (
        <>
            <h5>
                <span>Good Debt <GoodDebtPopover /></span>
                <span className="right">${props.totalGoodDebt.map(elem => elem.amount).reduce(function (acc, num) {
                    return acc + num;
                }, 0)}</span>
            </h5>
            {props.totalGoodDebt.map(gd => (
                <div key={gd.amount}>
                    <Table borderless hover size="sm">
                        <tbody>
                            <tr>
                                <td className="left">
                                    <Button
                                        name={gd.amount}
                                        value={gd._id}
                                        onClick={props.handleGoodDebtDelete}
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
            <Form ref={props.goodDebtFormRef} onSubmit={props.handleGoodDebtSubmit}>
                <Form.Row>
                    <Form.Group>
                        <select
                            name="type"
                            value={props.newGoodDebt.type}
                            onChange={props.handleGoodDebtChange}
                            className="select"
                        >
                            {goodDebtOptions.map((option) => (
                                <option key={option} value={option}>{option}</option>
                            ))}
                        </select>
                    </Form.Group>
                    <Form.Group>
                        <Form.Control
                            name="amount"
                            value={props.newGoodDebt.amount}
                            onChange={props.handleGoodDebtChange}
                            required
                            pattern="[1-9]\d{0,}\.?\d{0,2}"
                            placeholder="Debt Value"
                            autocomplete="off"
                            size="sm"
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Control
                            type="hidden"
                            name="category"
                            value={props.newGoodDebt.category}
                            onChange={props.handleGoodDebtChange}
                        />
                        <Button
                            className="form-submission"
                            onClick={props.handleGoodDebtSubmit}
                            disabled={props.goodDebtFormInvalid}
                            size="sm"
                        >ADD</Button>
                    </Form.Group>
                </Form.Row>
            </Form>
        </>
    )
}