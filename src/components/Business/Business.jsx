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
                    <Table hover size="sm">
                        <tbody>
                            <tr>
                                <td>{b.type}</td>
                                <td className="right">{b.amount}</td>
                                {/* <td><button value="Update">U</button></td>
                                    <td><button value="Delete">X</button></td> */}
                            </tr>
                        </tbody>
                    </Table>
                </div>
            ))}
            <Form ref={props.businessFormRef} onSubmit={props.handleBusinessSubmit}>
                <Form.Row>
                    <Form.Group>
                        <select
                            name="type"
                            value={props.newBusiness.type}
                            onChange={props.handleBusinessChange}
                        >
                            {businessOptions.map((option) => (
                                <option key={option} value={option}>{option}</option>
                            ))}
                        </select>
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
