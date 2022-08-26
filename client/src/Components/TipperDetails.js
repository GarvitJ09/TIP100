import React, { useEffect, useState } from "react";
import {
  Card,
  CardHeader,
  Avatar,
  CardMedia,
  CardContent,
  Typography,
  IconButton,
} from "@mui/material";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { Box } from "@mui/system";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Sidebar from "./Sidebar";
const TipperDetails = () => {
  const id = useParams().id;
  const [score, setScore] = useState(0);
  const [info, setInfo] = useState([]);
  const sendRequest = async () => {
    const res = await axios
      .get("https://tip100.herokuapp.com/getAllTippers")
      .catch((err) => console.log(err));
    const data = await res.data;
    console.log(data);
    const result = data.filter(findScore);
    setScore(result[0].score);
  };
  function findScore(data) {
    return data.uid == id;
  }

  const navigate = useNavigate();
  const [input, setInput] = useState([]);
  const fetchDetails = async () => {
    const res = await axios
      .get(`https://tip100.herokuapp.com/getUserTips?uid=${id}`)
      .catch((err) => console.log(err));
    const data = await res.data;
    console.log(data);
    return data;
  };
  useEffect(() => {
    sendRequest();
    fetchDetails().then((data) => {
      setInput(data.chain);
    });
    //eslint-disable-next-line
  }, [id]);
  const renderTooltip = (props) => (
    <Tooltip id="button-tooltip" {...props}>
      Score
    </Tooltip>
  );
  console.log();
  return (
    <div className="dashboard-parent-div">
      <Row>
        <Col lg={2}>
          <Sidebar />
        </Col>
        <Col className="dashboard-home-content" lg={10}>
          <h4>Tipper Details</h4>
          <div className="mt-4 ">
            <h6>
              Tipper Id:{" "}
              <span style={{ fontSize: "20px" }} className=" text-danger">
                {id}
              </span>{" "}
            </h6>
            <h6>
              Tipper Score:{" "}
              <span style={{ fontSize: "20px" }} className=" text-danger">
                {score}
              </span>
            </h6>
          </div>
          <div>
            <br />
            <h4>Previously Submitted Tips</h4>
            <table class="table">
              <thead>
                <tr
                  class="table"
                  style={{
                    display: "grid",
                    gridTemplateColumns: "auto auto auto auto auto",
                  }}
                >
                  <th scope="col">Type of Crime</th>
                  <th scope="col">Date</th>
                  <th scope="col">Tip Score</th>
                  <th scope="col">Urgency</th>
                  <th scope="col">Address</th>
                </tr>
              </thead>
              <tbody>
                {input.map((data) => (
                  <tr
                    style={{
                      display: "grid",
                      gridTemplateColumns: "25vw auto auto auto auto",
                    }}
                  >
                    <td>
                      <th scope="row">{data.crimeType}</th>
                      <tr scope="row">{data.description.slice(0, 25)}...</tr>
                    </td>
                    <td>{data.timestamp.slice(0, 10)}</td>
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
                          {data.score == 0 ? "Calculating Score" : data.score}
                        </Button>
                      </OverlayTrigger>
                    </td>
                    <td> {data.urgency}</td>
                    <td> {data.address}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export { TipperDetails };
