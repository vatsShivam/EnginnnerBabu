import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import "./login.css";
function AdminLogin() {
  let history = useHistory();
  let admin_cred = {
    email: "admin@admin.com",
    password: 1234,
  };
  const [state, setState] = useState({
    email: "",
    password: "",
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
  ];
  const handleChangeUser = (e) => {
    const name = e.target.name;
    setState({
      ...state,
      [name]: e.target.value,
    });
  };
  const handleSubmit = (evt) => {
   
    if (
      state.email === admin_cred.email &&
      state.password == admin_cred.password
    ) {
      localStorage.setItem("role", "admin");
      history.push("/admin/dashboard");
    }
   
    evt.preventDefault();
  };

  return (
    <>
      <div className="wrapper">
        <div className="section1">
          <h5 className="card_header"> Login in as Super Admin</h5>

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
                value="Register"
              />
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default AdminLogin;
