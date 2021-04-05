import React, { useState } from "react";

import axios from "axios";
import { useHistory, Redirect,Link } from "react-router-dom";
import "./dashboard.css";
function Dashboard() {
  let history = useHistory();

  const [state, setState] = useState({
    email: "",
    password: "",
    name: "",
    hobbie: "",
  });

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
  const handleSubmit = (evt) => {
    console.log(state);

    axios

      .post(
        "http://localhost:3004/users",

        {
          email: state.email,
          password: state.password,
          name: state.name,
          hobbie: state.hobbie,
        }
      )
      .then((response) => {
        console.log(response);

        history.push("/admin/table");
      })

      .catch((error) => {
        console.log(error);
      });

    evt.preventDefault();
  };
  const handleLogout = (e) => {
    localStorage.removeItem("role");
    history.push("/");
    e.preventDefault();
  };
  if (localStorage.getItem("role") != "admin") {
    return <Redirect to="/" />;
  }
  return (
    <>
      <div class="dashboard-parent">
        <div className="btn-logout">
          <button onClick={handleLogout} className="btn-log">
            Logout
          </button>
        </div>
        <Link to="/admin/table">
        <p>Go to Table</p>
      </Link>
        <div className="wrapper">
          <div className="section1">
            <h5 className="card_header"> Create User</h5>

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
              <div style={{ marginTop: "20px" }}>
                <input
                  type="submit"
                  id="btn2"
                  className="col-sm-8 offset-sm-2"
                  value="Create"
                />
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default Dashboard;
