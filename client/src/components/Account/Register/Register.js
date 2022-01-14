import React, { useContext, useState } from "react";

import axiosConfig from "../../../axiosConfig";

import FormControl from "../../common/FormFields/FormControl";
import Button from "../../common/Button/Button";

import { REGISTER } from "../../../utils/api";

import "./register.scss";
import { GlobalContext } from "../../../context/GlobalState";

function Register({ handleCLose }) {
  let {
    toast: { toastDispatch },
  } = useContext(GlobalContext);

  const [registrationInputs, setRegistrationInputs] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [registeredSuccessMsg, setRegisteredSuccessMsg] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRegistrationInputs((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (registrationInputs.password === registrationInputs.confirmPassword) {
      let body = {
        name: registrationInputs.name,
        email: registrationInputs.email,
        password: registrationInputs.password,
      };

      try {
        const { data } = await axiosConfig.post(REGISTER, body);
        console.log("Submitted", data);
        toastDispatch({
          type: "SUCCESS",
          payload: "Successfully registered. Please login with the credential.",
        });
      } catch (err) {
        console.log("Error in login ", err);
      }
    }
    setErrors((prev) => ({ ...prev, confirmPassword: "Passwords don't match" }));
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="register-form">
        <FormControl
          control="input"
          type="text"
          name="name"
          value={registrationInputs.name}
          onChange={handleChange}
          placeholder="Enter name"
          required
        />
        <FormControl
          control="input"
          type="text"
          name="email"
          value={registrationInputs.email}
          onChange={handleChange}
          placeholder="Enter email"
          required
        />
        <FormControl
          control="input"
          type="password"
          name="password"
          value={registrationInputs.password}
          onChange={handleChange}
          placeholder="Enter password"
          required
        />
        <FormControl
          control="input"
          type="password"
          name="confirmPassword"
          value={registrationInputs.confirmPassword}
          onChange={handleChange}
          placeholder="Confirm Password"
          error={errors.confirmPassword}
          required
        />
        <Button type="submit">Register</Button>
      </form>
    </div>
  );
}

export default Register;
