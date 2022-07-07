import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";
import "./Technology.scss";
import Header from "../../HomePage/HomeHeader";
import Slider from "react-slick";
import {
    getAllProduct,
    getDetailTechnologyById,
    getProductByTechnologyId,
    getTwoPosts,
    getTwoTechnology,
} from "../../../services/userService";
import { Link } from "react-router-dom";
import _ from "lodash";

const Technology = () => {
    const { id } = useParams();
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
    const [arrDetailTechnology, setArrDetailTechnology] = useState([]);
    const [arrProductByTechnologyId, setArrProductByTechnologyId] = useState(
        []
    );
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
    useEffect(() => {
        (async () => {
            try {
                const response = await getDetailTechnologyById(id);
                const res = await getProductByTechnologyId(id);
                if (response && response.errCode === 0) {
                    setArrDetailTechnology(response.data);
                }
                if (res && res.errCode === 0) {
                    setArrProductByTechnologyId(res.data);
                }
            } catch (error) {
                console.log(error.message);
            }
        })();
    }, [id]);
    return (
        <>
            <Header />
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
                    <div className="inner-content">
                        <div className="innertop">
                            <span>{arrDetailTechnology.name}</span>
                            <p>{arrDetailTechnology.description}</p>
                        </div>
                        <div className="product-content">
                            <ul>
                                {arrProductByTechnologyId &&
                                    arrProductByTechnologyId.length > 0 &&
                                    arrProductByTechnologyId.map(
                                        (item, index) => {
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
                                                        <div className="title">
                                                            <span>
                                                                {item.name}
                                                            </span>
                                                        </div>
                                                        <div className="desc">
                                                            <span>
                                                                {item.note}
                                                            </span>
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
                                        }
                                    )}
                            </ul>
                        </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(Technology);
