import React from "react";
import { Router } from "@reach/router";
import MainLayout from "../components/main-layout";
import Login from "../components/auths/login/login";
import ProjectPage from "../components/auths/project/project-page";
import LoginTemp from "../components/auths/login/logintemp";
import Logout from "../components/auths/login/logout";
import PrivateRoute from "../components/auths/route/secured-route";

const Auths = () => (
  <MainLayout>
    <Router>
      <Login path="/auths/login" />
      <LoginTemp path="auths/logintemp" />

     
      <PrivateRoute path="auths/logout" component={Logout} />
      <PrivateRoute path="auths/project-page" component={ProjectPage} />
 
    </Router>
  </MainLayout>
);
export default Auths;
