import React, { useState, useEffect } from "react";
import { Alert } from "reactstrap";
import axios from "axios";
import { useHistory } from "react-router-dom";
import "./login.css";
function Login() {
  let history = useHistory();
  const [state, setState] = useState({
    email: "",
    password: "",
  });
  const [show, setShow] = useState(false);
  const userFields = [
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
  ];
  const handleChangeUser = (e) => {
    setShow(false);
    const name = e.target.name;
    setState({
      ...state,
      [name]: e.target.value,
    });
  };
  const handleSubmit = (evt) => {
    console.log(state);

    axios

      .get(`http://localhost:3004/users?email=${state.email}`)

      .then((response) => {
        console.log(response.data);
        if (response.data.length > 0) {
          localStorage.setItem("role", "user");

          history.push("/user/view");
          setState({
            email: "",
            password: "",
          });
        } else {
          setShow(true);
        }
      })

      .catch((error) => {
        console.log(error);
      });
    evt.preventDefault();
  };

  return (
    <>
      <div className="wrapper">
        <div className="section1">
          <Alert
            className="col-sm-8 offset-sm-2"
            isOpen={show}
            color="warning"
            style={{ marginTop: "50px" }}
          >
            You are enterning an invalid email
          </Alert>
          <h5 className="card_header"> Login in as a User</h5>

          <form onSubmit={handleSubmit} style={{ marginTop: "50px" }}>
            {userFields.map((field) => (
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
                value="Register"
              />
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default Login;
