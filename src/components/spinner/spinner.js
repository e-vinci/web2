import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { fas, faSpinner } from "@fortawesome/free-solid-svg-icons";

const Spinner = () => {
  return (
    <div className="spinner">
      <div className="spinner__overlay"></div>
      <div className="spinner__animation">
        <FontAwesomeIcon icon={faSpinner} className="fa-3x fa-spin" />
      </div>
    </div>
  );
};

export default Spinner;
