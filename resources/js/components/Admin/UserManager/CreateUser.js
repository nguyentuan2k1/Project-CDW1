import React, { useState } from "react";
import { Button, Row, Col } from "reactstrap";
import axios from "axios";
import UserList from "./UsersListing";
import Swal from "sweetalert2";
import { AvForm, AvField } from "availity-reactstrap-validation";
import { error } from "jquery";

export default function CreateUser(props) {
    const [expense, setExpense] = useState({
        Username: "",
        email: "",
        phone: "",
        password: "",
        type: "",
        address: "",
    });


    const handleChange = (e) => {
        const { name, value } = e.target;
        setExpense((expense) => ({
            ...expense,
            [name]: value,
        }));
    };

    const handleOnValid = (event, value) => {
        const expenseObject = {
            ...expense,
        };
        axios
            .post("http://localhost:8000/api/user/", expenseObject)
            .then((res) => {
                Swal.fire("Good job!", "Expense Added Successfully", "success")
                    .then(() => {
                        window.location.reload(false);
                    });
            })
            .catch((error) => {
                Swal.fire({
                    title: "Error!",
                    text: "Do you want to continue ?",
                    icon: "error",
                    confirmButtonText: "Cool",
                });
            });

    };

    const handleOnInvalid = (event, error) => {
        Swal.fire({
            title: "Error!",
            text: "Do you want to continue ?",
            icon: "error",
            confirmButtonText: "Cool",
        });
    };

    return (
        <div className="form-wrapper">
            <AvForm
                onValidSubmit={handleOnValid}
                onInvalidSubmit={handleOnInvalid}
            >
                <AvField
                    name="Username"
                    label="Username"
                    type="text"
                    placeholder="User Name..."
                    value={expense.Username}
                    onChange={handleChange}
                    validate={{
                        required: {
                            value: true,
                            errorMessage: "Please enter user name",
                        },
                    }}
                />
                <AvField
                    name="email"
                    label="email"
                    type="text"
                    placeholder="Enter Email..."
                    value={expense.email}
                    onChange={handleChange}
                    validate={{
                        required: {
                            value: true,
                            errorMessage: "Please enter Email",
                        },
                    }}
                />
                <AvField
                    name="phone"
                    label="Phone Number"
                    type="text"
                    placeholder="Enter Phone Number..."
                    value={expense.phone}
                    onChange={handleChange}
                    validate={{
                        required: {
                            value: true,
                            errorMessage: "Please enter Phone Number",
                        },
                    }}
                />
                <AvField
                    name="password"
                    label="Password"
                    type="text"
                    placeholder="Enter Password..."
                    value={expense.password}
                    onChange={handleChange}
                    validate={{
                        required: {
                            value: true,
                            errorMessage: "Please enter Password!!",
                        },
                    }}
                />
                <AvField
                    name="type"
                    label="type"
                    type="select"
                    value={expense.type}
                    onChange={handleChange}
                >
                    <option value="1">Admin</option>
                    <option value="2">User</option>
                    <option value="3">Other</option>
                </AvField>
                <AvField
                    name="address"
                    label="address"
                    type="text"
                    placeholder="Enter addressr..."
                    value={expense.phone}
                    onChange={handleChange}
                    validate={{
                        required: {
                            value: true,
                            errorMessage: "Please enter address",
                        },
                    }}
                />


                <Button
                    type="submit"
                    color="primary"
                    className="btn-md btn-block"
                >
                    SUBMIT
                </Button>
            </AvForm>
            <br></br>
            <br></br>
            <UserList></UserList>

        </div>
    );
}
