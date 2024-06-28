import { render } from "@testing-library/react";
import Header from "../Header";
import { BrowserRouter } from 'react-router-dom';

test("Header component matches snapshot", () => {
  const { container } = render(
    <BrowserRouter>
      <Header />
    </BrowserRouter>
  );
  expect(container).toMatchSnapshot();
});
