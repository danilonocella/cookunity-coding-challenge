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
import debounce from "lodash/debounce";
import { CardType, Expansion } from "../types";

interface SearchFiltersProps {
  fetchData: (
    name: string,
    expansion?: Expansion | "",
    type?: CardType | ""
  ) => Promise<void>;
}

const SearchFilters: FC<SearchFiltersProps> = ({ fetchData }) => {
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

  // Debounced fetchData function using lodash debounce
  const debouncedFetchData = useCallback(
    debounce((name: string, expansion: Expansion | "", type?: CardType | "") => {
      fetchData(name, expansion, type);
    }, 500),
    [fetchData]
  );

  const handleInputChange = (name: string) => {
    setName(name);
    debouncedFetchData(name, expansion, type);
  };

  const handleSelectChange = (event: SelectChangeEvent) => {
    switch (event.target.name) {
      case "expansion":
        setExpansion(event.target.value as Expansion);
        fetchData(name, event.target.value as Expansion, type as CardType);
        break;
      case "type":
        setType(event.target.value as CardType);
        fetchData(name, expansion as Expansion, event.target.value as CardType);
        break;
    }
  };

  return (
    <Grid
      container
      item
      xs={10}
      direction="row"
      justifyContent="center"
      alignItems="center"
      spacing={1}
      data-testid="search-filters"
    >
      <Grid item xs={4}>
        <TextField
          id="name"
          label="Name"
          variant="outlined"
          value={name}
          onChange={(event) => handleInputChange(event.target.value)}
          fullWidth
          data-testid="name-input"
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
            data-testid="expansion-select"
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
            data-testid="type-select"
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
