import React, { useState, useEffect } from "react";
import { signIn } from "../../../utils/auths/authPopup.js";
import { navigate } from "gatsby";
import { Link } from "gatsby";
import { StaticImage } from "gatsby-plugin-image";

const Login = () => {
  const [isSigned, setIsSigned] = useState(false);

  useEffect(() => {
    // You need to restrict it at some point
    if (!isSigned) onSigningIn();
  });

  // call the popup function from MS Azure AD
  const onSigningIn = async () => {
    const isSignedIn = await signIn();
    setIsSigned(isSignedIn);
  };

  if (isSigned) {
    navigate("/app/project-page");
    return null;
  }

  return (
    <div>
      <p>
        Vous pouvez vous logger en cliquant
        <Link to="/app/login">
          <StaticImage
            src="../../../images/logo_vinci.png"
            alt=""
            width="24"
            height="24"
          />
          ici
        </Link>
        ou dans le menu.
      </p>
    </div>
  );
};

export default Login;
