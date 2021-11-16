import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import Products from "./Products";
import ErrorBanner from "../../components/ErrorBanner";
import Options from "./Options";
import { OrderContext } from "../../context/OrderContext";

function Type({ orderType }) {
  const [items, setitem] = useState([]);
  const [error, seterror] = useState(false);
  const [orderDatas, updateItemCount] = useContext(OrderContext);

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
        updateItemCount={(itemName, newItemCount) =>
          updateItemCount(itemName, newItemCount, orderType)
        }
      />
    );
  });

  let order = orderType === "products" ? " 상품" : "옵션";

  return (
    <div>
      <h2>주문 종류</h2>
      <p>하나의 가격:</p>
      <p>
        {order} 총 가격:{orderDatas.totals[orderType]}
      </p>
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
