import { Box, Button, Grid, Stack, Typography } from "@mui/material";
import React from "react";
import {
  ErrorBoundary as ReactErrorBoundary,
  FallbackProps,
} from "react-error-boundary";

const ErrorFallback: React.FC<FallbackProps> = ({
  error,
  resetErrorBoundary,
}) => {
  return (
    <Grid container spacing={3} m={4} role="alert">
      <Grid item xs={12}>
        <Typography variant="h4" gutterBottom>
          Something went wrong...
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Stack direction="row">
          <Box sx={{ whiteSpace: "pre-wrap" }}>{error.message}</Box>
        </Stack>
      </Grid>
      <Grid item xs={12}>
        <Button variant="contained" onClick={resetErrorBoundary}>
          Try again
        </Button>
      </Grid>
    </Grid>
  );
};

interface Props {
  children: React.ReactNode;
}

const ErrorBoundary: React.FC<Props> = ({ children }) => {
  return (
    <ReactErrorBoundary
      FallbackComponent={ErrorFallback}
      onReset={() => {
        console.log("Error boundary reset");
      }}
    >
      {children}
    </ReactErrorBoundary>
  );
};

export default ErrorBoundary;
