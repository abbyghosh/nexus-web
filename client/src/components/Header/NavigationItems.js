import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { GlobalContext } from "../../context/GlobalState";

import ROUTES from "../../routes.json";

function NavigationItems() {
  let {
    users: {
      userDetails: { isAdmin },
    },
  } = useContext(GlobalContext);

  return (
    <ul>
      {Object.keys(ROUTES).map((nav) => {
        const { name, url, isProtected } = ROUTES[nav];

        return (
          (!isProtected || isAdmin) && (
            <li key={name}>
              <NavLink to={url} exact={true}>
                {name}
              </NavLink>
            </li>
          )
        );
      })}
    </ul>
  );
}

export default NavigationItems;
