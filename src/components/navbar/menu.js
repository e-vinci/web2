import React, { useState, useRef } from 'react';
import Dropdow from './dropdown.js';
import { StaticImage } from 'gatsby-plugin-image';
import { useMsal, useIsAuthenticated } from '@azure/msal-react';
import { graphql } from 'gatsby';
import { useStaticQuery } from 'gatsby';
import { useIntl } from 'react-intl';
import { loginRequest } from '../../utils/auths/authConfig.js';
import InternationalLink from './international-link.js';
import LanguageSwitcher from '../language-switcher/language-switcher.js';
import MenuItem from './menu-item.js';

const Menu = ({ siteMetadata, navbarExtraStyles }) => {
  const { menuLinks, title: siteTitle, isAuthentication } = siteMetadata;

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

  const { locale } = useIntl();
  
  const { instance, accounts } = useMsal();
  const isAuthenticated = useIsAuthenticated();

  // ref to deal with dropdown (submenu items)
  const node = useRef();

  const [collapsed, setCollapsed] = useState(false);

  return (
    <nav className={`navbar ${navbarExtraStyles ? navbarExtraStyles : ''}`}>
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
        className={`navbar__menu ${collapsed ? 'navbar__menu--collapse' : ''}`}
        id="navbarSupportedContent"
      >
        <ul className="navbar__menu__list">
          {menuLinks.map((link, indexMenu) =>
            link.subMenu && link.subMenu.length > 0 ? (
              <Dropdow
                key={indexMenu}
                itemData={link}
                i18nPluginOptions={i18nPluginOptions}
                locale={locale}
                isAuthenticated={isAuthenticated}
              ></Dropdow>
            ) : (
              <MenuItem
                key={indexMenu}
                className="navbar__menu__list__item"
                i18nPluginOptions={i18nPluginOptions}
                itemData={link}
                locale={locale}
                isAuthenticated={isAuthenticated}
                isWithinDrowdown={false}
              />
            )
          )}

          {isAuthentication && !isAuthenticated && (
            <LoginItem msalInstance={instance} />
          )}

          {isAuthentication && isAuthenticated && (
            <LogoutItem msalInstance={instance} />
          )}
        </ul>
      </div>
    </nav>
  );
};

const LoginItem = ({ msalInstance }) => {
  return (
    <li key={'li-login'} className="navbar__menu__list__item">
      <span
        className="navbar__menu__list__item__link"
        onClick={() => onSigningIn(msalInstance)}
      >
        <StaticImage
          placeholder="blurred"
          src="../../images/logo_vinci.png"
          alt=""
          width={24}
        />
      </span>
    </li>
  );
};

const LogoutItem = ({ msalInstance }) => {
  return (
    <li key={'li-logout'} className="navbar__menu__list__item">
      <span
        className="navbar__menu__list__item__link"
        onClick={() => onSigningOut(msalInstance)}
      >
        Logout
      </span>
    </li>
  );
};

// call the redirect function from MS Azure AD
const onSigningIn = (msalInstance) => {
  try {
    console.log('ON SIGNING IN...');
    msalInstance.loginRedirect(loginRequest);
  } catch (error) {
    // handle error, either in the library or coming back from the server
    console.log('error during login redirect :', error);
  }
};

const onSigningOut = async (msalInstance) => {
  try {
    msalInstance.logoutRedirect();
  } catch (error) {
    // handle error, either in the library or coming back from the server
    console.log('error during logout redirect :', error);
  }
};

export default Menu;
