import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../../store/actions";
import { LANGUAGES, CRUD_ACTIONS } from "../../../utils";
import "./ManageTechnology.scss";
import { FormattedMessage } from "react-intl";
import ModalTechnology from "./Modal/ModalTechnology";
import ModalEditTechnology from "./Modal/ModalEditTechnology";

class ManageTechnology extends Component {
  constructor(props) {
    super(props);
    this.state = {
      arrTechnology: [],
      isOpenModal: false,
      isOpenEditModal: false,
      technologyEdit: {},
    };
  }

  componentDidMount() {
    this.props.fetchAllTechnology();
  }

  async componentDidUpdate(prevProps, prevState) {
    if (prevProps.technology !== this.props.technology) {
      this.setState({
        arrTechnology: this.props.technology,
      });
    }
  }

  toggleModal = () => {
    this.setState({
      isOpenModal: !this.state.isOpenModal,
    });
  };
  toggleEditModal = () => {
    this.setState({
      isOpenEditModal: !this.state.isOpenEditModal,
    });
  };

  editTechnology = (technology) => {
    this.setState({
      isOpenEditModal: true,
      technologyEdit: technology,
    });
  };

  handleEditModal = (technology) => {
    this.props.editATechnology(technology);
    this.setState({
      isOpenEditModal: false,
    });
  }

  handleDelete = (technology) => {
    this.props.deleteATechnology(technology.id);
  };

  render() {
    const { arrTechnology, isOpenModal, technologyEdit, isOpenEditModal } =
      this.state;
    return (
      <div className="manage-technology-container">
        <button className="btn-success btn-lg my-3" onClick={this.toggleModal}>
          THÊM CÔNG NGHỆ
        </button>
        <div className="ms-title">Quản lí công nghệ</div>
        <ModalTechnology
          isOpenModal={isOpenModal}
          toggleModal={this.toggleModal}
        />
        {isOpenEditModal && (
          <ModalEditTechnology
            isOpenEditModal={isOpenEditModal}
            technologyEdit={technologyEdit}
            toggleEditModal={this.toggleEditModal}
            handleEditModal={this.handleEditModal}
          />
        )}

        <div className="manage-project-body">
          <div className="row">
            <div className="col-12">
              <table id="TableManagerUser">
                <tbody>
                  <tr>
                    <th>Tên bài viết</th>
                    <th>Actions</th>
                  </tr>
                  {arrTechnology && arrTechnology.length > 0 ? (
                    arrTechnology.map((item, index) => {
                      return (
                        <tr key={index}>
                          <td>{item.name}</td>
                          <td>
                            <button
                              onClick={() => this.editTechnology(item)}
                              className="btn-edit"
                            >
                              <i className="fas fa-pencil-alt"></i>
                            </button>
                            <button
                              onClick={() => this.handleDelete(item)}
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
    technology: state.admin.allTechnology,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchAllTechnology: () => dispatch(actions.fetchAllTechnology()),
    editATechnology: (data) => {
      dispatch(actions.editATechnology(data));
    },
    deleteATechnology: (id) => dispatch(actions.deleteATechnology(id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageTechnology);
