import React, { useState, useEffect } from "react";
import "./Checkbox.css";

const CheckBox = (props) => {
  const [checked, setChecked] = useState(props.checked || false);

  const handleCheckboxChange = () => {
    const newChecked = !checked;
    setChecked(newChecked);
    if (props.onChange) {
      props.onChange(newChecked);
    }
  };

  useEffect(() => {
    setChecked(props.checked || false);
  }, [props.checked]);

  return (
    <div className="round">
      <input
        value={checked}
        checked={checked}
        onChange={handleCheckboxChange}
        type="checkbox"
      />
      <label
        className={`checkbox ${checked ? "checkbox--active" : ""}`}
        htmlFor="checkbox"
      ></label>
    </div>
  );
};

export default CheckBox;
