import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import { LANGUAGES, USER_ROLE } from "../../../utils/constant";
import * as actions from "../../../store/actions";
import "./TableManagerUser.scss";

class TableManagerUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      usersRedux: [],
    };
  }
  componentDidMount() {
    this.props.fetchAllUsersStart();
  }

  componentDidUpdate = (prevProps, prevState) => {
    if (prevProps.users !== this.props.users) {
      this.setState({
        usersRedux: this.props.users,
      });
    }
  };

  handleDeleteUser = (user) => {
    this.props.deleteAUser(user.id);
  };

  editUser = (user) => {
    this.props.editUser(user);
  };

  render() {
    const arrUsers = this.state.usersRedux;
    return (
      <>
        <table id="TableManagerUser">
          <tbody>
            <tr>
              <th>Email</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Address</th>
              <th>Actions</th>
            </tr>
            {arrUsers && arrUsers.length > 0 ? (
              arrUsers.map((item, index) => {
                return (
                  <tr key={index}>
                    <td>{item.email}</td>
                    <td>{item.firstName}</td>
                    <td>{item.lastName}</td>
                    <td>{item.address}</td>
                    <td>
                      <button
                        onClick={() => this.editUser(item)}
                        className="btn-edit"
                      >
                        <i className="fas fa-pencil-alt"></i>
                      </button>
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
                  Không có
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
    users: state.admin.users,
    userInfo: state.user.userInfo,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchAllUsersStart: () => dispatch(actions.fetchAllUsersStart()),
    deleteAUser: (id) => dispatch(actions.deleteAUser(id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TableManagerUser);
