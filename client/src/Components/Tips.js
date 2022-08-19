import React, { useState } from "react";
import { Button, Card, Col, Row } from "react-bootstrap";

import Sidebar from "./Sidebar";

const Frame = ({ group, heading, score }) => {
  return (
    <Card>
      <Card.Header as="h5">{heading}</Card.Header>
      <Card.Body>
        <Card.Title>{group}</Card.Title>
        <Card.Text>score : {score}</Card.Text>
        <Button variant="danger">View</Button> &nbsp;&nbsp;
        <Button variant="dark">Report</Button>
      </Card.Body>
    </Card>
  );
};
const Tips = () => {
  const [info, setInfo] = useState([
    {
      group: "robbery",
      heading: "Adfw",
      score: 6,
    },
    {
      group: "robbery",
      heading: "Adfw",
      score: 6,
    },
    {
      group: "robbery",
      heading: "Adfw",
      score: 6,
    },
  ]);
  const [searchTerm, setSearchTerm] = useState("");
  const setsearch = (e) => {
    setSearchTerm(e.target.value);
  };
  return (
    <div className="dashboard-parent-div">
      <Row>
        <Col lg={2}>
          <Sidebar />
        </Col>
        <Col className="dashboard-home-content" lg={10}>
          <h4>Tips</h4>

          <div
            className="d-flex "
            style={{ float: "right", marginRight: "30px" }}
          >
            <input
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
              onChange={setsearch}
              style={{
                outline: "none",
                border: "1px solid red",
                borderRadius: "5px",
              }}
            />
            <Button variant="outline-danger">Search</Button>
          </div>
          <br />
          <br />
          <br />
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "auto auto",
              gridGap: "15px",
            }}
          >
            {info.map((data) => (
              <Frame
                group={data.group}
                heading={data.heading}
                score={data.score}
              />
            ))}
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default Tips;
