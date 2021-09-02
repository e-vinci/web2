import React from "react";
const Quote = ({ content, author }) => {
  return (
    <div className="quote quote--close-to-others">
        <div className="quote__content quote__content--dark-and-wide">
      <q>{content}</q>
      <br />
      <i>
        <small className="text--hand-written">- {author}</small>
      </i>
      </div>
    </div>
  );
};
export default Quote;


/*

<q>{content}</q>
      <br />
      <i>
        <small className="text--hand-written">- {author}</small>
      </i>
      */