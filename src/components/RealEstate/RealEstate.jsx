import React from 'react';
import { Table, Form, Button } from 'react-bootstrap';

const realEstateOptions = ['Residential', 'Commercial', 'Industrial', 'Vacant Land'];

function calculateRealEstatePercentage(totalAssets, totalRealEstate) {
    if (!totalAssets && !totalRealEstate) return 0;
    const percentage = (totalRealEstate / totalAssets) * 100;
    const result = percentage.toFixed(1);
    return result;
}

function calculateTotalRealEstate(totalRealEstateNumber) {
    if (!totalRealEstateNumber) return 0;
    return totalRealEstateNumber.toFixed(2);
}

export default function RealEstate({ totalRealEstate, handleRealEstateDelete, realEstateFormRef, handleRealEstateSubmit, newRealEstate, handleRealEstateChange, realEstateFormInvalid, totalAssets }) {

    const totalAssetNumber = totalAssets.map(elem => elem.amount).reduce((acc, num) => acc + num, 0);
    const totalRealEstateNumber = totalRealEstate.map(elem => elem.amount).reduce((acc, num) => acc + num, 0);

    return (
        <>
            <h5>
                <span className="left">{calculateRealEstatePercentage(totalAssetNumber, totalRealEstateNumber)}%</span>
                <span>Real Estate</span>
                <span className="right">${calculateTotalRealEstate(totalRealEstateNumber)}</span>
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
