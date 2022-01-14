import { useState } from "react";

import ErrorMsg from "./ErrorMsg";

import "./formField.scss";

function Input({ type, label, name, id, value, onChange, required, error, placeholder, ...props }) {
  const [visited, setVisited] = useState(false);

  return (
    <div className="form-group">
      {label && (
        <label htmlFor={id}>
          {label}
          {required && <span>*</span>}
        </label>
      )}

      <div>
        <input
          type={type}
          name={name}
          id={id}
          value={value}
          onChange={onChange}
          onBlur={() => {
            setVisited(true);
          }}
          autoComplete="off"
          placeholder={placeholder}
          required={required}
          {...props}
        />
        {error && <ErrorMsg key={error}>{error}</ErrorMsg>}
      </div>
    </div>
  );
}

export default Input;
