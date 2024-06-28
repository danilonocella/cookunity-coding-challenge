import React from "react";
import { render, screen /*fireEvent, waitFor*/ } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Home from "../Home";
import "@testing-library/jest-dom";
import axiosInstance from "../../apis/axiosConfig";

jest.mock("../../apis/axiosConfig");

const mockExpansionsResponse = {
  BASE_SET: "Base set",
  JUNGLE: "Jungle",
  FOSSIL: "Fossil",
  BASE_SET_2: "Base set 2",
  TEAM_ROCKET: "Team rocket",
  GYM_HEROES: "Gym heroes",
  GYM_CHALLENGE: "Gym challenge",
};

const mockTypesResponse = {
  GRASS: "Grass",
  FIRE: "Fire",
  WATER: "Water",
  ELECTRIC: "Electric",
  PSYCHIC: "Psychic",
  FIGHTING: "Fighting",
  DARKNESS: "Darkness",
  METAL: "Metal",
  DRAGON: "Dragon",
  FAIRY: "Fairy",
  COLORLESS: "Colorless",
};

const mockCards = [
  {
    id: 1,
    name: "Bulbasaur",
    type: "Grass",
    rarity: "Common",
    expansion: "Base set",
    hit_points: 60,
    resistance_type: "Water",
    resistance_points: 20,
    attack: { name: "Vine Whip", damage: 30 },
    weakness: { type: "Fire", multiplier: 2 },
  },
];

const mockFetchCards = jest.fn().mockResolvedValue(mockCards);

jest.mock("../../context/CardsContext", () => ({
  useCards: () => ({
    cards: mockCards,
    fetchCards: mockFetchCards,
  }),
  CardsProvider: ({ children }: { children: React.ReactNode }) => (
    <div>{children}</div>
  ),
}));

const mockFunc = jest.fn();

jest.mock("lodash/debounce", () => ({
  __esModule: true,
  default: (...args: any) => mockFunc(...args),
}));

describe("Home Component", () => {
  beforeEach(() => {
    (axiosInstance.get as jest.Mock).mockImplementation((url: string) => {
      switch (url) {
        case "/cards/expansions":
          return Promise.resolve({ data: mockExpansionsResponse });
        case "/cards/types":
          return Promise.resolve({ data: mockTypesResponse });
        default:
          return Promise.reject(new Error("not found"));
      }
    });

    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.clearAllMocks();
    jest.useRealTimers();
  });

  test("calls fetchCards on component mount", () => {
    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    );

    expect(mockFetchCards).toHaveBeenCalled();
  });
  test("renders the Home component with cards", async () => {
    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    );

    expect(screen.getByText(/Pokemon App/i)).toBeInTheDocument();
    expect(screen.queryByText(/No cards available/i)).not.toBeInTheDocument();
    expect(screen.getByText(/Bulbasaur/i)).toBeInTheDocument();
  });

  /*


  test("displays 'No cards available' when there are no cards", () => {
    jest.mock("../../context/CardsContext", () => ({
      useCards: () => ({
        cards: [],
        fetchCards: mockFetchCards,
      }),
      CardsProvider: ({ children }: { children: React.ReactNode }) => (
        <div>{children}</div>
      ),
    }));

    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    );

    expect(screen.getByTestId("no-cards-available-text")).toBeInTheDocument();
  });
  
  test("navigates to card detail page on card click", async () => {
    const mockNavigate = jest.fn();
    jest.mock("react-router-dom", () => ({
      ...jest.requireActual("react-router-dom"),
      useNavigate: () => mockNavigate,
    }));

    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    );

    fireEvent.click(screen.getByText(/Bulbasaur/i));

    await waitFor(() =>
      expect(mockNavigate).toHaveBeenCalledWith("/card-detail/1")
    );
  });
  */
});
