import React from "react";
const Content = ({ children, className}) => {
    const classValue = `section__content ${className ? className : ""}`;

    return <div className={classValue}>{children}</div>;
};
export default Content;
