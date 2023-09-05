import React, { useEffect, useContext, useState, useRef } from 'react';
import { snakeCase } from 'lodash';

import { NavigationContext } from '../contexts/navigation-context';
import { is } from 'ramda';
import { SettingsInputSvideo } from '@material-ui/icons';

/**
 * Title that should be linked to an InternalPageMenuItem. There should be an item
 * with the same value that is given to the InternalPageTitle. In this way, the anchor added to this
 * title will be linked to the InternalPageMenuItem link.
 * level : is the level for the title (1 is equivalent of h1). By default there is no level, therefore the
 * level is to be given in the MDX.
 * @returns
 */
const InternalPageTitle = ({ children, className, level }) => {
  const [isInView, setIsInView] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const ref = useRef(null);

  const internalPageMenuItemId = snakeCase(children);
  const Tag = `h${level}`;

  const {
    activePageMenuItem,
    setActivePageMenuItem,
    activePageMenuItemIsVisible,
    setActivePageMenuItemIsVisible,
  } = useContext(NavigationContext);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
        } else setIsInView(false);
      },
      {
        threshold: 1,
        rootMargin: '0px 0px 0px 0px',
      }
    );

    observer.observe(ref.current);

    return () => {
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      /* console.log(
        'scroll : ',
        internalPageMenuItemId,
        'isInView',
        isInView,
        'isVisible',
        isVisible,
        'above half viewport:',
        isElementAboveHalfViewport(ref.current)
      );*/
      if (isInView) {
        if (!isVisible) {
          // the item has just appeared above the half of viewport, it shall be shown
          if (isElementAboveHalfViewport(ref.current)) {
            setActivePageMenuItem(internalPageMenuItemId);
            setIsVisible(true);
          }
        } else if (!isElementAboveHalfViewport(ref.current)) {
          /* the user scroll up, there is an item
          visible but it is below the half of viewport...
          the active item should be the one above this element*/

          const titles = Array.from(
            document.querySelectorAll('.internal-page-title')
          );
          const previousVisibleItemIndex = titles.findIndex(
            (element) => element.id === internalPageMenuItemId
          );
          if (previousVisibleItemIndex === -1 || previousVisibleItemIndex === 0)
            return;

          const currentVisibleItemId = titles[previousVisibleItemIndex - 1].id;
          setActivePageMenuItem(currentVisibleItemId);
        } else {
          // the user scroll up until an item is above the half of the view port, show it
          setActivePageMenuItem(internalPageMenuItemId);
          setIsVisible(true);
        }
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [isInView, isVisible]);

  return level ? (
    <Tag className={className}>
      <a
        id={internalPageMenuItemId}
        className="internal-page-title"
        ref={ref}
      />
      {children}
    </Tag>
  ) : (
    <span>
      <a
        id={internalPageMenuItemId}
        className="internal-page-title"
        ref={ref}
      />
      {children}
    </span>
  );
};

function isElementAboveHalfViewport(element) {
  const elementRect = element.getBoundingClientRect();
  const viewportHeight =
    window.innerHeight || document.documentElement.clientHeight;

  return elementRect.top < viewportHeight / 2;
}

export default InternalPageTitle;
