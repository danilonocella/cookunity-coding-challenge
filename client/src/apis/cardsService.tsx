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

export const getAllCards = async (
  name?: string,
  expansion?: Expansion,
  type?: CardType
) => {
  try {
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
    const response = await axiosInstance.get(url);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getCardById = async (id: number) => {
  try {
    const response = await axiosInstance.get(`/cards/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
