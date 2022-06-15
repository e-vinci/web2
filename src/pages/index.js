import React, { useEffect } from "react";
import MainLayout from "../components/main-layout";
import Section from "../components/section";
import Content from "../components/content";
import Index from "../components/index/index";
import {
  useMsal,
  useIsAuthenticated,
  InteractionStatus,
  inProgress,
} from "@azure/msal-react";

const IndexPage = () => {
  const { instance } = useMsal();

  useEffect(async () => {
    try {
      const tokenResponse = await instance.handleRedirectPromise();
      if (tokenResponse === null) {
        console.log("This is not a redirect from MSAL");
      } else {
        console.log("This is a redirect from MSAL : ", tokenResponse);
      }
    } catch (error) {
      // handle error, either in the library or coming back from the server
      console.log("error during redirect :", error);
    }
  });

  return (
    <MainLayout>
      <Section className="pb-3">
        <Content>
          <h3 className="">Contenus du cours</h3>
          <Index isSearchable />
        </Content>
      </Section>
    </MainLayout>
  );
};

export default IndexPage;
