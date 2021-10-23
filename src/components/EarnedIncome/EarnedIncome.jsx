import React, { useContext, useState } from "react";
import { Table, Form, Button } from "react-bootstrap";
import IncomeExpenseContext from "../../context/IncomeExpenseContext";
import calculatePercentage from "../../utils/calculations";
import { CheckLg, Pencil, Trash, XLg } from "react-bootstrap-icons";

const earnedIncomeOptions = ["Job", "Self-Employment", "Other"];

function calculateTotalEarnedIncome(totalEarnedIncomeNumber) {
	if (!totalEarnedIncomeNumber) return 0;
	if (Number.isInteger(totalEarnedIncomeNumber)) return totalEarnedIncomeNumber;
	return totalEarnedIncomeNumber.toFixed(2);
}

export default function EarnedIncome() {
	const {
		totalIncome,
		totalEarnedIncome,
		newEarnedIncome,
		earnedFormInvalid,
		handleEarnedIncomeSubmit,
		handleEarnedIncomeChange,
		handleEarnedIncomeDelete,
		handleEarnedIncomeUpdate,
		earnedFormRef,
	} = useContext(IncomeExpenseContext);

	const [selected, setSelected] = useState("");

	const [editing, setEditing] = useState(false);
	const handleStartEditing = () => setEditing(true);
	const handleFinishEditing = () => setEditing(false);

	const totalIncomeNumber = totalIncome
		.map((elem) => elem.amount)
		.reduce((acc, num) => acc + num, 0);

	const totalEarnedIncomeNumber = totalEarnedIncome
		.map((elem) => elem.amount)
		.reduce((acc, num) => acc + num, 0);

	return (
		<>
			<h5>
				<span className="left percentage">
					{calculatePercentage(totalIncomeNumber, totalEarnedIncomeNumber)}%
				</span>
				<span>Earned</span>
				<span className="right">
					${calculateTotalEarnedIncome(totalEarnedIncomeNumber)}
				</span>
			</h5>
			{totalEarnedIncome.map((ei) => (
				<div key={ei._id}>
					<Table borderless hover size="sm">
						<tbody>
							<tr>
								{editing && ei._id === selected ? (
									<td
										style={{
											display: "flex",
											justifyContent: "space-between",
										}}
									>
										<span>
											<Button
												variant="success"
												size="sm"
												onClick={handleEarnedIncomeUpdate}
												className="delete"
											>
												<CheckLg />
											</Button>
											<Button
												onClick={handleFinishEditing}
												size="sm"
												variant="secondary"
												className="delete"
											>
												<XLg />
											</Button>
										</span>
										<Form.Control
											name="type"
											value={ei.type}
											onChange={handleEarnedIncomeChange}
											as="select"
											size="sm"
											style={{
												display: "inline",
												width: "150px",
											}}
										>
											{earnedIncomeOptions.map((option) => (
												<option key={option} value={option}>
													{option}
												</option>
											))}
										</Form.Control>
										<Form.Control
											name="amount"
											value={ei.amount}
											onChange={handleEarnedIncomeChange}
											required
											pattern="[1-9]\d{0,}\.?\d{0,2}"
											autoComplete="off"
											size="sm"
											style={{ display: "inline", width: "50px" }}
										/>
									</td>
								) : (
									<>
										<td className="left">
											<Button
												name={ei.amount}
												value={ei._id}
												onClick={() => {
													setSelected(ei._id);
													handleStartEditing();
												}}
												variant="warning"
												size="sm"
												className="delete"
											>
												<Pencil />
											</Button>
											<Button
												name={ei.amount}
												value={ei._id}
												onClick={handleEarnedIncomeDelete}
												variant="danger"
												size="sm"
												className="delete"
											>
												<Trash />
											</Button>
											{ei.type}
										</td>
										<td className="right">{ei.amount}</td>
									</>
								)}
							</tr>
						</tbody>
					</Table>
				</div>
			))}

			<Form ref={earnedFormRef} onSubmit={handleEarnedIncomeSubmit}>
				<Form.Row>
					<Form.Group>
						<Form.Control
							name="type"
							value={newEarnedIncome.type}
							onChange={handleEarnedIncomeChange}
							as="select"
							size="sm"
							className="select"
						>
							{earnedIncomeOptions.map((option) => (
								<option key={option} value={option}>
									{option}
								</option>
							))}
						</Form.Control>
					</Form.Group>
					<Form.Group>
						<Form.Control
							name="amount"
							value={newEarnedIncome.amount}
							onChange={handleEarnedIncomeChange}
							required
							pattern="[1-9]\d{0,}\.?\d{0,2}"
							autoComplete="off"
							placeholder="Salary/Commission"
							size="sm"
						/>
					</Form.Group>
					{/* <Form.Group>
                        <Form.Control
                            type="hidden"
                            name="class"
                            value={props.newEarnedIncome.class}
                            onChange={props.handleEarnedIncomeChange} />
                    </Form.Group> */}
					<Form.Group>
						<Form.Control
							type="hidden"
							name="class"
							value={newEarnedIncome.class}
							onChange={handleEarnedIncomeChange}
						/>
						<Form.Control
							type="hidden"
							name="category"
							value={newEarnedIncome.category}
							onChange={handleEarnedIncomeChange}
						/>
						<Button
							className="form-submission"
							onClick={handleEarnedIncomeSubmit}
							disabled={earnedFormInvalid}
							size="sm"
						>
							ADD
						</Button>
					</Form.Group>
				</Form.Row>
			</Form>
		</>
	);
}
