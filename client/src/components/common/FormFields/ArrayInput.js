import { useState } from "react";
import Button from "../Button/Button";

import ErrorMsg from "./ErrorMsg";

import "./formField.scss";

function ArrayInput({
  type,
  label,
  name,
  id,
  values,
  onChange,
  handleInsert,
  required,
  error,
  placeholder,
  icon: Icon,
  ...props
}) {
  const [input, setInput] = useState("");
  const [visited, setVisited] = useState(false);

  const handleInsertValue = () => {
    if (input.trim().length && !values[name].includes(input)) {
      handleInsert((prev) => ({ ...prev, [name]: [...prev[name], input] }));
      setInput("");
    }
  };

  return (
    <div className="form-group">
      {label && (
        <label htmlFor={id}>
          {label}
          {required && <span>*</span>}
        </label>
      )}

      <div>
        <div className="inlined">
          {Icon && (
            <label htmlFor={name}>
              <Icon />
            </label>
          )}
          <input
            type={type}
            name={name}
            id={name}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(event) => {
              if (event.key === "Enter") {
                handleInsertValue();
              }
            }}
            onBlur={() => {
              setVisited(true);
            }}
            autoComplete="off"
            placeholder={placeholder}
            {...props}
          />
          <Button onClick={() => handleInsertValue()}>+</Button>
        </div>

        <div className="badges">
          {values[name].map((ele) => (
            <span key={ele}>{ele}</span>
          ))}
        </div>
        {error && <ErrorMsg key={error}>{error}</ErrorMsg>}
      </div>
    </div>
  );
}

export default ArrayInput;
