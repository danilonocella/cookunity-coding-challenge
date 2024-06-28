import { render } from "@testing-library/react";
import { getRarityIcon } from "../getRarityIcon";
import '@testing-library/jest-dom'

describe("getRarityIcon", () => {
  test("renders Common rarity icon with tooltip", () => {
    const { getByTestId } = render(getRarityIcon("Common"));

    const iconElement = getByTestId("rarity-common-icon");
    expect(iconElement).toBeInTheDocument();
  });

  test("renders Uncommon rarity icon with tooltip", () => {
    const { getByTestId } = render(getRarityIcon("Uncommon"));

    const iconElement = getByTestId("rarity-uncommon-icon");
    expect(iconElement).toBeInTheDocument();
  });

  test("renders Rare rarity icon with tooltip", () => {
    const { getByTestId } = render(getRarityIcon("Rare"));

    const iconElement = getByTestId("rarity-rare-icon");
    expect(iconElement).toBeInTheDocument();
  });
  
});
