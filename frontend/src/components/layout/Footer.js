import React from "react";

const Footer = ({ marginAdmin }) => {
  return (
    <footer
      className="site-footer"
      style={{ marginTop: marginAdmin === "0" ? "0" : "" }}
    >
      <div className="row">
        <div className="col-md-1"> </div>
        <div className="col-md-4">
          <aside id="text-3" className="widget widget_text">
            <h3 className="widget-title">
              <span>MIMS MANAGEMENT</span>
            </h3>{" "}
            <div className="textwidget">
              <ul>
                <li>INTEGRITY </li>
                <li>COMMITMENT</li>
                <li>TRUST</li>
              </ul>
              <p style={{ color: "#00004c" }}>
                ** YOUR TRUST IS THE HEART OF OUR BUSINESS **
              </p>
              <p>
                Our firm has a reputation as one of the leading property
                management firms in the East African region.
              </p>
            </div>
          </aside>{" "}
        </div>
        <div className="col-md-4">
          <aside id="text-3" className="widget widget_text">
            <h3 className="widget-title">
              <span>DEALERS IN:</span>
            </h3>{" "}
            <div className="textwidget">
              <ul>
                <li>SALE OF LAND & HOUSES</li>
                <li>PROPERTY VALUATION</li>
                <li>PROPERTY MANAGEMENT</li>
                <li>HOUSES & APARTMENTS LETTING</li>
              </ul>
            </div>
          </aside>{" "}
        </div>

        <div className="col-md-3">
          <aside id="text-4" className="widget widget_text">
            <h3 className="widget-title">
              <span>KEEP IN TOUCH</span>
            </h3>{" "}
            <div className="textwidget">
              <p>
                <i className="fa fa-map-marker"></i> Kikuyu Town Tom Mboya
                Building
              </p>
              <p>
                <i className="fa fa-phone"></i> &nbsp; +254 725 591495 <br />
                <i className="fa fa-phone"></i> &nbsp; +254 756 882714
              </p>
              <p>
                <i className="fa fa-envelope" style={{ color: "blue" }}></i>{" "}
                &nbsp;{" "}
                <a
                  href="mailto:mimsmanagement9@gmail.com"
                  style={{ color: "blue" }}
                >
                  mimsmanagement9@gmail.com
                </a>
              </p>
              <p>
                <i className="fa fa-clock-o"></i> &nbsp; Mon - Fri: 8:30am -
                4:30pm
              </p>
            </div>
          </aside>{" "}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
