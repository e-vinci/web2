import React, { useEffect } from "react";
import { signOut } from "../utils/auths/authPopup.js";
import { navigate } from "gatsby";
import MainLayout from "../components/main-layout";

const Logout = () => {
  // only call this function at client side
  useEffect(() => {
    signOut();
    //sessionStorage.clear();
    // force to rerender all the components => navigate to home
    navigate("/");
  });

  return (
    <MainLayout>
      <h3 className="pl-3">Logout</h3>
    </MainLayout>
  );
};

export default Logout;
