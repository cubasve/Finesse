import React, { useContext, useState } from "react";
import { Button, Col, Form, Modal, Table } from "react-bootstrap";
import IncomeExpenseContext from "../../context/IncomeExpenseContext";
import {
	calculatePercentage,
	calculateSum,
	formatAmount,
	formatEntry,
} from "../../utils/calculations";
import { Pencil, Trash, XLg } from "react-bootstrap-icons";
import FormInput from "../common/FormInput";

const passiveIncomeOptions = [
	"Real Estate",
	"Business",
	"Commodities",
	"Royalties",
	"Other",
];

export default function PassiveIncome() {
	const {
		totalIncome,
		totalPassiveIncome,
		newPassiveIncome,
		updatedPassiveIncome,
		passiveFormInvalid,
		passiveFormRef,
		handlePassiveIncomeSubmit,
		handlePassiveIncomeChange,
		handlePassiveIncomeDelete,
		handleGetCurrentPassiveIncome,
		handlePassiveIncomeUpdateChange,
		handlePassiveIncomeUpdateSubmit,
	} = useContext(IncomeExpenseContext);

	const totalIncomeAmount = calculateSum(totalIncome);
	const totalPassiveIncomeAmount = calculateSum(totalPassiveIncome);

	const [selected, setSelected] = useState("");

	const [editing, setEditing] = useState(false);
	const handleStartEditing = () => setEditing(true);
	const handleFinishEditing = () => setEditing(false);

	const [showModal, setShowModal] = useState(false);
	const handleCloseModal = () => setShowModal(false);
	const handleShowModal = () => setShowModal(true);

	return (
		<>
			<h5 style={{ display: "flex", justifyContent: "space-between" }}>
				<span className="percentage">
					{calculatePercentage(totalIncomeAmount, totalPassiveIncomeAmount)}%
				</span>
				<span>Passive</span>
				<span>{formatAmount(totalPassiveIncomeAmount)}</span>
			</h5>
			{totalPassiveIncome.map(({ _id, amount, category, type }) => (
				<Table borderless hover key={_id} size="sm">
					<tbody>
						<tr>
							{editing && _id === selected ? (
								<td>
									<Form
										style={{ width: 360 }}
										onSubmit={handlePassiveIncomeUpdateSubmit}
									>
										<Form.Row>
											<Form.Group as={Col} md="1">
												<Button
													variant="success"
													size="sm"
													type="submit"
													onClick={handlePassiveIncomeUpdateSubmit}
													value={_id}
													disabled={
														updatedPassiveIncome.type === type &&
														updatedPassiveIncome.amount === amount
													}
												>
													&#10003;
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
													value={updatedPassiveIncome.type}
													onChange={handlePassiveIncomeUpdateChange}
													as="select"
													size="sm"
												>
													{passiveIncomeOptions.map((option) => (
														<option key={option} value={option}>
															{option}
														</option>
													))}
												</Form.Control>
												<Form.Text muted>Type</Form.Text>
											</Form.Group>
											<Form.Group as={Col} md="3">
												<Form.Control
													name="amount"
													value={updatedPassiveIncome.amount}
													onChange={handlePassiveIncomeUpdateChange}
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
											handleGetCurrentPassiveIncome(_id);
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
												Type: <strong>{type}</strong>, Amount:{" "}
												<strong>{formatAmount(amount)}</strong> in the{" "}
												<strong>{category}</strong> category
											</Modal.Body>
											<Modal.Footer>
												<Button variant="secondary" onClick={handleCloseModal}>
													Cancel
												</Button>
												<Button
													name={amount}
													value={_id}
													onClick={handlePassiveIncomeDelete}
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
									{formatEntry(amount)}
								</td>
							)}
						</tr>
					</tbody>
				</Table>
			))}
			<FormInput
				formRef={passiveFormRef}
				handleSubmit={handlePassiveIncomeSubmit}
				handleChange={handlePassiveIncomeChange}
				newEntity={newPassiveIncome}
				options={passiveIncomeOptions}
				placeholder=""
				formInvalid={passiveFormInvalid}
			/>
		</>
	);
}
