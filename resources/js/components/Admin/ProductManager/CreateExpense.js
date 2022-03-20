import React, { useState, useEffect,useRef } from "react";
import { Button, Row, Col } from "reactstrap";
import axios from "axios";
import ExpensesList from "./ExpensesListing";
import Swal from "sweetalert2";
import { AvForm, AvField } from "availity-reactstrap-validation";

export default function CreateExpense(props) {
    const [expense, setExpense] = useState({
        product_name: "",
        description: "",
        quantity: "",
        price: "",
        category_id: "1",
        product_image: null
    });
    // const refFileInput = useRef('');

    const [categoryList, setCategoryList] = useState([]);

    //Get categories list
    useEffect(() => {
        const fetchData = async () => {
            const result = await axios.get(
                "http://localhost:8000/api/category/"
            );
            const { data } = await result;
            setCategoryList(data);
        };
        fetchData();
    }, []);

    //Create Categories Select options
    const categoriesSelect = categoryList.map((value, index) => {
        return <option value={value.id}>{value.name}</option>;
    });

    const handleChange = (e) => {
        if(e.target.type == 'file'){
            // console.log("Di vo file");
            const { name } = e.target; 
            setExpense((expense) => ({
                ...expense,
                [name]: e.target.files[0],
                filename:e.target.files[0].name
            }));
        }
        else{
            console.log("cc vo file");
            const { name, value } = e.target; 
            setExpense((expense) => ({
                ...expense,
                [name]: value,
            }));
        }
    };

    const handleOnValid = (event, value) => {
        const expenseObject = {
            ...expense,
        };
        const formdata = new FormData();
        formdata.append("product_image",expenseObject.product_image);
        formdata.append("category_id",expenseObject.category_id);
        formdata.append("description",expenseObject.description);
        formdata.append("price",expenseObject.price);
        formdata.append("product_name",expenseObject.product_name);
        formdata.append("quantity",expenseObject.quantity);

        axios
            .post("http://localhost:8000/api/product/", formdata)
            .then((res) => {
                Swal.fire(
                    "Good job!",
                    "Expense Added Successfully",
                    "success"
                ).then(() => {
                    // props.history.push(`/expenses-listing`);
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
                <Row>
                    <Col lg="6" md="6" sm="12">
                        <AvField
                            name="product_name"
                            label="Name"
                            type="text"
                            placeholder="Product Name..."
                            value={expense.product_name}
                            onChange={handleChange}
                            validate={{
                                required: {
                                    value: true,
                                    errorMessage: "Please enter product name",
                                },
                            }}
                        />
                    </Col>
                    <Col lg="6" md="6" sm="12">
                        <AvField
                            name="category_id"
                            label="Category"
                            type="select"
                            value={expense.category_id}
                            onChange={handleChange}
                        >
                            {categoriesSelect}
                        </AvField>
                    </Col>
                </Row>
                <Row>
                    <Col lg="4" md="4" sm="12">
                        <AvField
                            name="quantity"
                            label="Quantity"
                            type="number"
                            placeholder="Quantity..."
                            value={expense.quantity}
                            onChange={handleChange}
                            validate={{
                                required: {
                                    value: true,
                                    errorMessage: "Please enter product name",
                                },
                            }}
                        />
                    </Col>
                    <Col lg="4" md="4" sm="12">
                        <AvField
                            name="price"
                            label="Price"
                            type="number"
                            placeholder="Product price $ ..."
                            value={expense.price}
                            onChange={handleChange}
                            validate={{
                                required: {
                                    value: true,
                                    errorMessage: "Please enter product name",
                                },
                            }}
                        />
                    </Col>
                    <Col lg="4" md="4" sm="12">
                        <AvField
                            name="product_image"
                            label="Image"
                            type="file"
                            accept="image/png, image/gif, image/jpeg"
                            // value={expense.product_image}
                            onChange={handleChange}
                        />
                    </Col>
                </Row>
                <AvField
                    name="description"
                    label="Description"
                    type="textarea"
                    placeholder="Description ..."
                    value={expense.description}
                    onChange={handleChange}
                />
                <Button
                    type="submit"
                    color="primary"
                    className="btn-md btn-block"
                >
                    SUBMIT
                </Button>
                {console.log("render")}
                {
                    console.log(expense)
                }
            </AvForm>
            <br></br>
            <br></br>

            <ExpensesList> </ExpensesList>
        </div>
    );
}
