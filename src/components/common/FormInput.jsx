import React from "react";
import { Button, Form } from "react-bootstrap";

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
		<Form ref={formRef} onSubmit={handleSubmit}>
			<Form.Row>
				<Form.Group>
					<Form.Control
						name="type"
						value={newEntity.type}
						onChange={handleChange}
						as="select"
						size="sm"
						className="select"
					>
						{options.map((option) => (
							<option key={option} value={option}>
								{option}
							</option>
						))}
					</Form.Control>
				</Form.Group>
				<Form.Group>
					<Form.Control
						name="amount"
						value={newEntity.amount}
						onChange={handleChange}
						required
						pattern="[1-9]\d{0,}\.?\d{0,2}"
						autoComplete="off"
						placeholder={placeholder}
						size="sm"
					/>
				</Form.Group>
				<Form.Group>
					<Form.Control
						type="hidden"
						name="class"
						value={newEntity.class}
						onChange={handleChange}
					/>
					<Form.Control
						type="hidden"
						name="category"
						value={newEntity.category}
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
			</Form.Row>
		</Form>
	);
}
