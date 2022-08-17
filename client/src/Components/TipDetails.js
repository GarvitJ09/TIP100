import React from "react";
import assets from "../Assets/assets.jpg";
const TipDetails = (props) => {
  return (
    <div className=" margin-left-20">
      <div style={{ padding: "20px" }}>
        <img
          className="img-detail img-fluid"
          style={{ maxWidth: "400px", height: "auto" }}
          src={assets}
        ></img>
      </div>
      <div>
        <div>
          <h3>Title</h3>
        </div>
        <div style={{ margin: "25px 15px" }}>
          <p>description </p>
        </div>
        <div>
          <p>
            <h4>Type</h4>
          </p>
        </div>
        <div>
          <p>
            <h4>Location</h4>
          </p>
        </div>
      </div>
    </div>
  );
};
export { TipDetails };
