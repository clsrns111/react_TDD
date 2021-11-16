import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "./App";

test("from order to order completion", async () => {
  render(<App />);

  const americaInput = await screen.findByRole("spinbutton", {
    name: "America",
  });
  userEvent.clear();
  userEvent.type(americaInput, "2");

  const englandInput = await screen.findByRole("spinbutton", {
    name: "England",
  });
  userEvent.clear();
  userEvent.type(englandInput, "3");

  const insuranceCheckbox = await screen.findByRole("checkbox", {
    name: "Insurance",
  });
  userEvent.click(insuranceCheckbox);

  const orderButton = screen.getByRole("button", { name: "주문" });
  userEvent.click(orderButton);

  // 주문확인 페이지
  const summaryHeading = screen.getByRole("heading", { name: "주문 확인" });
  expect(summaryHeading).toBeInTheDocument();

  const productsHeading = screen.getByRole("heading", {
    name: "여행 상품: 5000",
  });
  expect(productsHeading).toBeInTheDocument();

  const optionsHeading = screen.getByRole("heading", {
    name: "옵션 상품: 500",
  });
  expect(optionsHeading).toBeInTheDocument();

  expect(screen.getByText("2 America")).toBeInTheDocument();
  expect(screen.getByText("3 England")).toBeInTheDocument();
  expect(screen.getByText("Insurance")).toBeInTheDocument();

  const confirmCheckbox = screen.getByRole("checkbox", {
    name: "주문을 확인하셨나요?",
  });
  userEvent.click(confirmCheckbox);

  const confirmButton = screen.getByRole("button", { name: "확인" });
  userEvent.click(confirmButton);

  // 주문 완료 페이지
  const loading = screen.getByText(/loading/i);
  expect(loading).toBeInTheDocument();

  const complateHeader = await screen.findByRole("heading", {
    name: "주문이 성공했습니다.",
  });
  expect(complateHeader).toBeInTheDocument();

  const loadingDisappeard = screen.queryByText("loading");
  expect(loadingDisappeard).not.toBeInTheDocument();

  const backBtn = screen.getByRole("button", {
    name: "돌아가기",
  });
  userEvent.click(backBtn);

  const productsTotal = screen.getByText("상품 총 가격:0");
  expect(productsTotal).toBeInTheDocument();

  const optionsTotal = screen.getByText("옵션 총 가격:0");
  expect(optionsTotal).toBeInTheDocument();

  await waitFor(() => {
    screen.getByRole("spinbutton", {
      name: "America",
    });
  });
});
