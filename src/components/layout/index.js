import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import AppBar from "@material-ui/core/AppBar";
import CssBaseline from "@material-ui/core/CssBaseline";
import Drawer from "@material-ui/core/Drawer";
import Hidden from "@material-ui/core/Hidden";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import ListPages from "../ListPages";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import LogoUnpak from "../../assets/unpak.png";
import { Box, Tooltip } from "@material-ui/core";
import { connect } from "react-redux";
import { useLocation } from "react-router-dom";
import {
  apiGetDataPemakai,
  apiGetDataSensors,
  apiGetDataPenambahan,
} from "../../helper/redux/action";

const drawerWidth = 280;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  drawer: {
    [theme.breakpoints.up("sm")]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  appBar: {
    [theme.breakpoints.up("sm")]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
    },
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up("sm")]: {
      display: "none",
    },
  },
  // necessary for content to be below app bar
  toolbar: {
    // display: "flex",
    marginTop: 50,
  },
  drawerPaper: {
    width: drawerWidth,
    background: "#5FC7EC",
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  textAppbar: {
    fontSize: 36,
    fontWeight: "bold",
    color: "#4698DD",
  },
  textPersedian: {
    fontSize: 16,
    color: "#FFFF",
    textAlign: "center",
  },
  textMonitoring: {
    fontSize: 26,
    color: "#FFFF",
    fontWeight: "bold",
    textAlign: "center",
  },
  avatar: {
    marginTop: 10,
    textAlign: "center",
    color: "#C4C4C4",
  },
  unpak: {
    position: "fixed",
    bottom: 0,
    marginBottom: 10,
    marginLeft: 10,
  },
  textBottom: {
    fontSize: 27,
    color: "#FFFF",
    fontWeight: "bold",
    textAlign: "center",
  },
  textBiologi: {
    fontSize: 17,
    color: "#FFFF",
    textAlign: "center",
  },
}));

const DrawerComponent = ({ nama, npm }) => {
  const classes = useStyles();
  const [state, setstate] = useState({ nama: false, npm: "ok" });

  useEffect(() => {
    nama && setstate({ ...state, nama, npm });
  }, [nama, npm]);

  const handleLogout = () => {
    localStorage.setItem("login", JSON.stringify(false));
    window.location.reload();
  };
  return (
    <div>
      <div className={classes.toolbar}>
        <Typography className={classes.textMonitoring}>
          Aplikasi Monitoring
        </Typography>
        <Typography className={classes.textPersedian}>
          Persediaan Bahan Kimia
        </Typography>
        <div className={classes.avatar}>
          <Tooltip title="LOGOUT">
            <IconButton aria-label="delete" onClick={() => handleLogout()}>
              <AccountCircleIcon style={{ fontSize: 120 }} />
            </IconButton>
          </Tooltip>
        </div>
        <Typography className={classes.textPersedian}>{state.nama}</Typography>
        <Typography className={classes.textPersedian}>{state.npm}</Typography>
      </div>
      <ListPages />
      <div className={classes.unpak}>
        <Box display="flex" flexDirection="row">
          <Box>
            <img
              src={LogoUnpak}
              alt="unpak"
              style={{ height: 70, width: 70 }}
            />
          </Box>
          <Box>
            <Typography className={classes.textBottom}>Laboratorium</Typography>
            <Typography className={classes.textBiologi}>
              Prodi Pendidikan Biologi
            </Typography>
          </Box>
        </Box>
      </div>
    </div>
  );
};
function Layout(props) {
  const classes = useStyles();
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [user, setUser] = useState(false);
  let { pathname } = useLocation();

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  useEffect(() => {
    props.getDataSensors();
    props.getPemakai();
    props.getPenambahan();
  }, [props]);

  useEffect(() => {
    props.userLogin && setUser(props.userLogin);
  }, [props]);

  const container =
    props.window !== undefined ? () => window().document.body : undefined;

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="fixed"
        color="default"
        elevation={0}
        className={classes.appBar}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            className={classes.menuButton}
          >
            <MenuIcon />
          </IconButton>
          <Typography noWrap className={classes.textAppbar}>
            {pathname === "/"
              ? "Dashboard"
              : pathname === "/tambahbahan"
              ? "Tambah Bahan"
              : "Data Asisten"}
          </Typography>
        </Toolbar>
      </AppBar>
      <nav className={classes.drawer} aria-label="mailbox folders">
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Hidden smUp implementation="css">
          <Drawer
            container={container}
            variant="temporary"
            anchor={theme.direction === "rtl" ? "right" : "left"}
            open={mobileOpen}
            onClose={handleDrawerToggle}
            classes={{
              paper: classes.drawerPaper,
            }}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
          >
            {user && <DrawerComponent nama={user.nama} npm={user.npm} />}
          </Drawer>
        </Hidden>
        <Hidden xsDown implementation="css">
          <Drawer
            classes={{
              paper: classes.drawerPaper,
            }}
            variant="permanent"
            open
          >
            {user && <DrawerComponent nama={user.nama} npm={user.npm} />}
          </Drawer>
        </Hidden>
      </nav>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        {props.children}
      </main>
    </div>
  );
}

Layout.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

const mapStateToProps = (state) => {
  return {
    userLogin: state.userLogin,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getDataSensors: () => dispatch(apiGetDataSensors()),
    getPemakai: () => dispatch(apiGetDataPemakai()),
    getPenambahan: () => dispatch(apiGetDataPenambahan()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Layout);
