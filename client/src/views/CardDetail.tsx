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
import { useCards } from "../context/CardsContext";
import { battleSimulation } from "../apis/battleService";
import { Card } from "../types";

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
  const { cards, fetchCards } = useCards();
  const [card, setCard] = useState<Card | null>(null);
  const [defenderCardId, setDefenderCardId] = useState<string>("");
  const [attackSucceeded, setAttackSucceded] = useState<boolean | null>(null);

  //Refetch cards without any filters
  useEffect(() => {
    fetchCards();
  }, []);

  const fetchCardDetails = async (id?: string) => {
    try {
      const cardsData = await getCardById(parseInt(id as string));

      setCard(cardsData);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (id) {
      fetchCardDetails(id);
    }
  }, [id]);

  const handleSelectChange = (event: SelectChangeEvent) => {
    setDefenderCardId(event.target.value);
  };

  const handleBattleButtonClick = () => {
    simulateBattle();
  };

  const simulateBattle = async () => {
    const attackerId = parseInt(id as string);
    const defenderId = parseInt(defenderCardId);
    try {
      const battleSimulationResult = await battleSimulation({
        attackerId,
        defenderId,
      });
      setAttackSucceded(battleSimulationResult.attackSucceeded);
    } catch (error) {
      console.error(error);
    }
  };

  if (!card) return null;

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
        <Typography variant="h4" gutterBottom data-testid="card-name">
          {card?.name}
        </Typography>
      </Grid>
      <Grid item>
        <PokemonCard card={card} />
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
              data-testid="contestant-select"
            >
              {cards.map((singleCard) => {
                return (
                  <MenuItem key={singleCard.id} value={singleCard.id} data-testid={`option-${singleCard.id}`}>
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
            data-testid="battle-button"
          >
            Battle!
          </Button>
        </Grid>
        {attackSucceeded != null && (
          <Grid item xs={12}>
            <Typography variant="h5" data-testid="battle-result">
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
