import React from "react";
import LockIcon from "@material-ui/icons/Lock";
import ButtonBase from "@material-ui/core/ButtonBase";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  span: {
    fontSize: 15,
    color: "#FFFF",
    margin: 4,
  },
  icon: {
    color: "#FFFF",
  },
}));

const ActionButton = ({ color, label, handleClick }) => {
  const classes = useStyles();
  return (
    <>
      <ButtonBase
        variant="contained"
        style={{ background: color, borderRadius: 5 }}
        onClick={handleClick}
      >
        <LockIcon className={classes.icon} />
        <span className={classes.span}>{label}</span>
      </ButtonBase>
    </>
  );
};

export default ActionButton;
