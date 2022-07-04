import React from "react";
import { connect } from "react-redux";
import "./About.scss";
// import { FormattedMessage } from "react-intl";

const About = (props) => {
  return (
    <div className="about-container">
      <div className="about-title">
        <span>Lí do nên chọn</span>
      </div>
      <div className="about-content">
        <div className="about-left">
          <p className="customers">
            Wallkingdon Glass were founded in early 2014 with a total investment
            of USD 20 million, is a leading glass processor in China. Our plant
            covers an area of 36,000 m² and has an annual glass processing
            capacity of 800,000 m². Our advanced equipment were all world
            advanced, such as Tamglass, Bystronic, and dip-tech etc.
          </p>
          <p className="customers">
            Wallkingdon Glass is a one stop architectural glass supplier with
            rich experiences in industrial glass design, producing, installation
            and customization. The product line includes all kinds of
            architectural glass such as Laminated Glass, Multi Curved Glass,
            Sentry Glass Plus, Curved Glass, Tempered Glass, Insulated Glass,
            Low E glass and more. The decorative glass includes Casting Glass,
            Forested Glass, Digital printed Glass, Screen printing Glass and
            Engraving Glass.
          </p>
          <p className="customers">
            With the precious inputs and creativity from designing experts, we
            can provide high quality glass products to the industry, allowing
            contracting companies to have cost effective solutions while keeping
            quality to highest level. Our products are strictly in accordance
            with the standard of BS/EN, AS/NZS, ASTM,ANSI standards etc.
          </p>
        </div>
        <div className="about-right">
          <iframe
            width="100%"
            height="530px"
            src="https://www.youtube.com/embed/0SDGPQUQ-zw"
            title="Wallkingdon Glass factory"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(About);
