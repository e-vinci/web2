import React, { useState, useEffect, useRef } from "react";
import { Link } from "gatsby";
import Dropdow from "./dropdown.js";
import { StaticImage } from "gatsby-plugin-image";
import {
  AuthenticatedTemplate,
  UnauthenticatedTemplate,
  useMsal,
  useIsAuthenticated,
} from "@azure/msal-react";
import { loginRequest } from "../../utils/auths/authConfig.js";

const reviewDropDown = {
  name: "Revues de projet",
  link: "",
  subMenu: [
    { name: "Mes revues", link: "/my-reviews-page" },
    { name: "Toutes les revues", link: "/review-page" },
  ],
};

const Menu = ({ menuLinks, siteTitle, navbarExtraStyles }) => {
  const { instance, accounts } = useMsal();
  const isAuthenticated = useIsAuthenticated();

  // ref to deal with dropdown (submenu items)
  const node = useRef();

  const [collapsed, setCollapsed] = useState(false);
  const [authenticatedUser, setAuthenticatedUser] = useState(undefined);

  // useEffect is only called at client side (no issue with SSR)
  useEffect(() => {
    // You need to restrict it at some point
    const myAccounts = instance.getAllAccounts();
    console.log("info from getAllAccounts", myAccounts);
    setAuthenticatedUser(accounts?.[0]);
    console.log("available account information from menu : ", accounts?.[0]);
  });

  // call the redirect function from MS Azure AD
  const onSigningIn = async () => {
    try {
      instance.loginRedirect(loginRequest);

    } catch (error) {
      // handle error, either in the library or coming back from the server
      console.log("error during login redirect :", error);
    }
  };

  const onSigningOut = async () => {
    try {
      instance.logoutRedirect();

    } catch (error) {
      // handle error, either in the library or coming back from the server
      console.log("error during logout redirect :", error);
    }
  };

  return (
    <nav className={`navbar ${navbarExtraStyles ? navbarExtraStyles : ""}`}>
      <Link className="navbar__brand" to="/">
        {siteTitle}
      </Link>
      <button
        onClick={() => setCollapsed(!collapsed)}
        className="navbar__toggler"
        type="button"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar__toggler__icon"></span>
      </button>
      <div
        className={`navbar__menu ${collapsed ? "navbar__menu--collapse" : ""}`}
        id="navbarSupportedContent"
      >
        <ul className="navbar__menu__list">
          {menuLinks.map((link, indexMenu) =>
            link.subMenu && link.subMenu.length > 0 ? (
              <Dropdow
                key={"dd" + indexMenu}
                linkName={link.name}
                subMenu={link.subMenu}
              ></Dropdow>
            ) : (
              <li key={"li" + indexMenu} className="navbar__menu__list__item">
                <Link
                  className="navbar__menu__list__item__link"
                  aria-current="page"
                  to={link.link}
                >
                  {link.name}
                </Link>
              </li>
            )
          )}

          <UnauthenticatedTemplate>
            <li key={"li-login"} className="navbar__menu__list__item">
              <StaticImage
                className="navbar__menu__list__item__link"
                onClick={() => onSigningIn()}
                src="../../images/logo_vinci.png"
                alt=""
                width="24"
                height="24"
              />
            </li>
          </UnauthenticatedTemplate>

          <AuthenticatedTemplate>
            <li key={"li-projects"} className="navbar__menu__list__item">
              <Link
                className="navbar__menu__list__item__link"
                to="/project-page"
              >
                Projets
              </Link>
            </li>

            <Dropdow
              key={"dd-reviews"}
              linkName={reviewDropDown.name}
              subMenu={reviewDropDown.subMenu}
            ></Dropdow>

            <li key={"li-logout"} className="navbar__menu__list__item">
              <span  className="navbar__menu__list__item__link" 
               onClick={() => onSigningOut()}
              >
                Logout
              </span>
            </li>
          </AuthenticatedTemplate>
        </ul>
      </div>
    </nav>
  );
};

export default Menu;
