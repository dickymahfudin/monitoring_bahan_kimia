import React from "react";
import { Box, Grid, makeStyles, Paper, Typography } from "@material-ui/core";
import { ReactComponent as Logo } from "../../assets/ic_tabrek.svg";
import Icon from "../../assets/icon";

const useStyles = makeStyles((theme) => ({
  score: {
    fontSize: 40,
    fontWeight: "bold",
  },
}));

const PaperBahan = ({ color, label, value }) => {
  const classes = useStyles();

  return (
    <Paper elevation={3}>
      <Grid
        container
        item
        direction="row"
        justify="center"
        alignItems="center"
        style={{ height: "100%" }}
      >
        <Grid
          container
          item
          direction="column"
          justify="center"
          alignItems="center"
          style={{ height: "100%" }}
          sm={4}
        >
          <Icon fill={color} height={90} width={90} />
          <Typography variant="body1">{label}</Typography>
        </Grid>
        <Grid
          container
          item
          direction="column"
          justify="center"
          alignItems="center"
          sm={6}
        >
          <Typography className={classes.score} style={{ color: color }}>
            {value}ml
          </Typography>
          <Typography variant="body1" style={{ textAlign: "center" }}>
            Sisa Bahan
          </Typography>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default PaperBahan;
