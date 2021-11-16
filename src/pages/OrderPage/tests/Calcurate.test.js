import { render, screen } from "../../../test-util";
import userEvent from "@testing-library/user-event";
import { OrderContextFunction } from "../../../context/OrderContext";
import Type from "../Type";
import OrderPage from "../OrderPage";

test("업데이트 product change", async () => {
  render(<Type orderType="products" />);

  const productsTotal = screen.getByText("상품 총 가격:", { exact: false });
  expect(productsTotal).toHaveTextContent("0");

  const americaInput = await screen.findByRole("spinbutton", {
    name: "America",
  });
  userEvent.clear();
  userEvent.type(americaInput, "1");
  expect(productsTotal).toHaveTextContent("1000");
});

test("옵션이 업데이트 될때마다 옵션 total 업데이트", async () => {
  render(<Type orderType="options" />);

  const optionsTotal = screen.getByText("옵션 총 가격:", { exact: false });
  expect(optionsTotal).toHaveTextContent("0");

  const insuranceCheckbox = await screen.findByRole("checkbox", {
    name: "Insurance",
  });

  userEvent.click(insuranceCheckbox);
  expect(optionsTotal).toHaveTextContent("500");

  const dinnerCheckbox = await screen.findByRole("checkbox", {
    name: "dinner",
  });

  userEvent.click(dinnerCheckbox);
  expect(optionsTotal).toHaveTextContent("");
});

describe("total price", () => {
  test("total price starts with 0 and updating total price when adding one product", async () => {
    render(<OrderPage />);
    const totalPrice = screen.getByText("Total Price:", { exact: false });
    expect(totalPrice).toHaveTextContent("0");

    const americaInput = await screen.findByRole("spinbutton", {
      name: "America",
    });
    userEvent.clear(americaInput);
    userEvent.type(americaInput, "1");
    expect(totalPrice).toHaveTextContent("1000");
  });

  test("update total price when adding one option", async () => {
    render(<OrderPage />);

    const totalPrice = screen.getByText("Total Price", { exact: false });

    const dinnerCheckbox = await screen.findByRole("spinbutton", {
      name: "dinner",
    });
    userEvent.click(dinnerCheckbox);
    expect(totalPrice).toHaveTextContent("500");
  });

  test("updating total price when removing option and product", async () => {
    render(<OrderPage />);
    const totalPrice = screen.getByText("Total Price", { exact: false });

    const dinnerCheckbox = await screen.findByRole("spinbutton", {
      name: "dinner",
    });
    userEvent.click(dinnerCheckbox);

    const americaInput = await screen.findByRole("spinbutton", {
      name: "America",
    });
    userEvent.clear(americaInput);
    userEvent.type(americaInput, 3);

    userEvent.clear(americaInput);
    userEvent.type(americaInput, 1);

    expect(totalPrice).toHaveTextContent("1500");
  });
});
