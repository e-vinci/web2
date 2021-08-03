import React from "react";
import { StaticImage } from "gatsby-plugin-image";
import { Link } from "gatsby";

const LoginTemp = () => {
  return (
    <div>
      <p>
        Vous pouvez vous logger en cliquant
        <Link href="#" to="/auths/login">
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

export default LoginTemp;
