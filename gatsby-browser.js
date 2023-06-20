import React from 'react';
import wrapWithProvider from './src/utils/auths/wrap-with-provider';

let i18nPluginOptions;

async function asyncPluginConfig() {
  const {
    default: { plugins },
  } = await import('./gatsby-config.mjs');
  const { options: i18nPluginOptionsTemp } = plugins.find(
    (plugin) => plugin.resolve === `gatsby-plugin-i18n`
  );
  i18nPluginOptions = i18nPluginOptionsTemp;
}

export const wrapRootElement = wrapWithProvider;

export const onServiceWorkerUpdateReady = () => {
  window.location.reload(true);
};

export const onClientEntry = async () => {
  await asyncPluginConfig();
  if (i18nPluginOptions.prefixDefault) {
    if (window.location.pathname === '/') {
      window.location.pathname = siteMetadata.languages.defaultLangKey;
    }
  }
};

/* extra class to be added to the page div if the browser is firefox because
Firefox does not support the has() CSS selector.
*/
export const onRouteUpdate = ({ location, prevLocation }) => {
  const isFirefox = navigator.userAgent.toLowerCase().indexOf('firefox') > -1;
  const extraClassIfFirefox = isFirefox ? 'page--visible-internal-menu' : '';
  const pageDiv = document.querySelector('.page');
  const pageInternalMenuDiv = document.querySelector('.page-menu');
  if (
    pageDiv &&
    pageInternalMenuDiv &&
    !pageInternalMenuDiv.classList.contains('page-menu--sticky') &&
    isFirefox
  )
    pageDiv.classList.add('page--visible-internal-menu');
};
