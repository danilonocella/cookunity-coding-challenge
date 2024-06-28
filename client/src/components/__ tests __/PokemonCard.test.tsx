import { render, screen, waitFor } from "@testing-library/react";
import PokemonCard from "../PokemonCard";
import { Card } from "../../types";
import imagesServiceInstance from "../../apis/imagesServiceConfig";

jest.mock("../../apis/imagesServiceConfig");
const mockedImagesServiceInstance = imagesServiceInstance as jest.Mocked<
  typeof imagesServiceInstance
>;

const mockCard: Card = {
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
};

const mockImageUrl =
  "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png";

describe("PokemonCard", () => {
  beforeEach(() => {
    mockedImagesServiceInstance.get.mockResolvedValue({
      data: {
        sprites: {
          front_default: mockImageUrl,
        },
      },
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("matches the snapshot", async () => {
    const { asFragment } = render(<PokemonCard card={mockCard} />);

    await waitFor(() =>
      expect(mockedImagesServiceInstance.get).toHaveBeenCalledTimes(1)
    );

    expect(asFragment()).toMatchSnapshot();
  });

  test("renders the PokemonCard component", async () => {
    render(<PokemonCard card={mockCard} />);

    await waitFor(() =>
      expect(mockedImagesServiceInstance.get).toHaveBeenCalledTimes(1)
    );

    expect(screen.getByTestId("pokemon-card")).toBeInTheDocument();
    expect(screen.getByTestId("card-header")).toBeInTheDocument();
    expect(screen.getByTestId("card-image")).toBeInTheDocument();
    expect(screen.getByTestId("card-attack")).toBeInTheDocument();
    expect(screen.getByTestId("card-footer")).toBeInTheDocument();
    expect(screen.getByText("Pikachu")).toBeInTheDocument();
    expect(screen.getByText("40 HP")).toBeInTheDocument();
    expect(screen.getByText("Gnaw")).toBeInTheDocument();
    expect(screen.getByText("20")).toBeInTheDocument();
    expect(screen.getByAltText("Pikachu")).toHaveAttribute("src", mockImageUrl);
  });
});
