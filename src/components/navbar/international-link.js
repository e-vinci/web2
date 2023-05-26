import React from "react";
import { Link } from "gatsby";

const InternationalLink = ({
  children = [],
  className = "",
  absoluteLink = "/",
  i18nPluginOptions,
  locale,
  ...rest
}) => {
  let i18nLink;
  if (
    (locale === i18nPluginOptions?.langKeyDefault) &
    !i18nPluginOptions?.prefixDefault
  ) {
    // URL shall not contain a locale (index page is "/" & not "/fr" for example)
    i18nLink = absoluteLink;
  } else {
    i18nLink = `/${locale + absoluteLink}`;
  }

  return (
    <Link className={className} to={i18nLink} {...rest}>
      {children}
    </Link>
  );
};

export default InternationalLink;
