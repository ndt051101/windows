import React, { Component } from "react";
import { connect } from "react-redux";
import "./ModalTechnology.scss";
import { CommonUtils } from "../../../../utils";
import * as actions from "../../../../store/actions";
import { Modal } from "reactstrap";
import { createNewTechnology } from "../../../../services/userService";
import { toast } from "react-toastify";

class ModalTechnology extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            imageBase64: "",
            description: "",
        };
    }

    async componentDidMount() {}

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

    handleSaveTechnology = async () => {
        const isValid = this.checkValidateInput();
        if (!isValid) return;

        const res = await createNewTechnology(this.state);
        if (res && res.errCode === 0) {
            setTimeout(() => {
                toast.success("CREATE TECHNOLOGY SUCCESS!");
                this.props.fetchAllTechnology();
                this.props.toggleModal();
            }, 1000);

            this.setState({
                name: "",
                description: "",
                imageBase64: "",
            });
        } else {
            toast.error("CREATE TECHNOLOGY FAILED!");
            console.log("Create New Technology: ", res);
        }
    };

    render() {
        const { isOpenModal, toggleModal } = this.props;
        const { name, description } = this.state;

        return (
            <Modal isOpen={isOpenModal} size="xl" centered toggle={toggleModal}>
                <div className="modal-header ">
                    <span className="left">THÊM CÔNG NGHỆ</span>
                    <span className="right" onClick={toggleModal}>
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

export default connect(mapStateToProps, mapDispatchToProps)(ModalTechnology);
