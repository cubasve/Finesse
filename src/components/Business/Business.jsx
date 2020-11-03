import React from 'react';
import { Table, Form, Button } from 'react-bootstrap';

const businessOptions = ['Sole proprietorship', 'Partnership', 'Corporation'];

export default function Business({ totalBusiness, handleBusinessDelete, businessFormRef, handleBusinessSubmit, newBusiness, handleBusinessChange, businessFormInvalid }) {
    return (
        <>
            <h5>
                <span>Business</span>
                <span className="right">${totalBusiness.map(elem => elem.amount).reduce(function (acc, num) {
                    return acc + num;
                }, 0)}</span>
            </h5>
            {totalBusiness.map(b => (
                <div key={b.amount}>
                    <Table borderless hover size="sm">
                        <tbody>
                            <tr>
                                <td className="left">
                                    <Button
                                        name={b.amount}
                                        value={b._id}
                                        onClick={handleBusinessDelete}
                                        variant="danger"
                                        size="sm"
                                        className="delete">X</Button>
                                    {b.type}
                                </td>
                                <td className="right">{b.amount}</td>
                            </tr>
                        </tbody>
                    </Table>
                </div>
            ))}
            <Form ref={businessFormRef} onSubmit={handleBusinessSubmit}>
                <Form.Row>
                    <Form.Group>
                        <Form.Control
                            name="type"
                            value={newBusiness.type}
                            onChange={handleBusinessChange}
                            as="select"
                            size="sm"
                        >
                            {businessOptions.map((option) => (
                                <option key={option} value={option}>{option}</option>
                            ))}
                        </Form.Control>
                    </Form.Group>
                    <Form.Group>
                        <Form.Control
                            name="amount"
                            value={newBusiness.amount}
                            onChange={handleBusinessChange}
                            pattern="[1-9]\d{0,}\.?\d{0,2}"
                            required
                            placeholder="Company Value"
                            autoComplete="off"
                            size="sm"
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Control
                            type="hidden"
                            name="category"
                            value={newBusiness.category}
                            onChange={handleBusinessChange}
                        />
                        <Button
                            className="form-submission"
                            onClick={handleBusinessSubmit}
                            disabled={businessFormInvalid}
                            size="sm"
                        >ADD</Button>
                    </Form.Group>
                </Form.Row>
            </Form>
        </>
    )
}
