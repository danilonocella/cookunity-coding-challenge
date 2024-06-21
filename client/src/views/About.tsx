import { FC } from "react";
import { Grid, Typography } from "@mui/material";

const Home: FC = () => {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Typography variant="h3" gutterBottom>
          Engineer Coding Challenge
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Typography variant="h4" gutterBottom>Purpose</Typography>
      </Grid>
      <Grid item xs={12}>
        <Typography>
          As part of CookUnity's selection process, CookUnity requests that candidates
          complete a small project aimed at helping grasp their skills,
          experiences, creativity, problem-solving abilities, and knowledge.
        </Typography>
      </Grid>
    </Grid>
  );
};

export default Home;
