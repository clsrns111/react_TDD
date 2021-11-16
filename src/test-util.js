import { render } from "@testing-library/react";
import { OrderContextFunction } from "./context/OrderContext";

const customRender = (ui, option) => {
  render(ui, { wrapper: OrderContextFunction, ...option });
};

export * from "@testing-library/react";

export { customRender as render };
