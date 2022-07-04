import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import "./Posts.scss";
import { FormattedMessage } from "react-intl";
import { getTwoPosts } from "../../../services/userService";
import { Link } from "react-router-dom";

const Posts = (props) => {
  const [arrPosts, setArrPosts] = useState([]);
  useEffect(() => {
    (async () => {
      try {
        const response = await getTwoPosts();
        console.log(response.data);
        setArrPosts(response.data);
      } catch (error) {
        console.log(error.message);
      }
    })();
  }, []);
  return (
    <div className="ot-container" id="posts">
      <div className="ot-title">
        <span>Trung tâm tin tức</span>
      </div>
      <div className="ot-list">
        {arrPosts &&
          arrPosts.length > 0 &&
          arrPosts.map((item, index) => {
            return (
              <div className="ot-item" key={index}>
                <Link className="posts-title" to={`detail-posts/${item.id}`}>
                  <img src={item.image} alt={item.name} />
                  <h3>{item.name}</h3>
                </Link>
                <p>{item.note}</p>
                <p>
                  <Link className="posts-border" to={`/get-all-posts/`}>
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
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(Posts);
