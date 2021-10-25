import React, { Component } from 'react'
import "../assets/Detail.css";
export default class Detail extends Component {
    render() {
        return (
            <div className="detail">
                <div className="detail-header">
                    <h1>Detail Product</h1>
                </div>
                <div className="container">
                    <div className="row">
                        <div className="col-md-6">
                            <div className="img-detail">
                                <img src="//product.hstatic.net/200000065946/product/pro_mau_tu_nhien_noi_that_moho_ghe_an_pallermo_2265922503c242a98a1662e68fc16a70_master.png" width="100%" height="100%" />
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="header-detail">
                                <div className="titlle-detail my-3">
                                    <h3>Ghế Ăn Gỗ Tần Bì Tự Nhiên PALLERMO</h3>
                                </div>
                                <div className="quantity-review">
                                    <p>Đánh giá: </p>
                                    <div className="like">
                                        <button type="button" id="btn-like">
                                            <i class="far fa-thumbs-up" aria-hidden="true"></i>
                                        </button>
                                    </div>
                                </div>
                                <div className="description-detail">
                                    <p><b>Kích thước:</b> Dài 52cm x Rộng 58cm x Cao đến đệm ngồi/lưng tựa 50cm/78cm <br />
                                        <b> Chất liệu:</b> <br />
                                        - Gỗ tần bì tự nhiên <br />
                                        - Vải bọc polyester chống nhăn, kháng bụi bẩn và nấm mốc <br />
                                        Chống thấm, cong vênh, trầy xước, mối mọt
                                    </p>
                                </div>
                                <div className="price-detail">
                                    <h4>1,390,000₫</h4>
                                </div>
                                <div className="quantity">
                                    <input type="button" value="+" className="qty-btn" />
                                    <input type="text" value="1" min="1" class="select-quantity" />
                                    <input type="button" value="-" className="qty-btn" />
                                </div>
                                <div className="add-product-cart">
                                    <button type="button" className="btn-3"><span>Thêm vào giỏ</span></button>
                                </div>
                            </div>
                            <div className="Review">
                                <div className="Review-product">
                                    <h5>Comment</h5>
                                </div>
                                <div class="row py-0 mb-5">
                                    <div class="col-md-0 mb-5 mb-md-0">
                                        <div class="px-md-5" id="renderListComments">
                                        </div>
                                    </div>
                                    <div class="col-md-5">
                                        <form id="formSubmit">
                                            <input id="commentRating" type="text" class="d-none" />
                                            <div class="form-group">
                                                <label for="">Name</label>
                                                <input required id="commentAuthor" type="text" class="form-control w-50" placeholder="" aria-describedby="helpId" />
                                            </div>
                                            <div class="form-group">
                                                <label for="">Contents</label>
                                                <textarea required id="commentContent" class="form-control" name="" id="" rows="3"></textarea>
                                            </div>
                                            <button type="submit" class="btn btn-primary">Đánh Giá</button>
                                        </form>
                                    </div>
                                </div>
                            </div>
                            {/* <div className="review-product">
                                <div className="review-title">
                                <h4 class="mt-5">Review</h4>
                                </div>
                                <div className="user-review">
                                    <div className="name-user">
                                        <p>Nhu: </p>
                                    </div>
                                </div>
                            </div> */}
                        </div>
                    </div>
                    <div className="related-product">
                        <div className="title-related">
                            <h3>Related Products</h3>
                        </div>
                        <div className="row my-5">
                            <div className="col-md-3">
                                <img src="https://product.hstatic.net/200000065946/product/pro_go_tu_nhien_noi_that_moho_ghe_an_go_cao_su_tu_nhien_oslo_601_3b79ae0a796f43bc8538abf3af0ddd65_grande.png" width="100%" height="75%"></img>
                                <div className="related-content">
                                    <p>Ghế Ăn Gỗ Cao Su Tự Nhiên MOHO OSLO 601</p>
                                    <div className="related-price">
                                        <p>799,000₫</p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-3">
                                <img src="https://product.hstatic.net/200000065946/product/pro_mau_tu_nhien_noi_that_moho_ghe_an_odessa_2e9569c22c6d45749107e0a44f6c4d9c_master.png" width="100%" height="75%"></img>
                                <div className="related-content">
                                    <p>Ghế Ăn Gỗ Cao Su Tự Nhiên MOHO OSLO 601</p>
                                    <div className="related-price">
                                        <p>799,000₫</p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-3">
                                <img src="https://product.hstatic.net/200000065946/product/pro_mau_tu_nhien_ghe_an_go_torino_11092c6f4b2d40c9a4587b48f49268b7_master.png" width="100%" height="75%"></img>
                                <div className="related-content">
                                    <p>Ghế Ăn Gỗ Cao Su Tự Nhiên MOHO OSLO 601</p>
                                    <div className="related-price">
                                        <p>799,000₫</p>
                                    </div>  
                                </div>
                            </div>
                            <div className="col-md-3">
                                <img src="https://product.hstatic.net/200000065946/product/pro_mau_tu_nhien_ghe_bang_dai_go_cao_su_tu_nhien_vline_602_2a_84e297a28a5e472faf47291b08521740_master.jpg" width="100%" height="75%"></img>
                                <div className="related-content">
                                    <p>Ghế Ăn Gỗ Cao Su Tự Nhiên MOHO OSLO 601</p>
                                    <div className="related-price">
                                        <p>799,000₫</p>
                                    </div>  
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}



