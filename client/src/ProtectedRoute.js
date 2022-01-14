import React, { useContext } from "react";
import { Route } from "react-router-dom";

import NotFound from "./components/NotFound";
import { GlobalContext } from "./context/GlobalState";

function ProtectedRoute({ component: Component, ...rest }) {
  let {
    users: { userDetails },
  } = useContext(GlobalContext);

  return (
    <Route
      {...rest}
      render={(routeProps) => (userDetails.isAdmin ? <Component {...routeProps} /> : <NotFound />)}
    />
  );
}
export default ProtectedRoute;
