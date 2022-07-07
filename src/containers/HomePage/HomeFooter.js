import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import "./HomeFooter.scss";
import { getAllProduct } from "../../services/userService";
import { postCustomerBookAppointment } from "../../services/userService";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

const HomeFooter = () => {
    const [arrProduct, setArrProduct] = useState([]);
    const [state, setState] = useState("");
    useEffect(() => {
        (async () => {
            try {
                const response = await getAllProduct();
                setArrProduct(response.data);
            } catch (error) {
                console.log(error.message);
            }
        })();
    }, []);

    const handleChange = (event) => {
        const { value, name } = event.target;
        setState({
            ...state,
            [name]: value,
        });

        console.log("State", state);
    };

    const handleConfirm = async () => {
        const res = await postCustomerBookAppointment({
            ...state,
        });
        if (res && res.errCode === 0) {
            toast.success("SUCCESS!");
            setState("");
        } else {
            toast.error("FAILED!");
        }
    };

    return (
        <div className="home-footer-container" id="contact">
            <div className="home-footer-content">
                <div className="home-footer-title">
                    <h2>Quote for the Latest Price</h2>
                    <p>
                        Ask a quote for the latest price and one of our team
                        members will respond as soon as possible. Fields marked
                        with * are required.
                    </p>
                </div>
                <div className="home-footer-form">
                    <form>
                        <input
                            type="text"
                            id="form_name"
                            placeholder="Your Name"
                            className="footText"
                            name="fullName"
                            value={state["fullName"]}
                            onChange={handleChange}
                        />
                        <input
                            type="text"
                            id="form_phone"
                            placeholder="Phone"
                            className="footText"
                            name="phoneNumber"
                            value={state["phoneNumber"]}
                            onChange={handleChange}
                        />
                        <input
                            type="text"
                            id="form_email"
                            placeholder="Email"
                            className="footText"
                            name="email"
                            value={state["email"]}
                            onChange={handleChange}
                        />
                        <br />
                        <textarea
                            rows="5"
                            cols="45"
                            className="footTextarea"
                            placeholder="Describe your needs,indicate your requirement in details,such as machine model,Qty,FOB price,lead time,etc."
                            name="description"
                            value={state["description"]}
                            onChange={handleChange}
                        ></textarea>
                        <input
                            type="button"
                            value="Submit"
                            className="footBtn ebtn"
                            onClick={handleConfirm}
                        />
                    </form>
                </div>
                <div className="home-footer-desc">
                    <ul>
                        <li>Wallkingdon Glass</li>
                        <li className="fli">
                            Wallkingdon Glass is a one stop architectural glass
                            supplier with rich experiences in industrial glass
                            design, producing, installation and customization.
                        </li>
                    </ul>
                    <ul>
                        <li>Our Products</li>
                        {arrProduct &&
                            arrProduct.length > 0 &&
                            arrProduct.map((item, index) => {
                                return (
                                    <div className="fli">
                                        <Link
                                            className=""
                                            to={`detail-product/${item.id}`}
                                        >
                                            <p>{item.name}</p>
                                        </Link>
                                    </div>
                                );
                            })}
                    </ul>
                    <ul>
                        <li>Get In Touch</li>
                        <li className="fli">Phone:+01 23456789</li>
                        <li className="fli">
                            Address:The 14th km of Beibu Avenue,Nada, Danzhou,
                            Hainan P.R.C
                        </li>
                        <li className="fli">
                            Email:
                            <a href="mailto:duytienabc@gmail.com">
                                duytienabc@gmail.com
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        isLoggedIn: state.user.isLoggedIn,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeFooter);
