import React, { useEffect, useState } from "react";
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
import { Link, useNavigate } from "react-router-dom";
import { db } from "../firebase-config";
import {
  addDoc,
  collection,
  doc,
  getDocs,
  serverTimestamp,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";
import Chat from "./Chat";
import axios from "axios";
import { async } from "@firebase/util";
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
const TipPagination = ({ info, loading }) => {
  const [idx, setIdx] = useState(0);
  const [time, setTime] = useState(Date.now());
  const [allTips, setAllTips] = useState([]);
  const fetchTips = async () => {
    const res = await axios
      .get("https://tip100.herokuapp.com/getAllTips")
      .catch((err) => console.log(err));
    const data = await res.data;
    console.log(data);
    return data;
  };
  useEffect(() => {
    fetchTips().then((data) => setAllTips(data.chain));
    sortData();
    for (let i = 0; i < allTips.length; i++) {
      for (let j = i + 1; j < allTips.length; j++) {
        if (
          allTips[i].crimeType === allTips[j].crimeType &&
          allTips[i].address === allTips[j].address
        )
          (async () => {
            try {
              await updateDoc(doc(db, "tips", allTips[j].index.toString()), {
                parentTip: allTips[i].parentTip,
              });
            } catch (err) {
              console.log(err);
            }
          })();
      }
    }
  }, []);

  function sortData() {
    let sortedData;
    sortedData = [...allTips].sort((a, b) => {
      return b.dateOfIncident > a.dateOfIncident;
    });
    setAllTips(sortedData);
  }
  const navigate = useNavigate();
  const handleView = (data) => {
    console.log("clicked");
    navigate(`/tips/${data.index}`);
  };
  if (loading) {
    return <h2>Loading...</h2>;
  }
  const renderTooltip = (props) => (
    <Tooltip id="button-tooltip" {...props}>
      Score
    </Tooltip>
  );

  const sendRequest = async (data) => {
    console.log(data);
    const res = await axios
      .post("http://localhost:5000/api/alerts/createalert", {
        crimeType: data.crimeType,
        description: data.description,
        mediaURL: data.mediaURL,
        crimeTime: data.crimeTime,
        urgency: data.urgency,
        uid: data.uid,
        score: data.score,
        address: data.address,
      })
      .catch((err) => console.log(err));
    const info = await res.data;
    console.log(info);
  };
  const createAlert = async (index) => {
    // if (isAlert == 1) {
    //   alert("Already Added in Alerts");
    //   return;
    // }
    console.log(index);
    var answer = window.confirm("Save Alert?");
    var s = 1;
    // if (answer) {
    try {
      await updateDoc(doc(db, "tips", index), {
        isAlert: 1,
      });
      alert("Upload successful");
    } catch (err) {
      console.log(err);
    }
    // try {
    //   const taskQuery = doc(collection(db, "tips"), where(doc.id, "==", index));
    //   const taskDocs = await getDocs(taskQuery);
    //   taskDocs.forEach((taskDoc) => {
    //     setDoc(taskDoc.ref, {
    //       isAlert: 1,
    //     });
    //   });
    // } catch (err) {
    //   console.log(err);
    // }
  };

  console.log(allTips);

  return (
    <div className="dashboard-parent-div">
      <Row>
        <Col lg={2}>
          <Sidebar />
        </Col>
        <Col className="dashboard-home-content" lg={10}>
          <h4>Tips</h4>

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
              <thead>
                <tr
                  class="table"
                  style={{
                    display: "grid",
                    gridTemplateColumns: "auto auto auto auto auto auto auto",
                  }}
                >
                  <th scope="col">Tip Index</th>
                  <th scope="col">Type of Crime</th>
                  <th scope="col">Parent Tip Index</th>
                  <th scope="col">Date</th>
                  <th scope="col">Score</th>
                  <th scope="col">View Details</th>
                  <th scope="col">View Report</th>
                </tr>
              </thead>
              <tbody>
                {info
                  .filter((data) => data.view == 1)
                  .map((data) => (
                    <tr
                      style={{
                        display: "grid",
                        gridTemplateColumns: "repeat(7,12vw)",
                      }}
                    >
                      <td className="grid-child">{data.index}</td>
                      <td>
                        <th scope="row">
                          <tr>{data.crimeType}</tr>
                          <tr>{data.description.slice(0, 15)}...</tr>
                        </th>
                      </td>
                      <td className="grid-child">{data.parentTip}</td>
                      <td className="grid-child">
                        {data.timestamp.slice(0, 10)}
                      </td>
                      <td>
                        <Button
                          variant="danger"
                          style={{
                            background: "none",
                            color: "black",
                            border: "none",
                          }}
                        >
                          {data.score == 0 ? "Calculating Score" : data.score}
                        </Button>
                      </td>
                      <td>
                        <Card.Text>
                          <Button
                            onClick={() => handleView(data)}
                            variant="danger"
                          >
                            View
                          </Button>
                        </Card.Text>

                        {/* <Link to="/index" crimeType={data.crimeType}>
                          View
                        </Link> */}
                      </td>
                      <td>
                        <Card.Text>
                          <button
                            className="btn btn-primary"
                            onClick={async () => {
                              // createAlert(data.index);
                              if (data.isAlert == 1) {
                                alert("Already Added in Alerts");
                                return;
                              }
                              var answer = window.confirm("Save Alert?");
                              if (answer) {
                                try {
                                  await updateDoc(
                                    doc(db, "tips", data.index.toString()),
                                    {
                                      isAlert: 1,
                                    }
                                  );
                                } catch (err) {
                                  console.log(err);
                                }
                              }
                            }}
                          >
                            Create Alert
                          </button>
                          {/* Create Alert
                          </Button> */}
                        </Card.Text>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
            {/* {info.map((data) => (
              <Frame
                group={data.group}
                heading={data.heading}
                score={data.score}
                description={data.description}
                date={data.date}
              />
            ))} */}
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default TipPagination;
