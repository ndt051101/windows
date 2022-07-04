import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";
import "./GetAllPosts.scss";
import Header from "../../HomePage/HomeHeader";
import Slider from "react-slick";
import { FormattedMessage } from "react-intl";
import {
  getAllProduct,
  getAllPosts,
  getTwoPosts,
  getTwoTechnology,
} from "../../../services/userService";
import { Link } from "react-router-dom";
import _ from "lodash";
import moment from "moment";

const GetAllPosts = (props) => {
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
  const [arrAllPosts, setArrAllPosts] = useState([]);
  const [arrTechnology, setArrTechnology] = useState([]);
  const [arrPosts, setArrPosts] = useState([]);
  useEffect(() => {
    (async () => {
      try {
        const resTech = await getTwoTechnology();
        const resPro = await getAllProduct();
        const resPosts = await getAllPosts();
        const resPost = await getTwoPosts();
        setArrTechnology(resTech.data);
        setArrProduct(resPro.data);
        setArrAllPosts(resPosts.data);
        setArrPosts(resPost.data);
      } catch (error) {
        console.log(error.message);
      }
    })();
  }, []);
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
                          <img src={item.image} alt={item.name} />
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
            <h1>News</h1>
          </div>
          <div className="inner-content">
            <ul>
              {arrAllPosts &&
                arrAllPosts.length > 0 &&
                arrAllPosts.slice(0).reverse().map((item, index) => {
                  return (
                    <li key={item.id}>
                      <div className="news-right">
                        <div className="news-title">
                          <Link
                            className="title"
                            to={`/detail-posts/${item.id}`}
                          >
                            <span>{item.name}</span>
                          </Link>
                        </div>
                        <div className="news-border"></div>
                        <div className="news-desc">
                          {item.note}
                        </div>
                      </div>
                      <div className="news-left">
                        <div className="news-day">
                          {moment(item.createdAt).utc(7).format("DD-MM")}
                        </div>
                        <div className="news-nborder"></div>
                        <div className="news-year">
                          {moment(item.createdAt).utc(7).format("YYYY")}
                        </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(GetAllPosts);
