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
        category_id: "",
        product_image: null
    });
    const [image,setImage] = useState('');
    // const refFileInput = useRef('');

    const [categoryList, setCategoryList] = useState([]);

    //Get categories list
    useEffect(() => {
        const fetchData = async () => {
            let tokenStr = localStorage.getItem("loginToken");
            const result = await axios("http://localhost:8000/api/category/",{
                headers: { Authorization: `Bearer ${tokenStr}` },
            });
            const { data } = await result;
            setCategoryList(data);
                setExpense((expense) => ({
                    ...expense,
                    category_id: data[0].id 
                }));
        };
        fetchData();
    }, []);

    useEffect(()=>{
        return ()=>{
            // console.log(image);
           image && URL.revokeObjectURL(image);
           // Câu && giống câu if nếu như nó undefind or false thì nó trả về vế đầu ,
           // Nếu !false,!underfind -> trả về vế 2 
           // Viết cái này để tránh rò rĩ bộ nhớ 
        }
    },[image])


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
            }));
            // console.log(URL.createObjectURL(e.target.files[0]));
            setImage(URL.createObjectURL(e.target.files[0]));
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

        let tokenStr = localStorage.getItem("loginToken");
        axios
            .post("http://localhost:8000/api/product/", formdata, {
                headers: { Authorization: `Bearer ${tokenStr}` },
            })
            .then((res) => {
                Swal.fire(
                    "Good job!",
                    "Expense Added Successfully",
                    "success"
                ).then(() => {
                    props.history.push(`/expenses-listing`);
                });
            })
            .catch((error) => {
                let error_status = "";
                
                for (const [key, value] of Object.entries( error.response.data)) {
                    // console.log(`${key}: ${value}`);
                    if(Array.isArray(value)){
                        value.forEach(element => {
                            error_status+= element +"\n"
                        });
                    }
                    else{
                        error_status+=value;
                    }
                  }

                Swal.fire({
                    title: "Error!",
                    text: error_status,
                    icon: "error",
                    confirmButtonText: "Try Again",
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
                    <Col lg="6" md="6" sm="12">
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
                    <Col lg="6" md="6" sm="12">
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
                   
                </Row>
                 <Row >
                 <Col lg="6" md="6" sm="6">
                        <AvField
                            name="product_image"
                            label="Image"
                            type="file"
                            accept="image/png, image/gif, image/jpeg"
                            // value={expense.product_image}
                            onChange={handleChange}
                        />         
                    </Col>
                    {image && (
                        <Col lg="6" md="6" sm="6" >
                        <img src={image} style={{width:'100%',height:'200px',backgroundSize:'contain',borderRadius:'40px',border:'1px solid #ccc'}} />
                        </Col>
                    )}

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
               
            </AvForm>
            <br></br>
            <br></br>

            <ExpensesList> </ExpensesList>
        </div>
    );
   
}



