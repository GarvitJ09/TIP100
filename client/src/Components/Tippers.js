import React, { useState } from "react";
import Col from "react-bootstrap/esm/Col";
import Row from "react-bootstrap/esm/Row";
import Sidebar from "./Sidebar";
const CreateAlert = () => {
  return (
    <div className="dashboard-parent-div">
      <Row>
        <Col lg={2}>
          <Sidebar />
        </Col>
        <Col className="dashboard-home-content" lg={10}>
          <h4>Tippers</h4>
        </Col>
      </Row>
    </div>
  );
};

export default CreateAlert;
