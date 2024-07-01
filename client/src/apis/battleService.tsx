import axiosInstance from "./axiosConfig";

export const battleSimulation = (battleSimulationProps: {
  attackerId: number;
  defenderId: number;
}) => {
  return axiosInstance
    .post("/battle/simulate", battleSimulationProps)
    .then((res) => res.data);
};
