import React, { useState, useEffect } from "react";
import {
  useMsal,
  useIsAuthenticated,
  InteractionStatus,
  inProgress,
} from "@azure/msal-react";
import { loginRequest } from "../utils/auths/authConfig";
import { navigate } from "gatsby";
import { Link } from "gatsby";
import { StaticImage } from "gatsby-plugin-image";
import MainLayout from "../components/main-layout";


/**
 * IT SEEMS NO LONGER REQUIRED : TO BE DELETED
 * @returns 
 */
const Login = () => {
  const { instance, accounts } = useMsal();
  const isAuthenticated = useIsAuthenticated();

  const [isSigned, setIsSigned] = useState(false);

  useEffect(() => {
    // You need to restrict it at some point
    if (!isSigned) onSigningIn();
  });

  // call the redirect function from MS Azure AD
  const onSigningIn = async () => {
    try {
      instance.loginRedirect(loginRequest);
      
    } catch (error) {
      // handle error, either in the library or coming back from the server
      console.log("error during redirect :", error);
    }
  };


  return (
    <MainLayout>
      <div>
        <p className="pl-3">
          Vous pouvez vous logger en cliquant &nbsp;
          <Link to="/login">
            <StaticImage
              src="../images/logo_vinci.png"
              alt=""
              width="24"
              height="24"
            />
            ici
          </Link>
          &nbsp; ou dans le menu.
        </p>
      </div>
    </MainLayout>
  );
};

export default Login;
