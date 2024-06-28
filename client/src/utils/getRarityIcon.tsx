import SquareIcon from "@mui/icons-material/Square";
import CircleIcon from "@mui/icons-material/Circle";
import StarIcon from "@mui/icons-material/Star";
import { Tooltip } from "@mui/material";
import { Rarity } from "../types";

type RarityIcons = {
  [key in Rarity]: JSX.Element;
};

const rarityIcons: RarityIcons = {
  Common: <CircleIcon sx={{ color: "#000", fontSize: 12 }} data-testid="rarity-common-icon"/>,
  Uncommon: (
    <SquareIcon
      sx={{ color: "#000", fontSize: 12, transform: "rotate(45deg)" }}
      data-testid="rarity-uncommon-icon"
    />
  ),
  Rare: <StarIcon sx={{ color: "#000", fontSize: 12 }} data-testid="rarity-rare-icon"/>,
};

export const getRarityIcon = (rarity: Rarity): JSX.Element | null => {
  const icon = rarityIcons[rarity];
  return icon ? <Tooltip title={rarity}>{icon}</Tooltip> : null;
};
