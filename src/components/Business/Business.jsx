import React from 'react';
import Table from 'react-bootstrap/Table';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';


const businessOptions = ['Sole proprietorship', 'Partnership', 'Corporation'];

export default function Business(props) {
    return (
        <>
            <h5>
                <span>Business</span>
                <span className="right">${props.totalBusiness.map(elem => elem.amount).reduce(function (acc, num) {
                    return acc + num;
                }, 0)}</span>
            </h5>
            {props.totalBusiness.map(b => (
                <div key={b.amount}>
                    <Table borderless hover size="sm">
                        <tbody>
                            <tr>
                                <td className="left">
                                    <Button
                                        name={b.amount}
                                        value={b._id}
                                        onClick={props.handleBusinessDelete}
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
            <Form ref={props.businessFormRef} onSubmit={props.handleBusinessSubmit}>
                <Form.Row>
                    <Form.Group>
                        <Form.Control
                            name="type"
                            value={props.newBusiness.type}
                            onChange={props.handleBusinessChange}
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
                            value={props.newBusiness.amount}
                            onChange={props.handleBusinessChange}
                            pattern="[1-9]\d{0,}\.?\d{0,2}"
                            required
                            placeholder="Company Value"
                            autocomplete="off"
                            size="sm"
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Control
                            type="hidden"
                            name="category"
                            value={props.newBusiness.category}
                            onChange={props.handleBusinessChange}
                        />
                        <Button
                            className="form-submission"
                            onClick={props.handleBusinessSubmit}
                            disabled={props.businessFormInvalid}
                            size="sm"
                        >ADD</Button>
                    </Form.Group>
                </Form.Row>
            </Form>
        </>
    )
}
