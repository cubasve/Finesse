import React, { useContext } from "react";
import { Card, Button, Image } from "react-bootstrap";
import "./HomePage.css";
import FinancialStatementContext from "../../context/FinancialStatementContext";

export default function HomePage() {
	const { year, month } = useContext(FinancialStatementContext);

	const financialStatementData = [
		{
			header: "Financial Statement 1",
			title: "Income Statement",
			text: "Contains income and expenses",
			background: "dark",
			color: "white",
		},
		{
			header: "Financial Statement 2",
			title: "Balance Sheet",
			text: "Contains assets and liabilities",
			background: "secondary",
			color: "white",
		},
		{
			header: "Financial Statement 3",
			title: "Cash Flow Statement",
			text: "The direction of cash flow",
			background: "light",
			color: "",
		},
	];

	const casesData = [
		{
			picture: "./Case1.png",
			title: "CASE 1",
			text: "Income is equal to expenses. No assets or liabilities.",
		},
		{
			picture: "./Case2.png",
			title: "CASE 2",
			text: "No assets. Income pays for liabilities through expense column.",
		},
		{
			picture: "./Case3.png",
			title: "CASE 3",
			text: "Liabilities buy assets and assets are the income source.",
		},
	];

	return (
		<>
			<div className="overview">
				<div>
					<div>
						<h1 style={{ marginBottom: 25 }}> ACCOUNTING WITH FINESSE</h1>
						<h3 style={{ marginBottom: 25 }}>
							Become Financially Literate Using Financial Statements
						</h3>
						<Image src="./Overview.png" fluid style={{ marginBottom: 50 }} />
					</div>
					<div className="financial-statement">
						{financialStatementData.map(
							({ header, title, text, background, color }) => (
								<Card
									key={title}
									style={{ width: "13rem", height: "12rem" }}
									bg={background}
									text={color}
								>
									<Card.Header>{header}</Card.Header>
									<Card.Body>
										<Card.Title>{title}</Card.Title>
										<Card.Text>{text}</Card.Text>
									</Card.Body>
								</Card>
							)
						)}
					</div>
				</div>
			</div>

			<div className="homepage">
				<h2>WHERE IS YOUR CASH FLOWING?</h2>
				<div className="cash-flow">
					{casesData.map(({ picture, title, text }) => (
						<Card key={title} style={{ width: "18rem" }}>
							<Card.Img variant="top" src={picture} />
							<Card.Body>
								<Card.Title>{title}</Card.Title>
								<Card.Text>{text}</Card.Text>
							</Card.Body>
							<Button
								variant="primary"
								href={`/financialstatement/${year}/${month}`}
							>
								Find Out!
							</Button>
						</Card>
					))}
				</div>
			</div>

			{/* <div className="homepage">
                <h2>HOW IT WORKS:</h2>
                <Carousel>
                    <Carousel.Item>
                        <img
                            src="./Overview.png"
                            rounded />
                    </Carousel.Item>
                    <Carousel.Item>
                        <img className="d-block w-100" alt="Second slides" />
                        <Carousel.Caption>
                            <h1>Add your assets in the balance sheet</h1>
                        </Carousel.Caption>
                    </Carousel.Item>
                    <Carousel.Item>
                        <img
                            src="./Asset.png"
                            alt="" />
                    </Carousel.Item>
                    <Carousel.Item>
                        <img
                            src="./Liability.png"
                            alt="" />
                    </Carousel.Item>
                    <Carousel.Item>
                        <img
                            src="./Income.png"
                            alt="" />
                    </Carousel.Item>
                    <Carousel.Item>
                        <img
                            src="./Expense.png"
                            alt="" />
                    </Carousel.Item>
                </Carousel>
            </div> */}
		</>
	);
}
