import React, { useEffect } from "react";
import { useMsal } from "@azure/msal-react";
import { navigate } from "gatsby";
import MainLayout from "../components/main-layout";

/**
 * NO LONGER REQUIRED : TO BE DELETED
 * @returns 
 */
const Logout = () => {
  const { instance } = useMsal();
  // only call this function at client side
  useEffect(() => {
    instance.logoutRedirect();
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
