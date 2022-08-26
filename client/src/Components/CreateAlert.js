import React, { useState } from "react";
import axios from "axios";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "../firebase-config";
import Sidebar from "./Sidebar";
const CreateAlert = () => {
  const [inputs, setInputs] = useState({
    group: "Robbery",
    headline: "",
    description: "",
    address: "",
    city: "",
    state: "",
    zip: "",
  });
  const [image, setImage] = useState();
  const imageChange = (e) => {
    setImage(e.target.files[0]);
    console.log(image);
  };
  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const sendRequest = async (url) => {
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
    const data = await res.data;
    return data;
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(inputs);
    const storageRef = ref(storage, `Images/${image.name}`);
    uploadBytes(storageRef, image).then((snapshot) => {
      getDownloadURL(ref(storage, `Images/${image.name}`)).then((url) => {
        sendRequest(url);
        console.log(url);
      });
      alert("Upload successful");
    });
  };

  return (
    <div className="dashboard-parent-div">
      <Row>
        <Col lg={2}>
          <Sidebar />
        </Col>
        <Col className="dashboard-home-content" lg={10}>
          <h4>Create Alert</h4>
          <Form onSubmit={handleSubmit}>
            <Row className="mb-3">
              <Form.Group as={Col} controlId="formGridEmail">
                <Form.Label>Headline</Form.Label>
                <Form.Control
                  name="headline"
                  onChange={handleChange}
                  type="text"
                  placeholder="Enter Headline"
                />
              </Form.Group>

              <Form.Group as={Col} controlId="formGridPassword">
                <Form.Label>Group</Form.Label>
                <Form.Select name="group" onChange={handleChange}>
                  <option>Robbery</option>
                  <option>Murder</option>
                  <option>Kidnapping</option>
                </Form.Select>
              </Form.Group>
            </Row>

            <Form.Group className="mb-3" controlId="formGridAddress1">
              <Form.Label>Description</Form.Label>
              <Form.Control
                name="description"
                onChange={handleChange}
                placeholder="Description"
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formGridAddress2">
              <Form.Label>Address</Form.Label>
              <Form.Control
                name="address"
                onChange={handleChange}
                placeholder="sector 62"
              />
            </Form.Group>

            <Row className="mb-3">
              <Form.Group as={Col} controlId="formGridCity">
                <Form.Label>City</Form.Label>
                <Form.Control
                  name="city"
                  onChange={handleChange}
                  type="text"
                  placeholder="Enter City"
                />
              </Form.Group>

              <Form.Group as={Col} controlId="formGridState">
                <Form.Label>State</Form.Label>
                <Form.Control
                  name="state"
                  onChange={handleChange}
                  type="text"
                  placeholder="Enter State"
                />
              </Form.Group>

              <Form.Group as={Col} controlId="formGridZip">
                <Form.Label>Zip</Form.Label>
                <Form.Control
                  name="zip"
                  onChange={handleChange}
                  type="text"
                  placeholder="Enter Postal"
                />
              </Form.Group>
            </Row>
            <Row>
              <Form.Group as={Col} controlId="formGridZip">
                <Form.Label>Image</Form.Label>
                {image && (
                  <img
                    className="img-fluid mb-3"
                    src={URL.createObjectURL(image)}
                  ></img>
                )}
                <Form.Control onChange={imageChange} type="file" />
              </Form.Group>
            </Row>
            <Button className="mt-3" variant="danger" type="submit">
              Submit
            </Button>
          </Form>
        </Col>
      </Row>
    </div>
  );
};

export default CreateAlert;
