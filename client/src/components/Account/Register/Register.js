import React, { useContext, useState } from "react";

import axiosConfig from "../../../axiosConfig";
import { GlobalContext } from "../../../context/GlobalState";

import FormControl from "../../common/FormFields/FormControl";
import Button from "../../common/Button/Button";

import { ReactComponent as RegisterIcon } from "../../../assets/icons/send-icon.svg";
import { ReactComponent as UserIcon } from "../../../assets/icons/user-icon.svg";
import { ReactComponent as PasswordIcon } from "../../../assets/icons/password-round-icon.svg";
import { ReactComponent as MailIcon } from "../../../assets/icons/mail-circle-icon.svg";

import { REGISTER } from "../../../utils/api";

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

  const [submitting, setSubmitting] = useState(false);

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
        setSubmitting(true);
        const { data } = await axiosConfig.post(REGISTER, body);
        console.log("Submitted", data);
        toastDispatch({
          type: "SUCCESS",
          payload: "Successfully registered. Please login with the credentials.",
        });
        handleCLose();
      } catch ({ response: res }) {
        let errMsg = res.status === 409 ? res.data.message : JSON.stringify(res.data);

        toastDispatch({
          type: "ERROR",
          payload: errMsg,
        });
      } finally {
        setSubmitting(false);
      }
    } else setErrors((prev) => ({ ...prev, confirmPassword: "Passwords don't match" }));
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
          icon={UserIcon}
          required
        />
        <FormControl
          control="input"
          type="text"
          name="email"
          value={registrationInputs.email}
          onChange={handleChange}
          placeholder="Enter email"
          icon={MailIcon}
          required
        />
        <FormControl
          control="input"
          type="password"
          name="password"
          value={registrationInputs.password}
          onChange={handleChange}
          placeholder="Enter password"
          icon={PasswordIcon}
          required
        />
        <FormControl
          control="input"
          type="password"
          name="confirmPassword"
          value={registrationInputs.confirmPassword}
          onChange={handleChange}
          placeholder="Confirm Password"
          icon={PasswordIcon}
          error={errors.confirmPassword}
          required
        />
        <Button type="submit" rightIcon={<RegisterIcon width="20" />} disabled={submitting}>
          Register
        </Button>
      </form>
    </div>
  );
}

export default Register;
