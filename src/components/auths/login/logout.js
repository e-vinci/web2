import React from "react";
import { signOut } from "../../../utils/auths/authPopup.js";
import { navigate } from "gatsby";

const Logout = () => {
  // call the popup function from MS Azure AD
  signOut();   
  //sessionStorage.clear();
  // force to rerender all the components => navigate to home
  navigate("/");
  return <h3>Logout</h3>
};

export default Logout;
