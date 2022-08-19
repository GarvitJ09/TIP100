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
const AlertDetails = () => {
  const id = useParams().id;
  const navigate = useNavigate();
  const [inputs, setInputs] = useState({
    group: "",
    description: "",
    headline: "",
    image: "",
    address: "",
    city: "",
    state: "",
    zip: "",
  });

  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const fetchDetails = async () => {
    const res = await axios
      .get(`http://localhost:5000/api/alerts/${id}`)
      .catch((err) => console.log(err));
    const data = await res.data;
    console.log(data);
    return data;
  };
  useEffect(() => {
    fetchDetails().then((data) => {
      setInputs({
        group: data.alerts.group,
        description: data.alerts.description,
        headline: data.alerts.headline,
        image: data.alerts.image,
        address: data.alerts.address,
        city: data.alerts.city,
        state: data.alerts.state,
        zip: data.alerts.zip,
      });
    });
    //eslint-disable-next-line
  }, [id]);

  const updateAlert = async () => {
    const res = await axios
      .put(`http://localhost:5000/api/alerts/${id}`, {
        group: inputs.group,
        description: inputs.description,
        headline: inputs.headline,
        image: inputs.image,
        address: inputs.address,
        city: inputs.city,
        state: inputs.state,
        zip: inputs.zip,
      })
      .catch((err) => console.log(err));
    const data = await res.data;
    return data;
  };

  const deleteRequest = async () => {
    const res = await axios
      .delete(`http://localhost:5000/api/alerts/${id}`)
      .catch((err) => console.log(err));
    const data = await res.data;
    console.log(data);
    return data;
  };
  const handleDelete = () => {
    deleteRequest()
      .then((data) => console.log(data))
      .then(() => navigate("/alerts"));
  };
  const imageChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.files[0],
    }));
  };
  return (
    <div className="dashboard-parent-div">
      <Row>
        <Col lg={2}>
          <Sidebar />
        </Col>
        <Col className="dashboard-home-content" lg={10}>
          <h4>Alert</h4>
          <Box display="flex">
            <IconButton onClick={handleDelete}>
              <DeleteForeverIcon></DeleteForeverIcon> Delete Alert
            </IconButton>
          </Box>
          <Form onSubmit={updateAlert}>
            <Row className="mb-3">
              <Form.Group as={Col} controlId="formGridEmail">
                <Form.Label>Headline</Form.Label>
                <Form.Control
                  value={inputs.headline}
                  name="headline"
                  onChange={handleChange}
                  type="text"
                  placeholder="Enter Headline"
                />
              </Form.Group>

              <Form.Group as={Col} controlId="formGridPassword">
                <Form.Label>Group</Form.Label>
                <Form.Select
                  value={inputs.group}
                  name="group"
                  onChange={handleChange}
                >
                  <option>Robbery</option>
                  <option>Murder</option>
                  <option>Kidnapping</option>
                </Form.Select>
              </Form.Group>
            </Row>

            <Form.Group className="mb-3" controlId="formGridAddress1">
              <Form.Label>Description</Form.Label>
              <Form.Control
                value={inputs.description}
                name="description"
                onChange={handleChange}
                placeholder="Description"
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formGridAddress2">
              <Form.Label>Address</Form.Label>
              <Form.Control
                value={inputs.address}
                name="address"
                onChange={handleChange}
                placeholder="sector 62"
              />
            </Form.Group>

            <Row className="mb-3">
              <Form.Group as={Col} controlId="formGridCity">
                <Form.Label>City</Form.Label>
                <Form.Control
                  value={inputs.city}
                  name="city"
                  onChange={handleChange}
                  type="text"
                  placeholder="Enter City"
                />
              </Form.Group>

              <Form.Group as={Col} controlId="formGridState">
                <Form.Label>State</Form.Label>
                <Form.Control
                  value={inputs.state}
                  name="state"
                  onChange={handleChange}
                  type="text"
                  placeholder="Enter State"
                />
              </Form.Group>

              <Form.Group as={Col} controlId="formGridZip">
                <Form.Label>Zip</Form.Label>
                <Form.Control
                  value={inputs.zip}
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
                {/* <img
                  className="img-fluid mb-3"
                  src={URL.createObjectURL(inputs.image)}
                ></img> */}

                <Form.Control onChange={imageChange} type="file" />
              </Form.Group>
            </Row>
            <Button className="mt-3" variant="danger" type="submit">
              Update
            </Button>
          </Form>
        </Col>
      </Row>
    </div>
  );
};

export { AlertDetails };
