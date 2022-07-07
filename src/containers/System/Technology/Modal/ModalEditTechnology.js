import React, { Component } from "react";
import { connect } from "react-redux";
import "./ModalEditTechnology.scss";
import { CommonUtils } from "../../../../utils";
import * as actions from "../../../../store/actions";
import { Modal } from "reactstrap";
import _ from "lodash";
import { toast } from "react-toastify";

class ModalEditTechnology extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            imageBase64: "",
            description: "",
        };
    }

    async componentDidMount() {
        const { technologyEdit } = this.props;
        if (technologyEdit && !_.isEmpty(technologyEdit)) {
            this.setState({
                id: technologyEdit.id,
                name: technologyEdit.name,
                imageBase64: technologyEdit.image,
                description: technologyEdit.description,
            });
        }
    }

    async componentDidUpdate(prevProps, prevState) {}

    handleOnChangeInput = (event, id) => {
        const copyState = { ...this.state };
        copyState[id] = event.target.value;
        this.setState({ ...copyState });
    };

    handleOnchangeImage = async (event) => {
        const data = event.target.files;
        const file = data[0];
        if (file) {
            const base64 = await CommonUtils.getBase64(file);
            this.setState({
                imageBase64: base64,
            });
        }
    };

    checkValidateInput = () => {
        let isValid = true;
        const arrCheck = ["name", "description", "imageBase64"];

        for (let i = 0; i < arrCheck.length; i++) {
            if (!this.state[arrCheck[i]]) {
                isValid = false;
                toast.error("Missing input: " + arrCheck[i]);
                break;
            }
        }

        return isValid;
    };

    handleSaveTechnology = () => {
        const isValid = this.checkValidateInput();
        if (!isValid) return;

        this.props.handleEditModal(this.state);
    };

    render() {
        const { isOpenEditModal, toggleEditModal } = this.props;
        const { name, description } = this.state;

        return (
            <Modal
                isOpen={isOpenEditModal}
                toggle={toggleEditModal}
                size="xl"
                centered
            >
                <div className="modal-header ">
                    <span className="left">SỬA CÔNG NGHỆ</span>
                    <span className="right" onClick={toggleEditModal}>
                        <i className="fas fa-times"></i>
                    </span>
                </div>
                <div className="add-new-technology row p-3">
                    <div className="col-6 form-group">
                        <label>Tên công nghệ</label>
                        <input
                            type="text"
                            className="form-control"
                            value={name}
                            onChange={(event) =>
                                this.handleOnChangeInput(event, "name")
                            }
                        />
                    </div>
                    <div className="col-6 form-group">
                        <label>Ảnh</label>
                        <input
                            type="file"
                            className="form-control"
                            onChange={(event) =>
                                this.handleOnchangeImage(event)
                            }
                        />
                    </div>
                    <div className="md-form col-12">
                        <label>Mô tả công nghệ</label>
                        <textarea
                            type="text"
                            className="form-control md-textarea"
                            onChange={(event) =>
                                this.handleOnChangeInput(event, "description")
                            }
                            value={description}
                            rows={5}
                        ></textarea>
                    </div>

                    <div className="col-12 my-1">
                        <button
                            className="btn-primary btn-lg"
                            onClick={() => this.handleSaveTechnology()}
                        >
                            Save
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
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetchAllTechnology: () => dispatch(actions.fetchAllTechnology()),
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ModalEditTechnology);
