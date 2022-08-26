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
import no_media_img from "../Assets/no_media_img.png";
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
import Chat from "./Chat";
import { Dropdown } from "react-bootstrap";
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { db } from "../firebase-config";
import { setAutoFreeze } from "immer";
const TipDetails = () => {
  const [a, setA] = useState();
  const [b, setB] = useState();
  let imageFormats = ["jpg", "png", "gif"];
  const [wasthisTipFake, setWasthisTipFake] = useState("Was this Tip Fake?");
  const [wasthisTipUseful, setWasthisTipUseful] = useState(
    "Was this Tip Useful?"
  );
  const [image, setImage] = useState([]);
  const id = useParams().id;
  const navigate = useNavigate();
  const [inputs, setInputs] = useState({
    crimeType: "",
    description: "",
    crimeTime: "",
    urgency: "",
    uid: "",
    score: "",
    address: "",
  });

  const fetchDetails = async () => {
    const res = await axios
      .get(`https://tip100.herokuapp.com/getTipDetails?index=${id}`)
      .catch((err) => console.log(err));
    const data = await res.data;
    console.log(data);
    return data;
  };
  const [isLoading, setLoading] = useState(true);
  useEffect(() => {
    fetchDetails().then((data) => {
      setInputs({
        crimeType: data.crimeType,
        description: data.description,
        crimeTime: data.crimeTime,
        urgency: data.urgency,
        uid: data.uid,
        score: data.score,
        address: data.address,
      });
      setImage(data.mediaURL);
      setLoading(false);
    });
    console.log(inputs);
    //eslint-disable-next-line
  }, [id]);

  const handleTipUseful = async (s) => {
    console.log(s);
    try {
      await updateDoc(doc(db, "tips", id), {
        useful: s,
      });
    } catch (err) {
      console.log(err);
    }
  };
  const handleTipFake = async (s) => {
    console.log(s);
    try {
      await updateDoc(doc(db, "tips", id), {
        fake: s,
      });
    } catch (err) {
      console.log(err);
    }
  };

  const handleTipFeedback = async () => {
    try {
      await updateDoc(doc(db, "tips", id), {
        view: 0,
      });
    } catch (err) {
      console.log(err);
    }
    let num = 0;
    if (!a && b) num = 100;
    else if (!a || b) num = 50;
    let prevScore;
    try {
      const q = await getDoc(doc(db, "users", inputs.uid.toString()));

      prevScore = q.data().score;
    } catch (err) {
      console.log(err);
    }
    let newScore = (prevScore + num) / 2;
    try {
      await updateDoc(doc(db, "users", inputs.uid), {
        score: newScore,
      });
    } catch (err) {
      console.log(err);
    }

    navigate("/tips");
  };
  console.log(image);
  function isImage(url) {
    console.log(url);
    let out = url.search("jpeg");
    console.log("this", out);
    console.log(typeof out);
    return out === -1 ? false : true;
  }

  return !isLoading ? (
    <div className="dashboard-parent-div">
      <Row>
        <Col lg={2}>
          <Sidebar />
        </Col>
        <Col className="dashboard-home-content" lg={10}>
          <h4>TipDetails</h4>
          <Form>
            <Row>
              <Col>
                <Form.Group className="mb-3" controlId="formGridEmail">
                  <Form.Label>Crime Type</Form.Label>
                  <Form.Control
                    value={inputs.crimeType}
                    name="headline"
                    type="text"
                    placeholder="Enter Headline"
                  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group className="mb-3" controlId="formGridAddress2">
                  <Form.Label>Score</Form.Label>
                  <Form.Control
                    value={
                      inputs.score == 0 ? "Calculating Score" : inputs.score
                    }
                  />
                </Form.Group>
              </Col>
            </Row>
            <Form.Group className="mb-3" controlId="formGridAddress1">
              <Form.Label>Description</Form.Label>
              <Form.Control
                value={inputs.description}
                name="description"
                placeholder="Description"
              />
            </Form.Group>

            <Row>
              <Col>
                <Form.Group className="mb-3" controlId="formGridAddress2">
                  <Form.Label>Crime Time</Form.Label>
                  <Form.Control value={inputs.crimeTime} />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group className="mb-3" controlId="formGridAddress2">
                  <Form.Label>Urgency</Form.Label>
                  <Form.Control value={inputs.urgency} />
                </Form.Group>
              </Col>
            </Row>
            <Form.Group className="mb-3" controlId="formGridAddress2">
              <Form.Label>Address</Form.Label>
              <Form.Control value={inputs.address} />
            </Form.Group>

            {/* <Form.Group as={Col} controlId="formGridZip">
              <Form.Label>Image</Form.Label>
              <img
                className="img-fluid mb-3"
                src={URL.createObjectURL(inputs.image)}
              ></img>
            </Form.Group> */}
            {/* {inputs.mediaURL((data) => {
              <div>
                <img src={data}></img>
              </div>;
            })} */}

            {/* <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <img
                className="img img-fluid"
                style={{
                  maxHeight: "350px",
                  maxWidth: "350px",
                }}
                src={inputs.mediaURL === "" ? inputs.mediaURL : no_media_img}
              ></img>
            </div> */}

            {image.length == 0 && (
              <img
                className="img img-fluid"
                style={{
                  maxHeight: "350px",
                  maxWidth: "350px",
                }}
                src={no_media_img}
              ></img>
            )}

            {image
              .filter(
                (data) =>
                  data.indexOf("jpeg") !== -1 ||
                  data.indexOf("png") !== -1 ||
                  data.indexOf("jpg") !== -1
              )
              .map((data) => (
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <img
                    className="img img-fluid"
                    style={{
                      maxHeight: "350px",
                      maxWidth: "350px",
                    }}
                    src={data}
                  ></img>
                </div>
              ))}

            {image
              .filter((data) => data.indexOf("mp4") !== -1)
              .map((data) => (
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <video width="250" height="250" controls autoPlay>
                    <source src={data} type="video/mp4" />
                  </video>
                </div>
              ))}
            {image
              .filter((data) => data.indexOf("aac") !== -1)
              .map((data) => (
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <audio src={data} controls autoPlay />
                </div>
              ))}

            <br />
          </Form>
          <Row>
            <Col>
              <Dropdown>
                <Dropdown.Toggle variant="danger" id="dropdown-basic">
                  {wasthisTipUseful}
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  <Dropdown.Item
                    onClick={() => {
                      setB(1);
                      handleTipUseful(1);
                    }}
                  >
                    Yes
                  </Dropdown.Item>
                  <Dropdown.Item
                    onClick={() => {
                      setB(0);
                      handleTipUseful(0);
                    }}
                  >
                    No
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </Col>
            <Col>
              <Dropdown>
                <Dropdown.Toggle variant="danger" id="dropdown-basic">
                  {wasthisTipFake}
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  <Dropdown.Item
                    onClick={() => {
                      setA(1);
                      handleTipFake(1);
                    }}
                  >
                    Yes
                  </Dropdown.Item>
                  <Dropdown.Item
                    onClick={() => {
                      setA(0);
                      handleTipFake(0);
                    }}
                  >
                    No
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
              <br />
              <Button onClick={handleTipFeedback} className="btn btn-danger">
                Close Tip
              </Button>
            </Col>
          </Row>
        </Col>
      </Row>
      <Chat uid={inputs.uid} collec="messages"></Chat>
    </div>
  ) : (
    <div>Loading...</div>
  );
};

export { TipDetails };
