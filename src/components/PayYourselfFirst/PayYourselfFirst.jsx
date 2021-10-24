import React, { useContext } from "react";
import { Popover, OverlayTrigger, Button, Table, Form } from "react-bootstrap";
import IncomeExpenseContext from "../../context/IncomeExpenseContext";
import {
	calculatePercentage,
	determineTotalAmount,
	showTotalAmount,
} from "../../utils/calculations";
import { InfoLg } from "react-bootstrap-icons";

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
		<Button variant="info" size="sm">
			<InfoLg />
		</Button>
	</OverlayTrigger>
);

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

	const totalSelfFirstAmount = determineTotalAmount(totalPayYourselfFirst);
	const totalExpensesAndPYFAmount = determineTotalAmount(
		totalExpensesAndSelfFirst
	);

	return (
		<>
			<h5 style={{ display: "flex", justifyContent: "space-between" }}>
				<span className="percentage">
					{calculatePercentage(totalExpensesAndPYFAmount, totalSelfFirstAmount)}
					%
				</span>
				<span>Pay Yourself First </span>
				<PayYourselfPopover />
				<span>${showTotalAmount(totalSelfFirstAmount)}</span>
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
