import React, { useContext } from 'react';
import { NavigationContext } from '../contexts/navigation-context';

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
  const { activePageMenuItem, setActivePageMenuItem } =
    useContext(NavigationContext);

  console.log('page menu loaded with active item:', activePageMenuItem);

  /* a delay has been added, because when we click on a menu item, the scroll event will mess up the active
  item that shall be the clicked item. The delay ensure that the scroll event are superseeded by the click 
  event.*/
  const onItemClick = (itemTextInSnakeCase) => {
    setTimeout(() => setActivePageMenuItem(itemTextInSnakeCase), 100);
  }; 

  return (
    <div className={`${className} ${sticky ? className + '--sticky' : ''}`}>
      {React.Children.map(children, (child, index) =>
        React.cloneElement(child, {
          id: index,
          startOfLeadingString,
          numbered,
          numbering: index + 1,
          endOfLeadingString,
          className: `${className}__item`,
          activePageMenuItem,
          onItemClick,
        })
      )}
    </div>
  );
};

export default InternalPageMenu;
