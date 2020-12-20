import React, { useEffect, useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { connect } from "react-redux";
import Alert from "@material-ui/lab/Alert";
import { userLogin } from "../../helper/redux/action";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const SignIn = ({ dataUsers, userLogin, ...props }) => {
  const classes = useStyles();
  const [data, setData] = useState({ npm: false, password: false });
  const [errorLogin, setErrorLogin] = useState(false);

  useEffect(() => {
    document.title = "Login";
    const data = JSON.parse(localStorage.getItem("login"));
    data && props.history.push("/");
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    const temp = dataUsers.find(
      (item) => item.npm == data.npm && item.password == data.password
    );
    if (temp) {
      setErrorLogin(false);
      localStorage.setItem("user", JSON.stringify(temp));
      localStorage.setItem("login", JSON.stringify(true));
      userLogin();
      return props.history.push("/");
    }
    return setErrorLogin(true);
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form
          className={classes.form}
          noValidate={false}
          onSubmit={(data) => handleSubmit(data)}
        >
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            label="NPM"
            autoFocus
            onInput={(e) => setData({ ...data, npm: e.target.value })}
          />
          <TextField
            margin="normal"
            variant="outlined"
            required
            fullWidth
            label="Password"
            type="password"
            onInput={(e) => setData({ ...data, password: e.target.value })}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign In
          </Button>
        </form>
        {errorLogin && <Alert severity="error">NPM dan Passwor Salah</Alert>}
      </div>
    </Container>
  );
};

const mapStateToProps = (state) => {
  return {
    dataUsers: state.dataUsers,
    // userLogin,state.userLogin
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    userLogin: () => dispatch(userLogin()),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(SignIn);
