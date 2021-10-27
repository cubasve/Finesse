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

const portfolioIncomeOptions = [
	"Stock",
	"Bond",
	"Index/Mutual Fund",
	"GIC",
	"REIT",
	"Other",
];

export default function PortfolioIncome() {
	const {
		totalIncome,
		totalPortfolioIncome,
		newPortfolioIncome,
		portfolioFormInvalid,
		portfolioFormRef,
		updatedPortfolioIncome,
		handlePortfolioIncomeSubmit,
		handlePortfolioIncomeChange,
		handlePortfolioIncomeDelete,
		handleGetCurrentPortfolioIncome,
		handlePortfolioIncomeUpdateChange,
		handlePortfolioIncomeUpdateSubmit,
	} = useContext(IncomeExpenseContext);

	const totalIncomeAmount = calculateSum(totalIncome);
	const totalPortfolioIncomeAmount = calculateSum(totalPortfolioIncome);

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
					{calculatePercentage(totalIncomeAmount, totalPortfolioIncomeAmount)}%
				</span>
				<span>Portfolio</span>
				<span>{formatAmount(totalPortfolioIncomeAmount)}</span>
			</h5>
			{totalPortfolioIncome.map(({ _id, amount, category, type }) => (
				<Table borderless hover key={_id} size="sm">
					<tbody>
						<tr>
							{editing && _id === selected ? (
								<td>
									<Form
										style={{ width: 360 }}
										onSubmit={handlePortfolioIncomeUpdateSubmit}
									>
										<Form.Row>
											<Form.Group as={Col} md="1">
												<Button
													variant="success"
													size="sm"
													type="submit"
													onClick={handlePortfolioIncomeUpdateSubmit}
													value={_id}
													disabled={
														updatedPortfolioIncome.type === type &&
														updatedPortfolioIncome.amount === amount
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
													value={updatedPortfolioIncome.type}
													onChange={handlePortfolioIncomeUpdateChange}
													as="select"
													size="sm"
												>
													{portfolioIncomeOptions.map((option) => (
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
													value={updatedPortfolioIncome.amount}
													onChange={handlePortfolioIncomeUpdateChange}
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
											handleGetCurrentPortfolioIncome(_id);
											handleStartEditing();
										}}
										variant="outline-warning"
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
										variant="outline-danger"
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
													onClick={handlePortfolioIncomeDelete}
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
				formRef={portfolioFormRef}
				handleSubmit={handlePortfolioIncomeSubmit}
				handleChange={handlePortfolioIncomeChange}
				newEntity={newPortfolioIncome}
				options={portfolioIncomeOptions}
				placeholder="Dividend/Interest"
				formInvalid={portfolioFormInvalid}
			/>
		</>
	);
}
