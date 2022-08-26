import axios from "axios";
import React, { useState, useEffect } from "react";
import { FaSearch } from "react-icons/fa";
import ListGroup from "react-bootstrap/ListGroup";
import Sidebar from "./Sidebar";
import AlertPagination from "./AlertPagination";
import { Button, Card, Col, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Pagination from "./Pagination";
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
    <Card style={{ maxWidth: "30vw" }}>
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

export default function Alerts() {
  const [info, setInfo] = useState([]);
  const sendRequest = async () => {
    setLoading(true);
    const res = await axios
      .get("https://tip100.herokuapp.com/getAllTips")
      .catch((err) => console.log(err));
    const data = await res.data;
    console.log(data);
    setLoading(false);
    return data;
  };
  useEffect(() => {
    sendRequest().then((data) => setInfo(data.chain));
    console.log(info);
  }, []);

  // const [info, setInfo] = useState([]);
  // const sendRequest = async () => {
  //   setLoading(true);
  //   const res = await axios
  //     .get("http://localhost:5000/api/alerts")
  //     .catch((err) => console.log(err));
  //   const data = await res.data;
  //   setLoading(false);
  //   return data;
  // };
  // useEffect(() => {
  //   sendRequest().then((data) => setInfo(data.alerts));
  // }, []);
  console.log(info);
  const [searchTerm, setSearchTerm] = useState("");
  const setsearch = (e) => {
    setSearchTerm(e.target.value);
  };
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(4);
  const indexOfLastPost = currentPage * postsPerPage;

  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = info.slice(indexOfFirstPost, indexOfLastPost);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  return (
    <div className="dashboard-parent-div">
      <AlertPagination info={info} loading={loading}></AlertPagination>
      {/* <Pagination
        postsPerPage={postsPerPage}
        totalPosts={info.length}
        paginate={paginate}
      /> */}
      {/* <Row>
        <Col lg={2}>
          <Sidebar></Sidebar>
        </Col>
        <Col className="dashboard-home-content" lg={10}>
          <h4>Alerts</h4>
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
      {/* <br></br>
          <br></br>
          <br></br>
          <br></br>
          <div className="grid-container">
            {info
              .filter((data) => {
                if (searchTerm === "") {
                  return data;
                } else if (
                  data.group
                    .toLowerCase()
                    .includes(searchTerm.toLocaleLowerCase())
                ) {
                  return data;
                }
              })
              .map((data) => (
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
      </Row> */}
    </div>
  );
}
