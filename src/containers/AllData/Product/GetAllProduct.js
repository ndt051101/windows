import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import "./GetAllProduct.scss";
import Header from "../../HomePage/HomeHeader";
import Slider from "react-slick";
import {
    getAllProduct,
    getTwoPosts,
    getTwoTechnology,
} from "../../../services/userService";
import { Link } from "react-router-dom";

const GetAllProduct = () => {
    const settings = {
        dots: false,
        infinite: true,
        arrows: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2000,
        pauseOnHover: true,
    };

    const [arrProduct, setArrProduct] = useState([]);
    const [arrTechnology, setArrTechnology] = useState([]);
    const [arrPosts, setArrPosts] = useState([]);

    useEffect(() => {
        (async () => {
            try {
                const resTech = await getTwoTechnology();
                const resPro = await getAllProduct();
                const resPost = await getTwoPosts();
                setArrTechnology(resTech.data);
                setArrProduct(resPro.data);
                setArrPosts(resPost.data);
            } catch (error) {
                console.log(error.message);
            }
        })();
    }, []);
    return (
        <>
            <Header isOpenNavBar={false} />
            <div className="inner">
                <div className="inner-l">
                    <div className="inner-technology">
                        <div className="inner-title">
                            <span>Công nghệ mới</span>
                        </div>
                        <div className="inner-content">
                            <ul>
                                {arrTechnology &&
                                    arrTechnology.length > 0 &&
                                    arrTechnology.map((item, index) => {
                                        return (
                                            <li key={item.id}>
                                                <Link
                                                    className="technology-title"
                                                    to={`/detail-technology/${item.id}`}
                                                >
                                                    <span>{item.name}</span>
                                                </Link>
                                            </li>
                                        );
                                    })}
                            </ul>
                        </div>
                    </div>
                    <div className="inner-product">
                        <div className="inner-title">
                            <span>Sản phẩm mới</span>
                        </div>
                        <div className="inner-content">
                            <Slider {...settings}>
                                {arrProduct &&
                                    arrProduct.length > 0 &&
                                    arrProduct.map((item, index) => {
                                        return (
                                            <div className="img" key={item.id}>
                                                <Link
                                                    className="product-border"
                                                    to={`/detail-product/${item.id}`}
                                                >
                                                    <img
                                                        src={item.image}
                                                        alt={item.name}
                                                    />
                                                    <div className="products-desc">
                                                        <p>{item.name}</p>
                                                    </div>
                                                </Link>
                                            </div>
                                        );
                                    })}
                            </Slider>
                        </div>
                    </div>
                    <div className="inner-posts">
                        <div className="inner-title">
                            <span>Bài viết mới</span>
                        </div>
                        <div className="inner-content">
                            <ul>
                                {arrPosts &&
                                    arrPosts.length > 0 &&
                                    arrPosts.map((item, index) => {
                                        return (
                                            <li key={item.id}>
                                                <Link
                                                    className="posts-title"
                                                    to={`/detail-posts/${item.id}`}
                                                >
                                                    <span>{item.name}</span>
                                                </Link>
                                            </li>
                                        );
                                    })}
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="inner-r">
                    <div className="inner-title">
                        <span>Products</span>
                    </div>
                    <div className="inner-content">
                        <ul>
                            {arrProduct &&
                                arrProduct.length > 0 &&
                                arrProduct.map((item, index) => {
                                    return (
                                        <li>
                                            <div className="content-left">
                                                <Link
                                                    className="image"
                                                    to={`/detail-product/${item.id}`}
                                                >
                                                    <img
                                                        src={item.image}
                                                        alt={item.name}
                                                    />
                                                </Link>
                                            </div>
                                            <div className="content-right">
                                                <Link
                                                    className="title"
                                                    to={`/detail-product/${item.id}`}
                                                >
                                                    <span>{item.name}</span>
                                                </Link>
                                                <div className="desc">
                                                    <span>{item.note}</span>
                                                </div>
                                                <Link
                                                    className="btn-primary btn-md p-3 btn-click"
                                                    to={`/detail-product/${item.id}`}
                                                >
                                                    Learn more
                                                </Link>
                                            </div>
                                        </li>
                                    );
                                })}
                        </ul>
                    </div>
                </div>
            </div>
        </>
    );
};

const mapStateToProps = (state) => {
    return {
        language: state.app.language,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(GetAllProduct);
