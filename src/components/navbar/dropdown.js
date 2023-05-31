import React, { useState, useEffect, useRef } from "react";
import MenuItem from "./menu-item";

const Dropdown = ({
  itemData,
  i18nPluginOptions,
  locale,
  isAuthenticated,
  key,
}) => {
  // ref to deal with dropdown (submenu items)
  const { name, subMenu } = itemData;

  const subMenuRef = useRef();

  const [collapsed, setCollapsed] = useState(false);

  const onDropDownClick = (e) => {
    {
      setCollapsed(!collapsed);
    }
  };

  // reset all dropdown : they all have to be with collapse = false
  const handleCloseOfDropDown = (e) => {
    {
      // there was a click
      // only perform an action if the click is outside the dropdown that is collapsed

      if (subMenuRef.current && subMenuRef.current.contains(e.target)) {
        //console.log("click inside subMenuTitle ref");
        return;
      }

      // console.log("click outside => trigger close of dropdown");
      setCollapsed(false);
    }
  };

  useEffect(() => {
    // add when mounted
    document.addEventListener("click", handleCloseOfDropDown);
    // return function to be called when unmounted
    return () => {
      document.removeEventListener("click", handleCloseOfDropDown);
    };
  }, []);


  const itemIsUnavailable = itemData?.protected && !isAuthenticated;
  if (itemIsUnavailable) return null;

  return (
    <li key={key} className="navbar__menu__list__item">
      <a
        className="navbar__menu__list__item__link navbar__menu__list__item__link--dropdown-toggle"
        onClick={onDropDownClick}
        ref={subMenuRef}
      >
        {name}
      </a>

      <ul
        className={`navbar__menu__list__item__dropdown-menu ${
          collapsed ? "navbar__menu__list__item__dropdown-menu--collapsed" : ""
        }`}
        aria-labelledby="navbarDropdown"
      >
        {subMenu.map((subLink, indexSubMenu) => (
          <MenuItem
            index={indexSubMenu}
            className="navbar__menu__list__item__dropdown-menu__item"
            i18nPluginOptions={i18nPluginOptions}
            itemData={subLink}
            locale={locale}
            isAuthenticated={isAuthenticated}            
          />
        ))}
      </ul>
    </li>
  );
};

export default Dropdown;
