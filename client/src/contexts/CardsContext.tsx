import {
  FC,
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import { getAllCards } from "../apis/cardsService";
import { Card, CardType, Expansion } from "../types";
import { useQuery } from "@tanstack/react-query";
import { useDebounce } from "@uidotdev/usehooks";

export interface FetchCards {
  (name?: string, expansion?: Expansion, type?: CardType): Promise<void>;
}

type Filters = {
  name: string;
  setName: React.Dispatch<React.SetStateAction<string>>;
  expansion: "" | Expansion;
  setExpansion: React.Dispatch<React.SetStateAction<"" | Expansion>>;
  type: "" | CardType;
  setType: React.Dispatch<React.SetStateAction<"" | CardType>>;
};

interface CardsContextType {
  cards: Card[] | undefined;
  cardsLoading: boolean;
  cardsError: Error | null;
  filters: Filters;
  clearFilters: () => void;
}

const CardsContext = createContext<CardsContextType | undefined>(undefined);

export const useCards = (): CardsContextType => {
  const context = useContext(CardsContext);
  if (!context) {
    throw new Error("useCards must be used within a CardsProvider");
  }
  return context;
};

export const CardsProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [cards, setCards] = useState<Card[] | undefined>([]);
  const [name, setName] = useState<string>("");
  const debouncedName: string = useDebounce(name, 300);
  const [expansion, setExpansion] = useState<Expansion | "">("");
  const [type, setType] = useState<CardType | "">("");

  const filters: Filters = {
    name,
    setName,
    expansion,
    setExpansion,
    type,
    setType,
  };

  const clearFilters: () => void = () => {
    setName("");
    setExpansion("");
    setType("");
  };

  //Required since the empty state for the Select is an empty string
  function emptyStringToUndefined<T>(value: "" | T): T | undefined {
    return value === "" ? undefined : value;
  }

  const {
    isPending: cardsLoading,
    error: cardsError,
    data: cardsData,
  } = useQuery({
    queryKey: ["cards", debouncedName, expansion, type],
    queryFn: () =>
      getAllCards(
        debouncedName,
        emptyStringToUndefined(expansion),
        emptyStringToUndefined(type)
      ),
  });

  useEffect(() => {
    setCards(cardsData);
  }, [cardsData]);

  return (
    <CardsContext.Provider
      value={{ cards, cardsLoading, cardsError, filters, clearFilters }}
    >
      {children}
    </CardsContext.Provider>
  );
};
