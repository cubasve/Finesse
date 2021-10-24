import React, { useContext, useState } from "react";
import { Button, Col, Form, Modal, Row, Table } from "react-bootstrap";
import IncomeExpenseContext from "../../context/IncomeExpenseContext";
import {
	calculatePercentage,
	determineTotalAmount,
	showTotalAmount,
} from "../../utils/calculations";
import { CheckLg, Pencil, Trash, XLg } from "react-bootstrap-icons";
import FormInput from "../common/FormInput";

const earnedIncomeOptions = ["Job", "Self-Employment", "Other"];

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

	const [showModal, setShowModal] = useState(false);
	const handleCloseModal = () => setShowModal(false);
	const handleShowModal = () => setShowModal(true);

	const totalIncomeAmount = determineTotalAmount(totalIncome);
	const totalEarnedIncomeAmount = determineTotalAmount(totalEarnedIncome);

	return (
		<>
			<h5 style={{ display: "flex", justifyContent: "space-between" }}>
				<span className="percentage">
					{calculatePercentage(totalIncomeAmount, totalEarnedIncomeAmount)}%
				</span>
				<span>Earned</span>
				<span>${showTotalAmount(totalEarnedIncomeAmount)}</span>
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
													<Form.Text muted>Type</Form.Text>
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
													<Form.Text muted>Amount</Form.Text>
												</Col>
											</Row>
										</Form>
									</td>
								) : (
									<>
										<td style={{ display: "flex" }}>
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
												onClick={handleShowModal}
												variant="danger"
												size="sm"
												className="delete"
											>
												<Trash />
											</Button>
											{ei._id === selected && (
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
											)}
											{ei.type}
											<span
												style={{
													display: "flex",
													flexGrow: 1,
												}}
											></span>
											{ei.amount}
										</td>
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
