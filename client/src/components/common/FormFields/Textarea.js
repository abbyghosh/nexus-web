import { useState } from "react";

import ErrorMsg from "./ErrorMsg";

import "./formField.scss";

function Textarea({
  type,
  label,
  name,
  id,
  value,
  onChange,
  required,
  errors,
  placeholder,
  ...props
}) {
  const [visited, setVisited] = useState(false);

  return (
    <div className="form-group">
      {label && <label htmlFor={id}>{label}</label>}

      <div>
        <textarea
          type={type}
          name={name}
          id={id}
          value={value}
          onChange={onChange}
          onBlur={() => {
            setVisited(true);
          }}
          placeholder={placeholder}
          autoComplete="off"
          required={required}
          {...props}
        />
        {visited && errors?.map((error) => <ErrorMsg key={error}>{error}</ErrorMsg>)}
      </div>
    </div>
  );
}

export default Textarea;
