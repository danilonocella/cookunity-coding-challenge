import { FC, useCallback, useEffect, useState } from "react";
import {
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
} from "@mui/material";
import axiosInstance from "../apis/axiosConfig";
import { debounce } from "../utils/debounce";
import { FetchCards } from "../context/CardsContext";
import { CardType, Expansion } from "../types";

interface SearchFiltersProps {
  isGridItem?: boolean;
  xs?: number;
  fetchData: FetchCards;
}

const SearchFilters: FC<SearchFiltersProps> = ({
  fetchData,
  isGridItem = false,
  xs,
}) => {
  const [name, setName] = useState<string>("");
  const [expansion, setExpansion] = useState<Expansion | "">("");
  const [availableExpansions, setAvailableExpansions] = useState(null);
  const [type, setType] = useState<CardType | "">("");
  const [availableTypes, setAvailableTypes] = useState(null);

  useEffect(() => {
    const getCardExpansions = async () => {
      try {
        const response = await axiosInstance.get("/cards/expansions");
        setAvailableExpansions(response.data);
      } catch (error) {
        throw error;
      }
    };
    getCardExpansions();
  }, []);

  useEffect(() => {
    const getCardTypes = async () => {
      try {
        const response = await axiosInstance.get("/cards/types");
        setAvailableTypes(response.data);
      } catch (error) {
        throw error;
      }
    };
    getCardTypes();
  }, []);

  // Debounced fetchData function
  const debouncedFetchData = useCallback(
    debounce((name: string, expansion: Expansion | "", type: CardType | "") => {
      fetchData(
        name,
        emptyStringToUndefined(expansion),
        emptyStringToUndefined(type)
      );
    }, 500),
    [fetchData]
  );

  const handleInputChange = (name: string) => {
    setName(name);
    debouncedFetchData(name, expansion, type);
  };

  //Required since the empty state for the Select is an empty string
  function emptyStringToUndefined<T>(value: "" | T): T | undefined {
    return value === "" ? undefined : value;
  }

  const handleSelectChange = (event: SelectChangeEvent<string>) => {
    const selectedValue = event.target.value;

    switch (event.target.name) {
      case "expansion":
        const selectedExpansion =
          selectedValue === "" ? "" : (selectedValue as Expansion);
        setExpansion(selectedExpansion as "" | Expansion);
        fetchData(
          name,
          emptyStringToUndefined(selectedExpansion),
          emptyStringToUndefined(type)
        );
        break;
      case "type":
        const selectedType =
          selectedValue === "" ? "" : (selectedValue as CardType);
        setType(selectedType as "" | CardType);
        fetchData(
          name,
          emptyStringToUndefined(expansion),
          emptyStringToUndefined(selectedType)
        );
        break;
    }
  };

  return (
    <Grid
      container
      item={isGridItem}
      xs={xs ?? 12}
      direction="row"
      justifyContent="center"
      alignItems="center"
      spacing={1}
    >
      <Grid item xs={4}>
        <TextField
          id="name"
          label="Name"
          variant="outlined"
          value={name}
          onChange={(event) => handleInputChange(event.target.value)}
          fullWidth
        />
      </Grid>
      <Grid item xs={4}>
        <FormControl fullWidth>
          <InputLabel id="expansion-select-label">Expansion</InputLabel>
          <Select
            labelId="expansion-select-label"
            id="expansion-select"
            name="expansion"
            value={expansion}
            onChange={handleSelectChange}
          >
            {expansion.length > 0 && (
              <MenuItem value={""}>
                <em>(Clear filter)</em>
              </MenuItem>
            )}
            {availableExpansions &&
              Object.keys(availableExpansions).map((key) => {
                return (
                  <MenuItem key={key} value={availableExpansions[key]}>
                    {availableExpansions[key]}
                  </MenuItem>
                );
              })}
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs={4}>
        <FormControl fullWidth>
          <InputLabel id="type-select-label">Type</InputLabel>
          <Select
            labelId="type-select-label"
            id="type-select"
            name="type"
            value={type}
            label="$"
            onChange={handleSelectChange}
          >
            {type.length > 0 && (
              <MenuItem value={""}>
                <em>(Clear filter)</em>
              </MenuItem>
            )}
            {availableTypes &&
              Object.keys(availableTypes).map((key) => {
                return (
                  <MenuItem key={key} value={availableTypes[key]}>
                    {availableTypes[key]}
                  </MenuItem>
                );
              })}
          </Select>
        </FormControl>
      </Grid>
    </Grid>
  );
};

export default SearchFilters;
