import React from 'react';
import { Table, Form, Button } from 'react-bootstrap';

const commodityOptions = ['Metals', 'Energy', 'Livestock & Meat', 'Agriculture', 'Cryptocurrency', 'Other'];

export default function Commodities({ totalCommodities, handleCommodityDelete, commodityFormRef, handleCommoditySubmit, newCommodity, handleCommodityChange, commodityFormInvalid }) {
    return (
        <>
            <h5>
                <span>Commodities</span>
                <span className="right">${totalCommodities.map(elem => elem.amount).reduce(function (acc, num) {
                    return acc + num;
                }, 0)}</span>
            </h5>
            {totalCommodities.map(c => (
                <div key={c.amount}>
                    <Table borderless hover size="sm">
                        <tbody>
                            <tr>
                                <td className="left">
                                    <Button
                                        name={c.amount}
                                        value={c._id}
                                        onClick={handleCommodityDelete}
                                        variant="danger"
                                        size="sm"
                                        className="delete">X</Button>
                                    {c.type}
                                </td>
                                <td className="right">{c.amount}</td>
                            </tr>
                        </tbody>
                    </Table>
                </div>
            ))}
            <Form ref={commodityFormRef} onSubmit={handleCommoditySubmit}>
                <Form.Row>
                    <Form.Group>
                        <Form.Control
                            name="type"
                            value={newCommodity.type}
                            onChange={handleCommodityChange}
                            as="select"
                            size="sm"
                        >
                            {commodityOptions.map((option) => (
                                <option key={option} value={option}>{option}</option>
                            ))}
                        </Form.Control>
                    </Form.Group>
                    <Form.Group>
                        <Form.Control
                            name="amount"
                            value={newCommodity.amount}
                            onChange={handleCommodityChange}
                            required
                            pattern="[1-9]\d{0,}\.?\d{0,2}"
                            placeholder="Purchase Price"
                            autoComplete="off"
                            size="sm"
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Control
                            type="hidden"
                            name="category"
                            value={newCommodity.category}
                            onChange={handleCommodityChange}
                        />
                        <Button
                            className="form-submission"
                            onClick={handleCommoditySubmit}
                            disabled={commodityFormInvalid}
                            size="sm"
                        >ADD</Button>
                    </Form.Group>
                </Form.Row>
            </Form>
        </>
    )
}