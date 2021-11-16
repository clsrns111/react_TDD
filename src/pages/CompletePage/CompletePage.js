import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import ErrorBanner from "../../components/ErrorBanner";
import { OrderContext } from "../../context/OrderContext";

function CompletePage({ setstep }) {
  const [orderData, , resetOrderData] = useContext(OrderContext);
  const [orderHistory, setorderHistory] = useState([]);
  const [loading, setloading] = useState(true);
  const [error, seterror] = useState(false);

  useEffect(() => {
    orderComplate(orderData);
  }, [orderData]);

  const orderComplate = async (orderData) => {
    try {
      let res = await axios.post("http://localhost:5000/order", orderData);
      setorderHistory(res.data);
      setloading(false);
    } catch (error) {
      console.log(error);
      seterror(true);
    }
  };

  const orderTable = orderHistory.map((item) => (
    <tr key={item.orderNumber}>
      <td>{item.orderNumber}</td>
      <td>{item.price}</td>
    </tr>
  ));

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <ErrorBanner message="에러가 발생했습니다."></ErrorBanner>;
  }

  return (
    <div>
      <h2>주문이 성공하였습니다.</h2>
      <h3>지금까지 모든 주문</h3>
      <table>
        <tbody>
          <tr>
            <th>주문 번호</th>
            <th>주문 가격</th>
          </tr>
          {orderTable}
        </tbody>
      </table>
      <br />

      <button
        onClick={() => {
          setstep(0);
          resetOrderData();
        }}
      >
        돌아가기
      </button>
    </div>
  );
}

export default CompletePage;
