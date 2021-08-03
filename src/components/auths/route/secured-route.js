import React from "react";
import { navigate } from "gatsby";
import { getUserName } from "../../../utils/auths/authPopup.js";

const PrivateRoute = ({ component: Component, location, ...rest }) => {
  // don't do anything if this is run at server side (no window object)
  if (typeof window === "undefined") return null;

  if (!getUserName() && location.pathname !== `/auths/login`) {
    navigate("/auths/login");
    return null;
  }
  return <Component {...rest} />;
};
export default PrivateRoute;
