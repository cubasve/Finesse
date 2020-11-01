import React from 'react';
import { Table, Form, Button } from 'react-bootstrap';

const realEstateOptions = ['Residential', 'Commercial', 'Industrial', 'Vacant Land'];

export default function RealEstate(props) {
    return (
        <>
            <h5>
                <span>Real Estate</span>
                <span className="right">${props.totalRealEstate.map(elem => elem.amount).reduce(function (acc, num) {
                    return acc + num;
                }, 0)}</span>
            </h5>

            {props.totalRealEstate.map(re => (
                <div key={re.amount}>
                    <Table borderless hover size="sm">
                        <tbody>
                            <tr>
                                <td className="left">
                                    <Button
                                        name={re.amount}
                                        value={re._id}
                                        onClick={props.handleRealEstateDelete}
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
            <Form ref={props.realEstateFormRef} onSubmit={props.handleRealEstateSubmit}>
                <Form.Row>
                    <Form.Group>
                        <Form.Control
                            name="type"
                            value={props.newRealEstate.type}
                            onChange={props.handleRealEstateChange}
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
                            value={props.newRealEstate.amount}
                            onChange={props.handleRealEstateChange}
                            required
                            pattern="[1-9]\d{0,}\.?\d{0,2}"
                            placeholder="Purchase Price"
                            autocomplete="off"
                            size="sm"
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Control
                            type="hidden"
                            name="category"
                            value={props.newRealEstate.category}
                            onChange={props.handleRealEstateChange}
                        />
                        <Button
                            className="form-submission"
                            onClick={props.handleRealEstateSubmit}
                            disabled={props.realEstateFormInvalid}
                            size="sm"
                        >ADD</Button>
                    </Form.Group>
                </Form.Row>
            </Form>
        </>
    )
}
