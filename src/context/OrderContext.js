import { createContext, useState, useMemo, useEffect } from "react";

export const OrderContext = createContext();

export function OrderContextFunction(props) {
  const pricePerItem = {
    products: 1000,
    options: 500,
  };

  function calcu(type, orderCounts) {
    let optionCount = 0;
    for (const count of orderCounts[type].values()) {
      optionCount += count;
    }
    return optionCount * pricePerItem[type];
  }

  const [orderCounts, setorderCounts] = useState({
    products: new Map(),
    options: new Map(),
  });

  const [totals, settotal] = useState({
    products: 0,
    options: 0,
    total: 0,
  });

  useEffect(() => {
    const productsTotal = calcu("products", orderCounts);
    const optionsTotal = calcu("options", orderCounts);
    const total = productsTotal + optionsTotal;

    settotal({ products: productsTotal, options: optionsTotal, totals: total });
  }, [orderCounts]);

  const value = useMemo(() => {
    // orderCounts가 데이터가 바뀔때마다 updateItemCount만 다시 동작함.
    function updateItemCount(itemName, newItemCount, orderType) {
      const orderCountsMap = orderCounts[orderType];
      const newOrderCounts = { ...orderCounts };

      orderCountsMap.set(itemName, +newItemCount);

      setorderCounts(newOrderCounts);
    }

    const resetOrderData = () => {
      setorderCounts({
        products: new Map(),
        options: new Map(),
      });
    };

    return [{ ...orderCounts, totals }, updateItemCount, resetOrderData];
  }, [orderCounts, totals]);

  return <OrderContext.Provider value={value} {...props} />;
}
