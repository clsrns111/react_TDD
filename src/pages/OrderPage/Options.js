import React from "react";

function Options({ name, updateItemCount }) {
  return (
    <div>
      <input
        type="checkbox"
        id={`${name} option`}
        onChange={(e) => updateItemCount(name, e.target.checked ? 1 : 0)}
      ></input>{" "}
      <label htmlFor={`${name} option`}>{name}</label>
    </div>
  );
}

export default Options;
