import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect, Route, Switch } from "react-router-dom";
import ManageAdmin from "../containers/System/Admin/ManageAdmin";
import ManageCustomer from "../containers/System/Admin/ManageCustomer";
import ManageTechnology from "../containers/System/Technology/ManageTechnology";
import ManageProduct from "../containers/System/Product/ManageProduct";
import ManageProject from "../containers/System/Project/ManageProject";
import ManagePosts from "../containers/System/Posts/ManagePosts";
import Header from "../containers/Header/Header";
class System extends Component {
  render() {
    const { systemMenuPath, isLoggedIn } = this.props;
    return (
      <>
        {isLoggedIn && <Header />}
        <div className="system-container">
          <div className="system-list">
            <Switch>
              <Route path="/system/manage-admin" component={ManageAdmin} />
              <Route
                path="/system/manage-customer"
                component={ManageCustomer}
              />
              <Route
                path="/system/manage-technology"
                component={ManageTechnology}
              />
              <Route
                path="/system/manage-technology"
                component={ManageTechnology}
              />
              <Route path="/system/manage-product" component={ManageProduct} />
              <Route path="/system/manage-project" component={ManageProject} />
              <Route path="/system/manage-posts" component={ManagePosts} />
              {/* <Route
                component={() => {
                  return <Redirect to={ManageAdmin} />;
                }}
              /> */}
            </Switch>
          </div>
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    systemMenuPath: state.app.systemMenuPath,
    isLoggedIn: state.user.isLoggedIn,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(System);
