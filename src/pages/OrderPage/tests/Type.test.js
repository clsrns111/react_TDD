import { render, screen } from "../../../test-util";
import Type from "../Type";
import { server } from "../../../mocks/server.js";
import { rest } from "msw";

test("서버로부터 받은 이미지를 나타낸다.", async () => {
  render(<Type orderType="products" />);

  const productImages = await screen.findAllByRole("img", {
    name: /product$/i,
  });

  expect(productImages).toHaveLength(2);

  const altText = productImages.map((element) => element.alt);
  expect(altText).toEqual(["America product", "England product"]);
});

test("product 패치도중 에러가 발생했을 때", async () => {
  server.resetHandlers(
    //원래핸들러 리셋 후 새 핸들러설정.
    rest.get("http://localhost:5000/products", (req, res, ctx) => {
      return res(ctx.status(500));
    })
  );

  render(<Type orderType="products" />);

  const errorBanner = await screen.findByTestId("error-banner");
  expect(errorBanner).toHaveTextContent("에러가 발생하였습니다.");
});

test("서버로부터 옵션부분을 받는다.", async () => {
  render(<Type orderType="options" />);

  const options = await screen.findAllByRole("checkbox");
  expect(options).toHaveLength(2);
});
