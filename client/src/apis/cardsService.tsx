import { Card, CardType, Expansion } from "../types";
import axiosInstance from "./axiosConfig";

export const createCard = async (cardData: Card) => {
  try {
    const response = await axiosInstance.post("/cards", cardData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateCard = async (id: number, cardData: Card) => {
  try {
    const response = await axiosInstance.put(`/cards/${id}`, cardData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getAllCards = (
  name?: string,
  expansion?: Expansion,
  type?: CardType
) => {
  const params = new URLSearchParams();

  if (name) {
    params.append("name", name);
  }
  if (expansion) {
    params.append("expansion", expansion);
  }
  if (type) {
    params.append("type", type);
  }

  const url = `/cards${params.toString() ? `?${params.toString()}` : ""}`;
  return axiosInstance.get<Card[]>(url).then((res) => res.data);
};

export const getCardById = (id: number) => {
  return axiosInstance.get<Card>(`/cards/${id}`).then((res) => res.data);
};

export const getExpansions = () => {
  return axiosInstance.get(`/cards/expansions`).then((res) => res.data);
};
export const getCardTypes = () => {
  return axiosInstance.get(`/cards/types`).then((res) => res.data);
};
