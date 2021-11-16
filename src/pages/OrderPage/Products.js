import React from "react";

function Products({ name, imagePath, updateItemCount }) {
  const handler = (e) => {
    const count = e.target.value;
    updateItemCount(name, count);
  };
  return (
    <div style={{ textAlign: "center" }}>
      <img
        style={{ width: "75%" }}
        src={`http://localhost:5000/${imagePath}`}
        alt={`${name} product`}
      ></img>
      <form>
        <label htmlFor={name} style={{ textAlign: "right" }}>
          {name}
        </label>
        <input
          style={{ marginLeft: 7 }}
          type="number"
          name="quantity"
          defaultValue="0"
          min="0"
          onChange={(e) => {
            handler(e);
          }}
        />
      </form>
    </div>
  );
}

export default Products;
