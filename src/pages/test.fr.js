import React from "react";
import MainLayout from "../components/main-layout";
import Section from "../components/section";
import Content from "../components/content";

const TestPage = () => {
  return (
    <MainLayout>
      <Section className="pb-3">
        <Content>
          <h3 className="">Page de test</h3>
        </Content>
      </Section>
    </MainLayout>
  );
};

export default TestPage;
