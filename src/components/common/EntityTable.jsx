import React, { useContext } from "react";
import {
	// Badge,
	Button,
	ButtonGroup,
	Col,
	Dropdown,
	DropdownButton,
	Form,
	Modal,
	Table,
	Row,
} from "react-bootstrap";
import { formatAmount, formatEntry } from "../../utils/calculations";
import { Pencil, Trash, XLg /* FileEarmark */ } from "react-bootstrap-icons";
import { FinancialStatementContext } from "../../context/FinancialStatementContext";

export default function EntityTable(props) {
	const {
		totalEntity,
		handleUpdateSubmit,
		updatedEntity,
		handleUpdateChange,
		options,
		handleGetCurrentEntity,
		handleDelete,
	} = props;

	const {
		selected,
		editing,
		showModal,
		setSelected,
		handleStartEditing,
		handleFinishEditing,
		handleCloseModal,
		handleShowModal,
	} = useContext(FinancialStatementContext);

	return (
		<Table borderless hover size="sm" style={{ marginBottom: 5 }}>
			{totalEntity?.map(({ _id, amount, category, type }) => (
				<tbody key={_id}>
					<tr>
						{editing && _id === selected ? (
							<td>
								<Form onSubmit={handleUpdateSubmit}>
									<Row>
										<Form.Group as={Col} xs="1" style={{ marginRight: 3 }}>
											<Button
												variant="success"
												size="sm"
												type="submit"
												onClick={(e) => {
													handleUpdateSubmit(e);
													handleFinishEditing();
												}}
												value={_id}
												disabled={
													updatedEntity.type === type &&
													updatedEntity.amount === amount
												}
											>
												&#10003;
											</Button>
										</Form.Group>
										<Form.Group as={Col} xs="2">
											<Button
												onClick={handleFinishEditing}
												size="sm"
												variant="secondary"
											>
												<XLg />
											</Button>
										</Form.Group>
										<Form.Group as={Col}>
											<Form.Control
												name="type"
												value={updatedEntity.type}
												onChange={handleUpdateChange}
												as="select"
												size="sm"
											>
												{options.map((option) => (
													<option key={option} value={option}>
														{option}
													</option>
												))}
											</Form.Control>
											<Form.Text muted>Type</Form.Text>
										</Form.Group>
										<Form.Group as={Col} xs="3">
											<Form.Control
												name="amount"
												value={updatedEntity.amount}
												onChange={handleUpdateChange}
												required
												pattern="[1-9]\d{0,}\.?\d{0,2}"
												autoComplete="off"
												size="sm"
											/>
											<Form.Text muted>Amount</Form.Text>
										</Form.Group>
									</Row>
								</Form>
							</td>
						) : (
							<td style={{ display: "flex" }}>
								<DropdownButton
									as={ButtonGroup}
									variant="outline-secondary"
									size="sm"
									title=""
									className="delete"
								>
									<Dropdown.Item>
										<Button
											name={amount}
											value={_id}
											onClick={() => {
												setSelected(_id);
												handleGetCurrentEntity(_id);
												handleStartEditing();
											}}
											variant="link"
											className="delete"
											style={{
												textDecoration: "none",
												color: "orange",
												padding: 0,
											}}
										>
											<Pencil />
											{""} Edit
										</Button>
									</Dropdown.Item>
									<Dropdown.Item>
										<Button
											name={amount}
											value={_id}
											onClick={() => {
												setSelected(_id);
												handleShowModal();
											}}
											variant="link"
											style={{
												textDecoration: "none",
												color: "red",
												padding: 0,
											}}
											className="delete"
										>
											<Trash />
											{""} Delete
										</Button>
									</Dropdown.Item>
								</DropdownButton>
								{/* <Button
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
									</Button> */}
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
												onClick={handleDelete}
												variant="danger"
											>
												Delete Entry
											</Button>
										</Modal.Footer>
									</Modal>
								)}
								{type}{" "}
								{/* <Badge pill>
									<FileEarmark />
								</Badge> */}
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
			))}
		</Table>
	);
}
