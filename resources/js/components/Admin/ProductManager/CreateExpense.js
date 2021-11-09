import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import axios from "axios";
import ExpensesList from "./ExpensesListing";
import Swal from "sweetalert2";

export default function CreateExpense(props) {
    const [expense, setExpense] = useState({
        name: "",
        description: "",
        amount: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setExpense((expense) => ({
            ...expense,
            [name]: value,
        }));
    };

    const doSubmit = (e) => {
        e.preventDefault();
        const expenseObject = {
            name: expense.name,
            amount: expense.amount,
            description: expense.description,
        };
        axios
            .post("http://localhost:8000/api/expenses/", expenseObject)
            .then((res) => console.log(res.data));
        // console.log(`Expense successfully created!`);
        // console.log(`Name: ${this.state.name}`);
        // console.log(`Amount: ${this.state.amount}`);
        // console.log(`Description: ${this.state.description}`);
        Swal.fire("Good job!", "Expense Added Successfully", "success");

        setExpense({ name: '', amount: '',description: ''  });
    };

    return (
        <div className="form-wrapper">
            <Form onSubmit={doSubmit}>
                <Row>
                    <Col>
                        <Form.Group controlId="name">
                            <Form.Label>Name</Form.Label>
                            <Form.Control
                                name="name"
                                type="text"
                                value={expense.name}
                                onChange={handleChange}
                            />
                        </Form.Group>
                    </Col>

                    <Col>
                        <Form.Group controlId="amount">
                            <Form.Label>Amount</Form.Label>
                            <Form.Control
                                name="amount"
                                type="number"
                                value={expense.amount}
                                onChange={handleChange}
                            />
                        </Form.Group>
                    </Col>
                </Row>

                <Form.Group controlId="description">
                    <Form.Label>Description</Form.Label>
                    <Form.Control
                        name="description"
                        as="textarea"
                        type="textarea"
                        value={expense.description}
                        onChange={handleChange}
                    />
                </Form.Group>

                <Button variant="primary" size="lg" block="block" type="submit">
                    Add Expense
                </Button>
            </Form>
            <br></br>
            <br></br>

            <ExpensesList> </ExpensesList>
        </div>
    );
}
