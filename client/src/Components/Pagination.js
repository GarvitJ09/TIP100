import React from "react";
import { Button } from "react-bootstrap";

const Pagination = ({ postsPerPage, totalPosts, paginate }) => {
  console.log(postsPerPage, totalPosts);
  console.log(Math.ceil(totalPosts / postsPerPage));
  let pageNumbers = [];
  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pageNumbers.push(i);
  }
  console.log(pageNumbers);
  return (
    <div
      style={
        {
          // display: "flex",
          // justifyContent: "center",
          // alignItems: "center",
          // position: "fixed",
          // margin: "auto",
          // bottom: "4px",
        }
      }
    >
      <nav>
        <ul className="pagination">
          {pageNumbers.map((number) => (
            <li key={number} className="page-item">
              <Button
                onClick={() => paginate(number)}
                className="page-link"
                style={{
                  margin: "5px",
                  backgroundColor: "#c01313d5",
                  color: "white",
                }}
              >
                {number}
              </Button>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default Pagination;
