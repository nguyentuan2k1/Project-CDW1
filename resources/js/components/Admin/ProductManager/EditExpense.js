import React, { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import axios from "axios";
import Swal from "sweetalert2";

export default function EditExpense(props) {
    const [expense, setExpense] = useState({
        name: "",
        amount: "",
        description: "",
    });

    useEffect(() => {
        axios
            .get("http://localhost:8000/api/expenses/" + props.match.params.id)
            .then((res) => {
                setExpense({
                    name: res.data.name,
                    amount: res.data.amount,
                    description: res.data.description,
                });
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

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
            .patch(
                "http://localhost:8000/api/expenses/" + props.match.params.id,
                expenseObject
            )
            .then((res) => {
                console.log(res.data);
                Swal.fire("Good job!", "Expense Updated Successfully", "success");
            })
            .catch((error) => {
                console.log(error);
            });

        // Redirect to Expense List
        props.history.push("/edit-expense/" + props.match.params.id);
    };

    return (
        <div className="form-wrapper">
            <Form onSubmit={doSubmit}>
                <Form.Group controlId="Name">
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                        name="name"
                        type="text"
                        value={expense.name}
                        onChange={handleChange}
                    />
                </Form.Group>

                <Form.Group controlId="Amount">
                    <Form.Label>Amount</Form.Label>
                    <Form.Control
                        name="amount"
                        type="number"
                        value={expense.amount}
                        onChange={handleChange}
                    />
                </Form.Group>

                <Form.Group controlId="Description">
                    <Form.Label>Description</Form.Label>
                    <Form.Control
                        name="description"
                        type="text"
                        value={expense.description}
                        onChange={handleChange}
                    />
                </Form.Group>

                <Button variant="danger" size="lg" block="block" type="submit">
                    Update Expense
                </Button>
            </Form>
        </div>
    );
}
