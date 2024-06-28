import { render, screen } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import CardDetail from "../CardDetail";
import { useParams } from "react-router-dom";
import { getCardById } from "../../apis/cardsService";
import { useCards } from "../../context/CardsContext";

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useParams: jest.fn(),
}));

jest.mock("../../apis/cardsService");
jest.mock("../../context/CardsContext");
jest.mock("../../apis/battleService");

const mockedUseParams = useParams as jest.Mock;
const mockedGetCardById = getCardById as jest.Mock;
const mockedUseCards = useCards as jest.Mock;

describe("CardDetail", () => {
  beforeEach(() => {
    mockedUseParams.mockReturnValue({ id: "1" });
    mockedGetCardById.mockResolvedValue({
      id: 4,
      name: "Pikachu",
      type: "Electric",
      rarity: "Common",
      expansion: "Base set",
      hit_points: 40,
      resistance_type: "Colorless",
      resistance_points: 20,
      attack: {
        _id: 4,
        name: "Gnaw",
        damage: 20,
      },
      weakness: {
        _id: 4,
        main_type: "Electric",
        weakness_type: "Fighting",
      },
    });
    mockedUseCards.mockReturnValue({
      cards: [
        {
          id: 4,
          name: "Pikachu",
          type: "Electric",
          rarity: "Common",
          expansion: "Base set",
          hit_points: 40,
          resistance_type: "Colorless",
          resistance_points: 20,
          attack: {
            _id: 4,
            name: "Gnaw",
            damage: 20,
          },
          weakness: {
            _id: 4,
            main_type: "Electric",
            weakness_type: "Fighting",
          },
        },
      ],
      fetchCards: jest.fn(),
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("renders card details correctly", async () => {
    render(
      <MemoryRouter initialEntries={["/cards/1"]}>
        <Routes>
          <Route path="/cards/:id" element={<CardDetail />} />
        </Routes>
      </MemoryRouter>
    );

    expect(await screen.findByTestId("card-name")).toBeInTheDocument();
    expect(screen.getByTestId("pokemon-card")).toBeInTheDocument();
  });
});
