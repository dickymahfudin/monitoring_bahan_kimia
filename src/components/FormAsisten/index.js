import { Button, MenuItem, Paper, TextField } from "@material-ui/core";
import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useState } from "react";
import { connect } from "react-redux";
import { apiAddUser } from "../../helper/redux/action";
const useStyles = makeStyles((theme) => ({
  root: {
    width: 300,
  },
}));

const DetailAsisten = ({ data, addUser, setOpenDialog }) => {
  const classes = useStyles();
  const [state, setState] = useState({
    nama: null,
    npm: null,
    no_hp: null,
    password: null,
    status: "",
  });
  const [test, settest] = useState(false);
  const handleSubmit = (event) => {
    event.preventDefault();
    setOpenDialog(false);
    addUser(state);
  };
  const status = [{ value: "admin" }, { value: "Asisten Lab" }];
  useEffect(() => {
    if (data) {
      setState(data);
      settest(true);
      console.log(state);
    } else {
      settest(true);
    }
  }, [data]);

  return (
    <>
      {test && (
        <form className={classes.root} onSubmit={(data) => handleSubmit(data)}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            label="NAMA"
            defaultValue={state.nama}
            onInput={(e) => setState({ ...state, nama: e.target.value })}
            autoFocus
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            label="NPM"
            defaultValue={state.npm}
            onInput={(e) => setState({ ...state, npm: e.target.value })}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            label="NO HP"
            defaultValue={state.no_hp}
            onInput={(e) => setState({ ...state, no_hp: e.target.value })}
          />
          <TextField
            margin="normal"
            variant="outlined"
            required
            fullWidth
            label="Password"
            // type="password"
            defaultValue={state.password}
            onInput={(e) => setState({ ...state, password: e.target.value })}
          />
          <div>
            <TextField
              margin="normal"
              variant="outlined"
              required
              fullWidth
              select
              label="STATUS"
              value={state.status}
              onChange={(e) => setState({ ...state, status: e.target.value })}
            >
              {status.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.value}
                </MenuItem>
              ))}
            </TextField>
          </div>

          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            SAVE
          </Button>
        </form>
      )}
    </>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    addUser: (data) => dispatch(apiAddUser(data)),
  };
};

export default connect(null, mapDispatchToProps)(DetailAsisten);
