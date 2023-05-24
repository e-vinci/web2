import React from 'react';
import { snakeCase } from 'lodash';

/**
 * Title that should be linked to an InternalPageMenuItem. There should be an item
 * with the same value that is given to the InternalPageTitle. In this way, the anchor added to this
 * title will be linked to the InternalPageMenuItem link.
 * level : is the level for the title (1 is equivalent of h1). By default there is no level, therefore the
 * level is to be given in the MDX.
 * @returns
 */
const InternalPageTitle = ({ children, className, level }) => {
  const internalPageMenuItemId = snakeCase(children);
  const Tag = `h${level}`;
  return level ? (
    <Tag className={className}>
      <a id={internalPageMenuItemId} className="internal-page-title" />
      {children}
    </Tag>
  ) : (
    <span>
      <a id={internalPageMenuItemId} className="internal-page-title"/>
      {children}
    </span>
  );
};

export default InternalPageTitle;
