import { FC } from "react";
import { Grid, Typography } from "@mui/material";
import PokemonCard from "../components/PokemonCard";
import SearchFilters from "../components/SearchFilters";
import { useNavigate } from "react-router-dom";
import { useCards } from "../context/CardsContext";

const Home: FC = () => {
  const { cards, cardsLoading, cardsError } = useCards();
  const navigate = useNavigate();

  const handleCardClick = (id: number) => {
    navigate(`/card-detail/${id}`);
  };

  return (
    <Grid container spacing={2} sx={{ padding: 4 }}>
      <Grid container item xs={12}>
        <Grid item xs={2}>
          <Typography variant="h4" gutterBottom>
            Pokemon App
          </Typography>
        </Grid>
        <SearchFilters isGridItem xs={10} />
      </Grid>
      {cardsLoading && (
        <Grid item>
          <Typography variant="h5" gutterBottom>
            Loading cards...
          </Typography>
        </Grid>
      )}
      {(!cards || cards.length < 1 || cardsError) && (
        <Grid item>
          <Typography variant="h5" gutterBottom>
            No cards available
          </Typography>
        </Grid>
      )}
      {cards &&
        cards.map((card) => {
          return (
            <Grid item xs={12} md={6} lg={4} key={card.id}>
              <PokemonCard
                card={card}
                onClick={() => handleCardClick(card.id)}
              />
            </Grid>
          );
        })}
    </Grid>
  );
};

export default Home;
