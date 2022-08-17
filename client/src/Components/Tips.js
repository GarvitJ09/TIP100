import React from "react";
import { Col, Row } from "react-bootstrap";

import Sidebar from "./Sidebar";
function Home() {
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
}

export default Home;
