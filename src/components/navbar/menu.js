import React, { useState, useEffect, useRef } from "react";
import { Link } from "gatsby";
import Dropdow from "./dropdown.js";
import { StaticImage } from "gatsby-plugin-image";
import { getUserName } from "../../utils/auths/authPopup";

const Menu = ({ menuLinks, siteTitle, navbarExtraStyles }) => {
  // ref to deal with dropdown (submenu items)
  const node = useRef();

  const [collapsed, setCollapsed] = useState(false);
  const [authenticatedUser, setAuthenticatedUser] = useState(undefined);

  // useEffect is only called at client side (no issue with SSR)
  useEffect(() => {
    // You need to restrict it at some point
    setAuthenticatedUser(getUserName());
    console.log("effect : ", authenticatedUser);
  });

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
          {/* Deal with client side menu items : unauthenticated user */}
          {!authenticatedUser ? (
            <li key={"li-login"} className="navbar__menu__list__item">
              <Link to="/auths/login">
                <StaticImage
                  src="../../images/logo_vinci.png"
                  alt=""
                  width="24"
                  height="24"
                />
              </Link>
            </li>
          ) : (
            // client side menu items for authenticated user
            <>
              <li key={"li-projects"} className="navbar__menu__list__item">
                <Link
                  className="navbar__menu__list__item__link"
                  to="/auths/project-page"
                >
                  Projects
                </Link>
              </li>
              <li key={"li-login"} className="navbar__menu__list__item">
                <Link
                  className="navbar__menu__list__item__link"
                  to="/auths/logout"
                >
                  Logout
                </Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Menu;
