import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import "./HomeHeader.scss";
import { changeLanguage } from "../../store/actions";

import DetailModal from "./Modal/DetailModal";

const HomeHeader = (props) => {
    const [isOpenModal, setIsOpenModal] = useState(false);

    let history = useHistory();

    const handleFromHome = () => {
        history.push("/home");
    };

    const openModal = () => {
        setIsOpenModal(true);
    };

    const toggleModal = () => {
        setIsOpenModal((prevState) => !prevState);
    };

    return (
        <>
            <div className="home-header-container">
                <div className="home-header-content">
                    <div className="intertophead1">
                        <div className="secai">
                            <li>Tel: +01 23456789</li>
                            <li>
                                E-mail:{" "}
                                <a href="mailto:duytienabc@gmail.com">
                                    duytienabc@gmail.com
                                </a>
                            </li>
                        </div>
                    </div>
                    <div className="intertophead">
                        <div className="content-left">
                            <div
                                className="logo"
                                onClick={handleFromHome}
                            ></div>
                        </div>

                        <div className="content-center">
                            <ul>
                                <li>
                                    <Link className="" to={`/home`}>
                                        Trang chủ
                                    </Link>
                                </li>
                                <li>
                                    <Link className="" to={`/get-all-product/`}>
                                        Sản phẩm
                                    </Link>
                                </li>
                                <li>
                                    <Link className="" to={`/get-all-project/`}>
                                        Dự án
                                    </Link>
                                </li>
                                <li>
                                    <Link className="" to={`/get-all-posts/`}>
                                        Tin tức
                                    </Link>
                                </li>
                            </ul>
                        </div>

                        <div className="content-right">
                            <div onClick={openModal}>Gửi yêu cầu</div>
                        </div>
                    </div>
                </div>
            </div>
            <DetailModal isOpenModal={isOpenModal} toggleModal={toggleModal} />
        </>
    );
};

const mapStateToProps = (state) => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        language: state.app.language,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        changeLanguage: (data) => dispatch(changeLanguage(data)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeHeader);
