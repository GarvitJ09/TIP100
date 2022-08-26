import React, { useState } from "react";
import {
  Button,
  Card,
  Col,
  OverlayTrigger,
  Row,
  Tooltip,
} from "react-bootstrap";
import "./TipPagination.css";
import Sidebar from "./Sidebar";
import Pagination from "./Pagination";
import { useNavigate } from "react-router-dom";

const TipperPagination = ({ info, loading }) => {
  console.log(info);
  const navigate = useNavigate();
  const handleView = (uid) => {
    console.log("clicked");
    navigate(`/tippers/${uid}`);
  };
  if (loading) {
    return <h2>Loading...</h2>;
  }
  const renderTooltip = (props) => (
    <Tooltip id="button-tooltip" {...props}>
      Score
    </Tooltip>
  );
  // console.log(typeof info[0].score);
  return (
    <div className="dashboard-parent-div">
      <Row>
        <Col lg={2}>
          <Sidebar />
        </Col>
        <Col className="dashboard-home-content" lg={10}>
          <h4>Tippers</h4>

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
          </div>
          <br />
          <br />
          <br /> */}
          <div>
            <table class="table">
              <tr
                class="table"
                style={{
                  display: "grid",
                  gridTemplateColumns: "50vw auto auto",
                }}
              >
                <th scope="col">Tipper id</th>
                <th scope="col">Score</th>
                <th scope="col">Details</th>
              </tr>
              <tbody>
                {Array.isArray(info)
                  ? info.map((data) => (
                      <tr
                        style={{
                          display: "grid",
                          gridTemplateColumns: "50vw auto auto",
                        }}
                      >
                        <td> {data.uid}</td>
                        <td>
                          <OverlayTrigger
                            placement="right"
                            delay={{ show: 250, hide: 400 }}
                            overlay={renderTooltip}
                          >
                            <Button
                              variant="danger"
                              style={{
                                background: "none",
                                color: "black",
                                border: "none",
                              }}
                            >
                              {data.score}
                            </Button>
                          </OverlayTrigger>
                        </td>
                        <td>
                          <Button
                            onClick={() => handleView(data.uid)}
                            variant="danger"
                          >
                            View Details
                          </Button>
                        </td>
                      </tr>
                    ))
                  : null}
              </tbody>
            </table>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default TipperPagination;
