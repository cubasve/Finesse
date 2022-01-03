import React, { useContext } from "react";
import { Card, Button, Image } from "react-bootstrap";
import "./HomePage.css";
import FinancialStatementContext from "../../context/FinancialStatementContext";

export default function HomePage() {
	const { currentYear, currentMonth } = useContext(FinancialStatementContext);

	return (
		<>
			<div className="overview">
				<div>
					<div>
						<h1> ACCOUNTING WITH FINESSE</h1>
						<br />
						<h3> Become Financially Literate Using Financial Statements</h3>
						<br />
						<Image src="./Overview.png" fluid />
						<br />
						<br />
						<br />
					</div>
					<div className="financial-statement">
						<Card
							style={{ width: "13rem", height: "12rem" }}
							bg="dark"
							text="white"
						>
							<Card.Header>Financial Statement 1</Card.Header>
							<Card.Body>
								<Card.Title>Income Statement</Card.Title>
								<Card.Text>Contains income and expenses</Card.Text>
							</Card.Body>
						</Card>
						<Card
							style={{ width: "13rem", height: "12rem" }}
							bg="secondary"
							text="white"
						>
							<Card.Header>Financial Statement 2</Card.Header>
							<Card.Body>
								<Card.Title>Balance Sheet</Card.Title>
								<Card.Text>Contains assets and liabilities</Card.Text>
							</Card.Body>
						</Card>
						<Card style={{ width: "13rem", height: "12rem" }} bg="light">
							<Card.Header>Financial Statement 3</Card.Header>
							<Card.Body>
								<Card.Title>Cash Flow Statement</Card.Title>
								<Card.Text>The direction of cash flow</Card.Text>
							</Card.Body>
						</Card>
					</div>
				</div>
			</div>

			<div className="homepage">
				<h2>WHERE IS YOUR CASH FLOWING?</h2>
				<div className="cash-flow">
					<Card style={{ width: "18rem" }}>
						<Card.Img variant="top" src="./Case1.png" />
						<Card.Body>
							<Card.Title>CASE 1</Card.Title>
							<Card.Text>
								Income is equal to expenses. No assets or liabilities.
							</Card.Text>
						</Card.Body>
						<Button
							variant="primary"
							href={`/financialstatement/${currentYear}/${currentMonth}`}
						>
							Find Out!
						</Button>
					</Card>

					<Card style={{ width: "18rem" }}>
						<Card.Img variant="top" src="./Case2.png" />
						<Card.Body>
							<Card.Title>CASE 2</Card.Title>
							<Card.Text>
								No assets. Income pays for liabilities through expense column.
							</Card.Text>
						</Card.Body>
						<Button
							variant="primary"
							href={`/financialstatement/${currentYear}/${currentMonth}`}
						>
							Find Out!
						</Button>
					</Card>

					<Card style={{ width: "18rem" }}>
						<Card.Img variant="top" src="./Case3.png" />
						<Card.Body>
							<Card.Title>CASE 3</Card.Title>
							<Card.Text>
								Liabilities buy assets and assets are the income source.
							</Card.Text>
						</Card.Body>
						<Button
							variant="primary"
							href={`/financialstatement/${currentYear}/${currentMonth}`}
						>
							Find Out!
						</Button>
					</Card>
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
