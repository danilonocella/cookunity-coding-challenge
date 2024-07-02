import {
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Typography,
  styled,
} from "@mui/material";
import { FC, useEffect, useState } from "react";
import PokemonCard from "../components/PokemonCard";
import { useParams } from "react-router-dom";
import { getCardById } from "../apis/cardsService";
import { useCards } from "../contexts/CardsContext";
import { battleSimulation } from "../apis/battleService";
import { Card } from "../types";
import { useQuery } from "@tanstack/react-query";

const CircleContainer = styled("div")({
  width: 50,
  height: 50,
  borderRadius: "50%",
  border: "2px solid #000",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
});

const CardDetail: FC = () => {
  const { id } = useParams();
  const { cards, clearFilters } = useCards();
  const [card, setCard] = useState<Card | null>(null);
  const [defenderCardId, setDefenderCardId] = useState<string>("");
  const [attackSucceeded, setAttackSucceeded] = useState<boolean | null>(null);

  //Refetch cards without any filters
  useEffect(() => {
    clearFilters();
  }, []);

  const {
    isPending: cardDataLoading,
    error: cardDataError,
    data: cardData,
  } = useQuery({
    queryKey: ["cardById", id],
    queryFn: () => getCardById(parseInt(id as string)),
  });

  useEffect(() => {
    cardData && setCard(cardData);
  }, [cardData]);

  const handleSelectChange = (event: SelectChangeEvent) => {
    setAttackSucceeded(null)
    setDefenderCardId(event.target.value);
  };

  const handleBattleButtonClick = () => {
    refetch();
  };

  const { data: battleSimulationResult, refetch } = useQuery({
    queryKey: ["battleSimulation", id, defenderCardId],
    queryFn: () =>
      battleSimulation({
        attackerId: parseInt(id as string),
        defenderId: parseInt(defenderCardId),
      }),
    enabled: false,
  });

  useEffect(() => {
    battleSimulationResult &&
      setAttackSucceeded(battleSimulationResult.attackSucceeded);
  }, [battleSimulationResult]);

  if (!card || cardDataError) return null;

  return (
    <Grid
      container
      direction="row"
      justifyContent="center"
      alignItems="center"
      spacing={8}
      sx={{ padding: 4 }}
    >
      <Grid item xs={12}>
        <Typography variant="h4" gutterBottom>
          {card?.name}
        </Typography>
      </Grid>
      <Grid item>
        {cardDataLoading ? (
          <Typography variant="h4" gutterBottom>
            Loading card details...
          </Typography>
        ) : (
          <PokemonCard card={card} />
        )}
      </Grid>
      <Grid item>
        <CircleContainer>VS</CircleContainer>
      </Grid>
      <Grid
        item
        xs={3}
        container
        spacing={3}
        direction="row"
        justifyContent="center"
        alignItems="center"
      >
        <Grid item xs={!2}>
          <Typography variant="h5">Battle with</Typography>
        </Grid>
        <Grid item xs={12}>
          <FormControl fullWidth>
            <InputLabel id="simple-select-label">Contestant card</InputLabel>
            <Select
              labelId="simple-select-label"
              id="simple-select"
              value={defenderCardId}
              onChange={handleSelectChange}
            >
              {cards &&
                cards.map((singleCard) => {
                  return (
                    <MenuItem key={singleCard.id} value={singleCard.id}>
                      {`${singleCard.name} - ${singleCard.hit_points} HP (${singleCard.type}) `}
                    </MenuItem>
                  );
                })}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <Button
            variant="contained"
            fullWidth
            onClick={() => handleBattleButtonClick()}
            disabled={!defenderCardId}
          >
            Battle!
          </Button>
        </Grid>
        {attackSucceeded != null && (
          <Grid item xs={12}>
            <Typography variant="h5">
              Battle result: attack{" "}
              {attackSucceeded ? "succeeded!" : "did not succeed"}
            </Typography>
          </Grid>
        )}
      </Grid>
    </Grid>
  );
};

export default CardDetail;
