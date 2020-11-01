import React from 'react';
import { Table, Form, Button } from 'react-bootstrap';

const paperAssetsOptions = ['Stock', 'Bond', 'Index/Mutual Fund', 'GIC', 'REIT', 'Other'];

export default function PaperAssets(props) {
    return (
        <>
            <h5>
                <span>Paper</span>
                <span className="right">${props.totalPaperAssets.map(elem => elem.amount).reduce(function (acc, num) {
                    return acc + num;
                }, 0)}</span>
            </h5>
            {props.totalPaperAssets.map(pa => (
                <div key={pa.amount}>
                    <Table borderless hover size="sm">
                        <tbody>
                            <tr>
                                <td className="left">
                                    <Button
                                        name={pa.amount}
                                        value={pa._id}
                                        onClick={props.handlePaperAssetDelete}
                                        variant="danger"
                                        size="sm"
                                        className="delete">X</Button>
                                    {pa.type}
                                </td>
                                <td className="right">{pa.amount}</td>
                            </tr>
                        </tbody>
                    </Table>
                </div>
            ))}
            <Form ref={props.paperAssetFormRef} onSubmit={props.handlePaperAssetSubmit}>
                <Form.Row>
                    <Form.Group>
                        <Form.Control
                            name="type"
                            value={props.newPaperAsset.type}
                            onChange={props.handlePaperAssetChange}
                            as="select"
                            size="sm"
                        >
                            {paperAssetsOptions.map((option) => (
                                <option key={option} value={option}>{option}</option>
                            ))}
                        </Form.Control>
                    </Form.Group>
                    <Form.Group>
                        <Form.Control
                            name="amount"
                            value={props.newPaperAsset.amount}
                            onChange={props.handlePaperAssetChange}
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
                            value={props.newPaperAsset.category}
                            onChange={props.handlePaperAssetChange}
                        />
                        <Button
                            className="form-submission"
                            onClick={props.handlePaperAssetSubmit}
                            disabled={props.paperAssetFormInvalid}
                            size="sm"
                        >ADD</Button>
                    </Form.Group>
                </Form.Row>
            </Form>
        </>
    )
}

