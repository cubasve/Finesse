import React, { useContext, useState } from "react";
import { Button, Col, Form, Modal, Table } from "react-bootstrap";
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
		updatedEarnedIncome,
		earnedFormInvalid,
		handleEarnedIncomeSubmit,
		handleEarnedIncomeChange,
		handleEarnedIncomeUpdateChange,
		handleGetCurrentEarnedIncome,
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

	console.log("updatedEarnedIncome", updatedEarnedIncome);

	return (
		<>
			<h5 style={{ display: "flex", justifyContent: "space-between" }}>
				<span className="percentage">
					{calculatePercentage(totalIncomeAmount, totalEarnedIncomeAmount)}%
				</span>
				<span>Earned</span>
				<span>${showTotalAmount(totalEarnedIncomeAmount)}</span>
			</h5>
			{totalEarnedIncome.map(({ _id, amount, category, type }) => (
				<div key={_id}>
					<Table borderless hover size="sm">
						<tbody>
							<tr>
								{editing && _id === selected ? (
									<td>
										<Form
											style={{ width: 360 }}
											onSubmit={handleEarnedIncomeUpdate}
										>
											<Form.Row>
												<Form.Group as={Col} md="1">
													<Button
														variant="success"
														size="sm"
														onClick={handleEarnedIncomeUpdate}
														className="form-submission"
														disabled={
															updatedEarnedIncome.type === type &&
															updatedEarnedIncome.amount === amount
														}
													>
														<CheckLg />
													</Button>
												</Form.Group>
												<Form.Group as={Col} md="2">
													<Button
														onClick={handleFinishEditing}
														size="sm"
														variant="secondary"
														className="delete"
													>
														<XLg />
													</Button>
												</Form.Group>
												<Form.Group as={Col}>
													<Form.Control
														name="type"
														value={updatedEarnedIncome.type}
														onChange={handleEarnedIncomeUpdateChange}
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
												</Form.Group>
												<Form.Group as={Col} md="2">
													<Form.Control
														name="amount"
														value={updatedEarnedIncome.amount}
														onChange={handleEarnedIncomeUpdateChange}
														required
														pattern="[1-9]\d{0,}\.?\d{0,2}"
														autoComplete="off"
														size="sm"
													/>
													<Form.Text muted>Amount</Form.Text>
												</Form.Group>
											</Form.Row>
										</Form>
									</td>
								) : (
									<td style={{ display: "flex" }}>
										<Button
											name={amount}
											value={_id}
											onClick={() => {
												setSelected(_id);
												handleGetCurrentEarnedIncome(_id);
												handleStartEditing();
											}}
											variant="warning"
											size="sm"
											className="delete"
										>
											<Pencil />
										</Button>
										<Button
											name={amount}
											value={_id}
											onClick={() => {
												setSelected(_id);
												handleShowModal();
											}}
											variant="danger"
											size="sm"
											className="delete"
										>
											<Trash />
										</Button>
										{_id === selected && (
											<Modal show={showModal} onHide={handleCloseModal}>
												<Modal.Header closeButton>
													<Modal.Title>
														Are you sure you want to delete this entry?
													</Modal.Title>
												</Modal.Header>
												<Modal.Body>
													Type: <strong>{type}</strong>, Amount: $
													<strong>{amount}</strong> in the category{" "}
													<strong>{category}</strong>
												</Modal.Body>
												<Modal.Footer>
													<Button
														variant="secondary"
														onClick={handleCloseModal}
													>
														Cancel
													</Button>
													<Button
														name={amount}
														value={_id}
														onClick={handleEarnedIncomeDelete}
														variant="danger"
													>
														Delete Entry
													</Button>
												</Modal.Footer>
											</Modal>
										)}
										{type}
										<span
											style={{
												display: "flex",
												flexGrow: 1,
											}}
										></span>
										{amount}
									</td>
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
