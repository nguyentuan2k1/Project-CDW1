import React from "react";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "bootstrap/dist/css/bootstrap.css";

import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import EditExpense from "./EditExpense"
import ExpensesList from "./ExpensesListing";
import CreateExpense from "./CreateExpense";

export default function ProductManager() {
    return (
        <Router>
            <div className="product-manager">
                <header className="App-header">
                    <Navbar>
                        <Container>
                            <Navbar.Brand>
                                <Link
                                    to={"/create-expense"}
                                    className="nav-link"
                                >
                                    Product manager
                                </Link>
                            </Navbar.Brand>

                            <Nav className="justify-content-end">
                                <Nav>
                                    <Link
                                        to={"/create-expense"}
                                        className="nav-link"
                                    >
                                        Create Product
                                    </Link>
                                    <Link
                                        to={"/expenses-listing"}
                                        className="nav-link"
                                    >
                                        Products List
                                    </Link>
                                </Nav>
                            </Nav>
                        </Container>
                    </Navbar>
                </header>

                <Container>
                    <Row>
                        <Col md={12}>
                            <div className="wrapper">
                                <Switch>
                                    <Route
                                        exact
                                        path="/"
                                        component={CreateExpense}
                                    />
                                    <Route
                                        path="/create-expense"
                                        component={CreateExpense}
                                    />
                                    <Route
                                        path="/edit-expense/:id"
                                        component={EditExpense}
                                    />
                                    <Route
                                        path="/expenses-listing"
                                        component={ExpensesList}
                                    />
                                </Switch>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </div>
        </Router>
    );
}
