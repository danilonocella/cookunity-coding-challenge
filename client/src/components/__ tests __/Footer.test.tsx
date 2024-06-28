import { render } from "@testing-library/react";
import Footer from "../Footer";

// Snapshot test for Footer component
test("Footer component matches snapshot", () => {
  const { container } = render(<Footer />);
  expect(container).toMatchSnapshot();
});
