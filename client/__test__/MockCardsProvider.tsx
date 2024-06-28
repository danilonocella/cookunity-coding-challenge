import React, { FC, ReactNode } from "react";
import { CardsContext, CardsContextType } from "../src/context/CardsContext"; // Adjust path as necessary

export const mockCardsContextValue: CardsContextType = {
  cards: [],
  fetchCards: jest.fn(),
};

export const MockCardsProvider: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <CardsContext.Provider value={mockCardsContextValue}>
      {children}
    </CardsContext.Provider>
  );
};
