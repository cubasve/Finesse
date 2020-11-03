import React from 'react';
import { Table, Form, Button } from 'react-bootstrap';

const realEstateOptions = ['Residential', 'Commercial', 'Industrial', 'Vacant Land'];

export default function RealEstate({ totalRealEstate, handleRealEstateDelete, realEstateFormRef, handleRealEstateSubmit, newRealEstate, handleRealEstateChange, realEstateFormInvalid }) {
    return (
        <>
            <h5>
                <span>Real Estate</span>
                <span className="right">${totalRealEstate.map(elem => elem.amount).reduce(function (acc, num) {
                    return acc + num;
                }, 0)}</span>
            </h5>

            {totalRealEstate.map(re => (
                <div key={re.amount}>
                    <Table borderless hover size="sm">
                        <tbody>
                            <tr>
                                <td className="left">
                                    <Button
                                        name={re.amount}
                                        value={re._id}
                                        onClick={handleRealEstateDelete}
                                        variant="danger"
                                        size="sm"
                                        className="delete">X</Button>
                                    {re.type}
                                </td>
                                <td className="right">{re.amount}</td>
                            </tr>
                        </tbody>
                    </Table>
                </div>
            ))}
            <Form ref={realEstateFormRef} onSubmit={handleRealEstateSubmit}>
                <Form.Row>
                    <Form.Group>
                        <Form.Control
                            name="type"
                            value={newRealEstate.type}
                            onChange={handleRealEstateChange}
                            as="select"
                            size="sm"
                        >
                            {realEstateOptions.map((option) => (
                                <option key={option} value={option}>{option}</option>
                            ))}
                        </Form.Control>
                    </Form.Group>
                    <Form.Group>
                        <Form.Control
                            name="amount"
                            value={newRealEstate.amount}
                            onChange={handleRealEstateChange}
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
                            value={newRealEstate.category}
                            onChange={handleRealEstateChange}
                        />
                        <Button
                            className="form-submission"
                            onClick={handleRealEstateSubmit}
                            disabled={realEstateFormInvalid}
                            size="sm"
                        >ADD</Button>
                    </Form.Group>
                </Form.Row>
            </Form>
        </>
    )
}
