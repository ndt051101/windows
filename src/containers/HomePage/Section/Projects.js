import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import "./Projects.scss";
import { getAllProject } from "../../../services/userService";
import { Link } from "react-router-dom";

const Projects = (props) => {
    const [arrProject, setArrProject] = useState([]);
    useEffect(() => {
        (async () => {
            try {
                const response = await getAllProject();
                setArrProject(response.data);
            } catch (error) {
                console.log(error.message);
            }
        })();
    }, []);
    return (
        <div className="project-container" id="project">
            <div className="project-title">
                <span>Solutions and Cases</span>
            </div>
            <div className="project-list">
                {arrProject &&
                    arrProject.length > 0 &&
                    arrProject.map((item, index) => {
                        return (
                            <div className="project-item" key={index}>
                                <Link
                                    className="project-border"
                                    to={`detail-project/${item.id}`}
                                >
                                    <img src={item.image} alt={item.name} />
                                    <div className="project-desc">
                                        <p>{item.name}</p>
                                    </div>
                                </Link>
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
    };
};

const mapDispatchToProps = (dispatch) => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(Projects);
