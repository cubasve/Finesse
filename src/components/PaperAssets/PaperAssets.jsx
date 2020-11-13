import React from 'react';
import { Table, Form, Button } from 'react-bootstrap';

const paperAssetsOptions = ['Stock', 'Bond', 'Index/Mutual Fund', 'GIC', 'REIT', 'Other'];

function calculatePaperPercentage(totalAssets, totalPaperAssets) {
    if (!totalAssets || !totalPaperAssets) return 0;
    const percentage = (totalPaperAssets / totalAssets) * 100;
    const result = percentage.toFixed(1);
    return result;
}

function calculateTotalPaperAsset(totalPaperNumber) {
    if (!totalPaperNumber) return 0;
    return totalPaperNumber.toFixed(2);
}

export default function PaperAssets({ totalPaperAssets, handlePaperAssetDelete, paperAssetFormRef, handlePaperAssetSubmit, newPaperAsset, handlePaperAssetChange, paperAssetFormInvalid, totalAssets }) {

    const totalAssetNumber = totalAssets.map(elem => elem.amount).reduce((acc, num) => acc + num, 0);
    const totalPaperNumber = totalPaperAssets.map(elem => elem.amount).reduce((acc, num) => acc + num, 0);

    return (
        <>
            <h5>
                <span className="left">{calculatePaperPercentage(totalAssetNumber, totalPaperNumber)}%</span>
                <span>Paper</span>
                <span className="right">${calculateTotalPaperAsset(totalPaperNumber)}</span>
            </h5>
            {totalPaperAssets.map(pa => (
                <div key={pa.amount}>
                    <Table borderless hover size="sm">
                        <tbody>
                            <tr>
                                <td className="left">
                                    <Button
                                        name={pa.amount}
                                        value={pa._id}
                                        onClick={handlePaperAssetDelete}
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
            <Form ref={paperAssetFormRef} onSubmit={handlePaperAssetSubmit}>
                <Form.Row>
                    <Form.Group>
                        <Form.Control
                            name="type"
                            value={newPaperAsset.type}
                            onChange={handlePaperAssetChange}
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
                            value={newPaperAsset.amount}
                            onChange={handlePaperAssetChange}
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
                            value={newPaperAsset.category}
                            onChange={handlePaperAssetChange}
                        />
                        <Button
                            className="form-submission"
                            onClick={handlePaperAssetSubmit}
                            disabled={paperAssetFormInvalid}
                            size="sm"
                        >ADD</Button>
                    </Form.Group>
                </Form.Row>
            </Form>
        </>
    )
}

