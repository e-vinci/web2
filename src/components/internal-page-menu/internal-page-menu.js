import React, { useState, useEffect } from 'react';

/**
 * An internal page menu made up of InternalPageMenu item.
 * It does automatically render relative links based on the texte given in the value of
 * InternalPageMenuItem.
 * Here we clone the children elements to pass some extra datas from the parent element...
 * startOfLeadingString : by default an empty String, these are special chars that we want to add
 * prior to each menu title : "a." for example.
 * numbered : by default at false. If true, it leads to adding the "index + 1" value of the InternalPageMenuItem
 * after the startOfLeadingString
 * endOfLeadingString : by default an empty String, these are special chars that we want to add
 * prior to each menu title : ")" for example.
 * sticky : false by default. If different than false (if the props is given as "sticky" without value e.g.)
 * the menu will not move/change even if the screen is lg and the menu should go to the left side.
 * @param {*} param0
 * @returns
 */
const InternalPageMenu = ({
  children,
  startOfLeadingString = '',
  endOfLeadingString = '',
  numbered = false,
  className = 'page-menu',
  sticky = false,
}) => {
  return (
    <div className={`${className} ${
      sticky ? className + '--sticky' : ''
    }`}>
      {React.Children.map(children, (child, index) =>
        React.cloneElement(child, {
          id: index,
          startOfLeadingString,
          numbered,
          numbering: index + 1,
          endOfLeadingString,
          className: `${className}__item`,
        })
      )}
    </div>
  );
};

export default InternalPageMenu;
