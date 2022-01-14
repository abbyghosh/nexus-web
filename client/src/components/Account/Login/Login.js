import React, { useContext, useState } from "react";

import axiosConfig from "../../../axiosConfig";
import { GlobalContext } from "../../../context/GlobalState";

import FormControl from "../../common/FormFields/FormControl";
import Button from "../../common/Button/Button";

import { ReactComponent as LoginIcon } from "../../../assets/icons/login.svg";
import { ReactComponent as UserIcon } from "../../../assets/icons/user-icon.svg";
import { ReactComponent as PasswordIcon } from "../../../assets/icons/password-round-icon.svg";

import { LOGIN } from "../../../utils/api";

function Login({ handleCLose }) {
  let {
    users: { setUserDetails },
    toast: { toastDispatch },
  } = useContext(GlobalContext);

  const [loginInputs, setLoginInputs] = useState({
    email: "",
    password: "",
  });

  const [submitting, setSubmitting] = useState(false);

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
      setSubmitting(true);
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
    } catch ({ response: res }) {
      let errMsg = res.status === 401 ? res.data.message : JSON.stringify(res.data);

      toastDispatch({
        type: "ERROR",
        payload: errMsg,
      });
    } finally {
      setSubmitting(false);
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
          icon={UserIcon}
          required
        />
        <FormControl
          control="input"
          type="password"
          name="password"
          value={loginInputs.password}
          onChange={handleChange}
          placeholder="Enter password"
          icon={PasswordIcon}
          required
        />
        <Button type="submit" rightIcon={<LoginIcon width="20" />} disabled={submitting}>
          Login
        </Button>
      </form>
    </div>
  );
}

export default Login;
