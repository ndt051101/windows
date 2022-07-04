import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import "./OutstandingTechnology.scss";
import * as actions from "../../../store/actions";
import { getTwoTechnology } from "../../../services/userService";
import { Link } from "react-router-dom";
import { withRouter } from "react-router";

const OutstandingTechnology = (props) => {
    const [arrTechnology, setArrTechnology] = useState([]);

    useEffect(() => {
        (async () => {
            try {
                const response = await getTwoTechnology();
                setArrTechnology(response.data);
            } catch (error) {
                console.log(error.message);
            }
        })();
    }, []);

    return (
        <div className="ot-container">
            <div className="ot-title">
                <span>Công nghệ nổi bật</span>
            </div>
            <div className="ot-list">
                {arrTechnology &&
                    arrTechnology.length > 0 &&
                    arrTechnology.map((item, index) => {
                        return (
                            <div className="ot-item" key={index}>
                                <Link
                                    className="technology-title"
                                    to={`detail-technology/${item.id}`}
                                >
                                    <img src={item.image} alt={item.name} />
                                    <h3>{item.name}</h3>
                                </Link>
                                <p>{item.description}</p>
                                <p>
                                    <Link
                                        className="technology-border"
                                        to={`detail-technology/${item.id}`}
                                    >
                                        Learn More
                                    </Link>
                                </p>
                            </div>
                        );
                    })}
            </div>
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        language: state.app.language,
        allTechnology: state.admin.allTechnology,
    };
};

const mapDispatchToProps = (dispatch) => {
    return { fetchAllTechnology: () => dispatch(actions.fetchAllTechnology()) };
};

export default withRouter(
    connect(mapStateToProps, mapDispatchToProps)(OutstandingTechnology)
);
