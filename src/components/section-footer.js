import React from "react";
const SectionFooter = ({ children, className}) => {
    const classValue = `section__footer ${className ? className : ""}`;

    return <div className={classValue}>{children}</div>;
};
export default SectionFooter;
