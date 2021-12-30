import React from "react";
import { useSelector } from "react-redux";
import { Redirect, Route } from "react-router-dom";

function RouteUser({ component, path, exact }) {
  const { isAuthenticated , user, loading } = useSelector((state) => state.auth);
  return (
    <>
      {loading ? (
        <p>loading</p>
      ) : !isAuthenticated && !user ? (
        <Redirect to="/login" />
      ) : (
        <Route
          component={component}
          path={path}
          exact={exact}
          key={Date.now()}
        />
      )}
    </>
  );
}

export default RouteUser;
