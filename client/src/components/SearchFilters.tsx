import { FC, useEffect, useState } from "react";
import {
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
} from "@mui/material";
import { useCards } from "../contexts/CardsContext";
import { CardType, Expansion } from "../types";
import { getCardTypes, getExpansions } from "../apis/cardsService";
import { useQuery } from "@tanstack/react-query";

interface SearchFiltersProps {
  isGridItem?: boolean;
  xs?: number;
}

const SearchFilters: FC<SearchFiltersProps> = ({ isGridItem = false, xs }) => {
  const { filters } = useCards();
  const { name, expansion, type } = filters;
  const { setName, setExpansion, setType } = filters;
  const [availableExpansions, setAvailableExpansions] = useState(null);
  const [availableTypes, setAvailableTypes] = useState(null);

  const { data: expansions } = useQuery({
    queryKey: ["expansions"],
    queryFn: () => getExpansions(),
  });

  useEffect(() => {
    setAvailableExpansions(expansions);
  }, [expansions]);

  const { data: cardTypes } = useQuery({
    queryKey: ["cardTypes"],
    queryFn: () => getCardTypes(),
  });

  useEffect(() => {
    setAvailableTypes(cardTypes);
  }, [cardTypes]);

  const handleInputChange = (name: string) => {
    setName(name);
  };

  const handleSelectChange = (event: SelectChangeEvent<string>) => {
    const selectedValue = event.target.value;

    switch (event.target.name) {
      case "expansion":
        const selectedExpansion =
          selectedValue === "" ? "" : (selectedValue as Expansion);
        setExpansion(selectedExpansion as "" | Expansion);
        break;
      case "type":
        const selectedType =
          selectedValue === "" ? "" : (selectedValue as CardType);
        setType(selectedType as "" | CardType);
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
