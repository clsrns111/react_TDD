import React from "react";

function Options({ name }) {
  return (
    <div>
      <input type="checkbox" id={`${name} option`}></input>{" "}
      <label htmlFor={`${name} option`}>{name}</label>
    </div>
  );
}

export default Options;
