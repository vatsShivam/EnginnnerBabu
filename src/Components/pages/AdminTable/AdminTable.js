import React, { useState, useEffect } from "react";
import { Modal } from "reactstrap";
import axios from "axios";
import { Redirect, Link } from "react-router-dom";
import '../../App.css';
import ReactPaginate from "react-paginate";

function Table() {
  const [data, setData] = useState([]);

  const [show, setShow] = useState(false);
  const [state, setState] = useState({
    email: "",
    password: "",
    name: "",
    hobbie: "",
    id: "",
  });
  const [pageIndex, setPageIndex] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const adminFields = [
    {
      name: "email",
      label: "Email",
      required: true,
      placeholder: "Enter Your email",
      type: "email",
    },

    {
      name: "password",
      label: "Password",
      required: true,
      placeholder: "Password",
      type: "password",
    },
    {
      name: "name",
      label: "Name",
      required: true,
      placeholder: "Name",
      type: "text",
    },
    {
      name: "hobbie",
      label: "Hobbie",
      required: true,
      placeholder: "Hobbie",
      type: "text",
    },
  ];
  const handleChangeUser = (e) => {
    const name = e.target.name;
    setState({
      ...state,
      [name]: e.target.value,
    });
  };
  const handlePageClick = (event) => {
    setPageIndex(event.selected);
  };
  const handleSubmit = (e) => {
    axios

      .put(
        `http://localhost:3004/users/${state.id}`,

        {
          email: state.email,
          password: state.password,
          name: state.name,
          hobbie: state.hobbie,
        }
      )
      .then((response) => {
        getUsers();
        setShow(!show);
        resetState();
      })

      .catch((error) => {
        console.log(error);
      });

    e.preventDefault();
  };
  const removeData = (id) => {
    axios

      .delete(`http://localhost:3004/users/${id}`)

      .then((response) => {
        getUsers();
      })

      .catch((error) => {
        console.log(error);
      });
  };
  const editData = (id) => {
    setShow(!show);
    axios

      .get(`http://localhost:3004/users/${id}`)

      .then((response) => {
        setState({
          id: response.data.id,
          password: response.data.password,
          name: response.data.name,
          hobbie: response.data.hobbie,
          email: response.data.email,
        });
      })

      .catch((error) => {
        console.log(error);
      });
  };
  const getUsers = () => {
    axios

      .get("http://localhost:3004/users")

      .then((response) => {
        console.log(response.data);

        setData(response.data);
      })

      .catch((error) => {
        console.log(error);
      });
  };
  const renderData = () => {
    if (data.length > 0) {
      return data
        .slice(pageIndex * pageSize, pageIndex * pageSize + pageSize)
        .map(({ id, name, email, hobbie }) => {
          return (
            <tr key={id}>
              <td>{id}</td>
              <td>{name}</td>
              <td>{email}</td>

              <td>{hobbie}</td>
              <td onClick={() => editData(id)}>Edit</td>
              <td onClick={() => removeData(id)}>Delete</td>
            </tr>
          );
        });
    }
  };
  const resetState = () => {
    setState({ id: "", email: "", password: "", hobbie: "", name: "" });
  };
  useEffect(() => {
    getUsers();
  }, []);

  let paginationElement = (
    <ReactPaginate
      previousLabel={"← Previous"}
      nextLabel={"Next →"}
      //breakLabel={}
      forcePage={pageIndex}
      pageCount={data.length / 10}
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
  if(localStorage.getItem("role")!="admin"){
    return  <Redirect to="/"/>
 }
  return (
    <div className="table-parent">
      <Link to="/admin/dashboard">
        <p>Back</p>
      </Link>
      <h1 style={{ textAlign: "center" }}>List of Users</h1>

      <table class="table">
        <Modal
          isOpen={show}
          toggle={resetState}
          style={{ border: "none", marginTop: "200px" }}
        >
          <h1 style={{ textAlign: "center", marginTop: "20px" }}>Edit User </h1>
          <form onSubmit={handleSubmit} style={{ marginTop: "50px" }}>
            {adminFields.map((field) => (
              <div row key={field.name} style={{ marginTop: "15px" }}>
                <label className="offset-sm-2">
                  {field.label}
                  {field.required ? "*" : ""}
                </label>

                <input
                  type={field.type}
                  name={field.name}
                  id={field.name}
                  required={field.required}
                  placeholder={field.placeholder}
                  className="form-control col-sm-8 offset-sm-2"
                  onChange={handleChangeUser}
                  value={state[field.name]}
                />
              </div>
            ))}
            <div className="row" style={{ marginTop: "20px" }}>
              <input
                type="submit"
                id="btn2"
                className="col-sm-8 offset-sm-2"
                value="Edit"
              />
            </div>
          </form>
        </Modal>
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Name</th>
            <th scope="col">Email</th>
            <th scope="col">Hobbie</th>
            <th scope="col">Edit</th>
            <th scope="col">Delete</th>
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
