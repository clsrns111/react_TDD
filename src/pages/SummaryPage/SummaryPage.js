import React, { useContext, useState } from "react";
import { OrderContext } from "../../context/OrderContext";

function SummaryPage({ setstep }) {
  const [orderDetails] = useContext(OrderContext);
  const [confirm, setconfirm] = useState(false);

  const hasOptions = orderDetails.options.size > 0;

  const productArray = Array.from(orderDetails.products);
  const productList = productArray.map(([key, value]) => (
    <li key={key}>
      {value} {key}
    </li>
  ));
  let optionDisplay = null;
  if (hasOptions) {
    const optionsArray = Array.from(orderDetails.options);
    const optionsList = optionsArray.map(([key, value]) => (
      <li key={key}>
        {value} {key}
      </li>
    ));

    optionDisplay = (
      <>
        <h2>옵션 상품: {orderDetails.totals.options}</h2>
        <ul>{optionsList}</ul>
      </>
    );
  }

  return (
    <div>
      <h1>주문 확인</h1>
      <h2>여행 상품: {orderDetails.totals.products}</h2>
      <ul>{productList}</ul>
      {optionDisplay}
      <label htmlFor="check">주문을 확인하셨나요?</label>
      <input
        type="checkbox"
        id="check"
        onChange={(e) => setconfirm(e.target.checked)}
      />
      <button onClick={() => setstep(2)} disabled={!confirm} type="submit">
        확인
      </button>
    </div>
  );
}

export default SummaryPage;
