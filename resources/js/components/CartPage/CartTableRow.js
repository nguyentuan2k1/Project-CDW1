import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { Button, Container } from "reactstrap";
import axios from "axios";
import "../../../css/CartList.css";
import { result } from "lodash";

export default function CartTableRow() {
    // const history = useHistory();
    // const [product_qty, setQuantity] = useState(1);

    const [cart, setUserCart] = useState([]);
    useEffect(() => {
        // let isMounted=true;
        let tokenStr = localStorage.getItem("loginToken");
        //Pass tokenLogin at Authorization of headers
        const fetchData = async () => {
            const result = await axios(`http://localhost:8000/api/cart_user`, {
                headers: { Authorization: `Bearer ${tokenStr}` },
            });
            setUserCart(result.data.users);
        };
        fetchData();


    }, []);

    // return (
    //     <div className="cart-page">
    //         <div className="page-width">
    //             <h3>Home /Cart</h3>
    //             <h2 className="text-center h3 mb-5">Shopping Cart</h2>
    //         </div>
    //         <Container>
    //             <div className="table-wrapper">
    //                 <table className="table table-bordered">
    //                     <thead>
    //                         <tr>
    //                             <th>Product</th>
    //                             <th className="quantity_tittle">Quantity</th>
    //                             <th className="total_tittle">total</th>
    //                         </tr>
    //                     </thead>
                 
    //                     {/* <div className="Checlout_cart col text-center text-md-right">
    //                             <p className="h3 cart__subtotal"><span className="money">$398.00</span></p>
    //                             <button type="submit" className="btn btn-theme gradient-theme btn-cart-checkout">Check Out</button>
    //                         </div> */}
    //                 </table>
    //             </div>
    //         </Container>
    //     </div>
    // );
{
 cart.map((item) => {
        return (
            <tbody>
            <tr> su dung id
                <td>
                    <img src width="100px" />
                </td>
                <td className="product_tittle">
                    <a className="h6">ten sp</a>
                    <Button
                        className="btn-sm btn-block"
                        color="danger"
                    >

                        Remove
                    </Button>
                </td>
                <td></td>
                <td className="quantity_cart">
                    <div className="input-group">
                        <button
                            type="button"
                            className="input-group-text"
                        >
                            -
                        </button>
                        <div className="form-control text-center">
                            so luong
                        </div>
                    </div>
                    <input
                        type="number"
                        value="1"
                        className="text ng-pristine ng-untouched ng-valid"
                    />
                </td>

                <td className="cart_total">
                    {/* {product.price * product.quantity} */}
                    total
                </td>
            </tr>
        </tbody>
        );
    });
}
    // }
    // else {
    //     cart_HTML = <div>
    //         <div className="cart-page text-center">
    //             <h4>Shopping not Empty</h4>
    //         </div>
    //     </div>
    // }
    // return (
    //     <div className="view_cart">
    //         <div className="py-4">
    //             <Container>
    //                 <div className="row">
    //                     <div className="col-md-12">

    //                         {cart_HTML}
    //                     </div>
    //                 </div>
    //             </Container>
    //         </div>
    //     </div>
    // );
}
