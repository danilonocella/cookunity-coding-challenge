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

interface CardsContextType {
  cards: Card[];
  fetchCards: (
    name?: string,
    expansion?: Expansion,
    type?: CardType
  ) => Promise<void>;
}

const CardsContext = createContext<CardsContextType | undefined>(undefined);

export const useCards = (): CardsContextType => {
  const context = useContext(CardsContext);
  if (!context) {
    throw new Error("useCards must be used within a CardsProvider");
  }
  return context;
};

export const CardsProvider: FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [cards, setCards] = useState<Card[]>([]);

  const fetchCards = async (
    name?: string,
    expansion?: Expansion,
    type?: CardType
  ) => {
    try {
      const cardsData = await getAllCards(name, expansion, type);
      setCards(cardsData);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchCards();
  }, []);

  return (
    <CardsContext.Provider value={{ cards, fetchCards }}>
      {children}
    </CardsContext.Provider>
  );
};
