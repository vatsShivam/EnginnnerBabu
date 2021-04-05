import React, { useState } from "react";

import { Redirect } from "react-router-dom";
import ReactPaginate from "react-paginate";
import { useHistory } from "react-router-dom";
import { data } from "./data";
import "../../App.css";

function Table() {
  let history = useHistory();

  const [pageIndex, setPageIndex] = useState(0);
  const [pageSize, setPageSize] = useState(50);

  const handlePageClick = (event) => {
    setPageIndex(event.selected);
  };

  const renderData = () => {
    if (data.length > 0) {
      return data
        .slice(pageIndex * pageSize, pageIndex * pageSize + pageSize)
        .map(({ Player_Name, DOB, Bowling_Skill, Country }) => {
          return (
            <tr>
              <td>{Player_Name}</td>
              <td>{DOB}</td>

              <td>{Bowling_Skill}</td>
              <td>{Country}</td>
            </tr>
          );
        });
    }
  };

  let paginationElement = (
    <ReactPaginate
      previousLabel={"← Previous"}
      nextLabel={"Next →"}
      //breakLabel={}
      forcePage={pageIndex}
      pageCount={data.length / 50}
      pageRangeDisplayed={10}
      onPageChange={(event) => handlePageClick(event)}
      marginPagesDisplayed={6}
      breakClassName={"page-item"}
      breakLinkClassName={"page-link"}
      containerClassName={"pagination"}
      pageClassName={"page-item"}
      pageLinkClassName={"page-link"}
      previousClassName={"page-item"}
      previousLinkClassName={"page-link"}
      nextClassName={"page-item"}
      nextLinkClassName={"page-link"}
      activeClassName={"active"}
    />
  );
  const handleLogout = (e) => {
    localStorage.removeItem("role");
    history.push("/user");
    e.preventDefault();
  };

  if (localStorage.getItem("role") != "user") {
    return <Redirect to="/user" />;
  }

  return (
    <div className="table-parent">
      <p onClick={handleLogout}> Logout</p>

      <h1 style={{ textAlign: "center" }}>List of Players</h1>

      <table class="table">
        <thead>
          <tr>
            <th scope="col">Name</th>
            <th scope="col">DOB</th>
            <th scope="col">Bowling_Skill</th>
            <th scope="col">Country</th>
          </tr>
        </thead>

        <tbody>{renderData()}</tbody>
      </table>
      <div className="pager d-flex justify-content-center py-5">
        {paginationElement}
      </div>
    </div>
  );
}

export default Table;
