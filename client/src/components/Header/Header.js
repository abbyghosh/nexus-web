import React, { useState } from "react";

import "./header.scss";
import MovieSearch from "./MovieSearch/MovieSearch";
import { ReactComponent as LogoIcon } from "../../assets/images/name-logo.svg";
import { ReactComponent as SearchIcon } from "../../assets/icons/search.svg";
import { ReactComponent as ContractIcon } from "../../assets/icons/contract.svg";
import { NavLink } from "react-router-dom";
import useDevice from "../../customHooks/useDevice";
import MenuOverlay from "./MenuOverlay/MenuOverlay";

function Header() {
  const { isMobile } = useDevice();
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  return (
    <header>
      <div>
        {isMobile && <MenuOverlay />}

        <LogoIcon width="50" />
        {!isMobile && (
          <div className="search-with-nav">
            <MovieSearch />

            <nav className="desktop-nav">
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
        )}

        {isMobile ? (
          isSearchOpen ? (
            <ContractIcon width="30" onClick={() => setIsSearchOpen(false)} />
          ) : (
            <SearchIcon width="30" onClick={() => setIsSearchOpen(true)} />
          )
        ) : null}
      </div>
      {isSearchOpen && <MovieSearch width="100%" />}
    </header>
  );
}

export default Header;
