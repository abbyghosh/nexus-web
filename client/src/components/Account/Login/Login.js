import React, { useContext, useState } from "react";

import axiosConfig from "../../../axiosConfig";
import { GlobalContext } from "../../../context/GlobalState";

import FormControl from "../../common/FormFields/FormControl";
import Button from "../../common/Button/Button";

import { ReactComponent as LoginIcon } from "../../../assets/icons/login.svg";

import { LOGIN } from "../../../utils/api";

import "./login.scss";

function Login({ handleCLose }) {
  let {
    users: { setUserDetails },
    toast: { toastDispatch },
  } = useContext(GlobalContext);

  const [loginInputs, setLoginInputs] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginInputs((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let body = {
      email: loginInputs.email,
      password: loginInputs.password,
    };
    try {
      const {
        data: { result },
      } = await axiosConfig.post(LOGIN, body);
      console.log("Submitted", result);
      localStorage.setItem("user", JSON.stringify(result));
      setUserDetails(result);
      toastDispatch({
        type: "SUCCESS",
        payload: "Logged in successfully.",
      });
      handleCLose();
    } catch (err) {
      console.log("Error in login ", err);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="login-form">
        <FormControl
          control="input"
          type="text"
          name="email"
          value={loginInputs.email}
          onChange={handleChange}
          placeholder="Enter email"
          required
        />
        <FormControl
          control="input"
          type="password"
          name="password"
          value={loginInputs.password}
          onChange={handleChange}
          placeholder="Enter password"
          required
        />
        <Button type="submit" rightIcon={<LoginIcon width="20" />}>
          Login
        </Button>
      </form>
    </div>
  );
}

export default Login;
