import axios from "axios";
import React, { useState, useEffect } from "react";
import { FaSearch } from "react-icons/fa";
import ListGroup from "react-bootstrap/ListGroup";
import Sidebar from "./Sidebar";
import { Button, Card, Col, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import no_media_img from "../Assets/no_media_img.png";
const Frame = ({
  index,
  crimeType,
  crimeTime,
  description,
  score,
  mediaURL,
  address,
  urgency,
  uid,
}) => {
  const navigate = useNavigate();
  const handleView = (e) => {
    navigate(`/alerts/${index}`);
  };
  return (
    <Card>
      <Card.Img
        className="img-fluid"
        variant="top"
        src={mediaURL == "" ? no_media_img : mediaURL}
      />
      <Card.Body>
        <Card.Title>{crimeType}</Card.Title>
      </Card.Body>
      <ListGroup className="list-group-flush">
        <ListGroup.Item>
          <Card.Text>{description}</Card.Text>
        </ListGroup.Item>
        <ListGroup.Item>{address}</ListGroup.Item>
        <ListGroup.Item>
          Score : {score == 0 ? "Calculating Score" : score}
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
          <div
            className="grid-container"
            style={{ height: "66vh", overflowY: "auto", overflowX: "hidden" }}
          >
            {info
              .filter((data) => data.isAlert === 1 && data.view == 1)
              .map((data) => (
                <Frame
                  index={data.index}
                  crimeType={data.crimeType}
                  description={data.description}
                  mediaURL={data.mediaURL}
                  address={data.address}
                  crimeTime={data.crimeTime}
                  urgency={data.urgency}
                  uid={data.uid}
                  score={data.score}
                />
              ))}
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default alertPagination;
