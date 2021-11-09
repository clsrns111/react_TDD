import { render, screen } from "@testing-library/react";
import SummaryPage from "../SummaryPage";

test("checkbox and button", () => {
  render(<SummaryPage />);

  const checkbox = screen.getByRole("checkbox", {
    name: "주문을 한번 더 확인해주세요",
  });

  expect(checkbox.checked).toEqual(false);

  const confirmBtn = screen.getByRole("button", {
    name: "확인",
  });
  expect(confirmBtn.disabled).toBeTruthy();
});
