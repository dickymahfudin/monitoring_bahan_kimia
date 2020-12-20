import React from "react";
import { Redirect, Route } from "react-router-dom";
import Layout from "../../components/layout";

const AuthLogin = ({ login, component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(data) =>
        JSON.parse(localStorage.getItem("login")) ? (
          <Layout>
            <Component {...data} />
          </Layout>
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: {
                from: data.location,
              },
            }}
          />
        )
      }
    ></Route>
  );
};

export default AuthLogin;
