import React from "react";
const SectionHeader = ({ children, className}) => {
    const classValue = `section__header ${className ? className : ""}`;

    return <div className={classValue}>{children}</div>;
};
export default SectionHeader;
