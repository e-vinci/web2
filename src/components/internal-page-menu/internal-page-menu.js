import React, { useContext, useEffect, useState } from 'react';
import { NavigationContext } from '../contexts/navigation-context';
import { PathViewer } from '../path-viewer/path-viewer';

/**
 * An internal page menu made up of InternalPageMenu item. The menu is normally drawn just under
 * the div with an header class if the header is visible. Else it is drawn at the top (when the
 * user scroll and the header is no more visible).
 * It does not do anything special if we pass him a PathViewer : it only includes its in the wrapper.
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

  const [menuIsInView, setmenuIsInView] = useState(true);
  const [menuHeight, setMenuHeight] = useState(0);

  useEffect(() => {
    //if (menuHeight === 0) {
    const menuHeight = document
      .querySelector('.header')
      ?.getBoundingClientRect().height;
    setMenuHeight(menuHeight);
    //}

    const handleScroll = () => {
      if (window.scrollY > menuHeight) setmenuIsInView(false);
      else setmenuIsInView(true);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [menuIsInView]);

  /* a delay has been added, because when we click on a menu item, the scroll event will mess up the active
  item that shall be the clicked item. The delay ensure that the scroll event are superseeded by the click 
  event.*/
  const onItemClick = (itemTextInSnakeCase) => {
    setTimeout(() => setActivePageMenuItem(itemTextInSnakeCase), 100);
  };

  return (
    <div
      className={`${className} ${sticky ? className + '--sticky' : ''}`}
      style={{ top: menuIsInView && !sticky ? menuHeight : 0 }} // top has no effect when defautl position (static)
    >
      {React.Children.map(children, (child, index) => {
        if (child.type === PathViewer) {
          return child;
        }
        return React.cloneElement(child, {
          id: index,
          startOfLeadingString,
          numbered,
          numbering: index + 1,
          endOfLeadingString,
          className: `${className}__item`,
          activePageMenuItem,
          onItemClick,
        });
      })}
    </div>
  );
};

export default InternalPageMenu;
