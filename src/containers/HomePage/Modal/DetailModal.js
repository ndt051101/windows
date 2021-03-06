import React, { Component } from "react";
import { connect } from "react-redux";
import "./DetailModal.scss";
import { Modal } from "reactstrap";
import { postCustomerBookAppointment } from "../../../services/userService";
import { toast } from "react-toastify";

class DetailModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fullName: "",
            phoneNumber: "",
            email: "",
            description: "",
        };
    }

    async componentDidMount() {}

    async componentDidUpdate(prevProps, prevState) {}

    handleOnChangeInput = (event, id) => {
        const valueInput = event.target.value;
        const stateCopy = { ...this.state };
        stateCopy[id] = valueInput;
        this.setState({ ...stateCopy });
    };

    handleConfirm = async () => {
        const res = await postCustomerBookAppointment({
            fullName: this.state.fullName,
            phoneNumber: this.state.phoneNumber,
            email: this.state.email,
            description: this.state.description,
        });
        if (res && res.errCode === 0) {
            toast.success("SUCCESS!");
            this.props.toggleModal();
        } else {
            toast.error("FAILED!");
        }
        console.log("confirm", this.state);
    };

    render() {
        const { isOpenModal, toggleModal } = this.props;
        const { fullName, phoneNumber, email, description } = this.state;

        return (
            <Modal
                isOpen={isOpenModal}
                toggle={toggleModal}
                size="xl"
                className={"modal-container"}
                centered
            >
                <div className="modal-content">
                    <div className="modal-header">
                        <span className="left">Request to Quote</span>
                        <span className="right" onClick={toggleModal}>
                            <i className="fas fa-times"></i>
                        </span>
                    </div>
                    <div className="modal-body">
                        <div className="row">
                            <div className="col-12 form-group">
                                <label>Full Name</label>
                                <input
                                    type="text"
                                    placeholder=""
                                    className="form-control form-control-lg"
                                    value={fullName}
                                    onChange={(event) =>
                                        this.handleOnChangeInput(
                                            event,
                                            "fullName"
                                        )
                                    }
                                />
                            </div>
                            <div className="col-12 form-group">
                                <label>Phone Number</label>

                                <input
                                    type="text"
                                    className="form-control form-control-lg"
                                    value={phoneNumber}
                                    onChange={(event) =>
                                        this.handleOnChangeInput(
                                            event,
                                            "phoneNumber"
                                        )
                                    }
                                />
                            </div>
                            <div className="col-12 form-group">
                                <label>Email</label>
                                <input
                                    type="text"
                                    placeholder=""
                                    className="form-control form-control-lg"
                                    value={email}
                                    onChange={(event) =>
                                        this.handleOnChangeInput(event, "email")
                                    }
                                />
                            </div>
                            <div className="col-12 form-group">
                                <label>Description</label>
                                <textarea
                                    type="text"
                                    placeholder=""
                                    className="form-control form-control-lg"
                                    value={description}
                                    onChange={(event) =>
                                        this.handleOnChangeInput(
                                            event,
                                            "description"
                                        )
                                    }
                                    rows="3"
                                ></textarea>
                            </div>
                        </div>
                    </div>
                    <div className="modal-footer">
                        <button
                            className="btn-primary btn-lg"
                            onClick={() => this.handleConfirm()}
                        >
                            Confirm
                        </button>
                        <button
                            className="btn-danger btn-lg"
                            onClick={toggleModal}
                        >
                            Cancel
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
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(DetailModal);
