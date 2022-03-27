import React, { useState, useEffect, useLayoutEffect } from "react";
import { Button, Row, Col } from "reactstrap";
import axios from "axios";
import Swal from "sweetalert2";
import { useParams } from "react-router-dom";
import { AvForm, AvField } from "availity-reactstrap-validation";
import { Link } from "react-router-dom";
import "../../../../css/EditExpense.css";

export default function EditExpense(props) {
    const { id } = useParams();
    const [oldExpense, setOldExpense] = useState({
        product_name: "",
        description: "",
        quantity: "",
        price: "",
        category_id: "",
        product_image: "",
        category_name: '',
    });
    const [image, setImage] = useState('');


    const [expense, setExpense] = useState({
        id: "",
        product_name: "",
        description: "",
        quantity: "",
        price: "",
        category_id: "",
        product_image: "",
        category_name: '',
    });

    const [categoryList, setCategoryList] = useState([]);

    //Get categories list
    useEffect(() => {
        const fetchData = async () => {
            let tokenStr = localStorage.getItem("loginToken");
            const result = await axios("http://localhost:8000/api/category/", {
                headers: { Authorization: `Bearer ${tokenStr}` },
            });
            const { data } = await result;
            setCategoryList(data);
        };
        fetchData();
    }, []);

    //Create Categories Select options
    const categoriesSelect = categoryList.map((value, index) => {
        // console.log("category id:"+value.id);
        if (value.name === expense.category_name) {
            expense.category_id = value.id
        }
        return <option value={value.id}>{value.name}</option>;
    });

    useEffect(() => {
        const fetchData = async () => {
            let tokenStr = localStorage.getItem("loginToken");
            const result = await axios("http://localhost:8000/api/product/" + id, {
                headers: { Authorization: `Bearer ${tokenStr}` },
            });
            const { data } = await result;
            setImage(data.product[0].product_image);
            setExpense(data.product[0]);
            setOldExpense(data.product[0]);
        };
        fetchData();
    }, []);

    const handleChange = (e) => {
        if (e.target.type == 'file') {
            // console.log("Di vo file");
            const { name } = e.target;
            setExpense((expense) => ({
                ...expense,
                [name]: e.target.files[0],
            }));
            // console.log(URL.createObjectURL(e.target.files[0]));
            setImage(URL.createObjectURL(e.target.files[0]));
        }
        else {
            // console.log("cc vo file");
            const { name, value } = e.target;
            setExpense((expense) => ({
                ...expense,
                [name]: value,
            }));
        }
    };

    const checkOldExpense = (expense, oldExpense) => {
        let flag = true;
        if (
            expense.product_name === oldExpense.product_name &&
            expense.description === oldExpense.description &&
            expense.quantity === oldExpense.quantity &&
            expense.price === oldExpense.price &&
            expense.category_id === oldExpense.category_id &&
            expense.product_image === oldExpense.product_image
        ) {
            flag = false;
        }
        return flag;
    };

    const handleOnValid = (event, value) => {
        const fetchData = async () => {
            let tokenStr = localStorage.getItem("loginToken");
            const result = await axios(`http://localhost:8000/api/product/${props.match.params.id}`
                , {
                    headers: { Authorization: `Bearer ${tokenStr}` },
                });
            const { data } = await result;
            return data;
        };

        fetchData()
            .then((res) => {
                console.log(res.message);
                if (res.message == 'product found!') {
                    const expenseObject = {
                        ...expense,
                    };
                    if (checkOldExpense(expense, oldExpense)) {
                        Swal.fire({
                            title: "Do you want to save the changes?",
                            showDenyButton: true,
                            showCancelButton: true,
                            confirmButtonText: "Save",
                            denyButtonText: `Don't save`,
                        }).then((result) => {
                            const formdata = new FormData();
                            formdata.append("product_image", expenseObject.product_image);
                            formdata.append("category_id", expenseObject.category_id);
                            formdata.append("description", expenseObject.description);
                            formdata.append("price", expenseObject.price);
                            formdata.append("product_name", expenseObject.product_name);
                            formdata.append("quantity", expenseObject.quantity);
                            if (result.isConfirmed) {
                                let tokenStr = localStorage.getItem("loginToken");
                                axios
                                    .post(
                                        "http://localhost:8000/api/product-update/" +
                                        props.match.params.id,
                                        formdata,{
                                            headers: { Authorization: `Bearer ${tokenStr}` },
                                        }
                                    )
                                    .catch((error) => {
                                        Swal.fire({
                                            title: "Error!",
                                            text: "Do you want to continue ?",
                                            icon: "error",
                                            confirmButtonText: "Ok",
                                        });
                                    });

                                Swal.fire("Saved!", "", "success").then(() => {
                                    props.history.push(
                                        `/edit-expense/${props.match.params.id}`
                                    );
                                });
                            } else if (result.isDenied) {
                                Swal.fire("Changes are not saved", "", "info");
                            }
                        });
                    } else {
                        Swal.fire({
                            title: "Pls type anything you want to update!",
                            text: "Do you want to continue ?",
                            icon: "error",
                            confirmButtonText: "Cool",
                        });
                    }
                } else {
                    Swal.fire({
                        title: "This product not exist !!",
                        text: "Do you want to continue ?",
                        icon: "error",
                        confirmButtonText: "Cool",
                    }).then(() => {
                        props.history.push(`/expenses-listing`);
                    });
                }
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const handleOnInvalid = (event, error, value) => {
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
                    <Col lg="6" md="6" sm="12">
                        <AvField
                            name="quantity"
                            label="Quantity"
                            type="number"
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
                    <Col lg="6" md="6" sm="12">
                        <AvField
                            name="price"
                            label="Price"
                            type="number"
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

                </Row>
                <Row >

                    <Col lg="6" md="6" sm="12">
                        <AvField
                            name="product_image"
                            label="Image"
                            type="file"
                            accept="image/png, image/gif, image/jpeg"
                            onChange={handleChange}
                        />
                    </Col>
                    <Col lg="6" md="6" sm="12">
                    {image &&  <ImagePreview  product_image={image} /> }  
                    </Col>
                </Row>
                <AvField
                    name="description"
                    label="Description"
                    type="textarea"
                    className="text-area-custom"
                    value={expense.description}
                    onChange={handleChange}
                />
                <Button
                    type="submit"
                    color="danger"
                    className="btn-md btn-block mb-2"
                >
                    UPDATE
                </Button>
                <Link to="/expenses-listing">
                    <Button
                        color="danger"
                        outline
                        className="btn-md btn-block mb-2"
                    >
                        BACK
                    </Button>
                </Link>
            </AvForm>
        </div>
    );
}

function ImagePreview(props){
    const blod_detect = props.product_image[0]+props.product_image[1]+props.product_image[2]+props.product_image[3];
    if(blod_detect == 'blob'){
        return  <img style={{ width: '100%', height: '200px', backgroundSize: 'contain', borderRadius: '40px', border: '1px solid #ccc' }} src={props.product_image} />
    }
    else{
        return  <img style={{ width: '100%', height: '200px', backgroundSize: 'contain', borderRadius: '40px', border: '1px solid #ccc' }} src={"/" + props.product_image} />
    }

    
}
