import React from "react";
import { Button, Col, Form, Row } from "react-bootstrap";

export default function FormInput(props) {
	const {
		formRef,
		handleSubmit,
		handleChange,
		newEntity,
		options,
		placeholder,
		formInvalid,
	} = props;

	return (
		<Form ref={formRef} onSubmit={handleSubmit} style={{ paddingBottom: 7 }}>
			<Row>
				<Form.Group as={Col} style={{ paddingRight: 0 }}>
					<Form.Select
						name="type"
						value={newEntity?.type}
						onChange={handleChange}
						size="sm"
					>
						{options.map((option) => (
							<option key={option} value={option}>
								{option}
							</option>
						))}
					</Form.Select>
				</Form.Group>

				<Form.Group as={Col} xs={5} style={{ padding: 0 }}>
					<Form.Control
						name="amount"
						value={newEntity?.amount}
						onChange={handleChange}
						required
						pattern="[1-9]\d{0,}\.?\d{0,2}"
						autoComplete="off"
						placeholder={placeholder}
						size="sm"
					/>
				</Form.Group>
				<Form.Group as={Col} xs={2} style={{ paddingLeft: 0 }}>
					<Form.Control
						type="hidden"
						name="category"
						value={newEntity?.category}
						onChange={handleChange}
					/>
					<Button
						className="form-submission"
						onClick={handleSubmit}
						disabled={formInvalid}
						size="sm"
					>
						ADD
					</Button>
				</Form.Group>
			</Row>
		</Form>
	);
}
