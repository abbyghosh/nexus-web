import React from "react";

import "./header.scss";
import MovieSearch from "./MovieSearch/MovieSearch";
import { ReactComponent as LogoIcon } from "../../assets/images/name-logo.svg";
import { NavLink } from "react-router-dom";

function Header() {
  return (
    <header>
      <div>
        <LogoIcon width="50" />
        <div>
          <MovieSearch />
          <nav>
            <ul>
              <li>
                <NavLink to="/blog">Blog</NavLink>
              </li>
              <li>
                <NavLink to="/references">References</NavLink>
              </li>
              <li>
                <NavLink to="/resources">Dev Resources</NavLink>
              </li>
              <li>
                <NavLink to="/">Movies</NavLink>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
}

export default Header;
