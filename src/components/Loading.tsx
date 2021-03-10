import { CircularProgress, Grid } from "@material-ui/core";

export default function Loading() {
  return (
    <Grid container height="100vh" alignItems="center" justifyContent="center">
      <CircularProgress 
        size={60}
        color="primary"
        thickness={3}
      />
    </Grid>
  )
}
