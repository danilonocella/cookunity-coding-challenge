import LocalFireDepartmentIcon from "@mui/icons-material/LocalFireDepartment";
import EnergySavingsLeafIcon from "@mui/icons-material/EnergySavingsLeaf";
import WaterDropIcon from "@mui/icons-material/WaterDrop";
import ElectricBoltIcon from "@mui/icons-material/ElectricBolt";
import VisibilityIcon from "@mui/icons-material/Visibility";
import SportsMmaIcon from "@mui/icons-material/SportsMma";
import NightlightIcon from "@mui/icons-material/Nightlight";
import DeviceHubIcon from "@mui/icons-material/DeviceHub";
import AndroidIcon from "@mui/icons-material/Android";
import SpaIcon from "@mui/icons-material/Spa";
import StarIcon from "@mui/icons-material/Star";
import { SxProps, Tooltip } from "@mui/material";
import { CardType, Colors } from "../types";

interface TypeMapping {
  icon: React.ElementType;
  color: string;
  transform?: string;
}

const typeMapping: Record<CardType, TypeMapping> = {
  Grass: { icon: EnergySavingsLeafIcon, color: Colors.Grass },
  Fire: { icon: LocalFireDepartmentIcon, color: Colors.Fire },
  Water: { icon: WaterDropIcon, color: Colors.Water },
  Electric: { icon: ElectricBoltIcon, color: Colors.Electric },
  Psychic: { icon: VisibilityIcon, color: Colors.Psychic },
  Fighting: { icon: SportsMmaIcon, color: Colors.Fighting },
  Darkness: { icon: NightlightIcon, color: Colors.Darkness },
  Metal: { icon: DeviceHubIcon, color: Colors.Metal, transform: "scaleY(-1)" },
  Dragon: { icon: AndroidIcon, color: Colors.Dragon },
  Fairy: { icon: SpaIcon, color: Colors.Fairy },
  Colorless: { icon: StarIcon, color: Colors.Colorless },
};

export const getTypeIcon = (type: CardType) => {
  const typeInfo = typeMapping[type];

  if (!typeInfo) {
    return null;
  }

  const { icon: IconComponent, color, transform } = typeInfo;

  const sx: SxProps = {
    background: color,
    color: "#000",
    borderRadius: "50%",
    ...(transform && { transform }),
  };

  return (
    <Tooltip title={type}>
      <IconComponent sx={sx} />
    </Tooltip>
  );
};
