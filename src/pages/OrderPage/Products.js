import React from "react";

function Products({ name, imagePath }) {
  return (
    <div style={{ textAlign: "center" }}>
      <img
        style={{ width: "75%" }}
        src={`http://localhost:5000/${imagePath}`}
        alt={`${name} product`}
      ></img>
      <form>
        <label style={{ textAlign: "right" }}>{name}</label>
        <input
          style={{ marginLeft: 7 }}
          type="number"
          name="quantity"
          defaultValue="0"
          min="0"
        />
      </form>
    </div>
  );
}

export default Products;
