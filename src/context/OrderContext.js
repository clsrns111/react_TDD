import { createContext } from "react";

const OrderContext = createContext();

export function OrderContextFunction(props) {
  return <OrderContext.Provider value {...props} />;
}
