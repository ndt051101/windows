import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { Route, Switch } from "react-router-dom";
import { ConnectedRouter as Router } from "connected-react-router";
import { history } from "../redux";
import { ToastContainer } from "react-toastify";
import {
    userIsAuthenticated,
    userIsNotAuthenticated,
} from "../hoc/authentication";
import { path } from "../utils";
import Home from "../routes/Home";
import Login from "./Auth/Login";
import System from "../routes/System";
import CustomScrollbars from "../components/CustomScrollbars";
import HomePage from "./HomePage/HomePage";
import DetailTechnology from "./Technology/DetailTechnology";
import DetailPosts from "./Posts/DetailPosts";
import DetailProduct from "./Product/DetailProduct";
import DetailProject from "./Project/DetailProject";
import GetAllProduct from "./AllData/Product/GetAllProduct";
import GetAllProject from "./AllData/Project/GetAllProject";
import GetAllPosts from "./AllData/Posts/GetAllPosts";
import VerifyEmail from "./Customer/VerifyEmail";

class App extends Component {
    handlePersistorState = () => {
        const { persistor } = this.props;
        let { bootstrapped } = persistor.getState();
        if (bootstrapped) {
            if (this.props.onBeforeLift) {
                Promise.resolve(this.props.onBeforeLift())
                    .then(() => this.setState({ bootstrapped: true }))
                    .catch(() => this.setState({ bootstrapped: true }));
            } else {
                this.setState({ bootstrapped: true });
            }
        }
    };

    componentDidMount() {
        this.handlePersistorState();
    }

    render() {
        return (
            <Fragment>
                <Router history={history}>
                    <div className="main-container">
                        <div className="content-container">
                            <CustomScrollbars
                                style={{ height: "100vh", width: "100%" }}
                            >
                                <Switch>
                                    <Route
                                        path={path.HOME}
                                        exact
                                        component={Home}
                                    />
                                    <Route
                                        path={path.LOGIN}
                                        component={userIsNotAuthenticated(
                                            Login
                                        )}
                                    />
                                    <Route
                                        path={path.SYSTEM}
                                        component={userIsAuthenticated(System)}
                                    />
                                    <Route
                                        path={path.HOMEPAGE}
                                        component={HomePage}
                                    />

                                    <Route
                                        path={path.DETAIL_PRODUCT}
                                        component={DetailProduct}
                                    />

                                    <Route
                                        path={path.DETAIL_TECHNOLOGY}
                                        component={DetailTechnology}
                                    />

                                    <Route
                                        path={path.DETAIL_POSTS}
                                        component={DetailPosts}
                                    />

                                    <Route
                                        path={path.DETAIL_PROJECT}
                                        component={DetailProject}
                                    />

                                    <Route
                                        path={path.GET_ALL_PRODUCT}
                                        component={GetAllProduct}
                                    />

                                    <Route
                                        path={path.GET_ALL_PROJECT}
                                        component={GetAllProject}
                                    />

                                    <Route
                                        path={path.GET_ALL_POSTS}
                                        component={GetAllPosts}
                                    />

                                    <Route
                                        path={path.VERIFY_EMAIL_BOOKING}
                                        component={VerifyEmail}
                                    />
                                </Switch>
                            </CustomScrollbars>
                        </div>

                        {/* <ToastContainer
              className="toast-container"
              toastClassName="toast-item"
              bodyClassName="toast-item-body"
              autoClose={false}
              hideProgressBar={true}
              pauseOnHover={false}
              pauseOnFocusLoss={true}
              closeOnClick={false}
              draggable={false}
              closeButton={<CustomToastCloseButton />}
            /> */}

                        <ToastContainer
                            position="top-right"
                            autoClose={5000}
                            hideProgressBar={false}
                            newestOnTop={false}
                            closeOnClick
                            rtl={false}
                            pauseOnFocusLoss
                            draggable
                            pauseOnHover
                        />
                    </div>
                </Router>
            </Fragment>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        started: state.app.started,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
