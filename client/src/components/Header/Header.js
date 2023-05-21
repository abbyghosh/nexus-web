import React, { useState } from "react";

import useDevice from "../../customHooks/useDevice";
import MenuOverlay from "./MenuOverlay/MenuOverlay";
import MovieSearch from "./MovieSearch/MovieSearch";
import NavigationItems from "./NavigationItems";
import Account from "../Account/Account";

import { ReactComponent as LogoIcon } from "../../assets/images/name-logo.svg";
import { ReactComponent as SearchIcon } from "../../assets/icons/search.svg";
import { ReactComponent as ContractIcon } from "../../assets/icons/contract.svg";

import "./header.scss";

function Header() {
  const searchRef = React.useRef(null);
  const { isMobile } = useDevice();

  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const addressFocus = () => {
    //Since the search bar isnt present in the dom so the focus isnt working instantly, so delaying the execution
    setTimeout(() => {
      searchRef.current.focus();
    }, 0);
  };

  return (
    <header
      style={{ transform: isSearchOpen ? "translateX(-87vw)" : "translateX(0vw)" }}
      className="scroll-right"
    >
      <div className="header-inner">
        {/* Navigation for mobile */}
        {isMobile && <MenuOverlay />}

        {/* <LogoIcon width="50" /> */}
        <img src="/favicon.svg" alt="logo" width={46} height={46} />

        {!isMobile && (
          <div className="search-with-nav">
            <MovieSearch />

            {/* Navigation for desktop */}
            <nav className="desktop-nav">
              <NavigationItems />
            </nav>

            {/* <Account /> */}
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
      {isSearchOpen && <MovieSearch ref={searchRef} isMobile={isMobile} />}
    </header>
  );
}

export default Header;
