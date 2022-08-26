import React, { useEffect, useState } from "react";
import {
  Button,
  Card,
  Col,
  OverlayTrigger,
  Row,
  Tooltip,
} from "react-bootstrap";
import Sidebar from "./Sidebar";
import TipPagination from "./TipPagination";
import Pagination from "./Pagination";
import axios from "axios";

const Frame = ({ group, heading, date, score, description }) => {
  const renderTooltip = (props) => (
    <Tooltip id="button-tooltip" {...props}>
      Score
    </Tooltip>
  );
  return (
    <Card className="mb-2">
      <Card.Body>
        <Row>
          <Col>
            <Card.Title>{group}</Card.Title>
            <Card.Text>{description}</Card.Text>
          </Col>

          <Col>
            <Card.Text>{date}</Card.Text>
          </Col>
          <Col>
            <OverlayTrigger
              placement="right"
              delay={{ show: 250, hide: 400 }}
              overlay={renderTooltip}
            >
              <Button variant="success">{score}</Button>
            </OverlayTrigger>
          </Col>

          <Col>
            <Card.Text style={{ float: "right" }}>
              <Button variant="danger">View</Button>
            </Card.Text>
          </Col>
          <Col>
            <Card.Text>
              <Button variant="dark">Report</Button>
            </Card.Text>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
};
const Tips = () => {
  const [time, setTime] = useState(Date.now());
  const renderTooltip = (props) => (
    <Tooltip id="button-tooltip" {...props}>
      Score
    </Tooltip>
  );
  const [info, setInfo] = useState([]);
  const sendRequest = async () => {
    setLoading(true);
    const res = await axios
      .get("https://tip100.herokuapp.com/getAllTips")
      .catch((err) => console.log(err));
    const data = await res.data;
    setLoading(false);
    console.log(data);
    return data;
  };
  useEffect(() => {
    sendRequest().then((data) => setInfo(data.chain));
    const interval = setInterval(() => setTime(Date.now()), 5000);
    return () => {
      clearInterval(interval);
    };
  }, []);
  console.log(info);
  const [searchTerm, setSearchTerm] = useState("");
  const setsearch = (e) => {
    setSearchTerm(e.target.value);
  };
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(8);
  const indexOfLastPost = currentPage * postsPerPage;

  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = info.slice(indexOfFirstPost, indexOfLastPost);
  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  return (
    <div>
      <TipPagination info={currentPosts} loading={loading}></TipPagination>
      <Pagination
        postsPerPage={postsPerPage}
        totalPosts={info.length}
        paginate={paginate}
      />

      {/* <Row>
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
          <div>
            <table class="table">
              <thead>
                <tr
                  class="table"
                  style={{
                    display: "grid",
                    gridTemplateColumns: "25vw auto auto auto auto",
                  }}
                >
                  <th scope="col">Type of Crime</th>
                  <th scope="col">Date</th>
                  <th scope="col">Score</th>
                  <th scope="col">View Details</th>
                  <th scope="col">View Report</th>
                </tr>
              </thead>
              <tbody>
                {info.map((data) => (
                  <tr
                    style={{
                      display: "grid",
                      gridTemplateColumns: "25vw auto auto auto auto",
                    }}
                  >
                    <td>
                      <th scope="row">{data.group}</th>
                      <tr scope="row">{data.description.slice(0, 25)}...</tr>
                    </td>
                    <td>{data.date}</td>
                    <td>
                      <OverlayTrigger
                        placement="right"
                        delay={{ show: 250, hide: 400 }}
                        overlay={renderTooltip}
                      >
                        <Button variant="secondary">{data.score}</Button>
                      </OverlayTrigger>
                    </td>
                    <td>
                      <Card.Text>
                        <Button variant="danger">View</Button>
                      </Card.Text>
                    </td>
                    <td>
                      <Card.Text>
                        <Button variant="secondary">Report</Button>
                      </Card.Text>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table> */}
      {/* {info.map((data) => (
              <Frame
                group={data.group}
                heading={data.heading}
                score={data.score}
                description={data.description}
                date={data.date}
              />
            ))} */}
      {/* </div>
        </Col>
      </Row> */}
    </div>
  );
};

export default Tips;
