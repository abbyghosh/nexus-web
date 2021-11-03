import React, { useEffect, useRef, useState } from "react";
import { NavLink } from "react-router-dom";
import { ReactComponent as MenuIcon } from "../../../assets/icons/menu-mobile.svg";
import useDetectOutside from "../../../customHooks/useDetectOutside";
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
      )}
    </div>
  );
}

export default MenuOverlay;
