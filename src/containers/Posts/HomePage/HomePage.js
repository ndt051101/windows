import React from "react";
import { connect } from "react-redux";
import HomeHeader from "./HomeHeader";
import Banner from "./Section/Banner";
import OutstandingTechnology from "./Section/OutstandingTechnology";
import Products from "./Section/Products";
import Projects from "./Section/Projects";
import Posts from "./Section/Posts";
import About from "./Section/About";
import HomeFooter from "./HomeFooter";

import "./HomePage.scss";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const HomePage = (props) => {
  return (
    <div id="home">
      <HomeHeader />
      <Banner />
      <OutstandingTechnology />
      <Products />
      <Projects />
      <Posts />
      <About />
      <HomeFooter />
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.user.isLoggedIn,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
