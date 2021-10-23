import React, { useContext, useState } from "react";
import { Button, Col, Form, Row, Table } from "react-bootstrap";
import IncomeExpenseContext from "../../context/IncomeExpenseContext";
import calculatePercentage from "../../utils/calculations";
import { CheckLg, Pencil, Trash, XLg } from "react-bootstrap-icons";
import FormInput from "../common/FormInput";

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

	// const [showModal, setShowModal] = useState(false);
	// const handleCloseModal = () => setShowModal(false);
	// const handleShowModal = () => setShowModal(true);

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
										<Form>
											<Row>
												<Col xs="auto">
													<Form.Control
														name="type"
														value={ei.type}
														onChange={handleEarnedIncomeChange}
														as="select"
														size="sm"
													>
														{earnedIncomeOptions.map((option) => (
															<option key={option} value={option}>
																{option}
															</option>
														))}
													</Form.Control>
													<Form.Text muted>Earned Income Type</Form.Text>
												</Col>
												<Col xs={3}>
													<Form.Control
														name="amount"
														value={ei.amount}
														onChange={handleEarnedIncomeChange}
														required
														pattern="[1-9]\d{0,}\.?\d{0,2}"
														autoComplete="off"
														size="sm"
														style={{ width: "50px" }}
													/>
												</Col>
											</Row>
										</Form>
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
											{/* {ei._id === selected && (
												<Modal show={showModal} onHide={handleCloseModal}>
													<Modal.Header closeButton>
														<Modal.Title>
															Are you sure you want to delete this entry?
														</Modal.Title>
													</Modal.Header>
													<Modal.Body>
														Type: <strong>{ei.type}</strong>, Amount: $
														<strong>{ei.amount}</strong> in the category{" "}
														<strong>{ei.category}</strong>
													</Modal.Body>
													<Modal.Footer>
														<Button
															variant="secondary"
															onClick={handleCloseModal}
														>
															Cancel
														</Button>
														<Button
															name={ei.amount}
															value={ei._id}
															onClick={() => {
																handleEarnedIncomeDelete();
																handleCloseModal();
															}}
															variant="danger"
														>
															Delete Entry
														</Button>
													</Modal.Footer>
												</Modal>
											)} */}
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
			<FormInput
				formRef={earnedFormRef}
				handleSubmit={handleEarnedIncomeSubmit}
				handleChange={handleEarnedIncomeChange}
				newEntity={newEarnedIncome}
				options={earnedIncomeOptions}
				placeholder="Salary/Commission"
				formInvalid={earnedFormInvalid}
			/>
		</>
	);
}
