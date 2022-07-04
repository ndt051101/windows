import React, { Component } from "react";
import { connect } from "react-redux";
import "./ModalProduct.scss";
import { LANGUAGES, CRUD_ACTIONS, CommonUtils } from "../../../../utils";
import { FormattedMessage } from "react-intl";
import _ from "lodash";
import * as actions from "../../../../store/actions";
import { Modal } from "reactstrap";
import MarkdownIt from "markdown-it";
import MdEditor from "react-markdown-editor-lite";
import { toast } from "react-toastify";
import { createNewProduct } from "../../../../services/userService";
import moment from "moment";
import localization from "moment/locale/vi";

const mdParser = new MarkdownIt();

class ModalProduct extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      note: "",
      imageBase64: "",
      descriptionHTML: "",
      descriptionMarkdown: "",
      propertyArr: [],
      property: "",
    };
  }

  async componentDidMount() {
    await this.props.fetchAllTechnology();
  }

  async componentDidUpdate(prevProps, prevState) {
    if (prevProps.allTechnology !== this.props.allTechnology) {
      this.setState({
        propertyArr: this.props.allTechnology,
      });
    }
  }

  handleOnchangeInput = (event, id) => {
    const copyState = { ...this.state };
    copyState[id] = event.target.value;
    this.setState(
      {
        ...copyState,
      },
      () => {
        console.log("Check Data: ", this.state);
      }
    );
  };

  handleEditorChange = ({ html, text }) => {
    this.setState({
      descriptionHTML: html,
      descriptionMarkdown: text,
    });
  };

  handleOnchangeImage = async (event) => {
    const data = event.target.files;
    console.log("Data: ", data);
    const file = data[0];
    console.log("File: ", file);
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
      "property",
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

  handleSaveProduct = async () => {
    const isValid = this.checkValidateInput();
    if (!isValid) return;

    const res = await createNewProduct({
      name: this.state.name,
      note: this.state.note,
      imageBase64: this.state.imageBase64,
      descriptionHTML: this.state.descriptionHTML,
      descriptionMarkdown: this.state.descriptionMarkdown,
      property: this.state.property,
    });
    if (res && res.errCode === 0) {
      setTimeout(() => {
        toast.success("CREATE PRODUCT SUCCESS!");
        this.props.fetchAllProduct();
        this.props.toggleModal();
      }, 1000);

      this.setState({
        name: "",
        note: "",
        imageBase64: "",
        descriptionHTML: "",
        descriptionMarkdown: "",
        property: "",
      });
    } else {
      toast.error("CREATE PRODUCT FAILED!");
      console.log("Create New Product: ", res);
    }
  };

  render() {
    const { isOpenModal, toggleModal } = this.props;
    const { name, note, descriptionMarkdown, property, propertyArr } =
      this.state;

    return (
      <Modal isOpen={isOpenModal} toggle={toggleModal} size="xl" centered>
        <div className="modal-header ">
          <span className="left">THÊM SẢN PHẨM</span>
          <span className="right" onClick={toggleModal}>
            <i className="fas fa-times"></i>
          </span>
        </div>
        <div className="add-new-project row p-3">
          <div className="col-3 form-group">
            <label>Tên sản phẩm</label>
            <input
              type="text"
              className="form-control"
              value={name}
              onChange={(event) => this.handleOnchangeInput(event, "name")}
            />
          </div>
          <div className="col-3 form-group">
            <label>Ảnh</label>
            <input
              type="file"
              className="form-control"
              onChange={(event) => this.handleOnchangeImage(event)}
            />
          </div>
          <div className="col-3 form-group">
            <label>Mô tả sản phẩm</label>
            <input
              type="text"
              className="form-control"
              value={note}
              onChange={(event) => this.handleOnchangeInput(event, "note")}
            />
          </div>
          <div className="col-3 form-group">
            <label>Công nghệ sử dụng</label>
            <select
              className="form-control"
              onChange={(event) => this.handleOnchangeInput(event, "property")}
              value={property}
            >
              {propertyArr &&
                propertyArr.length > 0 &&
                propertyArr.map((item, index) => {
                  return (
                    <option key={item.id} value={item.id}>
                      {item.name}
                    </option>
                  );
                })}
            </select>
          </div>
          <div className="col-12 form-group my-4">
            <MdEditor
              style={{ height: "500px" }}
              renderHTML={(text) => mdParser.render(text)}
              onChange={this.handleEditorChange}
              value={descriptionMarkdown}
            />
          </div>
          <div className="col-12 my-4">
            <button
              className="btn-lg btn-primary"
              onClick={() => this.handleSaveProduct()}
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
    allTechnology: state.admin.allTechnology,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchAllTechnology: () => {
      dispatch(actions.fetchAllTechnology());
    },
    fetchAllProduct: () => {
      dispatch(actions.fetchAllProduct());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalProduct);
