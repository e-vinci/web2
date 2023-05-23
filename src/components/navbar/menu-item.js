import React from "react";
import InternationalLink from "./international-link";

const MenuItem = ({
  children = [],
  index = 0,
  itemData = {},
  className = "navbar__menu__list__item",
  i18nPluginOptions,
  locale,
  isAuthenticated,
}) => {
  const itemIsUnavailable = itemData?.protected && !isAuthenticated;
  if (itemIsUnavailable) return null;

  return (
    <li className={className}>
      <InternationalLink
        className={className + "__link"}
        i18nPluginOptions={i18nPluginOptions}
        absoluteLink={itemData.link}
        locale={locale}
      >
        {itemData.name}
      </InternationalLink>
    </li>
  );
};

export default MenuItem;
