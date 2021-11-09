import { render, screen, userEvent } from "@testing-library/react";
import Type from "../Type";

test("업데이트 product change", async () => {
  render(<Type orderType="products" />);

  const productsTotal = screen.getByText("상품 총 가격:", { exact: false });
  expect(productsTotal).toTextContent("0");

  const americaInput = await screen.findByRole("spinbutton", {
    name: "America",
  });
  userEvent.clear();
  userEvent.type(americaInput, "1");
});
