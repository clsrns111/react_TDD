import React, { useContext } from "react";
import { OrderContext } from "../../context/OrderContext";
import Type from "./Type";

function OrderPage({ setstep }) {
  const [orderDatas] = useContext(OrderContext);
  return (
    <div>
      <h1>Travel Products</h1>
      <div>
        <Type orderType="products" />
      </div>
      <div style={{ display: "flex", paddingTop: "100px" }}>
        <div style={{ width: "50%" }}>
          <Type orderType="options" />
        </div>
        <div>
          <h2>Total Price: {orderDatas.totals.totals}</h2>
          <button
            onClick={() => {
              setstep(1);
            }}
          >
            주문
          </button>
        </div>
      </div>
    </div>
  );
}

export default OrderPage;
