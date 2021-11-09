import React, { useState, useEffect } from "react";
import axios from "axios";
import Products from "./Products";
import ErrorBanner from "../../components/ErrorBanner";
import Options from "./Options";

function Type({ orderType }) {
  const [items, setitem] = useState([]);
  const [error, seterror] = useState(false);

  useEffect(() => {
    loadItems(orderType);
  }, [orderType]);

  const loadItems = async (orderType) => {
    try {
      let respons = await axios.get(`http://localhost:5000/${orderType}`);
      setitem(respons.data);
    } catch (error) {
      seterror(true);
      console.log(error);
    }
  };

  if (error) {
    return <ErrorBanner message="에러가 발생하였습니다." />;
  }

  const ItemComponent = orderType === "products" ? Products : Options;
  const optionItems = items.map((item) => {
    return (
      <ItemComponent
        key={item.name}
        name={item.name}
        imagePath={item.imagePath}
      />
    );
  });

  return (
    <div>
      <h2>주문 종류</h2>
      <p>하나의 가격:</p>
      <p>상품 총 가격:</p>
      <div
        style={{
          display: "flex",
          flexDirection: orderType === "options" && "column",
        }}
      >
        {optionItems}
      </div>
    </div>
  );
}

export default Type;
