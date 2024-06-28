import React, { useEffect, useState } from "react";
import { Card as CardComponent, Typography, CardMedia, Box, Grid, Stack } from "@mui/material";
import { styled } from "@mui/system";
import imagesServiceInstance from "../apis/imagesServiceConfig";
import { getRarityIcon } from "../utils/getRarityIcon";
import { getTypeIcon } from "../utils/getTypeIcon";
import { Colors, Card } from "../types";

interface PokemonCardProps {
  card: Card;
  onClick?: () => void;
}

const StyledCard = styled(CardComponent)(({ color, onClick }) => ({
  width: 325,
  border: "2px solid #000",
  borderRadius: 10,
  backgroundColor: color,
  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
  overflow: "hidden",
  fontFamily: "Arial, sans-serif",
  padding: 10,
  position: "relative",
  cursor: onClick && "pointer",
}));

export const CardHeader = styled(Box)({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: 4,
  backgroundColor: "#fff",
  borderRadius: 5,
  border: "2px solid #000",
});

const HitPoints = styled(Typography)({
  color: "#ff0000",
  fontWeight: "bold",
  fontSize: 18,
});

const CardImage = styled(Box)({
  borderRadius: 5,
  overflow: "hidden",
  border: "2px solid #000",
  margin: "10px 0",
  padding: 44,
  backgroundColor: "#fff",
});

const CardAttack = styled(Grid)({
  padding: 16,
  marginTop: 40,
  marginBottom: 40,
});

const Footer = styled(Grid)({
  marginTop: 10,
  backgroundColor: "#fff",
  borderRadius: 5,
  border: "2px solid #000",
  padding: 4,
});

const AttackText = styled(Typography)({
  fontWeight: 700,
  fontSize: 18,
});

const PokemonCard: React.FC<PokemonCardProps> = ({ card, onClick }) => {
  const [imageUrl, setImageUrl] = useState<string>("");

  useEffect(() => {
    const fetchCardImage = async () => {
      const lowercaseName = card.name.toLowerCase();
      try {
        const response = await imagesServiceInstance.get(`/${lowercaseName}`);
        setImageUrl(response.data.sprites.front_default);
      } catch (error) {
        console.error(error);
      }
    };

    fetchCardImage();
  }, [card.name]);

  return (
    <StyledCard
      color={Colors[card.type as keyof typeof Colors]}
      onClick={onClick}
      data-testid="pokemon-card"
    >
      <CardHeader data-testid="card-header">
        <Typography variant="h6" component="div">
          {card.name}
        </Typography>
        <Stack direction="row" alignItems="center" gap={1}>
          <HitPoints variant="h6">{card.hit_points} HP</HitPoints>
          {getTypeIcon(card.type)}
        </Stack>
      </CardHeader>
      <CardImage data-testid="card-image">
        <CardMedia
          component="img"
          height="200"
          image={imageUrl}
          alt={card.name}
        />
      </CardImage>
      <Grid>
        <CardAttack item container xs={12} justifyContent="space-between" data-testid="card-attack">
          <Grid item>
            <AttackText color="textSecondary">{card.attack.name}</AttackText>
          </Grid>
          <Grid item>
            <AttackText color="textSecondary">{card.attack.damage}</AttackText>
          </Grid>
        </CardAttack>
        <Footer item container justifyContent="space-between" data-testid="card-footer">
          <Grid
            item
            xs={4}
            container
            alignItems="center"
            justifyContent="flex-start"
          >
            <Stack direction="row" alignItems="center">
              <Typography variant="caption">Weakness:</Typography>
              {getTypeIcon(card.weakness.weakness_type)}
            </Stack>
          </Grid>
          <Grid
            item
            xs={4}
            container
            alignItems="center"
            justifyContent="center"
          >
            <Stack direction="row" alignItems="center">
              <Typography variant="caption">Resistance:</Typography>
              {getTypeIcon(card.resistance_type)}
            </Stack>
          </Grid>
          <Grid
            item
            xs={4}
            container
            alignItems="center"
            justifyContent="flex-end"
          >
            <Stack direction="row" alignItems="center">
              <Typography variant="caption">Rarity:</Typography>
              {getRarityIcon(card.rarity)}
            </Stack>
          </Grid>
        </Footer>
      </Grid>
    </StyledCard>
  );
};

export default PokemonCard;
