import { FC } from "react";
import { AppBar, Box, Button, Toolbar, Typography } from "@mui/material";
import CatchingPokemonIcon from "@mui/icons-material/CatchingPokemon";
import { Link } from "react-router-dom";

const navItems = [
  { label: "Home", url: "/" },
  { label: "About", url: "/about" },
];

const Header: FC = () => (
  <AppBar position="static" data-testid="header">
    <Toolbar
      sx={{
        backgroundColor: (theme) => theme.palette.secondary.main,
      }}
    >
      <Typography
        color="secondary"
        variant="h6"
        component="div"
        sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}
      >
        <CatchingPokemonIcon sx={{ color: "#FFF", transform: 'scaleY(-1)' }} />
      </Typography>
      <Box sx={{ display: { xs: "none", sm: "block" } }}>
        {navItems.map((item) => (
          <Link key={item.label} to={item.url}>
            <Button sx={{ color: "#FFF" }}>{item.label}</Button>
          </Link>
        ))}
      </Box>
    </Toolbar>
  </AppBar>
);

export default Header;
