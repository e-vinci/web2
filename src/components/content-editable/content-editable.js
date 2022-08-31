import React, { useState } from 'react';
import he from 'he';

/**
 * Make a div editable with text (could also be some HTML if needed).
 * @param {startContent} String to be used when the content is being updated
 * @param {children} React elements to be used when the content is not being updated
 * @returns
 */

const ContentEditable = ({
  className,
  isBeingEdited,
  onChange,
  startContent,
  id,
  isInline,
  children,
}) => {
  //const [content, setContent] = useState(startContent);

  const handleChange = (e) => {
    const propUpdated = {};
    propUpdated[id] = e.currentTarget.textContent;
    // set state at parent level
    onChange(propUpdated);
  };

  let currentContent;
  if (isBeingEdited)
    currentContent = startContent
      ? he.decode(startContent)
      : ''; 
  else if (children) currentContent = children;
  else if (startContent)
    currentContent = startContent ? he.decode(startContent) : '';

  let allClasses;
  allClasses = className ? className : '';
  if (isBeingEdited)
    allClasses += ' index__card__content__description--is-being-edited';
  if (isInline) allClasses += ' index__card__content__description--is-inline';

  return (
    <div
      className={allClasses}
      contentEditable={isBeingEdited ? true : false}
      onInput={handleChange}
      suppressContentEditableWarning={true}
    >
      {currentContent}
    </div>
  );
};

export default ContentEditable;
