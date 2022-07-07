import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../../store/actions";
import { CRUD_ACTIONS } from "../../../utils";
import "./ManageProject.scss";
import ModalProject from "./Modal/ModalProject";
import ModalEditProject from "./Modal/ModalEditProject";

class ManageProject extends Component {
    constructor(props) {
        super(props);
        this.state = {
            arrProject: [],
            isOpenModal: false,
            isOpenEditModal: false,
            projectEdit: {},
        };
    }

    async componentDidMount() {
        this.props.fetchAllProject();
    }

    async componentDidUpdate(prevProps, prevState) {
        if (prevProps.project !== this.props.project) {
            this.setState({
                arrProject: this.props.project,
            });
        }
        if (prevProps.project !== this.props.project) {
            this.setState({
                name: "",
                note: "",
                imageBase64: "",
                descriptionHTML: "",
                descriptionMarkdown: "",
                action: CRUD_ACTIONS.CREATE,
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

    editProject = (project) => {
        this.setState({
            isOpenEditModal: true,
            projectEdit: project,
        });
    };

    handleEditModal = (project) => {
        this.props.editAProject(project);
        this.setState({
            isOpenEditModal: false,
        });
    };

    handleDelete = (project) => {
        this.props.deleteAProject(project.id);
    };

    render() {
        const { arrProject, isOpenModal, isOpenEditModal, projectEdit } =
            this.state;
        return (
            <div className="manage-project-container">
                <button
                    className="btn-success btn-lg my-3"
                    onClick={this.toggleModal}
                >
                    THÊM DỰ ÁN
                </button>
                <div className="ms-title">Quản lí dự án</div>
                <ModalProject
                    isOpenModal={isOpenModal}
                    toggleModal={this.toggleModal}
                />
                {isOpenEditModal && (
                    <ModalEditProject
                        isOpenEditModal={isOpenEditModal}
                        projectEdit={projectEdit}
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
                                    {arrProject && arrProject.length > 0 ? (
                                        arrProject.map((item, index) => {
                                            return (
                                                <tr key={index}>
                                                    <td>{item.name}</td>
                                                    <td>
                                                        <button
                                                            onClick={() =>
                                                                this.editProject(
                                                                    item
                                                                )
                                                            }
                                                            className="btn-edit"
                                                        >
                                                            <i className="fas fa-pencil-alt"></i>
                                                        </button>
                                                        <button
                                                            onClick={() =>
                                                                this.handleDelete(
                                                                    item
                                                                )
                                                            }
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
                                            <td
                                                colSpan="5"
                                                className="text-center"
                                            >
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
        project: state.admin.project,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetchAllProject: () => dispatch(actions.fetchAllProject()),
        editAProject: (data) => {
            dispatch(actions.editAProject(data));
        },
        deleteAProject: (id) => dispatch(actions.deleteAProject(id)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageProject);
