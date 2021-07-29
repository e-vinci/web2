import React from "react";
import Menu from "./navbar/menu.js";
import Background from "./background.js";
const Header = ({ siteTitle, menuLinks, ...otherProps }) => {
  let { className, navbarExtraStyles, headerImage } = otherProps;

  console.log("header:", navbarExtraStyles, headerImage);
  console.log("image:", headerImage);

  className = `header ${className ? className : ""}`;
  if (headerImage)
    return (
      <header {...{ className }}>
        <Background imageName={headerImage} className="background--header">
          <Menu
            {...{ menuLinks, siteTitle }}
            {...(navbarExtraStyles
              ? { navbarExtraStyles: navbarExtraStyles }
              : {})}
          ></Menu>
        </Background>
      </header>
    );
  else
    return (
      <header {...{ className }}>
        <Menu
          {...{ menuLinks, siteTitle }}
          {...(navbarExtraStyles
            ? { navbarExtraStyles: navbarExtraStyles }
            : {})}
        ></Menu>
      </header>
    );
};
export default Header;
