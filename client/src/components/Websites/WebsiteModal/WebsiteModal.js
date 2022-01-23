import React, { useContext, useState } from "react";
import axiosConfig from "../../../axiosConfig";
import { GlobalContext } from "../../../context/GlobalState";
import { WESBITE } from "../../../utils/api";
import Button from "../../common/Button/Button";
import FormControl from "../../common/FormFields/FormControl";

function WebsiteModal({ handleCLose }) {
  let {
    toast: { toastDispatch },
  } = useContext(GlobalContext);
  let names = {
    NAME: "name",
    URL: "url",
    DESCRIPTION: "description",
    TAGS: "tags",
  };

  const [websiteInputs, setWebsiteInputs] = useState({
    [names.NAME]: "",
    [names.URL]: "",
    [names.DESCRIPTION]: "",
    [names.TAGS]: [],
  });

  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setWebsiteInputs((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setSubmitting(true);
      const {
        data: { message, result },
      } = await axiosConfig.post(WESBITE, websiteInputs);
      toastDispatch({
        type: "SUCCESS",
        payload: message,
      });
      handleCLose();
    } catch ({ response: res }) {
      let errMsg = res.status === 401 ? res.data.message : JSON.stringify(res.data);

      setSubmitting(false);
      toastDispatch({
        type: "ERROR",
        payload: errMsg,
      });
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="login-form">
        <FormControl
          control="input"
          type="text"
          name={names.NAME}
          value={websiteInputs[names.NAME]}
          onChange={handleChange}
          placeholder="Enter website name"
          //icon={UserIcon}
          required
        />
        <FormControl
          control="input"
          type="text"
          name={names.URL}
          value={websiteInputs[names.URL]}
          onChange={handleChange}
          placeholder="Enter website url"
          //icon={PasswordIcon}
          required
        />
        <FormControl
          control="input"
          type="text"
          name={names.DESCRIPTION}
          value={websiteInputs[names.DESCRIPTION]}
          onChange={handleChange}
          placeholder="Enter website description"
          //icon={PasswordIcon}
          required
        />
        <FormControl
          control="array"
          type="text"
          name={names.TAGS}
          values={websiteInputs}
          handleInsert={setWebsiteInputs}
          placeholder="Enter website tag"
          //icon={PasswordIcon}
        />
        <Button type="submit" disabled={submitting}>
          Add
        </Button>
      </form>
    </div>
  );
}

export default WebsiteModal;
