import React, { useState } from "react";
import { Box, List, ListItem, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import { Link, useLocation } from "react-router-dom";
import { connect } from "react-redux";

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: 15,
  },
  text: {
    fontSize: 18,
    color: "#FFFF",
  },
  actived: {
    // background: "#4598DC",
    // background: "linear-gradient(to right, #4598DC 70%, yelow 30%,)",

    background: "linear-gradient(90deg, #FFC0CB 70%, #4598DC 10%, #00FFFF 20%)",
    borderRadius: 7,
  },
  actived1: {
    width: "120%",
    borderRadius: 7,
    background: "#4598DC",
  },
  actived2: {
    width: "5%",
    borderRadius: 7,
    background: "#4598DC",
  },
}));

const ListPages = ({ userLogin }) => {
  const [user] = useState(userLogin.status);
  const classes = useStyles();
  let { pathname } = useLocation();
  document.title =
    pathname === "/"
      ? "Dashboard"
      : pathname === "/tambahbahan"
      ? "Tambah Bahan"
      : "Data Asisten";

  return (
    <List className={classes.root}>
      <ListItem button component={Link} to="/">
        <div style={{ width: "100%" }}>
          <Box display="flex" flexDirection="row">
            <Box
              p={1}
              className={clsx({
                [classes.actived1]: pathname === "/",
              })}
            >
              <Typography className={classes.text}>Dashboard</Typography>
            </Box>
            <Box style={{ padding: 2 }} />
            <Box
              p={1}
              className={clsx({
                [classes.actived2]: pathname === "/",
              })}
            />
          </Box>
        </div>
      </ListItem>

      {/* <ListItem button component={Link} to="/databahan">
        <div style={{ width: "100%" }}>
          <Box display="flex" flexDirection="row">
            <Box
              p={1}
              className={clsx({
                [classes.actived1]: pathname === "/databahan",
              })}
            >
              <Typography className={classes.text}>Data Bahan Kimia</Typography>
            </Box>
            <Box style={{ padding: 2 }} />
            <Box
              p={1}
              className={clsx({
                [classes.actived2]: pathname === "/databahan",
              })}
            />
          </Box>
        </div>
      </ListItem> */}

      {user === "admin" && (
        <ListItem button component={Link} to="/dataasisten">
          <div style={{ width: "100%" }}>
            <Box display="flex" flexDirection="row">
              <Box
                p={1}
                className={clsx({
                  [classes.actived1]: pathname === "/dataasisten",
                })}
              >
                <Typography className={classes.text}>Data Asisten</Typography>
              </Box>
              <Box style={{ padding: 2 }} />
              <Box
                p={1}
                className={clsx({
                  [classes.actived2]: pathname === "/dataasisten",
                })}
              />
            </Box>
          </div>
        </ListItem>
      )}

      {user === "admin" && (
        <ListItem button component={Link} to="/tambahbahan">
          <div style={{ width: "100%" }}>
            <Box display="flex" flexDirection="row">
              <Box
                p={1}
                className={clsx({
                  [classes.actived1]: pathname === "/tambahbahan",
                })}
              >
                <Typography className={classes.text}>Tambah Bahan</Typography>
              </Box>
              <Box style={{ padding: 2 }} />
              <Box
                p={1}
                className={clsx({
                  [classes.actived2]: pathname === "/tambahbahan",
                })}
              />
            </Box>
          </div>
        </ListItem>
      )}
    </List>
  );
};

const mapStateToProps = (state) => {
  return {
    userLogin: state.userLogin,
  };
};

export default connect(mapStateToProps, null)(ListPages);
