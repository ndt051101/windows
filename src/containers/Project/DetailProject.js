import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";
import "./DetailProject.scss";
import Header from "../HomePage/HomeHeader";
import Slider from "react-slick";
import {
    getAllProduct,
    getDetailProjectById,
    getTwoPosts,
    getTwoTechnology,
} from "../../services/userService";
import { Link } from "react-router-dom";
import _ from "lodash";

const DetailProject = () => {
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
    const [arrDetailProject, setArrDetailProject] = useState([]);
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
                const response = await getDetailProjectById(id);
                if (response && response.errCode === 0) {
                    setArrDetailProject(response.data);
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
                            <span>C??ng ngh??? m???i</span>
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
                            <span>S???n ph???m m???i</span>
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
                            <span>B??i vi???t m???i</span>
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
                        <div className="inner-detail">
                            <div className="inner-img">
                                <div className="preview">
                                    <span className="jqzoom">
                                        <img
                                            jqimg={arrDetailProject.image}
                                            src={arrDetailProject.image}
                                            alt={arrDetailProject.name}
                                            title={arrDetailProject.name}
                                        />
                                        <div className="jqZoomPup"></div>
                                    </span>
                                </div>
                                <div className="scroll"></div>
                            </div>
                            <div className="inner-overview">
                                <h1>{arrDetailProject.name}</h1>
                                <span>{arrDetailProject.note}</span>
                            </div>
                        </div>

                        <div className="inner-desc">
                            {arrDetailProject && !_.isEmpty(arrDetailProject) && (
                                <div
                                    dangerouslySetInnerHTML={{
                                        __html: arrDetailProject.descriptionHTML,
                                    }}
                                ></div>
                            )}
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

export default connect(mapStateToProps, mapDispatchToProps)(DetailProject);
