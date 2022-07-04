import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import "./Products.scss";
import { FormattedMessage } from "react-intl";
import { getAllProduct } from "../../../services/userService";
import { Link } from 'react-router-dom';

const Products = (props) => {
  const [arrProduct, setArrProduct] = useState([]);
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

  return (
    <div className="products-container" id="product">
      <div className="products-title">
        <span>Sản phẩm của tôi</span>
      </div>
      <div className="products-list">
        {arrProduct &&
          arrProduct.length > 0 &&
          arrProduct.map((item, index) => {
            return (
              <div className="products-item" key={index}>
                <Link
                  className="product-border"
                  to={`detail-product/${item.id}`}
                >
                  <img src={item.image} alt={item.name} />
                  <div className="products-desc">
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

export default connect(mapStateToProps, mapDispatchToProps)(Products);
