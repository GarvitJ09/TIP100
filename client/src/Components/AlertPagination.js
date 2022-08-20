import axios from "axios";
import React, { useState, useEffect } from "react";
import { FaSearch } from "react-icons/fa";
import ListGroup from "react-bootstrap/ListGroup";
import Sidebar from "./Sidebar";
import { Button, Card, Col, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const Frame = ({
  id,
  group,
  description,
  headline,
  image,
  address,
  city,
  state,
  zip,
}) => {
  const navigate = useNavigate();
  const handleView = (e) => {
    navigate(`/alerts/${id}`);
  };
  return (
    <Card>
      <Card.Img variant="top" src={image} />
      <Card.Body>
        <Card.Title>{group}</Card.Title>
        <Card.Title>{headline}</Card.Title>
      </Card.Body>
      <ListGroup className="list-group-flush">
        <ListGroup.Item>
          <Card.Text>{description}</Card.Text>
        </ListGroup.Item>
        <ListGroup.Item>
          {address}
          <br></br>
          {city}&nbsp;
          {state}&nbsp;
          {zip}
        </ListGroup.Item>
      </ListGroup>
      <Card.Body>
        <button onClick={handleView} className="btn btn-dark">
          View
        </button>
      </Card.Body>
    </Card>
  );
};
const alertPagination = ({ info, loading }) => {
  if (loading) {
    return <h2>Loading...</h2>;
  }

  return (
    <div className="dashboard-parent-div">
      <Row>
        <Col lg={2}>
          <Sidebar></Sidebar>
        </Col>
        <Col className="dashboard-home-content" lg={10}>
          <h4>Alerts</h4>
          {/* <div
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
          </div> */}

          {/* <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              float: "right",
              marginRight: "30px",
            }}
          >
            <div>
              <input
                className="search-products"
                type="text"
                placeholder="search"
                onChange={setsearch}
              />
            </div>
            <div style={{ cursor: "pointer", padding: "10px" }}>
              <FaSearch></FaSearch>
            </div>
          </div> */}
          <br></br>
          <br></br>
          <br></br>
          <br></br>
          <div className="grid-container">
            {info.map((data) => (
              <Frame
                id={data._id}
                group={data.group}
                description={data.description}
                headline={data.headline}
                image={data.image}
                address={data.address}
                city={data.city}
                state={data.state}
                zip={data.zip}
              />
            ))}
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default alertPagination;