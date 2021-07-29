import React, { useState, useEffect, useRef } from "react";
import { Link } from "gatsby";
import Dropdow from "./dropdown.js";

//import Icon from "../../images/artiyoga.inline.svg";

const Menu = ({ menuLinks, siteTitle, navbarExtraStyles }) => {
  // ref to deal with dropdown (submenu items)
  const node = useRef();

  const [collapsed, setCollapsed] = useState(false);

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
        </ul>
      </div>
    </nav>
  );
};

export default Menu;
