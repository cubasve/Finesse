import React from 'react';
import { Link } from 'react-router-dom';
// import NavBar from '../../components/NavBar/NavBar';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Carousel from 'react-bootstrap/Carousel';

export default function HomePage(props) {
    return (
        <>
            <div className="overview">
                <div>
                    <Card style={{ width: '35rem' }}>
                        <Card.Img variant="top" src="./Overview.png" />
                    </Card>
                </div>

                <div>
                    <div>
                        <h1> Accounting Class Made Easy</h1>
                        <br />
                        <h2> Become Financially Literate Using Financial Statements</h2>
                        <br />
                    </div>
                    <div className="financial-statement">
                        <Card style={{ width: '13rem', height: '12rem' }} bg="dark" text="white">
                            <Card.Header>Financial Statement 1</Card.Header>
                            <Card.Body>
                                <Card.Title>Income Statement</Card.Title>
                                <Card.Text>Contains income and expenses</Card.Text>
                            </Card.Body>
                        </Card>
                        <Card style={{ width: '13rem', height: '12rem' }} bg="secondary" text="white">
                            <Card.Header>Financial Statement 2</Card.Header>
                            <Card.Body>
                                <Card.Title>Balance Sheet</Card.Title>
                                <Card.Text>Contains assets and liabilities</Card.Text>
                            </Card.Body>
                        </Card>
                        <Card style={{ width: '13rem', height: '12rem' }} bg="light">
                            <Card.Header>Financial Statement 3</Card.Header>
                            <Card.Body>
                                <Card.Title>Cash Flow Statement</Card.Title>
                                <Card.Text>Is cash flowing in or out?</Card.Text>
                            </Card.Body>
                        </Card>
                    </div>
                </div>
            </div>


            <h2>Where is Your Cash Flowing?</h2>
            <div className="cash-flow">
                <Card style={{ width: '18rem' }} >
                    <Card.Img variant="top" src="./Case1.png" />
                    <Card.Body>
                        <Card.Title>CASE 1</Card.Title>
                        <Card.Text>
                            Income is equal to expenses. No assets or liabilities.
                </Card.Text>
                    </Card.Body>
                    <Button variant="primary" href="/financialstatement">Find Out</Button>
                </Card>

                <Card style={{ width: '18rem' }} >
                    <Card.Img variant="top" src="./Case2.png" />
                    <Card.Body>
                        <Card.Title>CASE 2</Card.Title>
                        <Card.Text>
                            No assets. Income pays for liabilities through expense column.
                </Card.Text>
                    </Card.Body>
                    <Button variant="primary" href="/financialstatement">Find Out</Button>
                </Card>

                <Card style={{ width: '18rem' }}>
                    <Card.Img variant="top" src="./Case3.png" />
                    <Card.Body>
                        <Card.Title>CASE 3</Card.Title>
                        <Card.Text>
                            Assets are the source of income.
                </Card.Text>
                    </Card.Body>
                    <Button variant="primary" href="/financialstatement">Find Out</Button>
                </Card>
            </div>

            <div>
                <h2>How It Works</h2>
                <Carousel>
                    <Carousel.Item>
                        <img
                            src=""
                            alt="" />
                        <Carousel.Caption>
                            <h3>First slide label</h3>
                            <p>Description</p>
                        </Carousel.Caption>
                    </Carousel.Item>
                    <Carousel.Item>
                        <img
                            src=""
                            alt="" />
                        <Carousel.Caption>
                            <h3>Second slide label</h3>
                            <p>Description</p>
                        </Carousel.Caption>
                    </Carousel.Item>
                    <Carousel.Item>
                        <img
                            src=""
                            alt="" />
                        <Carousel.Caption>
                            <h3>Third slide label</h3>
                            <p>Description</p>
                        </Carousel.Caption>
                    </Carousel.Item>
                </Carousel>

            </div>
        </>
    )
}

