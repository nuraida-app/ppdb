import React, { useState } from "react";
import PropTypes from "prop-types";

const InputComponent = ({
  placeholder = "Cari ...",
  className = "form-control",
  onValueChange,
  ...rest
}) => {
  const [value, setValue] = useState("");

  const handleChange = (e) => {
    const newValue = e.target.value;
    setValue(newValue);
    if (onValueChange) {
      onValueChange(newValue);
    }
  };

  return (
    <div>
      <input
        type="text"
        value={value}
        onChange={handleChange}
        className={className}
        placeholder={placeholder}
        {...rest}
      />
    </div>
  );
};

InputComponent.propTypes = {
  placeholder: PropTypes.string,
  className: PropTypes.string,
  onValueChange: PropTypes.func,
};

export default InputComponent;
