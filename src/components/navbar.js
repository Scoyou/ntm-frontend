import React, { useState } from "react";
import { Menu, Button } from "semantic-ui-react";
import SignInPage from "./SignInPage";
import Cookies from "js-cookie";
import SignUpPage from "./SignUpPage";
import { NavLink, } from "react-router-dom";

const Navbar = () => {
  const jwt = Cookies.get("jwt");
  const [loggedIn, setLoggedIn] = useState(false);

  return (
    <Menu inverted>
      <NavLink to="/">
        <Menu.Item header>Tasky McTaskFace</Menu.Item>
      </NavLink>
      {jwt ? (
        <>
          <NavLink to="/dashboard">
            <Menu.Item name="dashboard">Dashboard</Menu.Item>
          </NavLink>

          <NavLink to="/tasks">
            <Menu.Item name="tasks">Tasks</Menu.Item>
          </NavLink>
          <Menu.Item position="right">
            <Button
              onClick={() => {
                Cookies.remove("jwt");
                setLoggedIn(false);
              }}
            >
              Sign Out
            </Button>
          </Menu.Item>
        </>
      ) : (
        <>
          <Menu.Item position="right">
            <SignInPage setLoggedIn={setLoggedIn} />
            <div styles={{ marginLeft: "10px" }}>
              <SignUpPage />
            </div>
          </Menu.Item>
        </>
      )}
    </Menu>
  );
};

export default Navbar;
