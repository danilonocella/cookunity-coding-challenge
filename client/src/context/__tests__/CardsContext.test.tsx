import { render, screen, waitFor } from "@testing-library/react";
import { CardsProvider, useCards, CardsContextType } from "../CardsContext";
import { getAllCards } from "../../apis/cardsService";

// Mock the getAllCards function to return an empty array
jest.mock("../../apis/cardsService", () => ({
  getAllCards: jest.fn().mockResolvedValue([]),
}));

const TestComponent = () => {
  const { cards, fetchCards } = useCards() as CardsContextType;

  return (
    <div>
      <div data-testid="cards-length">{cards.length}</div>
      <button data-testid="fetch-button" onClick={() => fetchCards()}>
        Fetch Cards
      </button>
    </div>
  );
};

describe("CardsProvider", () => {
  it("provides cards and fetchCards function", async () => {
    render(
      <CardsProvider>
        <TestComponent />
      </CardsProvider>
    );

    // Verify initial state
    expect(screen.getByTestId("cards-length").textContent).toBe("0");

    // Click the fetch button and wait for the effect to take place
    screen.getByTestId("fetch-button").click();
    await waitFor(() => expect(getAllCards).toHaveBeenCalled());

    // Verify state after fetching cards
    expect(screen.getByTestId("cards-length").textContent).toBe("0");
  });

  it("throws error when useCards is used outside of CardsProvider", () => {
    const consoleErrorSpy = jest.spyOn(console, "error").mockImplementation(() => {});

    const renderOutsideProvider = () => {
      const TestComponentOutside = () => {
        useCards();
        return null;
      };

      render(<TestComponentOutside />);
    };

    expect(renderOutsideProvider).toThrow("useCards must be used within a CardsProvider");
    consoleErrorSpy.mockRestore();
  });
});