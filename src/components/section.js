import React from "react";
const Section = ({ children, className}) => {
    const classValue = `section ${className ? className : ""}`;

    return <div className={classValue}>{children}</div>;
};
export default Section;
