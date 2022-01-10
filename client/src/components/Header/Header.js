import React, { useState } from "react";
import { NavLink } from "react-router-dom";

import useDevice from "../../customHooks/useDevice";
import MenuOverlay from "./MenuOverlay/MenuOverlay";
import MovieSearch from "./MovieSearch/MovieSearch";

import { ReactComponent as LogoIcon } from "../../assets/images/name-logo.svg";
import { ReactComponent as SearchIcon } from "../../assets/icons/search.svg";
import { ReactComponent as ContractIcon } from "../../assets/icons/contract.svg";

import ROUTES from "../../routes.json";

import "./header.scss";

function Header() {
  const { isMobile } = useDevice();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const searchRef = React.useRef(null);

  const addressFocus = () => {
    //Since the search bar isnt present in the dom so the focus isnt working instantly, so delaying the execution
    setTimeout(() => {
      searchRef.current.focus();
    }, 0);
  };

  return (
    <header>
      <div className="header-inner">
        {isMobile && <MenuOverlay />}

        <LogoIcon width="50" />
        {!isMobile && (
          <div className="search-with-nav">
            <MovieSearch />

            <nav className="desktop-nav">
              <ul>
                {ROUTES.map(({ name, url }) => (
                  <li>
                    <NavLink to={url} exact={true}>
                      {name}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        )}

        {isMobile ? (
          isSearchOpen ? (
            <ContractIcon width="30" onClick={() => setIsSearchOpen(false)} />
          ) : (
            <SearchIcon
              width="30"
              onClick={(e) => {
                setIsSearchOpen(true);
                addressFocus(e);
              }}
            />
          )
        ) : null}
      </div>
      {isSearchOpen && <MovieSearch width="100%" ref={searchRef} isMobile={isMobile} />}
    </header>
  );
}

export default Header;
