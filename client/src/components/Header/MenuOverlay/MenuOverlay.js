import React, { useEffect, useRef, useState } from "react";
import { NavLink } from "react-router-dom";

import useDetectOutside from "../../../customHooks/useDetectOutside";

import { ReactComponent as MenuIcon } from "../../../assets/icons/menu-mobile.svg";

import ROUTES from "../../../routes.json";

import "./MenuOverlay.scss";

function MenuOverlay() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const wrapperRef = useRef(null);
  const clickedOutside = useDetectOutside(wrapperRef);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [clickedOutside]);

  return (
    <div className="mobile-menu" ref={wrapperRef}>
      <MenuIcon width="50" onClick={() => setIsMenuOpen((prev) => !prev)} />

      {isMenuOpen && (
        <nav>
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
      )}
    </div>
  );
}

export default MenuOverlay;
