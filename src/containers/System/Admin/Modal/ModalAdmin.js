import React, { Component } from "react";
import { connect } from "react-redux";
import "./ModalAdmin.scss";
import { LANGUAGES, CRUD_ACTIONS } from "../../../../utils";
import { FormattedMessage } from "react-intl";
import _ from "lodash";
import * as actions from "../../../../store/actions";
import { Modal } from "reactstrap";
import { toast } from "react-toastify";

class ModalAdmin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      roleArr: [],
      email: "",
      password: "",
      firstName: "",
      lastName: "",
      phoneNumber: "",
      address: "",
      role: "",
    };
  }

  async componentDidMount() {
    await this.props.fetchRoleStart();
  }

  async componentDidUpdate(prevProps, prevState) {
    if (prevProps.roleRedux !== this.props.roleRedux) {
      const arrRole = this.props.positionRedux;
      this.setState({
        roleArr: this.props.roleRedux,
        role: arrRole && arrRole.length > 0 ? arrRole[0].keyMap : "",
      });
    }

    if (prevProps.users !== this.props.users) {
      const arrRole = this.props.positionRedux;
      this.setState({
        email: "",
        password: "",
        firstName: "",
        lastName: "",
        phoneNumber: "",
        address: "",
        role: arrRole && arrRole.length > 0 ? arrRole[0].keyMap : "",
        image: "",
      });
    }
  }

  handleOnchangeInput = (event, id) => {
    const copyState = { ...this.state };
    copyState[id] = event.target.value;
    this.setState({
      ...copyState,
    });
  };

  checkValidateInput = () => {
    let isValid = true;
    const arrCheck = [
      "email",
      "password",
      "firstName",
      "lastName",
      "phoneNumber",
      "address",
    ];

    for (let i = 0; i < arrCheck.length; i++) {
      if (!this.state[arrCheck[i]]) {
        isValid = false;
        alert("Missing input: " + arrCheck[i]);
        break;
      }
    }

    return isValid;
  };

  handleSubmit = () => {
    const isValid = this.checkValidateInput();
    if (!isValid) return;

    this.props.createNewUser({
      email: this.state.email,
      password: this.state.password,
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      address: this.state.address,
      phoneNumber: this.state.phoneNumber,
      roleId: this.state.role,
    });

    setTimeout(() => {
      this.props.fetchAllUsersStart();
      this.props.toggleModal();
      toast.success("CREATE NEW A USER SUCCESS!");
    }, 1000);
  };

  render() {
    const { isOpenModal, toggleModal, language } = this.props;
    const {
      roleArr,
      email,
      password,
      firstName,
      lastName,
      phoneNumber,
      address,
      role,
    } = this.state;

    return (
      <Modal isOpen={isOpenModal} toggle={toggleModal} size="xl" centered>
        <div className="modal-header ">
          <span className="left">THÊM NGƯỜI DÙNG</span>
          <span className="right" onClick={toggleModal}>
            <i className="fas fa-times"></i>
          </span>
        </div>
        <div className="add-new-project row p-3">
          <div className="col-3">
            <label>
              <FormattedMessage id="manager-user.email" />
            </label>
            <input
              type="email"
              className="form-control"
              value={email}
              onChange={(event) => this.handleOnchangeInput(event, "email")}
              disabled={this.state.action === CRUD_ACTIONS.EDIT ? true : false}
            />
          </div>
          <div className="col-3">
            <label>
              <FormattedMessage id="manager-user.password" />
            </label>
            <input
              type="password"
              className="form-control"
              value={password}
              onChange={(event) => this.handleOnchangeInput(event, "password")}
              disabled={this.state.action === CRUD_ACTIONS.EDIT ? true : false}
            />
          </div>
          <div className="col-3">
            <label>
              <FormattedMessage id="manager-user.first-name" />
            </label>
            <input
              type="text"
              className="form-control"
              value={firstName}
              onChange={(event) => this.handleOnchangeInput(event, "firstName")}
            />
          </div>
          <div className="col-3">
            <label>
              <FormattedMessage id="manager-user.last-name" />
            </label>
            <input
              type="text "
              className="form-control"
              value={lastName}
              onChange={(event) => this.handleOnchangeInput(event, "lastName")}
            />
          </div>
          <div className="col-3">
            <label>
              <FormattedMessage id="manager-user.phone-number" />
            </label>
            <input
              type="text "
              className="form-control"
              value={phoneNumber}
              onChange={(event) =>
                this.handleOnchangeInput(event, "phoneNumber")
              }
            />
          </div>
          <div className="col-6">
            <label>
              <FormattedMessage id="manager-user.address" />
            </label>
            <input
              type="text "
              className="form-control"
              value={address}
              onChange={(event) => this.handleOnchangeInput(event, "address")}
            />
          </div>
          <div className="col-3">
            <label>
              <FormattedMessage id="manager-user.role" />
            </label>
            <select
              className="form-control"
              onChange={(event) => this.handleOnchangeInput(event, "role")}
              value={role}
            >
              {roleArr &&
                roleArr.length > 0 &&
                roleArr.map((item, index) => {
                  return (
                    <option key={index} value={item.keyMap}>
                      {language === LANGUAGES.VI ? item.valueVi : item.valueEn}
                    </option>
                  );
                })}
            </select>
          </div>
          <div className="col-12 my-3">
            <button
              className={
                this.state.action === CRUD_ACTIONS.EDIT
                  ? "btn-warning btn-lg"
                  : "btn-primary btn-lg"
              }
              onClick={() => {
                this.handleSubmit();
              }}
            >
              {this.state.action === CRUD_ACTIONS.EDIT ? (
                <FormattedMessage id="manager-user.edit" />
              ) : (
                <FormattedMessage id="manager-user.submit" />
              )}
            </button>
          </div>
        </div>
      </Modal>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,

    users: state.admin.users,
    roleRedux: state.admin.roles,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchRoleStart: () => {
      dispatch(actions.fetchRoleStart());
    },
    createNewUser: (data) => {
      dispatch(actions.createNewUser(data));
    },
    fetchAllUsersStart: () => dispatch(actions.fetchAllUsersStart()),
    editAUser: (data) => {
      dispatch(actions.editAUser(data));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalAdmin);
