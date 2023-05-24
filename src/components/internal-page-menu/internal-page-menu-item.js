import React, { useRef } from 'react';
import { Link } from 'gatsby';
import { snakeCase } from 'lodash';

/**
 * Menu item for an internal page menu
 * startOfLeadingString : by default an empty String, these are special chars that we want to add
 * prior to each menu title : "a." for example.
 * numbered : by default at false. If true, it leads to adding the numbering after the startOfLeadingString
 * numbering : value to be added after the startOfLeadingString if numbered is true.
 * endOfLeadingString : by default an empty String, these are special chars that we want to add
 * prior to each menu title : ")" for example.
 * @returns
 */
const InternalPageMenuItem = ({
  children,
  className,
  id,
  startOfLeadingString = '',
  numbered = false,
  numbering = '',
  endOfLeadingString = '',
  activeMenuItemId,
  onClick,
}) => {
  const itemTextInSnakeCase = snakeCase(children);
  const isMenuItemActive = activeMenuItemId === itemTextInSnakeCase;
  // const targetRef = useRef({});
  return (
   
      <div id={`item_${itemTextInSnakeCase}`} 
        className={`${className}__left-text ${
          isMenuItemActive ? className + '__left-text--selected' : ''
        }`}
        onClick={onClick}
      >
        <Link to={'#' + snakeCase(itemTextInSnakeCase)}>
          {`${startOfLeadingString}${
            numbered ? numbering : ''
          }${endOfLeadingString}${children}`}
        </Link>
      </div>
  );
};

export default InternalPageMenuItem;
