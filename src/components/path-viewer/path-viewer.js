import React, { useContext } from 'react';
import { Link } from 'gatsby';
import { snakeCase } from 'lodash';

import { NavigationContext } from '../contexts/navigation-context';

const PathViewer = ({ className = 'path-viewer', children }) => {
  return <div className={className}>{children}</div>;
};

const PathViewerItem = ({
  className = 'path-viewer__item',
  children,
  to,
  selected,
}) => {
  const itemTextInSnakeCase = snakeCase(children);

  let path;
  if (selected) {
    path = '#';
  } else if (to) {
    path = to;
  } else {
    path = '#' + itemTextInSnakeCase;
  }

  return (
    <Link
      to={path}
      className={`${className} ${selected ? className + '--selected' : ''}`}
      id={`item_${itemTextInSnakeCase}`}
    >
      {children}
    </Link>
  );
};

export { PathViewer, PathViewerItem };
