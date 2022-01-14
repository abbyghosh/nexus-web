import React from "react";
import { NavLink } from "react-router-dom";

import ROUTES from "../../routes.json";

function NavigationItems() {
  return (
    <ul>
      {Object.keys(ROUTES).map((nav) => {
        const { name, url } = ROUTES[nav];

        return (
          <li key={name}>
            <NavLink to={url} exact={true}>
              {name}
            </NavLink>
          </li>
        );
      })}
    </ul>
  );
}

export default NavigationItems;
