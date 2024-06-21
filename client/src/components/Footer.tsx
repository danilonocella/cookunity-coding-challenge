import { FC } from "react";
import { Typography, Box, Grid } from "@mui/material";

const Footer: FC = () => (
  <Box
    component="footer"
    sx={{
      py: 1,
      px: 2,
      mt: "auto",
      backgroundColor: (theme) => theme.palette.primary.main,
    }}
  >
    <Grid
      container
      direction="row"
      justifyContent="center"
      alignItems="center"
      sx={{padding: 2}}
    >
      <Grid item>
        <Typography
          variant="body2"
          color={(theme) => theme.palette.primary.contrastText}
        >
          {`Engineer Coding Challenge - Copyright © ${new Date().getFullYear()} CookUnity`}
        </Typography>
      </Grid>
    </Grid>
  </Box>
);

export default Footer;
