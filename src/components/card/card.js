import React from "react";
const Card = ({ children, className}) => {
    const classValue = `card ${className ? className : ""}`;

    return <div className={classValue}>{children}</div>;
};
export default Card;
