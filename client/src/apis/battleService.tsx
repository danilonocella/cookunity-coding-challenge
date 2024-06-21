import axiosInstance from "./axiosConfig";

export const battleSimulation = async (battleSimulationProps: {
  attackerId: number;
  defenderId: number;
}) => {
  try {
    const response = await axiosInstance.post(
      "/battle/simulate",
      battleSimulationProps
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};
