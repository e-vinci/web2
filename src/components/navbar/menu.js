import React, { useState, useRef } from "react";
import Dropdow from "./dropdown.js";
import { StaticImage } from "gatsby-plugin-image";
import {
  AuthenticatedTemplate,
  UnauthenticatedTemplate,
  useMsal,
  useIsAuthenticated,
} from "@azure/msal-react";
import { graphql } from "gatsby";
import { useStaticQuery } from "gatsby";
import { useIntl } from "react-intl";
import { loginRequest } from "../../utils/auths/authConfig.js";
import InternationalLink from "./international-link.js";
import LanguageSwitcher from "../language-switcher/language-switcher.js";

const reviewDropDown = {
  name: "Revues de projet",
  link: "",
  subMenu: [
    { name: "Mes revues", link: "/my-reviews-page" },
    { name: "Toutes les revues", link: "/review-page" },
  ],
};

const Menu = ({ menuLinks, siteTitle, navbarExtraStyles }) => {
  const data = useStaticQuery(
    graphql`
      {
        allSitePlugin(filter: { name: { eq: "gatsby-plugin-i18n" } }) {
          nodes {
            name
            pluginOptions
          }
        }
      }
    `
  );

  const i18nPluginOptions = data?.allSitePlugin.nodes[0].pluginOptions;
  //console.log("In the menu, i18n : ", i18nPluginOptions);

  const { locale } = useIntl();
  console.log("the current locale is : ", locale);
  const { instance, accounts } = useMsal();
  const isAuthenticated = useIsAuthenticated();

  // ref to deal with dropdown (submenu items)
  const node = useRef();

  const [collapsed, setCollapsed] = useState(false);

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
      <InternationalLink
        className="navbar__brand"
        i18nPluginOptions={i18nPluginOptions}
        absoluteLink="/"
        locale={locale}
      >
        {siteTitle}
      </InternationalLink>

      <LanguageSwitcher />
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
                i18nPluginOptions={i18nPluginOptions}
                locale={locale}
              ></Dropdow>
            ) : (
              <li key={"li" + indexMenu} className="navbar__menu__list__item">
                <InternationalLink
                  className="navbar__menu__list__item__link"
                  i18nPluginOptions={i18nPluginOptions}
                  absoluteLink={link.link}
                  locale={locale}
                >
                  {link.name}
                </InternationalLink>
              </li>
            )
          )}

          <UnauthenticatedTemplate>
            <li key={"li-login"} className="navbar__menu__list__item">
              <span className="navbar__menu__list__item__link">
                <StaticImage
                  placeholder="blurred"
                  onClick={() => onSigningIn()}
                  src="../../images/logo_vinci.png"
                  alt=""
                  width={24}
                />
              </span>
            </li>
          </UnauthenticatedTemplate>

          <AuthenticatedTemplate>
            <li key={"li-projects"} className="navbar__menu__list__item">
              <InternationalLink
                className="navbar__menu__list__item__link"
                i18nPluginOptions={i18nPluginOptions}
                absoluteLink="/project-page"
                locale={locale}
              >
                Projets
              </InternationalLink>
            </li>

            <Dropdow
              key={"dd-reviews"}
              linkName={reviewDropDown.name}
              subMenu={reviewDropDown.subMenu}
              i18nPluginOptions={i18nPluginOptions}
              locale={locale}
            ></Dropdow>

            <li key={"li-logout"} className="navbar__menu__list__item">
              <span
                className="navbar__menu__list__item__link"
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
