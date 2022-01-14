import React, { useEffect, useRef, useState } from "react";

import useDetectOutside from "../../../customHooks/useDetectOutside";
import Account from "../../Account/Account";
import NavigationItems from "../NavigationItems";

import { ReactComponent as MenuIcon } from "../../../assets/icons/menu-mobile.svg";

import "./MenuOverlay.scss";

function MenuOverlay() {
  const wrapperRef = useRef(null);
  const [clickedOutside, setClicked] = useDetectOutside(wrapperRef);

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);

  useEffect(() => {
    if (!(isLoginModalOpen || isRegisterModalOpen)) setIsMenuOpen(false);
    else setClicked(false);
  }, [clickedOutside]);

  return (
    <div className="mobile-menu" ref={wrapperRef}>
      <MenuIcon width="50" onClick={() => setIsMenuOpen((prev) => !prev)} />

      {isMenuOpen && (
        <div
          className="menu-overlay"
          style={{ display: isLoginModalOpen || isRegisterModalOpen ? "none" : "" }}
        >
          <nav>
            <NavigationItems />
          </nav>
          <Account
            isLoginModalOpen={isLoginModalOpen}
            setIsLoginModalOpen={setIsLoginModalOpen}
            isRegisterModalOpen={isRegisterModalOpen}
            setIsRegisterModalOpen={setIsRegisterModalOpen}
            onClose={() => setIsMenuOpen(false)}
          />
        </div>
      )}
    </div>
  );
}

export default MenuOverlay;
