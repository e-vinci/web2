import React, { useState, useEffect } from 'react';
import InternalPageMenuItem from './internal-page-menu-item';

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
 * @param {*} param0
 * @returns
 */
const InternalPageMenu = ({
  children,
  startOfLeadingString = '',
  endOfLeadingString = '',
  numbered = false,
  className = 'page-menu',
}) => {
  const [titles, setTitles] = useState('');
  const [activeMenuItemId, setActiveMenuItemId] = useState('');
  const [clickedMenuItemId, setClickedMenuItemId] = useState('');

  let scrollTimer;

  const onClick =(e)=> {
    setActiveMenuItemId("");

    console.log("click :", e.currentTarget.id);
    setClickedMenuItemId(e.currentTarget.id);

  }

  const scrollHandler = () => {
    // Below implements 50 ms debounce
    if (scrollTimer) {
      clearTimeout(scrollTimer);
    }

    scrollTimer = setTimeout(() => {
      const scrollThreshold = window.scrollY;
      // console.log("threshold y:", scrollThreshold )
      let last = titles[0];
      for (const title of titles) {
        const elem = document.querySelector(`#${title}`);
        if (elem && elem.offsetTop >= scrollThreshold) {
          break;
        }
        last = title;
      }
      if (activeMenuItemId !== last) {
        setActiveMenuItemId(last);
      }
    }, 50);
  };

  useEffect(() => {
    const titleElements = Array.from(
      document.querySelectorAll('.internal-page-title')
    );
    if (titleElements?.length === 0) return;
    const titlesInPage = titleElements?.map((title) => {
      return title.id;
    });
    setTitles(titlesInPage);
    window.addEventListener('scroll', scrollHandler);

    return () => {
      window.removeEventListener('scroll', scrollHandler);
    };
  }, []);

  return (
    <div className={className}>
      {React.Children.map(children, (child, index) =>
        React.cloneElement(child, {
          id: index,
          startOfLeadingString,
          numbered,
          numbering: index + 1,
          endOfLeadingString,
          activeMenuItemId,
          className: className + "__item",
          onClick,
        })
      )}
    </div>
  );
};

export default InternalPageMenu;
