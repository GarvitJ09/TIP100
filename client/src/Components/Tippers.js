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
import TipperPagination from "./TipperPagination";
import Pagination from "./Pagination";
import axios from "axios";

const Tippers = () => {
  const renderTooltip = (props) => (
    <Tooltip id="button-tooltip" {...props}>
      Score
    </Tooltip>
  );
  const [info, setInfo] = useState([]);
  const sendRequest = async () => {
    setLoading(true);
    const res = await axios
      .get("https://tip100.herokuapp.com/getAllTippers")
      .catch((err) => console.log(err));
    const data = await res.data;
    console.log(data);
    setLoading(false);
    console.log(res);
    return data;
  };
  useEffect(() => {
    sendRequest().then((data) => setInfo(data));
  }, []);
  console.log(info.data);

  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(2);
  const indexOfLastPost = currentPage * postsPerPage;

  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = info.slice(indexOfFirstPost, indexOfLastPost);
  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  return (
    <div>
      <TipperPagination info={info} loading={loading}></TipperPagination>
      <Pagination
        postsPerPage={postsPerPage}
        totalPosts={info.length}
        paginate={paginate}
      />
    </div>
  );
};

export default Tippers;
