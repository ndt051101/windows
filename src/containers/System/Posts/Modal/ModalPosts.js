import React, { Component } from "react";
import { connect } from "react-redux";
import "./ModalPosts.scss";
import { CommonUtils } from "../../../../utils";
import * as actions from "../../../../store/actions";
import { createNewPosts } from "../../../../services/userService";
import { Modal } from "reactstrap";
import MarkdownIt from "markdown-it";
import MdEditor from "react-markdown-editor-lite";
import { toast } from "react-toastify";

const mdParser = new MarkdownIt();

class ModalPosts extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            note: "",
            imageBase64: "",
            descriptionHTML: "",
            descriptionMarkdown: "",
        };
    }

    async componentDidMount() {}

    async componentDidUpdate(prevProps, prevState) {}

    handleOnChangeInput = (event, id) => {
        const copyState = { ...this.state };
        copyState[id] = event.target.value;
        this.setState({ ...copyState });
    };

    handleEditorChange = ({ html, text }) => {
        this.setState({
            descriptionHTML: html,
            descriptionMarkdown: text,
        });
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
        const arrCheck = [
            "name",
            "note",
            "imageBase64",
            "descriptionHTML",
            "descriptionMarkdown",
        ];

        for (let i = 0; i < arrCheck.length; i++) {
            if (!this.state[arrCheck[i]]) {
                isValid = false;
                toast.error("Missing input: " + arrCheck[i]);
                break;
            }
        }

        return isValid;
    };

    handleSavePosts = async () => {
        const isValid = this.checkValidateInput();
        if (!isValid) return;

        const res = await createNewPosts({
            name: this.state.name,
            note: this.state.note,
            imageBase64: this.state.imageBase64,
            descriptionHTML: this.state.descriptionHTML,
            descriptionMarkdown: this.state.descriptionMarkdown,
        });
        if (res && res.errCode === 0) {
            setTimeout(() => {
                toast.success("CREATE POSTS SUCCESS!");
                this.props.fetchAllPosts();
                this.props.toggleModal();
            }, 1000);

            this.setState({
                name: "",
                note: "",
                imageBase64: "",
                descriptionHTML: "",
                descriptionMarkdown: "",
            });
        } else {
            toast.error("FAILED!");
            console.log("Create New Posts: ", res);
        }
    };

    render() {
        const { isOpenModal, toggleModal } = this.props;
        const { name, note, descriptionMarkdown } = this.state;

        return (
            <Modal isOpen={isOpenModal} toggle={toggleModal} size="xl" centered>
                <div className="modal-header ">
                    <span className="left">TH??M D??? ??N</span>
                    <span className="right" onClick={toggleModal}>
                        <i className="fas fa-times"></i>
                    </span>
                </div>
                <div className="add-new-posts row p-3">
                    <div className="col-6 form-group">
                        <label>T??n b??i vi???t</label>
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
                        <label>???nh</label>
                        <input
                            type="file"
                            className="form-control"
                            onChange={(event) =>
                                this.handleOnchangeImage(event)
                            }
                        />
                    </div>
                    <div className="md-form col-12">
                        <label>M?? t???</label>
                        <textarea
                            type="text"
                            className="form-control md-textarea"
                            onChange={(event) =>
                                this.handleOnChangeInput(event, "note")
                            }
                            value={note}
                            rows={5}
                        ></textarea>
                    </div>

                    <div className="col-12 form-group my-4">
                        <MdEditor
                            style={{ height: "500px" }}
                            renderHTML={(text) => mdParser.render(text)}
                            onChange={this.handleEditorChange}
                            value={descriptionMarkdown}
                        />
                    </div>

                    <div className="col-12 my-1">
                        <button
                            className="btn-primary btn-lg"
                            onClick={() => this.handleSavePosts()}
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
        fetchAllPosts: () => dispatch(actions.fetchAllPosts()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalPosts);
