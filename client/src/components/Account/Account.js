import React, { useContext } from "react";

import { GlobalContext } from "../../context/GlobalState";
import Modal from "../common/Modal/Modal";
import Button from "../common/Button/Button";
import Register from "./Register/Register";
import Login from "./Login/Login";

import { ReactComponent as LogoutIcon } from "../../assets/icons/logout.svg";

import "./account.scss";

function Account({
  isLoginModalOpen,
  setIsLoginModalOpen,
  isRegisterModalOpen,
  setIsRegisterModalOpen,
  onClose,
}) {
  let {
    users: { setUserDetails, userDetails },
  } = useContext(GlobalContext);

  const handleLoginClose = () => {
    setIsLoginModalOpen(false);
    if (onClose) onClose();
  };

  const handleRegisterClose = () => {
    setIsRegisterModalOpen(false);
    if (onClose) onClose();
  };

  return (
    <>
      <div className="account">
        {/* <div className="button">Login as Guest</div> */}
        {Object.keys(userDetails).length ? (
          <section className="user-detail">
            <div className="user-detail__body">
              <p className="user-detail__name">{userDetails.name}</p>
              <p className="user-detail__email">{userDetails.email}</p>
            </div>

            <div className="user-detail__footer">
              <p>Change Password</p>
              <Button
                rightIcon={<LogoutIcon width="20" />}
                onClick={() => {
                  setUserDetails({});
                  localStorage.removeItem("user");
                }}
              >
                Logout
              </Button>
            </div>
          </section>
        ) : (
          <div className="authentication">
            <div className="button" onClick={() => setIsLoginModalOpen(true)}>
              Login
            </div>
            <span className="or">OR</span>
            <div className="button" onClick={() => setIsRegisterModalOpen(true)}>
              Register
            </div>
          </div>
        )}
      </div>

      <Modal header="Login" isOpen={isLoginModalOpen} handleCLose={handleLoginClose}>
        <Login handleCLose={handleLoginClose} />
      </Modal>
      <Modal header="Register" isOpen={isRegisterModalOpen} handleCLose={handleRegisterClose}>
        <Register handleCLose={handleRegisterClose} />
      </Modal>
    </>
  );
}

export default Account;
