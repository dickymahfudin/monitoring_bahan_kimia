import React, { useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
// import DataAsisten from "./pages/dataasisten";
import DataBahan from "./pages/databahan";
import Dashboard from "./pages/Dashboard";
import Dataasisten from "./pages/dataasisten";
import Login from "./pages/Login";
import { apiGetUsers, userLogin } from "./helper/redux/action";
import AuthLogin from "./pages/Login/AuthLogin";
import { connect } from "react-redux";
import NotFound from "./pages/NotFound";
import TambahBahan from "./pages/TambahBahan";
import FormAsisten from "./components/FormAsisten";

const App = ({ apiGetUsers, userLogin }) => {
  useEffect(() => {
    userLogin();
    apiGetUsers();
  }, []);

  return (
    <>
      <Router>
        <Switch>
          <AuthLogin path="/" component={Dashboard} exact />
          <AuthLogin path="/databahan" component={DataBahan} exact />
          <AuthLogin path="/dataasisten" component={Dataasisten} exact />
          <AuthLogin path="/tambahbahan" component={TambahBahan} exact />
          <Route path="/login" component={Login} exact />
          <Route path="/test" component={FormAsisten} exact />
          <AuthLogin component={NotFound} exact />
        </Switch>
      </Router>
    </>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    apiGetUsers: () => dispatch(apiGetUsers()),
    userLogin: () => dispatch(userLogin()),
  };
};

export default connect(null, mapDispatchToProps)(App);
