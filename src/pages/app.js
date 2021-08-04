import React from "react";
import { Router } from "@reach/router";
import MainLayout from "../components/main-layout";
import Login from "../components/auths/login/login";
import ProjectPage from "../components/auths/project/project-page";
import LoginTemp from "../components/auths/login/logintemp";
import Logout from "../components/auths/login/logout";
import PrivateRoute from "../components/auths/route/secured-route";

const App = () => (
  <MainLayout>
    <Router basepath="/app">
      <Login path="/login" />
      <LoginTemp path="/logintemp" />

      <PrivateRoute path="/logout" component={Logout} />
      <PrivateRoute path="/project-page" component={ProjectPage} />
    </Router>
  </MainLayout>
);
export default App;
