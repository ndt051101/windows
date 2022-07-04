import React, { useState } from "react";
import { connect } from "react-redux";
import "./Banner.scss";
import { FormattedMessage } from "react-intl";
import { LANGUAGES } from "../../../utils/constant";
import { withRouter } from "react-router";
import Slider from "react-slick";
import banner1 from "../../../assets/images/banner01.jpg";
import banner2 from "../../../assets/images/banner02.jpg";
import banner3 from "../../../assets/images/banner03.jpg";
import banner4 from "../../../assets/images/d2.jpg";
import banner5 from "../../../assets/images/d3.jpg";

const Banner = (props) => {
  const settings = {
    dots: true,
    infinite: true,
    arrows: false,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    pauseOnHover: true,
  };
  return (
    <div className="banner-container">
      <Slider {...settings}>
        <div className="banner-img">
          <img src={banner1} alt="banner" />
        </div>
        <div className="banner-img">
          <img src={banner2} alt="banner" />
        </div>
        <div className="banner-img">
          <img src={banner3} alt="banner" />
        </div>
        <div className="banner-img">
          <img src={banner4} alt="banner" />
        </div>
        <div className="banner-img">
          <img src={banner5} alt="banner" />
        </div>
      </Slider>
    </div>
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Banner));
