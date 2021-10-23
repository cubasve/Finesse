import React, { useContext } from "react";
import { Popover, OverlayTrigger, Button, Table, Form } from "react-bootstrap";
import IncomeExpenseContext from "../../context/IncomeExpenseContext";
import calculatePercentage from "../../utils/calculations";

const popover = (
	<Popover id="popover-basic">
		<Popover.Title as="h3">Pay Yourself First</Popover.Title>
		<Popover.Content>
			Prioritize your financial future by deducting a percentage of your
			paycheque FIRST before you pay for other expenses. As your income
			increases, this percentage should increase accordingly.
		</Popover.Content>
	</Popover>
);

const PayYourselfPopover = () => (
	<OverlayTrigger trigger="click" placement="top" overlay={popover}>
		<Button variant="success" size="sm">
			&#8505;
		</Button>
	</OverlayTrigger>
);

function calculateSelfFirst(totalSelfFirstNumber) {
	if (!totalSelfFirstNumber) return 0;
	if (Number.isInteger(totalSelfFirstNumber)) return totalSelfFirstNumber;
	return totalSelfFirstNumber.toFixed(2);
}

export default function PayYourselfFirst() {
	const {
		totalExpensesAndSelfFirst,
		totalPayYourselfFirst,
		handleSelfFirstDelete,
		selfFirstFormRef,
		handleSelfFirstSubmit,
		newPayYourselfFirst,
		handleSelfFirstChange,
		selfFirstFormInvalid,
	} = useContext(IncomeExpenseContext);

	const totalSelfFirstNumber = totalPayYourselfFirst
		.map((elem) => elem.amount)
		.reduce((acc, num) => acc + num, 0);

	const totalExpensesAndSelfFirstNumber = totalExpensesAndSelfFirst
		.map((elem) => elem.amount)
		.reduce((acc, num) => acc + num, 0);

	return (
		<>
			<h5>
				<span className="left percentage">
					{calculatePercentage(
						totalExpensesAndSelfFirstNumber,
						totalSelfFirstNumber
					)}
					%
				</span>
				<span>Pay Yourself First </span>
				<PayYourselfPopover />
				<span className="right">
					${calculateSelfFirst(totalSelfFirstNumber)}
				</span>
			</h5>

			{totalPayYourselfFirst.map((pi) => (
				<div key={pi._id}>
					<Table borderless hover size="sm">
						<tbody>
							<tr>
								<td className="left">
									<Button
										name={pi.amount}
										value={pi._id}
										onClick={handleSelfFirstDelete}
										variant="danger"
										size="sm"
										className="delete"
									>
										X
									</Button>
									<span></span>
									Allocation
								</td>
								<td className="right">{pi.amount}</td>
							</tr>
						</tbody>
					</Table>
				</div>
			))}

			<Form
				ref={selfFirstFormRef}
				onSubmit={handleSelfFirstSubmit}
				className="selfFirst"
			>
				<Form.Row>
					<Form.Group>
						<Form.Control
							name="amount"
							value={newPayYourselfFirst.amount}
							onChange={handleSelfFirstChange}
							required
							pattern="[1-9]\d{0,}\.?\d{0,2}"
							placeholder="Save/ Invest/ Tithe"
							autoComplete="off"
							size="sm"
						/>
					</Form.Group>
					{/* <Form.Group>
                        <Form.Control
                            type="hidden"
                            name="class"
                            value={newPayYourselfFirst.class}
                            onChange={handleSelfFirstChange}
                        />
                    </Form.Group> */}
					<Form.Group>
						<Form.Control
							type="hidden"
							name="category"
							value={newPayYourselfFirst.category}
							onChange={handleSelfFirstChange}
						/>
						<Button
							type="submit"
							className="form-submission"
							onClick={handleSelfFirstSubmit}
							disabled={selfFirstFormInvalid}
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
