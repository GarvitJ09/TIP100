import React, { useEffect, useRef, useState } from "react";
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

import firebase from "firebase/compat/app";
import {
  query,
  collection,
  orderBy,
  onSnapshot,
  limit,
  QuerySnapshot,
  getDocs,
  where,
} from "firebase/firestore";
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
import { db } from "../firebase-config";
const AlertDetails = () => {
  const id = useParams().id;
  const [image, setImage] = useState([]);
  const navigate = useNavigate();
  const [inputs, setInputs] = useState({
    crimeType: "",
    description: "",
    mediaURL: [],
    crimeTime: "",
    urgency: "",
    score: "",
    address: "",
  });
  const [uid, setUid] = useState(null);
  const [isLoading, setLoading] = useState(true);

  const fetchDetails = async () => {
    const res = await axios
      .get(`https://tip100.herokuapp.com/getTipDetails?index=${id}`)
      .catch((err) => console.log(err));
    const data = await res.data;
    console.log(data);
    return data;
  };
  let message = [];
  const [messages, setMessages] = useState([]);
  const scroll = useRef();

  const fetchAlertChats = async () => {
    const querySnapshot = await getDocs(collection(db, "alertChats"));
    querySnapshot.forEach((doc) => {
      let s = doc.id.split(" - ");
      console.log(s[s.length - 1]);
      console.log(id);
      if (s[s.length - 1] === id) {
        message.push(s[0]);
        console.log(doc.id, " => ", doc.data());
      }
    });
    setMessages(message);
    console.log(messages);
    message = [];
  };
  useEffect(() => {
    // const colRef = query(collection(db, "chats"));
    // onSnapshot(colRef, (snapshot) => {
    //   snapshot.docs.forEach((doc) => {
    //     console.log(doc.id);

    //     message.push({ ...doc.data() });
    //   });
    // setMessages(message);
    // console.log(messages);
    // message = [];
    // });
    fetchAlertChats();
    fetchDetails().then((data) => {
      setImage(data.mediaURL);
      setInputs({
        description: data.description,
        mediaURL: data.mediaURL,
        crimeTime: data.crimeTime,
        urgency: data.urgency,
        score: data.score,
        address: data.address,
        crimeType: data.crimeType,
      });
      setLoading(false);
    });

    //eslint-disable-next-line
  }, [id]);

  return !isLoading ? (
    <div className="dashboard-parent-div">
      <Row>
        <Col lg={2}>
          <Sidebar />
        </Col>
        <Col className="dashboard-home-content" lg={10}>
          <h4>Alert Details</h4>
          <Form>
            <Row>
              <Col>
                <Form.Group className="mb-3" controlId="formGridEmail">
                  <Form.Label>Crime Type</Form.Label>
                  <Form.Control
                    disabled="disabled"
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
                    disabled="disabled"
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
                disabled="disabled"
                value={inputs.description}
                name="description"
                placeholder="Description"
              />
            </Form.Group>

            <Row>
              <Col>
                <Form.Group className="mb-3" controlId="formGridAddress2">
                  <Form.Label>Crime Time</Form.Label>
                  <Form.Control disabled="disabled" value={inputs.crimeTime} />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group className="mb-3" controlId="formGridAddress2">
                  <Form.Label>Urgency</Form.Label>
                  <Form.Control disabled="disabled" value={inputs.urgency} />
                </Form.Group>
              </Col>
            </Row>
            <Form.Group className="mb-3" controlId="formGridAddress2">
              <Form.Label>Address</Form.Label>
              <Form.Control disabled="disabled" value={inputs.address} />
            </Form.Group>

            {/* <Form.Group as={Col} controlId="formGridZip">
              <Form.Label>Image</Form.Label>
              <img
                className="img-fluid mb-3"
                src={URL.createObjectURL(inputs.image)}
              ></img>
            </Form.Group> */}
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
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
                .filter((data) => data.indexOf("jpeg") !== -1)
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
            </div>
          </Form>
          <br />
          <br />
          <br />
          <div>
            <table class="table">
              <tr
                class="table"
                style={{
                  display: "grid",
                  gridTemplateColumns: " auto auto",
                }}
              >
                <th scope="col">User Id</th>
                <th scope="col">Chats</th>
              </tr>
              <tbody>
                {messages.map((data) => (
                  <tr
                    style={{
                      display: "grid",
                      gridTemplateColumns: " auto auto",
                    }}
                  >
                    <td> {data}</td>
                    <td>
                      <Button
                        variant="secondary"
                        onClick={() => setUid(String(data))}
                      >
                        Show Chat
                      </Button>
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
      {uid && <Chat uid={uid} collec="alertChats"></Chat>}
    </div>
  ) : (
    <div>Loading...</div>
  );
};

export { AlertDetails };
