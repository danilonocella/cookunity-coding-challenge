
import { render, screen, /*fireEvent,*/ waitFor } from "@testing-library/react";
import axiosInstance from "../../apis/axiosConfig";
import SearchFilters from "../SearchFilters";

jest.mock("../../apis/axiosConfig");

const mockFetchData = jest.fn().mockResolvedValue([]);

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

const mockFunc = jest.fn()

jest.mock('lodash/debounce', () => ({
  __esModule: true,
  default: (...args: any) => mockFunc(...args),
}))

describe("SearchFilters", () => {
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

  test("renders SearchFilters component", async () => {
    render(<SearchFilters fetchData={mockFetchData} />);

    expect(screen.getByTestId("name-input")).toBeInTheDocument();
    expect(screen.getByTestId("expansion-select")).toBeInTheDocument();
    expect(screen.getByTestId("type-select")).toBeInTheDocument();
  });

  test("fetches expansions and types on mount", async () => {
    render(<SearchFilters fetchData={mockFetchData} />);

    await waitFor(() => expect(axiosInstance.get).toHaveBeenCalledTimes(2));
    expect(axiosInstance.get).toHaveBeenCalledWith("/cards/expansions");
    expect(axiosInstance.get).toHaveBeenCalledWith("/cards/types");
  });
  /*
  test("updates input fields and calls fetchData", async () => {
    render(<SearchFilters fetchData={mockFetchData} />);

    // Change name input
    fireEvent.change(screen.getByTestId("name-input"), { target: { value: "Pikachu" } });
    await waitFor(() => {
      jest.runAllTimers(); // Advance timers to trigger debounced function
      expect(mockFetchData).toHaveBeenCalledWith("Pikachu", "", "");
    });

    // Change expansion select
    fireEvent.mouseDown(screen.getByLabelText("Expansion"));
    fireEvent.click(screen.getByText("Base set"));
    await waitFor(() => expect(mockFetchData).toHaveBeenCalledWith("Pikachu", "Base set", ""));

    // Change type select
    fireEvent.mouseDown(screen.getByLabelText("Type"));
    fireEvent.click(screen.getByText("Electric"));
    await waitFor(() => expect(mockFetchData).toHaveBeenCalledWith("Pikachu", "Base set", "Electric"));
  });
  */
});