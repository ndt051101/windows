import React, { Component }from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import { LANGUAGES, CRUD_ACTIONS } from "../../../utils/constant";
import * as actions from "../../../store/actions";
import "./ManageCustomer.scss";

class ManageCustomer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      arrCustomers: [],
    };
  }
  componentDidMount() {
    this.props.fetchAllCustomersStart();
  }

  componentDidUpdate = (prevProps, prevState) => {
    if (prevProps.customers !== this.props.customers) {
      this.setState({
        arrCustomers: this.props.customers,
      });
    }

    
  };

  handleDeleteUser = (user) => {
    this.props.deleteAUser(user.id);
  };

  render() {
    const { arrCustomers } = this.state;
    console.log("ArrCustomers: ", arrCustomers);
    return (
      <div className="manager-customer-container">
        <div className="title">
          <FormattedMessage id="admin.manager-customer.title" />
        </div>
        <div className="container">
          <div className="row my-5">
            <div className="col-12">
              <table id="TableManagerUser">
                <tbody>
                  <tr>
                    <th>Email</th>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Address</th>
                    <th>Actions</th>
                  </tr>
                  {arrCustomers && arrCustomers.length > 0 ? (
                    arrCustomers.map((item, index) => {
                      return (
                        <tr key={index}>
                          <td>{item.email}</td>
                          <td>{item.firstName}</td>
                          <td>{item.lastName}</td>
                          <td>{item.address}</td>
                          <td>
                            <button
                              onClick={() => this.handleDeleteUser(item)}
                              className="btn-delete"
                            >
                              <i className="fas fa-trash"></i>
                            </button>
                          </td>
                        </tr>
                      );
                    })
                  ) : (
                    <tr>
                      <td colSpan="5" className="text-center">
                        Không có{" "}
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
    customers: state.admin.customers,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchAllCustomersStart: () => dispatch(actions.fetchAllCustomersStart()),
    deleteAUser: (id) => dispatch(actions.deleteAUser(id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageCustomer);
